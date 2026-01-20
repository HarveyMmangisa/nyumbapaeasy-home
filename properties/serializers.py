from rest_framework import serializers
from .models import Property, PropertyInquiry
from agents.serializers import AgentSerializer

class PropertySerializer(serializers.ModelSerializer):
    agent = AgentSerializer(read_only=True)
    main_image = serializers.SerializerMethodField()
    price_display = serializers.SerializerMethodField()
    
    class Meta:
        model = Property
        fields = '__all__'
    
    def get_main_image(self, obj):
        if obj.images and len(obj.images) > 0:
            return obj.images[0]
        return None
    
    def get_price_display(self, obj):
        if obj.price_type == 'sale':
            return f"MWK {int(obj.price):,}"
        else:
            return f"MWK {int(obj.price):,}/{obj.price_type}"

class PropertyInquirySerializer(serializers.ModelSerializer):
    property_title = serializers.CharField(source='property.title', read_only=True)
    
    class Meta:
        model = PropertyInquiry
        fields = '__all__'
        read_only_fields = ['status', 'created_at', 'updated_at']