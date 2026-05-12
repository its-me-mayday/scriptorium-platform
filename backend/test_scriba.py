import os
from anthropic import Anthropic
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("ANTHROPIC_API_KEY")
print(f"Testing with key: {api_key[:10]}...")

client = Anthropic(api_key=api_key)

models = [
    "claude-3-5-sonnet-20240620",
    "claude-3-opus-20240229",
    "claude-3-sonnet-20240229",
    "claude-3-haiku-20240307",
    "claude-2.1"
]

for model in models:
    print(f"Testing model: {model}...")
    try:
        message = client.messages.create(
            model=model,
            max_tokens=10,
            messages=[{"role": "user", "content": "Hi"}]
        )
        print(f"  SUCCESS with {model}!")
        break
    except Exception as e:
        print(f"  FAILED with {model}: {e}")
else:
    print("ALL MODELS FAILED. The key might be invalid or restricted.")
