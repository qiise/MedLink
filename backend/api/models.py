from django.db import models

class Post(models.Model):
    title = models.CharField(max_length=255)
    preview = models.TextField()
    author = models.CharField(max_length=100)
    replies = models.IntegerField(default=0)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Reply(models.Model):
    post = models.ForeignKey(Post, related_name='replies_set', on_delete=models.CASCADE)
    author = models.CharField(max_length=100)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Reply by {self.author} on {self.post.title}"
