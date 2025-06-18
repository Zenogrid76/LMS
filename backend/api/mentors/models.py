from django.db import models
import uuid
import os

def mentor_photo_upload_path(instance, filename):
    ext = filename.split('.')[-1]
    unique_filename = f"{uuid.uuid4()}.{ext}"
    return os.path.join('mentor_photos', str(instance.user.id), unique_filename)

class User(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    password_hash = models.TextField()
    full_name = models.CharField(max_length=255)
    role = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)

class MentorProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(blank=True, null=True)
    expertise = models.JSONField(blank=True, null=True)
    availability = models.JSONField(blank=True, null=True)
    platform_settings = models.JSONField(blank=True, null=True)
    verification_data = models.JSONField(blank=True, null=True)
    photo = models.ImageField(upload_to=mentor_photo_upload_path, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class MentorSignupSession(models.Model):
    class Meta:
        db_table = "mentor_signup_sessions"
    session_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    step1_data = models.JSONField(blank=True, null=True)
    step2_data = models.JSONField(blank=True, null=True)
    step3_data = models.JSONField(blank=True, null=True)
    expires_at = models.DateTimeField()
