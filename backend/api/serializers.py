from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework import serializers

class UserSerialier(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = User
        fields = ["id", "email", "first_name", "last_name", "password"]
        extra_kwargs = {"password": {"write_only": True}}
    
    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value


    def create(self, validated_data):
        validated_data["username"] = validated_data["email"]
        password = validated_data.pop("password")
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        print(f"User created: {user.email}, active: {user.is_active}")
        return user

    
