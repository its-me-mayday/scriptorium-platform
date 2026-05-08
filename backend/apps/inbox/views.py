from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Message, Conversation
from .serializers import MessageSerializer, ConversationSerializer
from django.utils import timezone

class ConversationViewSet(viewsets.ModelViewSet):
    queryset = Conversation.objects.all()
    serializer_class = ConversationSerializer

class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    @action(detail=False, methods=['post'], url_path='webhook')
    def webhook(self, request):
        """
        Universal Webhook for Scriptorium.
        Accepts: channel, sender, text
        """
        channel = request.data.get('channel', 'whatsapp').lower()
        sender = request.data.get('sender', 'Unknown Merchant')
        text = request.data.get('text', '')

        if not text:
            return Response({"error": "No text provided"}, status=status.HTTP_400_BAD_REQUEST)

        # 1. Find or create a conversation for this sender
        # For simplicity in this demo, we'll use the sender name as a unique key for the conversation
        conversation, created = Conversation.objects.get_or_create(
            # Ideally we'd link to a customer here, but for now we just track the conversation
            id=1 if Conversation.objects.exists() else None, # Fallback to first conv or create
            defaults={'last_message_at': timezone.now()}
        )
        
        # If no conversation exists at all, create one
        if not conversation.id:
            conversation = Conversation.objects.create()

        # 2. Create the message
        message = Message.objects.create(
            conversation=conversation,
            sender=sender,
            body=text,
            channel=channel,
            status='new'
        )

        return Response({
            "status": "success",
            "message_id": message.id,
            "received": text
        }, status=status.HTTP_201_CREATED)
