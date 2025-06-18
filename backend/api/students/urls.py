from django.urls import path
from .views import StudentRegisterView, StudentsListView , StudentDeleteView

urlpatterns = [
    path('register/', StudentRegisterView.as_view(), name='student-register'),
    path('studentlist/', StudentsListView.as_view(), name='students-list'),
    path('delete/<int:studentid>/', StudentDeleteView.as_view(), name='student-delete'),
    # Add more as needed (retrieve, update, etc.)
]
