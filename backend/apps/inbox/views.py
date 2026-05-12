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
        Universal Webhook for Scriptorium with Detailed Error Reporting.
        """
        try:
            from drafts.models import OrderDraft
            
            channel = request.data.get('channel', 'whatsapp').lower()
            sender = request.data.get('sender', 'Unknown Merchant')
            text = request.data.get('text', '')

            if not text:
                return Response({"error": "No text provided"}, status=status.HTTP_400_BAD_REQUEST)

            # 1. Robust Conversation Management
            conversation = Conversation.objects.first()
            if not conversation:
                conversation = Conversation.objects.create()
            
            conversation.last_message_at = timezone.now()
            conversation.save()

            # 2. Create the message
            message = Message.objects.create(
                conversation=conversation,
                sender=sender,
                body=text,
                channel=channel,
                status='new'
            )

            # 3. Create the draft shell
            draft = OrderDraft.objects.create(message=message)
            
            # 4. Async Extraction
            import threading
            def run_extraction():
                try:
                    from drafts.views import OrderDraftViewSet
                    draft_viewset = OrderDraftViewSet()
                    draft_viewset.perform_ai_extraction(draft)
                    print(f"--- ASYNC EXTRACTION SUCCESS FOR DRAFT {draft.id} ---")
                except Exception as e:
                    print(f"--- ASYNC EXTRACTION ERROR: {str(e)} ---")

            thread = threading.Thread(target=run_extraction)
            thread.start()

            return Response({
                "status": "success",
                "message_id": message.id,
                "draft_id": draft.id
            }, status=status.HTTP_201_CREATED)

        except Exception as e:
            import traceback
            error_details = traceback.format_exc()
            print(f"--- WEBHOOK CRITICAL ERROR ---\n{error_details}")
            return Response({
                "status": "error",
                "message": str(e),
                "details": error_details
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
