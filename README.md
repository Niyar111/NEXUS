Nexus – Intelligent Medication System

Nexus is a modern medication adherence platform designed to help patients manage their medicines, receive timely reminders, and allow caregivers to monitor medication compliance.

Medication non-adherence is one of the most common healthcare problems worldwide. Many patients forget to take medicines on time, which can lead to treatment failure and serious health risks.

Nexus solves this problem by combining smart reminders, adherence analytics, caregiver alerts, and real-time notifications into a single intelligent system.

Problem Statement

Many patients struggle to follow prescribed medication schedules.

Common issues include:

Forgetting to take medicines

Complex medication schedules

Lack of monitoring from caregivers

No visibility into medication adherence

Poor communication between patients and family members

Studies show that nearly 50% of patients do not take medications as prescribed, which leads to worsening health outcomes.

Nexus addresses this problem by building a reliable medication adherence system with intelligent reminders and caregiver support.

Key Features
Smart Medication Scheduling

Users can add medicines with flexible schedules including multiple daily doses.

Example:

Medicine: Metformin
Dosage: 500mg
Schedule: 08:00, 14:00, 20:00

The system stores schedules and automatically triggers reminders at the correct time.

Intelligent Reminder Engine

Nexus uses a job scheduling system to trigger reminders precisely at scheduled medication times.

Features include:

automatic reminder generation

timezone-aware scheduling

graceful handling of missed reminders

one reminder per scheduled dose

Reminders are handled using background workers powered by Redis queues.

Grace Period Handling

Each medication reminder includes a grace period (default 20 minutes).

Example flow:

08:00 → reminder sent
08:20 → if not taken → marked as missed

Status states:

pending

taken

late

missed

This allows accurate medication tracking.

Caregiver Monitoring

Nexus allows users to assign caregivers who can receive alerts when a medication dose is missed.

Example use cases:

children monitoring elderly parents

caregivers monitoring chronic patients

remote family health monitoring

When a patient misses a dose, the caregiver receives a notification.

Snooze System

Users can snooze reminders when they cannot take medicine immediately.

Example:

Reminder triggered
User presses Snooze
Reminder delayed by 5 minutes

The system tracks snooze count and reschedules notifications.

Adherence Analytics

Nexus calculates adherence statistics to help users understand their medication habits.

Adherence score formula:

((OnTime × 1) + (Late × 0.5)) / TotalScheduled × 100

Analytics include:

adherence score

missed doses

late doses

medication trends

These insights help patients improve treatment compliance.

Push Notification System

Nexus integrates with Firebase Cloud Messaging to deliver real-time notifications.

Notifications are sent for:

medication reminders

missed dose alerts

caregiver notifications

Push notifications ensure reminders reach users instantly.

Timezone-Aware Scheduling

Medication schedules are calculated using the user’s timezone.

The system converts local medication times into UTC and schedules jobs accordingly.

This ensures reminders trigger correctly regardless of location.

High Reliability Reminder System

The reminder engine is powered by a job queue system to guarantee reliable scheduling.

Reminder workflow:

Medicine scheduled
↓
Job added to queue
↓
Worker executes job
↓
Reminder notification sent
↓
Grace timer starts
↓
If no action → mark missed

This architecture avoids unreliable polling systems and ensures reminders trigger accurately.

Architecture

The system follows a modular backend architecture.

Frontend (React)
        ↓
Express API
        ↓
Controllers
        ↓
Services
        ↓
MongoDB
        ↓
Redis Queue
        ↓
Background Workers
        ↓
Firebase Push Notifications

This architecture ensures scalability and reliability.

Tech Stack

Backend

Node.js

Express.js

MongoDB (Mongoose)

Redis

BullMQ

Firebase Admin

Luxon

Winston

JWT Authentication

Frontend

React

Vite

Tailwind CSS

GSAP

Recharts

Axios

Infrastructure

MongoDB Atlas

Redis

Firebase Cloud Messaging

Backend Features

Authentication

JWT authentication

password hashing using bcrypt

protected routes

rate limiting

Medication Management

medicine CRUD operations

multiple daily schedules

timezone-aware scheduling

Dose Logging

pending / taken / late / missed states

idempotent dose tracking

unique index on medication + scheduled time

Reminder Scheduling

Redis-based job queue

background workers

grace period checks

Caching

Redis caching for adherence analytics

Observability

structured logging with Winston

request ID tracing

health monitoring endpoint

API Endpoints

Authentication

POST /api/auth/register
POST /api/auth/login

Medicines

GET /api/medicines
POST /api/medicines
PUT /api/medicines/:id
DELETE /api/medicines/:id

Dose Logs

POST /api/dose-log
POST /api/dose-log/:id/snooze

Analytics

GET /api/analytics/adherence

Caregivers

GET /api/caregivers
POST /api/caregivers
DELETE /api/caregivers/:id

Notifications

POST /api/notifications/devices
Environment Variables

Create a .env file in the backend folder.

Example:

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
REDIS_URL=your_redis_connection
FIREBASE_PROJECT_ID=your_project
FIREBASE_CLIENT_EMAIL=your_email
FIREBASE_PRIVATE_KEY=your_key
Installation

Clone the repository:

git clone https://github.com/yourusername/nexus.git

Install dependencies:

npm install

Run the development server:

npm run dev
Future Improvements

Possible future enhancements include:

AI-based medication adherence prediction

pharmacy refill reminders

doctor integration

wearable device integration

emergency escalation alerts

medication scanning using camera

License

This project is open source and available under the MIT License.

Author

Niyar
BSc Computer Science Student
Full-Stack Developer
