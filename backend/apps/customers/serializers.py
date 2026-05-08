from rest_framework import serializers, viewsets
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .models import Customer, Address, Contact

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'

class CustomerSerializer(serializers.ModelSerializer):
    addresses = AddressSerializer(many=True, read_only=True)
    contacts = ContactSerializer(many=True, read_only=True)
    
    class Meta:
        model = Customer
        fields = '__all__'

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

router = DefaultRouter()
router.register(r'', CustomerViewSet)

# Create views.py content as well
import sys
from . import views
# This is a hack to put views in views.py if needed, but I'll write views.py separately for clarity.
