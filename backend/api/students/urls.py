from django.urls import path
from .views import StudentRegisterView, StudentsListView , StudentDeleteView ,StudentMeView

urlpatterns = [
    path('register/', StudentRegisterView.as_view(), name='student-register'),
    path('studentlist/', StudentsListView.as_view(), name='students-list'),
    path('delete/<int:studentid>/', StudentDeleteView.as_view(), name='student-delete'),
    path('me/', StudentMeView.as_view(), name='student-me'),  # GET current student's profile
    # Add more as needed (retrieve, update, etc.)
]
