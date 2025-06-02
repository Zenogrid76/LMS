from django.urls import path
from .views import StudentRegisterView, StudentsListView , StudentDeleteView

urlpatterns = [
    path('students/register/', StudentRegisterView.as_view(), name='student-register'),
    path('students/studentlist/', StudentsListView.as_view(), name='students-list'),
    path('students/delete/<int:studentid>/', StudentDeleteView.as_view(), name='student-delete'),
    # Add more as needed (retrieve, update, etc.)
]
