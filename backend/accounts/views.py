from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSignupSerializer,UserLoginSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import AllowAny


class SignupView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = UserSignupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Registration successful!"}, status=status.HTTP_201_CREATED)
        return Response({"message": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                "token": token.key,
                "message": "Login successful!"
            })
        return Response({"message": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

from rest_framework import generics
from .models import Incident
from .serializers import IncidentSerializer

class IncidentListCreateView(generics.ListCreateAPIView):
    queryset = Incident.objects.all()
    serializer_class = IncidentSerializer

    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]


from rest_framework import generics, permissions
from .models import UserProfile
from .serializers import UserProfileSerializer

class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        profile, created = UserProfile.objects.get_or_create(user=self.request.user)
        return profile

