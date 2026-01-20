from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Agent
from .serializers import AgentSerializer

class AgentViewSet(viewsets.ModelViewSet):
    queryset = Agent.objects.filter(is_active=True)
    serializer_class = AgentSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['company', 'is_active']
    search_fields = ['user__first_name', 'user__last_name', 'user__username', 'company']
    ordering_fields = ['average_rating', 'total_properties_sold', 'created_at']
    ordering = ['-average_rating']
