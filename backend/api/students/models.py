from django.db import models
from api.users.models import User  # import your custom User
from django.utils import timezone

class Students(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True, related_name='student_profile')
    first_name = models.CharField(max_length=50, blank=True, null=True)
    last_name = models.CharField(max_length=50, blank=True, null=True)
    institution = models.CharField(max_length=100, blank=True, null=True)
    gradelevel = models.CharField(max_length=50, blank=True, null=True)
    dateofbirth = models.DateField(blank=True, null=True)
    contact = models.CharField(max_length=20, blank=True, null=True)
    country = models.CharField(max_length=100, blank=True, null=True)
    profile_photo = models.ImageField(upload_to='student_photos/', blank=True, null=True)
    createdat = models.DateTimeField(auto_now_add=True , null=True, blank=True)
    updatedat = models.DateTimeField(auto_now=True , null=True, blank=True)
    profile_completed = models.BooleanField(default=False)

    def __str__(self):
        return self.user.email
