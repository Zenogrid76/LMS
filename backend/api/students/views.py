from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.permissions import IsAuthenticated
from .serializers import StudentsSerializer
from api.students.models import Students


class StudentRegisterView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        # Prevent duplicate profiles
        if hasattr(request.user, 'student_profile'):
            return Response({"detail": "Student profile already exists."}, status=status.HTTP_400_BAD_REQUEST)
        serializer = StudentsSerializer(data=request.data)
        if serializer.is_valid():
            student = serializer.save(user=request.user)
            # Set profile_completed = True after saving all required fields
            student.profile_completed = True
            student.save()
            return Response(StudentsSerializer(student).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class StudentsListView(APIView):
    """
    List all student profiles (admin only).
    """
    permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        students = Students.objects.all()
        serializer = StudentsSerializer(students, many=True)
        return Response(serializer.data)

class StudentDeleteView(APIView):
    """
    Delete a student profile. Only the owner or admin can delete.
    """
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, studentid):
        try:
            student = Students.objects.get(studentid=studentid)
            # Only allow owner or admin to delete
            if request.user != student.user and not request.user.is_staff:
                return Response({"detail": "Not authorized."}, status=status.HTTP_403_FORBIDDEN)
            student.delete()
            return Response({"detail": "Student deleted."}, status=status.HTTP_204_NO_CONTENT)
        except Students.DoesNotExist:
            return Response({"detail": "Student not found."}, status=status.HTTP_404_NOT_FOUND)

class StudentMeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            student = request.user.student_profile
            serializer = StudentsSerializer(student)
            return Response(serializer.data)
        except Students.DoesNotExist:
            return Response({"detail": "No student profile found."}, status=404)