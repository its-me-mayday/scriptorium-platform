from rest_framework import serializers
from .models import OrderDraft, OrderDraftItem

class OrderDraftItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderDraftItem
        fields = '__all__'

class OrderDraftSerializer(serializers.ModelSerializer):
    items = OrderDraftItemSerializer(many=True, read_only=True)
    class Meta:
        model = OrderDraft
        fields = '__all__'
