from django.urls import path
from .views import PostListCreateView, PostRetrieveView, ReplyListCreateView

urlpatterns = [
    path('posts/', PostListCreateView.as_view(), name='post-list-create'),
    path('posts/<int:pk>/', PostRetrieveView.as_view(), name='post-retrieve'),  # Retrieve single post
    path('posts/<int:post_id>/replies/', ReplyListCreateView.as_view(), name='reply-list-create'),
]
