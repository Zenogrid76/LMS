from datetime import date
from rest_framework import serializers
from .models import Students

class StudentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Students
        fields = [
            'first_name', 'last_name', 'institution', 'gradelevel',
            'dateofbirth', 'contact', 'country', 'profile_photo','profile_completed',
        ]
        read_only_fields = ['studentid', 'createdat', 'updatedat', 'profile_completed']
    def validate_dateofbirth(self, value):
        if value is None:
            return value
        today = date.today()
        if value > today:
            raise serializers.ValidationError("Date of birth cannot be in the future.")
        if value < date(1900, 1, 1):
            raise serializers.ValidationError("Date of birth cannot be before 1900-01-01.")
        age = today.year - value.year - ((today.month, today.day) < (value.month, value.day))
        if age < 14:
            raise serializers.ValidationError("You must be at least 14 years old to register.")
        return value
