[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/2WEVFWWf)

# What to Eat Today – A Flask + React Web App

This is a simple full-stack web app built with **Flask (Python)** for the backend and **React** for the frontend. The app helps users decide *what to eat today* by providing random meal suggestions or listing available options.



---

## Features

- Random food suggestions


---

## Tech Stack

- **Frontend:** React, JavaScript, Vite
- **Backend:** Python, Flask, Flask-CORS, SQLAlchemy
- **Database:** SQLite
- **Others:** Virtualenv, Node.js, npm

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/UOA-CS732-S1-2025/cs732-assignment-wenzhepang.git
cd cs732-assignment-wenzhepang
```

### 2. Backend Setup (Flask)

```bash
cd backend
python -m venv venv           # Create virtual environment
source venv/bin/activate      # On Windows: venv\Scripts\activate
pip install -r requirements.txt
flask run                     # Starts Flask backend at http://localhost:5000
```

### 3. Frontend Setup (React)

```bash
cd frontend
npm install                   # Installs dependencies
npm run dev                   # Starts React development server 
```
