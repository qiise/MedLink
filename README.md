Django Forum Backend & Frontend

This repository contains both the backend and frontend code for a forum and mentorship application built using Django and React (with TypeScript). The backend manages forum posts and replies, while the frontend provides an interactive user interface for creating and viewing discussions.

Features

Backend (Django)

CRUD operations for forum posts and replies

Timestamps for posts and replies with timezone handling

API endpoints for frontend integration

Chatbot integration

Frontend (React + TypeScript)

User-friendly forum and mentorship interface

Dynamic navigation with protected routes based on authentication

Integration with backend API for real-time data updates

Smooth animations using Framer Motion

Ability to connect with mentors

Technologies Used

Backend: Django, Django REST Framework, SQLite (default, can be switched to other databases)

Frontend: React, TypeScript, Tailwind CSS, Framer Motion

Getting Started

Prerequisites

Python 3.x

npm

Backend Installation

Clone the repository:git clone https://github.com/qiise/DevFest2025.git

Navigate to the backend directory:cd DevFest2025/backend

Create and activate a virtual environment:python -m venv envsource env/bin/activate (on macOS/Linux) or env\Scripts\activate (on Windows)

Install the dependencies:pip install -r requirements.txt

Make migrations:python manage.py makemigrations

Run migrations:python manage.py migrate

Start the development server:python manage.py runserver

Frontend Installation

Navigate to the frontend directory:cd DevFest2025/frontend

Install frontend dependencies:npm install

Start the frontend server:npm run dev

Viewing Data

This is a way to see all the posts in our database.

Open Django shell:python manage.py shell

Run the script inside the shell:

from api.models import Post, Reply
from django.utils import timezone

# Display all posts in the database
all_posts = Post.objects.all()
for post in all_posts:
    print(f"Post ID: {post.id}, Title: {post.title}, Author: {post.author}, Timestamp: {post.timestamp}, Replies: {post.replies}")

API Endpoints

GET /api/posts/ - Retrieve all posts

POST /api/posts/ - Create a new post

GET /api/posts/{id}/ - Retrieve a specific post

POST /api/posts/{id}/replies/ - Add a reply to a post

GET /api/posts/{id}/replies/ - Retrieve replies for a specific post

Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

