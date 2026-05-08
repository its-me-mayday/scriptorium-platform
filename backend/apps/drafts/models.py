from django.db import models
from inbox.models import Message
from customers.models import Customer
from products.models import Product

class OrderDraft(models.Model):
    STATUS_CHOICES = [
        ('pending', 'In attesa'),
        ('confirmed', 'Confermata'),
        ('cancelled', 'Annullata'),
    ]
    message = models.OneToOneField(Message, related_name='order_draft', on_delete=models.CASCADE)
    customer = models.ForeignKey(Customer, on_delete=models.SET_NULL, null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    confidence = models.FloatField(default=0.0)
    missing_fields = models.JSONField(default=list, blank=True)
    ambiguities = models.JSONField(default=list, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

class OrderDraftItem(models.Model):
    draft = models.ForeignKey(OrderDraft, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, blank=True)
    raw_product_name = models.CharField(max_length=255)
    quantity = models.FloatField()
    confidence = models.FloatField(default=0.0)
    reason = models.TextField(blank=True, null=True)
