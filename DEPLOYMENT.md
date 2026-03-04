# JanaSetu AI - Deployment Guide

This guide outlines the standard operating procedures for deploying the JanaSetu AI application (FastAPI Backend + React Frontend) to AWS.

## 1. Backend Deployment (AWS EC2)

The backend runs a high-performance ASGI server (Uvicorn) with FastAPI.

### Prerequisites
- An AWS EC2 instance running Ubuntu 22.04 LTS.
- Security Groups configured: Allow Inbound SSH (22), HTTP (80), HTTPS (443).

### Environment Setup
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install python3-pip python3-venv nginx -y

# Clone repository
git clone <repository_url>
cd JanaSetu-vprompt/backend

# Setup Python Virtual Environment
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Systemd Service Setup
Create a service file to manage the API server:
`sudo nano /etc/systemd/system/janasetu.service`

```ini
[Unit]
Description=JanaSetu Uvicorn Daemon
After=network.target

[Service]
User=ubuntu
Group=www-data
WorkingDirectory=/home/ubuntu/JanaSetu-vprompt/backend
Environment="PATH=/home/ubuntu/JanaSetu-vprompt/backend/venv/bin"
Environment="USE_DYNAMODB=true"
ExecStart=/home/ubuntu/JanaSetu-vprompt/backend/venv/bin/uvicorn main:app --host 127.0.0.1 --port 8000 --workers 4

[Install]
WantedBy=multi-user.target
```

Enable and start the service:
```bash
sudo systemctl enable janasetu
sudo systemctl start janasetu
```

### Nginx Reverse Proxy
Configure Nginx to route traffic to the Uvicorn workers.
`sudo nano /etc/nginx/sites-available/janasetu`

```nginx
server {
    listen 80;
    server_name api.janasetu.in;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/janasetu /etc/nginx/sites-enabled/
sudo systemctl restart nginx
```

---

## 2. Frontend Deployment (AWS S3 & CloudFront)

The frontend is a static Vite application compiled to plain HTML/JS/CSS.

### Build Step
Locally or via CI/CD (GitHub Actions):
```bash
cd frontend
npm install
npm run build
```
The compiled files will exist in `frontend/dist`.

### S3 Configuration
1. Create a new AWS S3 Bucket (e.g., `app.janasetu.in`).
2. Enable **Static Website Hosting**.
3. Set the Index Document to `index.html`.
4. Upload all files from `frontend/dist` to the root of the S3 bucket.

### AWS CloudFront (CDN)
To provide HTTPS, low-latency delivery, and SPA routing support:
1. Create a CloudFront Distribution pointing to the S3 bucket's website endpoint.
2. Setup a Custom Error Response:
   - **HTTP Error Code**: 404
   - **Custom Error Response**: /index.html
   - **HTTP Response Code**: 200
   *(This ensures client-side routing like `/dashboard` or `/about` works on direct visits).*
3. Attach an ACM SSL Certificate for your custom domain.
