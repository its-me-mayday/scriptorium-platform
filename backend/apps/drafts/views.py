from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import OrderDraft, OrderDraftItem
from .serializers import OrderDraftSerializer
from inbox.models import Message
from products.models import Product
from .scriba_ai import scriba
import re

class OrderDraftViewSet(viewsets.ModelViewSet):
    queryset = OrderDraft.objects.all()
    serializer_class = OrderDraftSerializer

    def perform_create(self, serializer):
        draft = serializer.save()
        self.perform_ai_extraction(draft)

    def perform_ai_extraction(self, draft):
        """
        Real AI Extraction using Claude (Scriba).
        """
        text = draft.message.body
        extraction = scriba.extract_order(text)
        
        if not extraction:
            # Fallback to simple regex if Claude fails or API key is missing
            self.simulate_regex_extraction(draft)
            return

        # Process real extraction from Claude
        for item_data in extraction.get('items', []):
            sku = item_data.get('sku_hint')
            product = Product.objects.filter(sku=sku).first()
            
            OrderDraftItem.objects.create(
                draft=draft,
                product=product,
                raw_product_name=item_data.get('raw_name'),
                quantity=item_data.get('quantity', 1),
                confidence=item_data.get('confidence', 0.5)
            )
        
        draft.confidence = extraction.get('overall_confidence', 0.5)
        draft.save()

    def simulate_regex_extraction(self, draft):
        """
        Fallback logic.
        """
        text = draft.message.body.lower()
        rules = [
            {'keywords': ['carta', 'navigator'], 'sku': 'NAV-A4-80', 'name': 'Carta A4 Navigator 80g'},
            {'keywords': ['toner', 'hp'], 'sku': 'THP-305A-BK', 'name': 'Toner HP 305A Black'},
            {'keywords': ['penne', 'bic'], 'sku': 'BIC-BLU-50', 'name': 'Penne BIC Cristal Blu'},
        ]

        for rule in rules:
            if any(k in text for k in rule['keywords']):
                qty = 1
                match = re.search(r'(\d+)\s*(?:' + '|'.join(rule['keywords']) + ')', text)
                if match:
                    qty = int(match.group(1))
                
                product = Product.objects.filter(sku=rule['sku']).first()
                OrderDraftItem.objects.create(
                    draft=draft,
                    product=product,
                    raw_product_name=rule['name'],
                    quantity=qty,
                    confidence=0.6 # Lower confidence for regex
                )
        
        if draft.items.exists():
            draft.confidence = 0.6
            draft.save()
