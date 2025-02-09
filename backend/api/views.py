from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .models import Post, Reply
from .serializers import PostSerializer, ReplySerializer

class PostListCreateView(generics.ListCreateAPIView):
    queryset = Post.objects.all().order_by('-timestamp')
    serializer_class = PostSerializer

class PostRetrieveView(generics.RetrieveAPIView):  # Retrieve single post view
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class ReplyListCreateView(generics.ListCreateAPIView):
    serializer_class = ReplySerializer

    def get_queryset(self):
        post_id = self.kwargs['post_id']
        return Reply.objects.filter(post_id=post_id).order_by('-timestamp')

    def perform_create(self, serializer):
        post_id = self.kwargs['post_id']
        post = Post.objects.get(id=post_id)
        serializer.save(post=post)
        post.replies += 1
        post.save()
