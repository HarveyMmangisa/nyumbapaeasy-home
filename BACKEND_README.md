# Nyumba Paeasy Home - Django Backend

A Django REST API backend for the Nyumba Paeasy Home real estate property listing platform.

## Features

- **Property Management**: CRUD operations for property listings with categories, pricing, and location data
- **User Authentication**: Custom user model with role-based access (client, agent, admin)
- **Agent Profiles**: Professional agent profiles with ratings and company information
- **Property Inquiries**: Contact and inquiry management system
- **Search & Filtering**: Advanced search and filtering capabilities
- **View Tracking**: Property view analytics
- **CORS Support**: Configured for frontend integration

## API Endpoints

### Properties
- `GET /api/properties/` - List all properties with filtering
- `POST /api/properties/` - Create new property
- `GET /api/properties/{id}/` - Get property details
- `PUT /api/properties/{id}/` - Update property
- `DELETE /api/properties/{id}/` - Delete property
- `POST /api/properties/{id}/track_view/` - Track property view
- `POST /api/properties/{id}/inquire/` - Submit property inquiry

### Agents
- `GET /api/agents/` - List all agents
- `POST /api/agents/` - Create new agent
- `GET /api/agents/{id}/` - Get agent details
- `PUT /api/agents/{id}/` - Update agent
- `DELETE /api/agents/{id}/` - Delete agent

### Users
- `GET /api/users/` - List users
- `POST /api/users/` - Register new user
- `GET /api/users/{id}/` - Get user details
- `PUT /api/users/{id}/` - Update user
- `POST /api/users/login/` - User login
- `POST /api/users/logout/` - User logout
- `GET /api/users/profile/` - Get current user profile

### Inquiries
- `GET /api/inquiries/` - List all inquiries
- `POST /api/inquiries/` - Create new inquiry
- `GET /api/inquiries/{id}/` - Get inquiry details
- `PUT /api/inquiries/{id}/` - Update inquiry status

## Filtering Options

Properties can be filtered by:
- `category` - Property type (apartment, residential, commercial, corporate, bnb, land)
- `price_type` - Pricing model (month, week, day, sale)
- `bedrooms` - Number of bedrooms
- `bathrooms` - Number of bathrooms
- `agent` - Agent ID
- `is_featured` - Featured properties only
- `is_verified` - Verified properties only
- `min_price` / `max_price` - Price range
- `min_area` / `max_area` - Area range
- `search` - Search in title, description, location

## Setup Instructions

### 1. Environment Setup

```bash
# Create virtual environment
python3 -m venv backend_env

# Activate virtual environment
source backend_env/bin/activate  # On Windows: backend_env\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### 2. Database Setup

```bash
# Run migrations
python manage.py migrate

# Create superuser (optional)
python manage.py createsuperuser

# Populate with sample data
python populate_data.py
```

### 3. Run Development Server

```bash
python manage.py runserver
```

The API will be available at `http://localhost:8000/`

### 4. Admin Panel

Access the Django admin panel at `http://localhost:8000/admin/`

## Sample Data

The `populate_data.py` script creates:
- 3 sample users (agents)
- 3 agent profiles
- 8 sample properties across different categories

## Technology Stack

- **Backend Framework**: Django 5.2.10
- **API Framework**: Django REST Framework
- **Database**: SQLite (development)
- **Authentication**: Django's built-in authentication
- **CORS**: django-cors-headers
- **Filtering**: django-filter
- **File Storage**: Django's file system (Pillow for images)

## Configuration

### CORS Settings

The backend is configured to allow requests from:
- `http://localhost:5173`
- `http://127.0.0.1:5173`

Update the `CORS_ALLOWED_ORIGINS` setting in `backend/settings.py` for your frontend domain.

### Media Files

- Media URL: `/media/`
- Media Root: `BASE_DIR / 'media`

## API Response Format

All API responses follow standard REST conventions:
- `200 OK` - Successful GET requests
- `201 Created` - Successful POST requests
- `400 Bad Request` - Validation errors
- `401 Unauthorized` - Authentication required
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server errors

## Pagination

List endpoints use pagination with 20 items per page by default. Use `page` parameter to navigate pages.

## Search

Use the `search` parameter for full-text search across:
- Property titles
- Descriptions  
- Locations

## Development

### Adding New Models

1. Create model in appropriate app's `models.py`
2. Run `python manage.py makemigrations`
3. Run `python manage.py migrate`
4. Create serializer in `serializers.py`
5. Add viewset in `views.py`
6. Register router in `urls.py`

### Testing

```bash
# Run tests
python manage.py test

# Run specific app tests
python manage.py test properties
```

## Production Deployment

For production deployment:
1. Set `DEBUG = False` in settings
2. Configure production database
3. Set up proper static/media file serving
4. Configure HTTPS
5. Set up proper CORS origins
6. Use environment variables for sensitive settings

## License

This project is part of the Nyumba Paeasy Home platform.