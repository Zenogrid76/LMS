from django.db import models
from api.users.models import User  # Adjust import if your User model is elsewhere

# MentorProfile model to store mentor's profile information
class MentorProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='mentor_profile')
    first_name = models.CharField(max_length=10)
    last_name = models.CharField(max_length=10)
    profile_picture = models.ImageField(upload_to='mentor_profiles/', blank=True, null=True)
    phone_number = models.CharField(max_length=20)
    bio = models.TextField()
    total_earned = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    years_experience = models.PositiveIntegerField(default=0)
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=0.00)
    total_sessions = models.PositiveIntegerField(default=0)
    is_verified = models.BooleanField(default=False)
    onboarding_step = models.IntegerField(default=1)  # Tracks current step (1, 2, 3, etc.)
    is_onboarding_complete = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

#Education model to store mentor's educational background
class Education(models.Model):
    mentor = models.ForeignKey(MentorProfile, on_delete=models.CASCADE, related_name='educations')
    degree = models.CharField(max_length=100)
    institution = models.CharField(max_length=100)
    from_year = models.PositiveIntegerField()
    to_year = models.PositiveIntegerField()

    def __str__(self):
        return f"{self.degree} at {self.institution}"

# Define choices for teaching methods
TEACHING_METHODS = [
    ('one_on_one', '1:1'),
    ('group', 'Group'),
]

class Expertise(models.Model):
    mentor = models.ForeignKey(MentorProfile, on_delete=models.CASCADE, related_name='expertises')
    expert_at = models.CharField(max_length=100)
    teaching_philosophy = models.TextField()
    teaching_method = models.CharField(max_length=20, choices=TEACHING_METHODS)

    def __str__(self):
        return f"{self.expert_at} ({self.get_teaching_method_display()})"

# Skills model to store skills related to expertise
class Skill(models.Model):
    expertise = models.ForeignKey(Expertise, on_delete=models.CASCADE, related_name='skills')
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name
    
# JobExperience model to store mentor's job experiences
class JobExperience(models.Model):
    mentor = models.ForeignKey(MentorProfile, on_delete=models.CASCADE, related_name='job_experiences')
    position = models.CharField(max_length=100)
    company = models.CharField(max_length=100)
    responsibility = models.TextField(blank=True)

    def __str__(self):
        return f"{self.position} at {self.company}"


# Availability model to store mentor's availability for sessions
DAYS_OF_WEEK = [
    (0, 'Sunday'),
    (1, 'Monday'),
    (2, 'Tuesday'),
    (3, 'Wednesday'),
    (4, 'Thursday'),
    (5, 'Friday'),
    (6, 'Saturday'),
]

class Availability(models.Model):
    mentor = models.ForeignKey(MentorProfile, on_delete=models.CASCADE, related_name='availabilities')
    day = models.IntegerField(choices=DAYS_OF_WEEK)
    from_time = models.TimeField()
    to_time = models.TimeField()

    def __str__(self):
        return f"{self.get_day_display()}: {self.from_time} - {self.to_time}"

# MentorPreference model to store mentor's preferences for students
TARGET_STUDENT_CHOICES = [
    
    ('high_school', 'High School'),
    ('college', 'College'),
    ('undergraduate', 'Undergraduate'),
    ('graduate', 'Graduate'),
    ('professional', 'Professional'),
    ('other', 'Other'),
]

LANGUAGE_CHOICES = [
    ('english', 'English'),
    ('spanish', 'Spanish'),
    ('french', 'French'),
    ('bangla', 'Bangla'),
    ('hindi', 'Hindi'),
    ('arabic', 'Arabic'),
    ('chinese', 'Chinese'),
    ('german', 'German'),
    ('japanese', 'Japanese'),
    ('portuguese', 'Portuguese'),
    ('russian', 'Russian'),
    ('other', 'Other'),  
    # Add more as needed

]

# Communication and payment preferences

class MentorPreference(models.Model):
    mentor = models.OneToOneField(MentorProfile, on_delete=models.CASCADE, related_name='preference')
    target_students = models.CharField(max_length=20, choices=TARGET_STUDENT_CHOICES)
    preferred_language = models.CharField(max_length=20, choices=LANGUAGE_CHOICES)
    ok_with_disabilities = models.BooleanField(default=False)
    ok_with_diversity = models.BooleanField(default=False)

    # Communication preferences
    COMMUNICATION_CHOICES = [
        ('email', 'Email'),
        ('sms', 'SMS'),
        ('in_app', 'In-App Notifications'),
    ]
    communication_methods = models.CharField(
        max_length=100,
        choices=COMMUNICATION_CHOICES,
        default='email'
    )

    # Payment preferences
    PAYMENT_METHOD_CHOICES = [
        ('bank_transfer', 'Bank Transfer'),
        ('paypal', 'PayPal'),
        ('stripe', 'Stripe'),
        ('other', 'Other'),
    ]
    payment_method = models.CharField(
        max_length=30,
        choices=PAYMENT_METHOD_CHOICES,
        default='bank_transfer'
    )
    payout_frequency = models.CharField(
        max_length=20,
        choices=[('weekly', 'Weekly'), ('monthly', 'Monthly'), ('on_demand', 'On Demand')],
        default='monthly'
    )

    def __str__(self):
        return f"Preferences for {self.mentor.user.email}"
