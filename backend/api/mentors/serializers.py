from rest_framework import serializers
from .models import MentorSignupSession

class Step1Serializer(serializers.Serializer):
    name = serializers.CharField(max_length=255)
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    phone = serializers.CharField(max_length=20, required=False)
    timezone = serializers.CharField(max_length=50)
    bio = serializers.CharField(required=False)
    photo = serializers.ImageField(required=False)

class Step2Serializer(serializers.Serializer):
    expertise = serializers.JSONField()
    availability = serializers.JSONField()
    teaching_methods = serializers.ListField(child=serializers.CharField())
    batch_sizes = serializers.ListField(child=serializers.IntegerField())

class Step3Serializer(serializers.Serializer):
    platform_settings = serializers.JSONField()
    demo_lesson_url = serializers.URLField(required=False)

class MentorSignupSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = MentorSignupSession
        fields = '__all__'
