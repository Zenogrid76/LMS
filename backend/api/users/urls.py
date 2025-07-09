from django.urls import path
from .views import MentorRegisterView,LoginView,LogoutView

urlpatterns = [
    path('register/mentor/', MentorRegisterView.as_view(), name='mentor-register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    
]
