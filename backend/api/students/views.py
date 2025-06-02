from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Students
from .serializers import StudentsSerializer

class StudentRegisterView(APIView):
    def post(self, request):
        serializer = StudentsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class StudentsListView(APIView):
    def get(self, request):
        students = Students.objects.all()
        serializer = StudentsSerializer(students, many=True)
        return Response(serializer.data)
    
class StudentDeleteView(APIView):
    def delete(self, request, studentid):
        try:
            student = Students.objects.get(studentid=studentid)
            student.delete()
            return Response({"detail": "Student deleted."}, status=status.HTTP_204_NO_CONTENT)
        except Students.DoesNotExist:
            return Response({"detail": "Student not found."}, status=status.HTTP_404_NOT_FOUND)