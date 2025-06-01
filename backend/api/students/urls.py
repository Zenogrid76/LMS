from django.urls import path
from .views import StudentRegisterView, StudentsListView

urlpatterns = [
    path('students/register/', StudentRegisterView.as_view(), name='student-register'),
    path('students/', StudentsListView.as_view(), name='students-list'),
    # Add more as needed (retrieve, update, etc.)
]
