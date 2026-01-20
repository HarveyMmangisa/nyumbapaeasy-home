#!/usr/bin/env python
"""
Data population script for Nyumba Paeasy Home
"""
import os
import sys
import django
from decimal import Decimal

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
django.setup()

from users.models import CustomUser
from agents.models import Agent
from properties.models import Property

def create_sample_data():
    print("Creating sample data...")
    
    # Create sample users
    users_data = [
        {
            'username': 'james_mwangi',
            'email': 'james@premierproperties.com',
            'first_name': 'James',
            'last_name': 'Mwangi',
            'user_type': 'agent',
            'phone_number': '+265991234567',
            'is_verified': True,
        },
        {
            'username': 'grace_banda',
            'email': 'grace@malawihomes.com',
            'first_name': 'Grace',
            'last_name': 'Banda',
            'user_type': 'agent',
            'phone_number': '+265998765432',
            'is_verified': True,
        },
        {
            'username': 'peter_chirwa',
            'email': 'peter.chirwa@gmail.com',
            'first_name': 'Peter',
            'last_name': 'Chirwa',
            'user_type': 'agent',
            'phone_number': '+265995555555',
            'is_verified': False,
        }
    ]
    
    created_users = []
    for user_data in users_data:
        user_data['password'] = 'password123'
        user, created = CustomUser.objects.get_or_create(
            username=user_data['username'],
            defaults=user_data
        )
        if created:
            user.set_password(user_data['password'])
            user.save()
            created_users.append(user)
            print(f"Created user: {user.username}")
        else:
            created_users.append(user)
            print(f"User already exists: {user.username}")
    
    # Create agent profiles
    agent_data = [
        {
            'user': created_users[0],
            'company': 'Premier Properties Ltd',
            'license_number': 'AG-001-MLW',
            'commission_rate': Decimal('5.00'),
            'bio': 'Experienced real estate agent specializing in residential properties in Lilongwe.',
            'average_rating': Decimal('4.8'),
            'total_properties_sold': 45,
            'total_properties_rented': 78,
        },
        {
            'user': created_users[1],
            'company': 'Malawi Homes Realty',
            'license_number': 'AG-002-MLW',
            'commission_rate': Decimal('4.50'),
            'bio': 'Professional agent with expertise in luxury properties and commercial real estate.',
            'average_rating': Decimal('4.9'),
            'total_properties_sold': 32,
            'total_properties_rented': 56,
        },
        {
            'user': created_users[2],
            'company': 'Individual Seller',
            'license_number': '',
            'commission_rate': Decimal('3.00'),
            'bio': 'Independent property seller with direct connections to property owners.',
            'average_rating': Decimal('4.5'),
            'total_properties_sold': 12,
            'total_properties_rented': 23,
        }
    ]
    
    created_agents = []
    for data in agent_data:
        agent, created = Agent.objects.get_or_create(
            user=data['user'],
            defaults=data
        )
        if created:
            created_agents.append(agent)
            print(f"Created agent profile for: {agent.user.get_full_name()}")
        else:
            created_agents.append(agent)
            print(f"Agent profile already exists for: {agent.user.get_full_name()}")
    
    # Create sample properties
    properties_data = [
        {
            'title': 'Modern 3BR Apartment in Area 47',
            'price': Decimal('850000.00'),
            'price_type': 'month',
            'location': 'Area 47, Lilongwe',
            'bedrooms': 3,
            'bathrooms': 2,
            'area': 1500,
            'category': 'apartment',
            'agent': created_agents[0],
            'is_featured': True,
            'is_verified': True,
            'rating': Decimal('4.8'),
            'images': [
                'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop'
            ],
            'amenities': ['Air Conditioning', 'Parking', 'Security', 'Gym', 'Swimming Pool'],
            'furnished': True,
            'parking_spaces': 2,
            'pet_friendly': True,
        },
        {
            'title': 'Luxurious Villa with Pool in Nyambadwe',
            'price': Decimal('450000000.00'),
            'price_type': 'sale',
            'location': 'Nyambadwe, Blantyre',
            'bedrooms': 5,
            'bathrooms': 4,
            'area': 4500,
            'category': 'residential',
            'agent': created_agents[1],
            'is_featured': True,
            'is_verified': True,
            'rating': Decimal('4.9'),
            'images': [
                'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop'
            ],
            'amenities': ['Swimming Pool', 'Garden', 'Security', 'Gym', 'Staff Quarters'],
            'furnished': True,
            'parking_spaces': 4,
            'pet_friendly': True,
            'year_built': 2019,
        },
        {
            'title': 'Lakeshore Lodge in Cape Maclear',
            'price': Decimal('150000.00'),
            'price_type': 'month',
            'location': 'Cape Maclear, Mangochi',
            'bedrooms': 2,
            'bathrooms': 1,
            'area': 800,
            'category': 'bnb',
            'agent': created_agents[2],
            'is_verified': False,
            'rating': Decimal('4.7'),
            'images': [
                'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&auto=format&fit=crop'
            ],
            'amenities': ['Lake View', 'Beach Access', 'Restaurant', 'Parking'],
            'furnished': True,
            'parking_spaces': 1,
            'pet_friendly': False,
        },
        {
            'title': 'Prime Office Space in City Centre',
            'price': Decimal('2500000.00'),
            'price_type': 'month',
            'location': 'City Centre, Lilongwe',
            'bedrooms': 0,
            'bathrooms': 2,
            'area': 3000,
            'category': 'corporate',
            'agent': created_agents[0],
            'is_verified': True,
            'rating': Decimal('0.0'),
            'images': [
                'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop'
            ],
            'amenities': ['Elevator', 'Security', 'Parking', 'Meeting Rooms', 'Reception'],
            'furnished': False,
            'parking_spaces': 10,
            'pet_friendly': False,
        },
        {
            'title': 'Cozy Studio Apartment in Namiwawa',
            'price': Decimal('350000.00'),
            'price_type': 'month',
            'location': 'Namiwawa, Blantyre',
            'bedrooms': 1,
            'bathrooms': 1,
            'area': 450,
            'category': 'apartment',
            'agent': created_agents[2],
            'is_verified': False,
            'rating': Decimal('4.5'),
            'images': [
                'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop'
            ],
            'amenities': ['Kitchen', 'Bathroom', 'Parking'],
            'furnished': True,
            'parking_spaces': 1,
            'pet_friendly': False,
        },
        {
            'title': 'Family Home in Area 43',
            'price': Decimal('350000000.00'),
            'price_type': 'sale',
            'location': 'Area 43, Lilongwe',
            'bedrooms': 4,
            'bathrooms': 3,
            'area': 3200,
            'category': 'residential',
            'agent': created_agents[1],
            'is_featured': True,
            'is_verified': True,
            'rating': Decimal('4.8'),
            'images': [
                'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop'
            ],
            'amenities': ['Garden', 'Security', 'Parking', 'Gym', 'Staff Quarters'],
            'furnished': True,
            'parking_spaces': 3,
            'pet_friendly': True,
            'year_built': 2017,
        },
        {
            'title': 'Safari Lodge near Liwonde',
            'price': Decimal('250000.00'),
            'price_type': 'month',
            'location': 'Liwonde National Park',
            'bedrooms': 3,
            'bathrooms': 2,
            'area': 1200,
            'category': 'bnb',
            'agent': created_agents[0],
            'is_featured': True,
            'is_verified': True,
            'rating': Decimal('4.9'),
            'images': [
                'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&auto=format&fit=crop'
            ],
            'amenities': ['Safari Tours', 'Restaurant', 'Swimming Pool', 'Parking'],
            'furnished': True,
            'parking_spaces': 2,
            'pet_friendly': True,
        },
        {
            'title': 'Modern Penthouse in Sunnyside',
            'price': Decimal('1800000.00'),
            'price_type': 'month',
            'location': 'Sunnyside, Blantyre',
            'bedrooms': 4,
            'bathrooms': 3,
            'area': 2800,
            'category': 'apartment',
            'agent': created_agents[1],
            'is_verified': True,
            'rating': Decimal('4.8'),
            'images': [
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop'
            ],
            'amenities': ['Rooftop Terrace', 'City View', 'Security', 'Gym', 'Underground Parking'],
            'furnished': True,
            'parking_spaces': 2,
            'pet_friendly': True,
            'year_built': 2021,
        }
    ]
    
    for prop_data in properties_data:
        prop, created = Property.objects.get_or_create(
            title=prop_data['title'],
            defaults=prop_data
        )
        if created:
            print(f"Created property: {prop.title}")
        else:
            print(f"Property already exists: {prop.title}")
    
    print("\nSample data creation completed!")
    print(f"Created {CustomUser.objects.count()} users")
    print(f"Created {Agent.objects.count()} agents")
    print(f"Created {Property.objects.count()} properties")

if __name__ == '__main__':
    create_sample_data()