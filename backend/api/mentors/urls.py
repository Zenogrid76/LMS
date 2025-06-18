from django.urls import path
from .views import Step1View, FinalizeSignupView

urlpatterns = [
    path('signup/step1/', Step1View.as_view(), name='mentor_signup_step1'),
    path('signup/finalize/', FinalizeSignupView.as_view(), name='mentor_signup_finalize'),
]
