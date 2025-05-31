from rest_framework import serializers
from .models import Students

class StudentsSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        validators=[],  # Remove default UniqueValidator
    )
    
    class Meta:
        
        model = Students
        fields = [
            'studentid',
            'fullname',
            'email',
            'password',  
            'institution',
            'gradelevel',
            'dateofbirth',
            'createdat',
        ]
        # extra_kwargs = {'password': {'write_only': True}}  # Optional security
    
    # Validate email - moved OUTSIDE the Meta class
    def validate_email(self, value):
        if Students.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already exists. Please sign in.\n")
        return value
    
    # Validate password - moved OUTSIDE the Meta class
    """def validate_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError("Password must be at least 8 characters long.")
        if not any(char.isdigit() for char in value):
            raise serializers.ValidationError("Password must contain at least one digit.")
        if not any(char.isalpha() for char in value):
            raise serializers.ValidationError("Password must contain at least one letter.")
        if not any(char in "!@#$%^&*()-_=+[]{}|;:,.<>?/" for char in value):
            raise serializers.ValidationError("Password must contain at least one special character.")
        return value 
        """  # Optional security, uncomment if needed
    #validate_age
    def validate_dateofbirth(self, value):
        from datetime import date
        today = date.today()
        if value > today:
            raise serializers.ValidationError("Date of birth cannot be in the future.")       
        if value< date(1900, 1, 1):
            raise serializers.ValidationError("Date of birth cannot be before January 1, 1900.")
        if value > today.replace(year=today.year - 14):
            raise serializers.ValidationError("You must be at least 14 years old to register.")
        return value
        
    