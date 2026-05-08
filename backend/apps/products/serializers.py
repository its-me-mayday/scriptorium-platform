from rest_framework import serializers
from .models import Product, ProductAlias

class ProductAliasSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductAlias
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    aliases = ProductAliasSerializer(many=True, read_only=True)
    
    class Meta:
        model = Product
        fields = '__all__'
