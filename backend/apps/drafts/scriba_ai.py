import os
import json
from anthropic import Anthropic
from dotenv import load_dotenv

load_dotenv()

class ScribaAI:
    def __init__(self):
        api_key = os.getenv("ANTHROPIC_API_KEY")
        if not api_key:
            print("WARNING: ANTHROPIC_API_KEY not found in environment.")
            self.client = None
        else:
            self.client = Anthropic(api_key=api_key)
        
        self.system_prompt = """
        You are 'Scriba', the Universal Alchemist of Order Extraction and Merchant Identification.
        Your mission is dual:
        1. DECOMPOSE: Break down order requests into QUANTITY, UNIT, and PRODUCT.
        2. IDENTIFY: Extract any sender information found in the text (Name, Email, Phone Number).

        Rules:
        - SENDER INFO: If you see a signature (e.g. "Saluti, Marco Rossi") or contact data, extract it in a 'sender_info' object.
        - NO MOCKS: Extract exactly what is in the message.
        - Return ONLY a JSON object.

        Example Output:
        {
          "sender_info": {"name": "Marco Rossi", "email": "marco@email.com", "phone": "333123456"},
          "items": [
            {"raw_name": "nastro adesivo", "quantity": 5, "unit": "cartoni", "confidence": 0.99}
          ],
          "overall_confidence": 0.99
        }
        """

    def extract_order(self, message_text):
        if not self.client:
            return None
            
        try:
            response = self.client.messages.create(
                model="claude-opus-4-7",
                max_tokens=4096,
                system=self.system_prompt,
                messages=[
                    {"role": "user", "content": message_text}
                ]
            )
            
            # Extract JSON from response
            content = response.content[0].text
            print(f"--- SCRIBA RAW OUTPUT ---\n{content}\n-------------------------")
            
            # Robust JSON isolation
            start = content.find('{')
            end = content.rfind('}') + 1
            if start != -1 and end != 0:
                json_str = content[start:end]
                return json.loads(json_str)
            
            return json.loads(content)
        except Exception as e:
            print(f"Error calling Claude: {e}")
            return None

# Singleton instance
scriba = ScribaAI()
