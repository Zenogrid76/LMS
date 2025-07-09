from rest_framework import viewsets, permissions,generics
from api.mentors.models import MentorProfile, Education
from .serializers import MentorProfileSerializer, EducationSerializer , MentorProfileStep2Serializer, MentorProfileStep1Serializer , MentorProfileStep3Serializer

# api/mentors/views.py
# This file contains the viewsets for mentor profiles and education management.
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
        


class MentorApplicationStep1View(generics.RetrieveUpdateAPIView):
    serializer_class = MentorProfileStep1Serializer
    permission_classes = [permissions.IsAuthenticated]

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