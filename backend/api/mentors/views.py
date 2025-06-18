from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from django.utils import timezone
from django.db import transaction
from django.contrib.auth.hashers import make_password
from .models import User, MentorProfile, MentorSignupSession
from .serializers import Step1Serializer, Step2Serializer, Step3Serializer
import uuid
from datetime import timedelta

class MentorSignupSessionDetail(APIView):
    def get(self, request, session_id):
        try:
            session = MentorSignupSession.objects.get(session_id=session_id)
            return Response({'step1_data': session.step1_data})
        except MentorSignupSession.DoesNotExist:
            return Response({'error': 'Session not found'}, status=404)

class MentorSignupSessionMixin:
    def get_session(self, session_id):
        try:
            session = MentorSignupSession.objects.get(session_id=session_id)
            if session.expires_at < timezone.now():
                session.delete()
                return None
            return session
        except MentorSignupSession.DoesNotExist:
            return None

class Step1View(APIView, MentorSignupSessionMixin):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        session_id = request.data.get('session_id', uuid.uuid4())
        session = MentorSignupSession.objects.update_or_create(
            session_id=session_id,
            defaults={'expires_at': timezone.now() + timedelta(hours=24)}
        )[0]

        serializer = Step1Serializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        data = serializer.validated_data
        session.step1_data = {
            **data,
            'password_hash': make_password(data['password'])
        }
        session.save()
        
        return Response({'session_id': session_id}, status=status.HTTP_200_OK)

class FinalizeSignupView(APIView, MentorSignupSessionMixin):
    @transaction.atomic
    def post(self, request):
        session = self.get_session(request.data.get('session_id'))
        if not session:
            return Response({'error': 'Invalid session'}, status=status.HTTP_404_NOT_FOUND)

        user = User.objects.create(
            email=session.step1_data['email'],
            password_hash=session.step1_data['password_hash'],
            full_name=session.step1_data['name'],
            role='mentor'
        )

        MentorProfile.objects.create(
            user=user,
            **session.step1_data,
            **session.step2_data,
            **session.step3_data
        )

        session.delete()
        return Response({'user_id': user.id}, status=status.HTTP_201_CREATED)
