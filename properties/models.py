from django.db import models
from agents.models import Agent

class Property(models.Model):
    CATEGORY_CHOICES = [
        ('apartment', 'Apartment'),
        ('residential', 'Residential'),
        ('commercial', 'Commercial'),
        ('corporate', 'Corporate'),
        ('bnb', 'Bed & Breakfast'),
        ('land', 'Land'),
    ]
    
    PRICE_TYPE_CHOICES = [
        ('month', 'Per Month'),
        ('week', 'Per Week'),
        ('day', 'Per Day'),
        ('sale', 'For Sale'),
    ]
    
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=12, decimal_places=2)
    price_type = models.CharField(max_length=10, choices=PRICE_TYPE_CHOICES)
    location = models.CharField(max_length=200)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    bedrooms = models.IntegerField(default=0)
    bathrooms = models.IntegerField(default=0)
    area = models.IntegerField(help_text="Area in square feet")
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    agent = models.ForeignKey(Agent, on_delete=models.SET_NULL, null=True, blank=True)
    is_featured = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)
    is_available = models.BooleanField(default=True)
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=0.00)
    total_reviews = models.IntegerField(default=0)
    amenities = models.JSONField(default=list, blank=True)
    images = models.JSONField(default=list, blank=True)
    video_url = models.URLField(blank=True)
    virtual_tour_url = models.URLField(blank=True)
    year_built = models.IntegerField(null=True, blank=True)
    parking_spaces = models.IntegerField(default=0)
    furnished = models.BooleanField(default=False)
    pet_friendly = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.title} - {self.location}"

class PropertyView(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='views')
    ip_address = models.GenericIPAddressField()
    user_agent = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['property', 'ip_address']

class PropertyInquiry(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('responded', 'Responded'),
        ('closed', 'Closed'),
    ]
    
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='inquiries')
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    message = models.TextField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Inquiry for {self.property.title} by {self.name}"
