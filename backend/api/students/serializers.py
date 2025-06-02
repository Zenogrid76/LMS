from datetime import date
from rest_framework import serializers
from .models import Students

class StudentsSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(validators=[])  # Remove default unique validator

    class Meta:
        model = Students
        fields = [
            'studentid',
            'fullname',
            'email',
            'password',
            'institution',
            'gradelevel',
            'dateofbirth'
        ]
        extra_kwargs = {
            'password': {'write_only': True},  # Always hide password in responses
            'createdat': {'read_only': True}   # Auto-generated field
        }

    def validate_email(self, value):
        """Ensure email is unique"""
        if Students.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already exists. Please sign in.")
        return value

    def validate_dateofbirth(self, value):
        if value is None:
                return value  # Skip validation if not provided
    
        today = date.today()
    
        today = date.today()
        
        # 1. Check future dates
        if value > today:
            raise serializers.ValidationError("Date of birth cannot be in the future.")
        
        # 2. Check historical boundary
        if value < date(1900, 1, 1):
            raise serializers.ValidationError("Date of birth cannot be before 1900-01-01.")
        
        # 3. Calculate exact age
        age = today.year - value.year - ((today.month, today.day) < (value.month, value.day))
        if age < 14:
            raise serializers.ValidationError("You must be at least 14 years old to register.")
        
        return value
