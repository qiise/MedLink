import os
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from groq import Groq

# Initialize Groq client
client = Groq(
    api_key=os.environ.get("GROQ_API_KEY"),
)


@csrf_exempt
def chat_with_ai(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            user_message = data.get("message", "")

            if not user_message:
                return JsonResponse({"error": "Message is required"}, status=400)

            # Call Groq API with enhanced system behavior
            chat_completion = client.chat.completions.create(
                messages=[
                    {
                        "role": "system",
                        "content": "You are a helpful assistant that provides expert-level responses for medical school interview preparation.",
                    },
                    {"role": "user", "content": user_message},
                ],
                model="deepseek-r1-distill-llama-70b",
                temperature=0.5,
                max_completion_tokens=1024,
                top_p=1,
                stop=None,
                stream=False,
            )

            # Extract AI response
            ai_response = chat_completion.choices[0].message.content

            print(ai_response)

            return JsonResponse({"content": ai_response})

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=405)
