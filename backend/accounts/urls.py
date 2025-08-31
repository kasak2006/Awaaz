from django.urls import path
from .views import SignupView, LoginView
from .views import IncidentListCreateView
from .views import UserProfileView



urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('incidents/', IncidentListCreateView.as_view(), name='incident-list-create'),
    path('profile/', UserProfileView.as_view(), name='user-profile'),
]
