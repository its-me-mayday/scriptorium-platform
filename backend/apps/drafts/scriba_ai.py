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
        You are 'Scriba', the Universal Alchemist of Order Extraction.
        Your primary mission is to extract EVERY SINGLE ITEM mentioned as a request in the customer's message.
        
        Rules:
        1. NO FILTERING: Extract everything the customer asks for, even if it's not a typical product or is outside the office supply category.
        2. MULTI-ITEM MANDATE: If a customer mentions multiple products, you MUST create a separate entry for EACH one.
        3. QUANTITY PRECISION: Extract the exact number. If no number is mentioned but the item is plural, use a reasonable default or 1.
        4. RAW NAMES: Use the exact words the customer used for the 'raw_name'.
        5. Map to 'sku_hint' ONLY if you are very certain, otherwise leave it null.
        6. Return ONLY a JSON object.

        Example Input: "Ciao! Vorrei 3 colli di carta e 2 pizze margherita."
        Example Output:
        {
          "items": [
            {"raw_name": "3 colli di carta", "sku_hint": "CAR-POL-01", "quantity": 3, "confidence": 0.99},
            {"raw_name": "pizze margherita", "sku_hint": null, "quantity": 2, "confidence": 0.95}
          ],
          "overall_confidence": 0.97,
          "missing_info": []
        }
        """

    def extract_order(self, message_text):
        if not self.client:
            return None
            
        try:
            response = self.client.messages.create(
                model="claude-3-5-sonnet-20240620",
                max_tokens=1024,
                system=self.system_prompt,
                messages=[
                    {"role": "user", "content": message_text}
                ]
            )
            
            # Extract JSON from response
            content = response.content[0].text
            print(f"--- SCRIBA RAW OUTPUT ---\n{content}\n-------------------------")
            # Basic cleanup if Claude adds markdown
            if "```json" in content:
                content = content.split("```json")[1].split("```")[0].strip()
            
            return json.loads(content)
        except Exception as e:
            print(f"Error calling Claude: {e}")
            return None

# Singleton instance
scriba = ScribaAI()
