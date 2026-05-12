import os
import sys
import django

# Setup Django environment
sys.path.append('/Users/lucamaggio/workspace/scriptorium-platform/backend')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'scriptorium_core.settings')
django.setup()

from inbox.models import Message, Conversation
from drafts.models import OrderDraft
from django.utils import timezone

def test_webhook_logic():
    print("--- STARTING WEBHOOK LOGIC TEST ---")
    try:
        channel = 'whatsapp'
        sender = 'Test Debugger'
        text = 'Vorrei 5 kg di mele e 2 litri di latte.'

        # 1. Conversation
        print("Checking Conversation...")
        conversation = Conversation.objects.first()
        if not conversation:
            conversation = Conversation.objects.create()
        print(f"Conversation ID: {conversation.id}")

        # 2. Message
        print("Creating Message...")
        message = Message.objects.create(
            conversation=conversation,
            sender=sender,
            body=text,
            channel=channel,
            status='new'
        )
        print(f"Message ID: {message.id}")

        # 3. Draft
        print("Creating OrderDraft...")
        draft = OrderDraft.objects.create(message=message)
        print(f"Draft ID: {draft.id}")

        print("--- TEST SUCCESSFUL ---")
    except Exception as e:
        import traceback
        print(f"--- TEST FAILED ---")
        print(traceback.format_exc())

if __name__ == "__main__":
    test_webhook_logic()
