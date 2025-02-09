from django.urls import path
from .views import chat_with_ai

urlpatterns = [
    path("chat/", chat_with_ai, name="chatbot"),
]
