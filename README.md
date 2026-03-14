# 🛡️ Nexus | Intelligent Medication System

![Nexus Header](https://raw.githubusercontent.com/Niyar111/NEXUS/main/public/banner.png) **Nexus** is a modern medication adherence platform designed to bridge the gap between patients and caregivers. By combining smart scheduling, real-time reminders, and compliance analytics, Nexus ensures that "forgetting a dose" becomes a thing of the past.

---

## 🚀 Key Features

### 🕒 Smart Scheduling & Reminders
- **Flexible Dosing:** Support for multiple daily doses (e.g., 08:00, 14:00, 20:00).
- **Timezone Aware:** Reminders are calculated based on the user's local time and converted to UTC for reliable server-side execution.
- **Snooze System:** Life happens. Users can snooze reminders for 5-minute intervals.

### 👥 Caregiver Ecosystem
- **Real-time Alerts:** Caregivers are automatically notified via Firebase when a patient misses a dose.
- **Compliance Monitoring:** View a patient’s adherence score from a remote dashboard.

### 📊 Adherence Analytics
Uses a weighted scoring formula to track health progress:
$$Score = \frac{(OnTime \times 1.0) + (Late \times 0.5)}{TotalScheduled} \times 100$$
- Track "Pending", "Taken", "Late", and "Missed" states.
- Visual trends powered by **Recharts**.

### ⚡ Technical Excellence
- **Reliable Queuing:** Powered by **Redis** and **BullMQ** to ensure no reminder is ever lost.
- **Grace Period:** A 20-minute window before a dose is officially marked as "Missed."
- **Fluid UI:** Smooth page transitions and element animations using **GSAP**.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS
- **Animations:** GSAP (GreenSock Animation Platform)
- **Charts:** Recharts
- **State Management:** Context API

### Backend
- **Runtime:** Node.js & Express.js
- **Database:** MongoDB (Mongoose)
- **Queue/Caching:** Redis + BullMQ
- **Notifications:** Firebase Cloud Messaging (FCM)
- **Time Handling:** Luxon

---

## 🏗️ Architecture

```mermaid
graph TD
    A[React Frontend] -->|Axios| B[Express API]
    B --> C[(MongoDB)]
    B --> D[Redis Queue]
    D --> E[Background Workers]
    E --> F[Firebase Push Notifications]
    F --> A
⚙️ Installation & Setup
Clone the repository:

Bash
git clone [https://github.com/Niyar111/NEXUS.git](https://github.com/Niyar111/NEXUS.git)
cd NEXUS
Setup Frontend:

Bash
cd Nexus_frontend
npm install
npm run dev
Environment Variables:
Create a .env file in the root directory:

Code snippet
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_KEY=your_key_here
🗺️ Roadmap
[ ] AI-based medication adherence prediction.

[ ] Pharmacy refill reminders.

[ ] Wearable device integration (Apple Watch / Galaxy Watch).

[ ] Medication scanning using OCR/Camera.

👨‍💻 Author
Niyar Kalita
BSc Computer Science Student | Full-Stack Developer
