# DoubtDesk

DoubtDesk is an anonymous academic query platform designed to bridge the communication gap between students and teachers.

The platform allows students to ask questions they hesitate to ask in a classroom environment. Questions are posted anonymously, allowing students to learn without fear of judgment.

## Features

- Student, Teacher, and Admin authentication (JWT-based, with refresh tokens)
- College email-based access (`@ncit.edu.np` required at registration)
- Anonymous question posting
- Teacher-based answer system
- Class-wide vs. college-wide question visibility
- Admin controls to block/unblock students and teachers, and remove questions
- Notification system (in-app, on new questions and new answers)

## Planned Features

These are on the roadmap but not implemented yet — listed here so the project's direction is clear, not because they exist in the code today.

- AI-powered content moderation
- Warning and ban system for inappropriate content (currently only a manual block/unblock exists)
- Subject/category-based question routing (currently routing is class-wide vs. college-wide only)
- Feedback and rating system

## Tech Stack

Frontend:
- React.js
- Tailwind CSS

Backend:
- FastAPI (Python)

Database:
- MySQL

Security:
- JWT Authentication (access + refresh tokens)