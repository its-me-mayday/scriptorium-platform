from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import OrderDraft, OrderDraftItem
from .serializers import OrderDraftSerializer
from inbox.models import Message
from products.models import Product
from .scriba_ai import scriba
import json

class OrderDraftViewSet(viewsets.ModelViewSet):
    queryset = OrderDraft.objects.all()
    serializer_class = OrderDraftSerializer

    def create(self, request, *args, **kwargs):
        # Delete existing draft for this message before serializer validation
        message_id = request.data.get('message')
        if message_id:
            OrderDraft.objects.filter(message_id=message_id).delete()
        return super().create(request, *args, **kwargs)

    def perform_create(self, serializer):
        draft = serializer.save()
        self.perform_ai_extraction(draft)

    def perform_ai_extraction(self, draft):
        """
        Pure AI Extraction with Automated Merchant Identification.
        """
        from customers.models import Customer
        text = draft.message.body
        extraction = scriba.extract_order(text)
        
        if not extraction:
            draft.confidence = 0.0
            draft.save()
            return

        # 🕵️‍♂️ Advanced Merchant Identification Logic
        try:
            sender_info = extraction.get('sender_info', {})
            email = sender_info.get('email', '').strip().lower() if sender_info.get('email') else ''
            phone = str(sender_info.get('phone', '')).replace(' ', '').replace('-', '')
            name = sender_info.get('name', '').strip() if sender_info.get('name') else ''

            print(f"--- IDENTIFYING MERCHANT: {name} | {email} | {phone} ---")

            customer = None
            if email:
                customer = Customer.objects.filter(email__iexact=email).first()
            
            if not customer and phone:
                clean_phone = ''.join(filter(str.isdigit, phone))
                if len(clean_phone) >= 9:
                    customer = Customer.objects.filter(phone__icontains=clean_phone[-9:]).first()
            
            if not customer and name and len(name) > 3:
                customer = Customer.objects.filter(name__icontains=name).first()

            if not customer:
                if name or email or phone:
                    customer = Customer.objects.create(
                        name=name or "Nuovo Mercante",
                        email=email,
                        phone=phone
                    )
                    print(f"--- NEW MERCHANT CREATED: {customer.name} ---")
            
            if customer:
                draft.customer = customer
                draft.message.sender = customer.name
                draft.message.save()
                print(f"--- DRAFT LINKED TO CUSTOMER: {customer.name} ---")
        except Exception as e:
            print(f"!!! MERCHANT IDENTIFICATION ERROR: {str(e)} !!!")
            # We don't block the extraction if identification fails
        
        draft.save()

        # Process real extraction from Claude
        for item_data in extraction.get('items', []):
            sku = item_data.get('sku_hint')
            product = Product.objects.filter(sku=sku).first()
            
            OrderDraftItem.objects.create(
                draft=draft,
                product=product,
                raw_product_name=item_data.get('raw_name'),
                quantity=item_data.get('quantity', 1),
                unit=item_data.get('unit'),
                confidence=item_data.get('confidence', 0.5)
            )
        
        draft.confidence = extraction.get('overall_confidence', 0.5)
        draft.save()
