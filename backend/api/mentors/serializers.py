from rest_framework import serializers
from api.mentors.models import MentorProfile, Education , Expertise, Skill, JobExperience , Availability , MentorPreference

class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = ['id', 'degree', 'institution', 'from_year', 'to_year']

class MentorProfileSerializer(serializers.ModelSerializer):
    educations = EducationSerializer(many=True, required=False)

    class Meta:
        model = MentorProfile
        fields = [
            'id', 'first_name', 'last_name', 'profile_picture',
            'phone_number', 'bio', 'total_earned', 'years_experience',
            'rating', 'total_sessions', 'is_verified', 'educations',
            'onboarding_step', 'is_onboarding_complete'
        ]

    def create(self, validated_data):
        educations_data = validated_data.pop('educations', [])
        mentor_profile = MentorProfile.objects.create(**validated_data)
        for edu_data in educations_data:
            Education.objects.create(mentor=mentor_profile, **edu_data)
        return mentor_profile

    def update(self, instance, validated_data):
        educations_data = validated_data.pop('educations', [])
        # Update profile fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        # Handle educations (full replace)
        existing_ids = [edu.get('id') for edu in educations_data if 'id' in edu]
        # Delete educations not in the incoming list
        instance.educations.exclude(id__in=existing_ids).delete()
        # Update or create educations
        for edu_data in educations_data:
            edu_id = edu_data.get('id', None)
            if edu_id:
                edu = Education.objects.get(id=edu_id, mentor=instance)
                for attr, value in edu_data.items():
                    setattr(edu, attr, value)
                edu.save()
            else:
                Education.objects.create(mentor=instance, **edu_data)
        return instance
    
class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = ['id', 'degree', 'institution', 'from_year', 'to_year']
    
class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'name']

class ExpertiseSerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True)

    class Meta:
        model = Expertise
        fields = ['id', 'expert_at', 'teaching_philosophy', 'teaching_method', 'skills']

    def create(self, validated_data):
        skills_data = validated_data.pop('skills', [])
        expertise = Expertise.objects.create(**validated_data)
        for skill_data in skills_data:
            Skill.objects.create(expertise=expertise, **skill_data)
        return expertise

    def update(self, instance, validated_data):
        skills_data = validated_data.pop('skills', [])
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        # Update skills
        existing_ids = [s.get('id') for s in skills_data if 'id' in s]
        instance.skills.exclude(id__in=existing_ids).delete()
        for skill_data in skills_data:
            skill_id = skill_data.get('id')
            if skill_id:
                skill = Skill.objects.get(id=skill_id, expertise=instance)
                for attr, value in skill_data.items():
                    setattr(skill, attr, value)
                skill.save()
            else:
                Skill.objects.create(expertise=instance, **skill_data)
        return instance

class JobExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobExperience
        fields = ['id', 'position', 'company', 'responsibility']

class AvailabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Availability
        fields = ['id', 'day', 'from_time', 'to_time']

class MentorPreferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = MentorPreference
        fields = [
            'target_students',
            'preferred_language',
            'ok_with_disabilities',
            'ok_with_diversity',
            # Add other preference fields as needed
        ]

class MentorProfileStep1Serializer(serializers.ModelSerializer):
    class Meta:
        model = MentorProfile
        fields = [
            'first_name',
            'last_name',
            'profile_picture',
            'phone_number',
            'bio',
            'onboarding_step',
            'is_onboarding_complete'
        ]

    def update(self, instance, validated_data):
        # Update only profile fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        # Optionally update onboarding progress
        instance.onboarding_step = 2
        instance.is_onboarding_complete = False
        instance.save()
        return instance

    # Only update or create educations; do not delete any
        for edu_data in educations_data:
            edu_id = edu_data.get('id')
            if edu_id:
                edu = Education.objects.get(id=edu_id, mentor=instance)
                for attr, value in edu_data.items():
                    setattr(edu, attr, value)
                edu.save()
            else:
                Education.objects.create(mentor=instance, **edu_data)

        # (Optional) Update onboarding progress
        instance.onboarding_step = 2
        instance.is_onboarding_complete = False
        instance.save()
        return instance


      

    
