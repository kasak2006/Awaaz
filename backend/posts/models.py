from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.TextField()
    anonymous = models.BooleanField(default=False)
    category = models.CharField(max_length=100)
    custom_category = models.CharField(max_length=100, blank=True, null=True)
    photo = models.ImageField(upload_to='post_photos/', blank=True, null=True)
    location = models.CharField(max_length=255, blank=True)
    date = models.DateField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    likes = models.PositiveIntegerField(default=0)
    relate = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"Post by {'Anonymous' if self.anonymous else self.user.username} at {self.created_at}"

from django.contrib.auth.models import User
from django.db import models

class PostLike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey('Post', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'post')

class PostRelate(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey('Post', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'post')
