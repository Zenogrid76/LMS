from django.urls import path
from .views import MentorRegisterView,LoginView,LogoutView,StudentRegisterView

urlpatterns = [
    path('register/mentor/', MentorRegisterView.as_view(), name='mentor-register'),
    path('register/student/', StudentRegisterView.as_view(), name='student-register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    
]