class MentorProfileStep2Serializer(serializers.ModelSerializer):

    expertises = ExpertiseSerializer(many=True)
    job_experiences = JobExperienceSerializer(many=True, required=False)

    class Meta:
        model = MentorProfile
        fields = ['expertises', 'job_experiences' ,'onboarding_step', 'is_onboarding_complete']

    def update(self, instance, validated_data):
        expertises_data = validated_data.pop('expertises', [])
        job_experiences_data = validated_data.pop('job_experiences', [])

        # Handle expertises
        existing_exp_ids = [e.get('id') for e in expertises_data if 'id' in e]
        instance.expertises.exclude(id__in=existing_exp_ids).delete()
        for exp_data in expertises_data:
            exp_id = exp_data.get('id')
            skills_data = exp_data.pop('skills', [])
            if exp_id:
                exp = Expertise.objects.get(id=exp_id, mentor=instance)
                for attr, value in exp_data.items():
                    setattr(exp, attr, value)
                exp.save()
                # Update skills for this expertise
                existing_skill_ids = [s.get('id') for s in skills_data if 'id' in s]
                exp.skills.exclude(id__in=existing_skill_ids).delete()
                for skill_data in skills_data:
                    skill_id = skill_data.get('id')
                    if skill_id:
                        skill = Skill.objects.get(id=skill_id, expertise=exp)
                        for attr, value in skill_data.items():
                            setattr(skill, attr, value)
                        skill.save()
                    else:
                        Skill.objects.create(expertise=exp, **skill_data)
            else:
                exp = Expertise.objects.create(mentor=instance, **exp_data)
                for skill_data in skills_data:
                    Skill.objects.create(expertise=exp, **skill_data)

        # Handle job experiences
        existing_job_ids = [j.get('id') for j in job_experiences_data if 'id' in j]
        instance.job_experiences.exclude(id__in=existing_job_ids).delete()
        for job_data in job_experiences_data:
            job_id = job_data.get('id')
            if job_id:
                job = JobExperience.objects.get(id=job_id, mentor=instance)
                for attr, value in job_data.items():
                    setattr(job, attr, value)
                job.save()
            else:
                JobExperience.objects.create(mentor=instance, **job_data)
          # Update onboarding progress
        instance.onboarding_step = 3  # Now on step 3
        instance.is_onboarding_complete = False
        instance.save()

        return instance
    
class MentorProfileStep3Serializer(serializers.ModelSerializer):
    availabilities = AvailabilitySerializer(many=True)
    preference = MentorPreferenceSerializer()

    class Meta:
        model = MentorProfile
        fields = ['availabilities', 'preference','onboarding_step', 'is_onboarding_complete']

    def update(self, instance, validated_data):
        availabilities_data = validated_data.pop('availabilities', [])
        preference_data = validated_data.pop('preference', None)

        # Update or replace availabilities
        existing_ids = [a.get('id') for a in availabilities_data if 'id' in a]
        instance.availabilities.exclude(id__in=existing_ids).delete()
        for avail_data in availabilities_data:
            avail_id = avail_data.get('id')
            if avail_id:
                avail = instance.availabilities.get(id=avail_id)
                for attr, value in avail_data.items():
                    setattr(avail, attr, value)
                avail.save()
            else:
                Availability.objects.create(mentor=instance, **avail_data)

        # Update preference
        if preference_data:
            pref, _ = MentorPreference.objects.get_or_create(mentor=instance)
            for attr, value in preference_data.items():
                setattr(pref, attr, value)
            pref.save()
        # Update onboarding progress
        instance.onboarding_step = 4
        instance.is_onboarding_complete = True
        instance.save()
        return instance