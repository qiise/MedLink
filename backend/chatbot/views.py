import openai
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import InterviewResponse

openai.api_key = "your_openai_api_key"


@api_view(["POST"])
def chat_with_ai(request):
    user_input = request.data.get("message")

    prompt = f"You are a medical school interviewer. Ask a question and evaluate the response: {user_input}"

    response = openai.ChatCompletion.create(
        model="gpt-4", messages=[{"role": "system", "content": prompt}]
    )

    ai_response = response["choices"][0]["message"]["content"]

    # Store response in database
    InterviewResponse.objects.create(
        user_id=1,  # Replace with actual user ID
        question=user_input,
        response=ai_response,
        feedback="AI-generated feedback here",
    )

    return Response({"reply": ai_response})
