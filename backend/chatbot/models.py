from django.db import models


class InterviewResponse(models.Model):
    user_id = models.IntegerField()
    question = models.TextField()
    response = models.TextField()
    feedback = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
