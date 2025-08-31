# from rest_framework import viewsets, permissions
# from .models import Post
# from .serializers import PostSerializer

# class PostViewSet(viewsets.ModelViewSet):
#     queryset = Post.objects.all().order_by('-created_at')
#     serializer_class = PostSerializer
#     permission_classes = [permissions.IsAuthenticatedOrReadOnly]

#     def perform_create(self, serializer):
#         serializer.save(user=self.request.user)  # assign logged-in user automatically


from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from .models import Post
from .serializers import PostSerializer

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticatedOrReadOnly])
def posts_list_create(request):
    if request.method == 'GET':
        posts = Post.objects.all().order_by('-created_at')
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)



# from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
from .models import Post, PostLike, PostRelate
from django.shortcuts import get_object_or_404
from rest_framework import status

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def toggle_like(request, post_id):
    post = get_object_or_404(Post, id=post_id)
    user = request.user

    liked = PostLike.objects.filter(user=user, post=post).first()

    if liked:
        # User already liked; remove like
        liked.delete()
        post.likes = max(post.likes - 1, 0)
        post.save()
        return Response({"liked": False, "likes": post.likes})
    else:
        # User does not like yet; add like
        PostLike.objects.create(user=user, post=post)
        post.likes += 1
        post.save()
        return Response({"liked": True, "likes": post.likes})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def toggle_relate(request, post_id):
    post = get_object_or_404(Post, id=post_id)
    user = request.user

    related = PostRelate.objects.filter(user=user, post=post).first()

    if related:
        # User already related; remove relate
        related.delete()
        post.relate = max(post.relate - 1, 0)
        post.save()
        return Response({"related": False, "relate": post.relate})
    else:
        # User does not relate yet; add relate
        PostRelate.objects.create(user=user, post=post)
        post.relate += 1
        post.save()
        return Response({"related": True, "relate": post.relate})


from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Post
from .serializers import PostSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_posts(request):
    user = request.user
    posts = Post.objects.filter(user=user).order_by('-created_at')
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)
