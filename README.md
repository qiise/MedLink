# DEVFEST 2025

# MedLink Backend & Frontend

This repository contains both the backend and frontend code for a forum and mentorship application built using Django and React (with TypeScript). The backend manages forum posts and replies, while the frontend provides an interactive user interface for creating and viewing discussions. A chatbot to help with interview prep has also been integrated.

## Features

### Backend (Django)
- CRUD operations for forum posts and replies
- Timestamps for posts and replies with timezone handling
- API endpoints for frontend integration

### Frontend (React + TypeScript)
- User-friendly forum and mentorship interface
- Dynamic navigation with protected routes based on authentication
- Integration with backend API for real-time data updates
- Smooth animations using Framer Motion

## Technologies Used

- **Backend:** Django, Django REST Framework, SQLite (default, can be switched to other databases)
- **Frontend:** React, TypeScript, Tailwind CSS, Framer Motion

## Getting Started

### Prerequisites
- Python 3.x
- npm

### Backend Installation

1. **Clone the repository:**  
   `git clone https://github.com/qiise/DevFest2025.git`

2. **Navigate to the backend directory:**  
   `cd DevFest2025/backend`

3. **Create and activate a virtual environment:**  
   `python -m venv env`  
   `source env/bin/activate` (on macOS/Linux) or `env\Scripts\activate` (on Windows)

4. **Install the dependencies:**  
   `pip install -r requirements.txt`

5. **Make migrations:**  
   `python manage.py makemigrations`

6. **Run migrations:**  
   `python manage.py migrate`

7. **Start the development server:**  
   `python manage.py runserver`

### Frontend Installation

1. **Navigate to the frontend directory:**  
   `cd DevFest2025/frontend`

2. **Install frontend dependencies:**  
   `npm install`

3. **Start the frontend server:**  
   `npm run dev`

## Running the Management Script

This script can be run to view all the posts in the database. The database can be edited (adding posts/replies, changing timestamps, deleting posts/replies) with similar scripts.

1. **Open Django shell:**  
   `python manage.py shell`

2. **Run the script inside the shell:**

```python
from api.models import Post, Reply
from django.utils import timezone

# Display all posts in the database
all_posts = Post.objects.all()
for post in all_posts:
    print(f"Post ID: {post.id}, Title: {post.title}, Author: {post.author}, Timestamp: {post.timestamp}, Replies: {post.replies}")
