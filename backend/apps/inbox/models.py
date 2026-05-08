from django.db import models
from customers.models import Customer

class Conversation(models.Model):
    customer = models.ForeignKey(Customer, related_name='conversations', on_delete=models.SET_NULL, null=True, blank=True)
    last_message_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

class Message(models.Model):
    CHANNEL_CHOICES = [
        ('whatsapp', 'WhatsApp'),
        ('telegram', 'Telegram'),
        ('email', 'Email'),
        ('manual', 'Manual'),
    ]
    STATUS_CHOICES = [
        ('new', 'Nuovo'),
        ('analyzing', 'In analisi'),
        ('drafted', 'Bozza generata'),
        ('clarification', 'Richiede chiarimento'),
        ('converted', 'Convertito in ordine'),
        ('not_order', 'Non è un ordine'),
        ('archived', 'Archiviato'),
        ('error', 'Errore'),
    ]
    
    conversation = models.ForeignKey(Conversation, related_name='messages', on_delete=models.CASCADE)
    channel = models.CharField(max_length=20, choices=CHANNEL_CHOICES)
    sender = models.CharField(max_length=255)
    body = models.TextField()
    received_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='new')
    customer = models.ForeignKey(Customer, on_delete=models.SET_NULL, null=True, blank=True)
    metadata = models.JSONField(default=dict, blank=True)

    def __str__(self):
        return f"{self.channel} from {self.sender} at {self.received_at}"
