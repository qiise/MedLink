from rest_framework import serializers
from .models import Post, Reply

class PostSerializer(serializers.ModelSerializer):
    timestamp = serializers.DateTimeField(format="%Y-%m-%dT%H:%M:%S.%fZ")  # ISO 8601 format

    class Meta:
        model = Post
        fields = '__all__'

class ReplySerializer(serializers.ModelSerializer):
    timestamp = serializers.DateTimeField(format="%Y-%m-%dT%H:%M:%S.%fZ")  # ISO 8601 format

    class Meta:
        model = Reply
        fields = '__all__'
