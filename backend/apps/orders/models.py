from django.db import models
from customers.models import Customer
from products.models import Product

class Order(models.Model):
    STATUS_CHOICES = [
        ('draft', 'Bozza'),
        ('to_confirm', 'Da confermare'),
        ('confirmed', 'Confermato'),
        ('preparing', 'In preparazione'),
        ('ready', 'Pronto'),
        ('delivering', 'In consegna'),
        ('delivered', 'Consegnato'),
        ('cancelled', 'Annullato'),
        ('blocked', 'Bloccato'),
    ]
    order_number = models.CharField(max_length=50, unique=True)
    customer = models.ForeignKey(Customer, on_delete=models.PROTECT)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')
    source_channel = models.CharField(max_length=50)
    requested_delivery_date = models.DateField(null=True, blank=True)
    confirmed_at = models.DateTimeField(null=True, blank=True)
    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.PROTECT)
    quantity = models.FloatField()
    price_at_order = models.DecimalField(max_digits=10, decimal_places=2)
