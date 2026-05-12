from rest_framework import serializers
from .models import OrderDraft, OrderDraftItem
from inbox.serializers import MessageSerializer

class OrderDraftItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    
    class Meta:
        model = OrderDraftItem
        fields = ['id', 'product', 'product_name', 'raw_product_name', 'quantity', 'unit', 'confidence']

class OrderDraftSerializer(serializers.ModelSerializer):
    items = OrderDraftItemSerializer(many=True, read_only=True)
    message_details = MessageSerializer(source='message', read_only=True)
    
    class Meta:
        model = OrderDraft
        fields = ['id', 'message', 'message_details', 'customer', 'status', 'confidence', 'items', 'created_at']
