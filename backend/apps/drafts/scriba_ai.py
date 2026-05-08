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
        You are 'Scriba', the Master Alchemist of Order Extraction for the Scriptorium Platform.
        Your task is to take a natural language message from a customer (via WhatsApp, Telegram, or Email)
        and extract a structured order draft in JSON format.

        Rules:
        1. Identify products, quantities, and confidence levels.
        2. Map the product to the best matching SKU if possible.
        3. Identify if any information is missing or ambiguous.
        4. Return ONLY a JSON object.

        Example Input: "Buongiorno, vorrei ordinare 20 pacchi di carta A4 e 2 toner neri."
        Example Output:
        {
          "items": [
            {"raw_name": "pacchi di carta A4", "sku_hint": "NAV-A4-80", "quantity": 20, "confidence": 0.95},
            {"raw_name": "toner neri", "sku_hint": "THP-305A-BK", "quantity": 2, "confidence": 0.90}
          ],
          "overall_confidence": 0.92,
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
            # Basic cleanup if Claude adds markdown
            if "```json" in content:
                content = content.split("```json")[1].split("```")[0].strip()
            
            return json.loads(content)
        except Exception as e:
            print(f"Error calling Claude: {e}")
            return None

# Singleton instance
scriba = ScribaAI()
