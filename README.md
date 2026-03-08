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
- **AWS Bedrock (AI Explanations)**: Personalized eligibility explanations powered by Claude/Titan LLMs via Amazon Bedrock.
- **AWS DynamoDB**: Scalable NoSQL database for storing scheme data and user sessions at production scale.
- **AWS S3**: Scheme document and asset storage with versioning and lifecycle policies.
- **AWS CloudWatch**: Real-time observability — structured logs, custom metrics, and automated alerts.
- **AWS EC2 + Nginx**: Production backend hosted on EC2 with Nginx reverse proxy and SSL termination.

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

### ☁️ AWS Infrastructure

| Service             | Role                                                          |
| ------------------- | ------------------------------------------------------------- |
| **Amazon Bedrock**  | LLM-powered eligibility explanations (Claude / Titan)         |
| **Amazon DynamoDB** | Production scheme data store (toggle via `USE_DYNAMODB=true`) |
| **Amazon S3**       | Scheme document storage & static asset hosting                |
| **Amazon EC2**      | Backend compute (Ubuntu 22.04, Uvicorn + Nginx)               |
| **AWS CloudWatch**  | Centralized logging, metrics & alerting                       |
| **AWS IAM**         | Fine-grained role-based access control                        |

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
│   ├── data/           # Scheme datasets (local JSON / migrates to DynamoDB)
│   ├── engine/         # AI eligibility matching logic
│   ├── models/         # Pydantic models
│   ├── routes/         # API endpoints
│   ├── services/
│   │   ├── aws_service.py   # AWS Bedrock & S3 integration layer
│   │   └── data_layer.py    # Abstracted data layer (JSON ↔ DynamoDB toggle)
│   └── main.py         # Entry point
├── frontend/           # React Frontend (Vite)
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Route pages (Home, About, Login, Dashboard)
│   │   └── services/   # API integration
│   └── vite.config.js
├── render.yaml         # Render.com deployment config
├── vercel.json         # Vercel deployment config
└── README.md
```

### ☁️ AWS Environment Variables

Set these when deploying to AWS:

| Variable          | Description                          | Default                 |
| ----------------- | ------------------------------------ | ----------------------- |
| `USE_DYNAMODB`    | Switch data layer to DynamoDB        | `false`                 |
| `DYNAMODB_TABLE`  | DynamoDB table name for schemes      | `janasetu-schemes`      |
| `S3_BUCKET_NAME`  | S3 bucket for scheme documents       | —                       |
| `AWS_REGION`      | AWS deployment region                | `ap-south-1`            |
| `ALLOWED_ORIGINS` | Comma-separated allowed CORS origins | `http://localhost:5173` |

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
