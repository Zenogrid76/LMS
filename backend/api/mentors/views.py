from rest_framework import viewsets, permissions,generics
from api.mentors.models import *
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import MentorProfileSerializer
import json
from rest_framework.parsers import MultiPartParser, FormParser




class MentorProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Adjust attribute based on related_name
        try:
            profile = getattr(request.user, 'mentor_profile', None)
            if not profile:
                return Response({"detail": "No mentor profile found."}, status=404)
            serializer = MentorProfileSerializer(profile)
            return Response(serializer.data)
        except Exception as e:
            return Response({"detail": str(e)}, status=500)
        

class MentorProfileViewSet(viewsets.ModelViewSet):
    queryset = MentorProfile.objects.all()
    serializer_class = MentorProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Restrict to the current user's mentor profile (customize as needed)
        user = self.request.user
        return MentorProfile.objects.filter(user=user)
    

class EducationViewSet(viewsets.ModelViewSet):
    serializer_class = EducationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Restrict to the current user's mentor profile's educations
        user = self.request.user
        mentor_profile = MentorProfile.objects.filter(user=user).first()
        if mentor_profile:
            return Education.objects.filter(mentor=mentor_profile)
        return Education.objects.none()

    def perform_create(self, serializer):
        mentor_profile = MentorProfile.objects.get(user=self.request.user)
        serializer.save(mentor=mentor_profile)

    def perform_update(self, serializer):
        mentor_profile = MentorProfile.objects.get(user=self.request.user)
        serializer.save(mentor=mentor_profile)

    def perform_destroy(self, instance):
        mentor_profile = MentorProfile.objects.get(user=self.request.user)
        instance.delete()
    
        
class JobExperienceViewSet(viewsets.ModelViewSet):
    serializer_class = JobExperienceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        mentor_profile = MentorProfile.objects.filter(user=user).first()
        return JobExperience.objects.filter(mentor=mentor_profile) if mentor_profile else JobExperience.objects.none()

    def perform_create(self, serializer):
        mentor_profile = MentorProfile.objects.get(user=self.request.user)
        serializer.save(mentor=mentor_profile)

class SkillViewSet(viewsets.ModelViewSet):
    serializer_class = SkillSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Optionally restrict to skills for the user's expertises
        return Skill.objects.filter(expertise__mentor__user=self.request.user)

class ExpertiseViewSet(viewsets.ModelViewSet):
    serializer_class = ExpertiseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        mentor_profile = MentorProfile.objects.filter(user=self.request.user).first()
        return Expertise.objects.filter(mentor=mentor_profile) if mentor_profile else Expertise.objects.none()

    def perform_create(self, serializer):
        mentor_profile = MentorProfile.objects.get(user=self.request.user)
        serializer.save(mentor=mentor_profile)

class AvailabilityViewSet(viewsets.ModelViewSet):
    serializer_class = AvailabilitySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        mentor_profile = MentorProfile.objects.filter(user=self.request.user).first()
        return Availability.objects.filter(mentor=mentor_profile) if mentor_profile else Availability.objects.none()

    def perform_create(self, serializer):
        mentor_profile = MentorProfile.objects.get(user=self.request.user)
        serializer.save(mentor=mentor_profile)

class MentorPreferenceViewSet(viewsets.ModelViewSet):
    serializer_class = MentorPreferenceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        mentor_profile = MentorProfile.objects.filter(user=self.request.user).first()
        return MentorPreference.objects.filter(mentor=mentor_profile) if mentor_profile else MentorPreference.objects.none()

    def perform_create(self, serializer):
        mentor_profile = MentorProfile.objects.get(user=self.request.user)
        serializer.save(mentor=mentor_profile)



class MentorApplicationStep1View(generics.RetrieveUpdateAPIView):
    serializer_class = MentorProfileStep1Serializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]  # For file uploads

    def get_object(self):
        profile, _ = MentorProfile.objects.get_or_create(user=self.request.user)
        return profile

    

class MentorApplicationStep2View(generics.RetrieveUpdateAPIView):
    serializer_class = MentorProfileStep2Serializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        profile, _ = MentorProfile.objects.get_or_create(user=self.request.user)
        return profile
    
class MentorApplicationStep3View(generics.RetrieveUpdateAPIView):
    serializer_class = MentorProfileStep3Serializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        profile, _ = MentorProfile.objects.get_or_create(user=self.request.user)
        return profile    