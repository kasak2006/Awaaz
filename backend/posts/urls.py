from django.urls import path
from .views import posts_list_create,user_posts
from .views import toggle_like, toggle_relate

urlpatterns = [
    path('api/posts/', posts_list_create),
    path('api/posts/<int:post_id>/toggle_like/', toggle_like, name='toggle-like'),
    path('api/posts/<int:post_id>/toggle_relate/', toggle_relate, name='toggle-relate'),
    path('api/posts/user/', user_posts, name='user-posts'),
]
