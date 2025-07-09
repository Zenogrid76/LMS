from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import *
router = DefaultRouter()
router.register(r'profiles', MentorProfileViewSet, basename='mentorprofile')
router.register(r'educations', EducationViewSet, basename='education')
router.register(r'job-experiences', JobExperienceViewSet, basename='jobexperience')
router.register(r'skills', SkillViewSet, basename='skill')
router.register(r'expertises', ExpertiseViewSet, basename='expertise')
router.register(r'availabilities', AvailabilityViewSet, basename='availability')
router.register(r'preferences', MentorPreferenceViewSet, basename='mentorpreference')


urlpatterns = router.urls + [
    path('application/step1/', MentorApplicationStep1View.as_view(), name='mentor-application-step1'),
    path('application/step2/', MentorApplicationStep2View.as_view(), name='mentor-application-step2'),
    path('application/step3/', MentorApplicationStep3View.as_view(), name='mentor-application-step3'),
    path('profile/', MentorProfileView.as_view(), name='mentor-profile'),
    
]
