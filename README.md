# JanaSetu AI 🚀

**🌐 Live Demo: [https://jana-setu.vercel.app](https://jana-setu.vercel.app)**

JanaSetu (People's Bridge) is a comprehensive AI-powered platform designed to help citizens navigate and find government schemes they are eligible for. The platform leverages a FastAPI backend with an AI-driven eligibility engine and a modern React frontend for a premium user experience.

---

## 🌟 Features

- **AI-Powered Eligibility Matching**: Intelligent algorithms to match user profiles with government schemes.
- **Dynamic Frontend**: Modern UI built with React, Vite, and tailwindCSS.
- **Real-time Search**: Fast and responsive search functionality for schemes.
- **Glassmorphic Design**: A premium, state-of-the-art UI with smooth animations (Framer Motion, Anime.js).
- **Secure Backend**: Robust FastAPI implementation with structured logging and error handling.

---

## 🛠️ Tech Stack

### Frontend

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/), [Anime.js](https://animejs.com/)
- **Routing**: [React Router 7](https://reactrouter.com/)

### Backend

- **Framework**: [FastAPI](https://fastapi.tiangolo.com/)
- **Language**: [Python 3.10+](https://www.python.org/)
- **Data Handling**: JSON-based scheme dataset with memory-efficient loading.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- Python (v3.10+)
- npm or yarn

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/lazy0ne369/JanaSetu.git
   cd JanaSetu
   ```

2. **Backend Setup**:

   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Frontend Setup**:
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start the Backend**:

   ```bash
   cd backend
   python main.py
   ```

   The backend will be available at `http://localhost:8000`.

2. **Start the Frontend**:
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`.

---

## 📁 Project Structure

```text
JanaSetu/
├── backend/            # FastAPI Backend
│   ├── data/           # Scheme datasets
│   ├── engine/         # AI eligibility logic
│   ├── models/         # Pydantic models
│   ├── routes/         # API endpoints
│   └── main.py         # Entry point
├── frontend/           # React Frontend (Vite)
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Route pages (Home, About, Login)
│   │   └── services/   # API integration
│   └── vite.config.js
└── README.md
```

---

## 🔑 Demo Access

To log in to the operator dashboard, use the following passkey:

```
Passcode: 0000
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
