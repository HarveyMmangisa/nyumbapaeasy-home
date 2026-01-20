from rest_framework import serializers
from .models import Agent
from users.serializers import CustomUserSerializer

class AgentSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer(read_only=True)
    full_name = serializers.SerializerMethodField()
    
    class Meta:
        model = Agent
        fields = '__all__'
    
    def get_full_name(self, obj):
        return obj.user.get_full_name() or obj.user.username