from django.db import models
from orders.models import Order
from django.conf import settings

class OrderEvent(models.Model):
    order = models.ForeignKey(Order, related_name='events', on_delete=models.CASCADE)
    event_type = models.CharField(max_length=100)
    old_status = models.CharField(max_length=50, blank=True, null=True)
    new_status = models.CharField(max_length=50, blank=True, null=True)
    actor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
