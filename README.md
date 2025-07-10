# 🚀 Cloud-Native Analytics Dashboard

A complete production-ready DevOps project featuring a full-stack analytics dashboard with real-time cryptocurrency data, containerization, CI/CD, and monitoring. Perfect for showcasing DevOps skills for companies like MSCI.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Architecture](#architecture)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Local Development](#local-development)
- [AWS EC2 Deployment](#aws-ec2-deployment)
- [CI/CD Pipeline](#cicd-pipeline)
- [Monitoring](#monitoring)
- [Security](#security)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## 🎯 Project Overview

This project demonstrates a complete DevOps workflow by building a cryptocurrency analytics dashboard that:

- Fetches real-time cryptocurrency data from CoinCap API
- Displays interactive charts and analytics
- Runs in containerized environments
- Implements automated CI/CD pipelines
- Provides comprehensive monitoring and alerting
- Secured with HTTPS and authentication

**Perfect for**: DevOps portfolios, internship applications, cloud engineering demonstrations

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        AWS EC2 Instance                        │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐    ┌──────────────┐    ┌─────────────────────┐ │
│  │   NGINX     │    │  Let's       │    │    Docker Compose   │ │
│  │ (Port 80/443)│    │  Encrypt     │    │                     │ │
│  │ Reverse Proxy│    │  (HTTPS)     │    │  ┌─────────────────┐│ │
│  └─────────────┘    └──────────────┘    │  │   Frontend      ││ │
│          │                              │  │   (React)       ││ │
│          ▼                              │  │   Port 3000     ││ │
│  ┌─────────────┐                        │  └─────────────────┘│ │
│  │   Frontend  │◄──────────────────────┐│                     │ │
│  │   (React)   │                       ││  ┌─────────────────┐│ │
│  │  Port 3000  │                       ││  │   Backend       ││ │
│  └─────────────┘                       ││  │   (FastAPI)     ││ │
│          │                             ││  │   Port 8000     ││ │
│          ▼                             ││  └─────────────────┘│ │
│  ┌─────────────┐                       ││                     │ │
│  │   Backend   │                       ││  ┌─────────────────┐│ │
│  │  (FastAPI)  │                       ││  │   Prometheus    ││ │
│  │  Port 8000  │                       ││  │   Port 9090     ││ │
│  └─────────────┘                       ││  └─────────────────┘│ │
│          │                             ││                     │ │
│          ▼                             ││  ┌─────────────────┐│ │
│  ┌─────────────┐                       ││  │   Grafana       ││ │
│  │  CoinCap    │                       ││  │   Port 3001     ││ │
│  │     API     │                       ││  └─────────────────┘│ │
│  └─────────────┘                       │└─────────────────────┘│ │
│                                        │                       │ │
└─────────────────────────────────────────────────────────────────┘
                          │
                          ▼
                ┌─────────────────┐
                │  GitHub Actions │
                │     CI/CD       │
                │   (Automated    │
                │   Deployment)   │
                └─────────────────┘
```

## 🛠️ Technologies Used

### Backend
- **FastAPI** - Modern Python web framework
- **Python 3.9+** - Programming language
- **Uvicorn** - ASGI server
- **Prometheus Client** - Metrics collection
- **Requests** - HTTP client for API calls
- **python-dotenv** - Environment variable management

### Frontend
- **React 18** - JavaScript library
- **Recharts** - Data visualization
- **Axios** - HTTP client
- **Tailwind CSS** - Styling framework

### DevOps & Infrastructure
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **NGINX** - Reverse proxy and load balancer
- **Let's Encrypt + Certbot** - SSL/TLS certificates
- **AWS EC2** - Cloud hosting (t2.micro free tier)
- **GitHub Actions** - CI/CD pipeline

### Monitoring
- **Prometheus** - Metrics collection and storage
- **Grafana** - Monitoring dashboards and alerting

### External APIs
- **CoinCap API** - Real-time cryptocurrency data (100% free)

## ✨ Features

### Core Features
- 📊 Real-time cryptocurrency price dashboard
- 🔐 Token-based API authentication
- 📈 Interactive charts and data visualization
- 🐳 Fully containerized with Docker
- 🔄 Automated CI/CD pipeline
- 📊 Comprehensive monitoring and alerting
- 🔒 HTTPS security with Let's Encrypt
- 🌐 Production-ready deployment on AWS

### DevOps Features
- 🚀 One-command deployment
- 📋 Health checks and service monitoring
- 🔧 Environment-based configuration
- 📝 Detailed logging and metrics
- 🔄 Zero-downtime deployments
- 📊 Performance monitoring dashboards

## 🔧 Prerequisites

### Local Development
- **Docker** (v20.10+) and **Docker Compose** (v2.0+)
- **Node.js** (v16+) and **npm** (v8+)
- **Python** (v3.9+) and **pip**
- **Git**

### AWS Deployment
- **AWS Account** with EC2 access
- **Domain name** (optional but recommended for HTTPS)
- **GitHub account** for CI/CD

### Installation Commands (Ubuntu/Debian)
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
sudo usermod -aG docker $USER

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.23.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Python and pip
sudo apt install python3 python3-pip python3-venv -y

# Install Git
sudo apt install git -y
```

## 💻 Local Development

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/cloud-native-analytics-dashboard.git
cd cloud-native-analytics-dashboard
```

### 2. Environment Setup
```bash
# Copy environment template
cp .env.template .env

# Edit .env file with your configuration
nano .env
```

### 3. Run with Docker Compose
```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### 4. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **Prometheus**: http://localhost:9090
- **Grafana**: http://localhost:3001 (admin/admin)

### 5. Development Workflow
```bash
# Frontend development
cd frontend
npm install
npm start

# Backend development
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## ☁️ AWS EC2 Deployment

### Step 1: Launch EC2 Instance

1. **Log into AWS Console**
   - Navigate to EC2 Dashboard
   - Click "Launch Instance"

2. **Configure Instance**
   ```
   AMI: Ubuntu Server 22.04 LTS (Free tier eligible)
   Instance Type: t2.micro (Free tier eligible)
   Key Pair: Create new or use existing
   ```

3. **Security Group Configuration**
   ```
   Type            Protocol    Port Range    Source
   SSH             TCP         22           0.0.0.0/0
   HTTP            TCP         80           0.0.0.0/0
   HTTPS           TCP         443          0.0.0.0/0
   Custom TCP      TCP         3000         0.0.0.0/0
   Custom TCP      TCP         8000         0.0.0.0/0
   Custom TCP      TCP         9090         0.0.0.0/0
   Custom TCP      TCP         3001         0.0.0.0/0
   ```

### Step 2: Connect to EC2 Instance
```bash
# Connect via SSH
ssh -i your-key.pem ubuntu@your-ec2-public-ip

# Update system
sudo apt update && sudo apt upgrade -y
```

### Step 3: Install Dependencies
```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
sudo usermod -aG docker ubuntu

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.23.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Install NGINX
sudo apt install nginx -y

# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Install Git
sudo apt install git -y

# Logout and login to apply Docker group changes
exit
ssh -i your-key.pem ubuntu@your-ec2-public-ip
```

### Step 4: Deploy Application
```bash
# Clone repository
git clone https://github.com/yourusername/cloud-native-analytics-dashboard.git
cd cloud-native-analytics-dashboard

# Set up environment
cp .env.template .env
nano .env  # Edit with your configuration

# Deploy with Docker Compose
docker-compose up -d

# Configure NGINX
sudo cp nginx/nginx.conf /etc/nginx/sites-available/analytics-dashboard
sudo ln -s /etc/nginx/sites-available/analytics-dashboard /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
```

### Step 5: Setup HTTPS with Let's Encrypt
```bash
# Only if you have a domain name
sudo certbot --nginx -d your-domain.com

# For IP-based deployment, skip this step
```

### Step 6: Configure Firewall
```bash
# Enable UFW
sudo ufw enable

# Allow necessary ports
sudo ufw allow 22      # SSH
sudo ufw allow 80      # HTTP
sudo ufw allow 443     # HTTPS
sudo ufw allow 3000    # Frontend
sudo ufw allow 8000    # Backend
sudo ufw allow 9090    # Prometheus
sudo ufw allow 3001    # Grafana
```

## 🔄 CI/CD Pipeline

### Step 1: GitHub Secrets Setup

1. **Generate SSH Key Pair**
   ```bash
   ssh-keygen -t rsa -b 4096 -C "github-actions"
   ```

2. **Add Public Key to EC2**
   ```bash
   # Copy public key to EC2 ~/.ssh/authorized_keys
   cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
   ```

3. **Add Private Key to GitHub Secrets**
   - Go to Repository → Settings → Secrets and variables → Actions
   - Add the following secrets:
     ```
     EC2_SSH_KEY: [Your private key content]
     EC2_HOST: [Your EC2 public IP]
     EC2_USER: ubuntu
     ```

### Step 2: GitHub Actions Workflow

The workflow automatically:
- Triggers on push to `main` branch
- Connects to EC2 via SSH
- Pulls latest code
- Stops existing containers
- Rebuilds and restarts services
- Runs health checks

### Step 3: Deployment Process
```bash
# Simply push to main branch
git add .
git commit -m "Deploy to production"
git push origin main

# GitHub Actions will automatically deploy
```

## 📊 Monitoring

### Prometheus Configuration
- **URL**: http://your-ec2-ip:9090
- **Metrics**: Custom application metrics from `/metrics` endpoint
- **Targets**: Backend service health and performance

### Grafana Dashboard
- **URL**: http://your-ec2-ip:3001
- **Default Login**: admin/admin
- **Features**:
  - API response time monitoring
  - Request rate tracking
  - Error rate analysis
  - System resource utilization

### Key Metrics Monitored
- HTTP request duration
- Request rate per endpoint
- Error rates and status codes
- Memory and CPU usage
- Database query performance

## 🔒 Security

### Authentication
- **API Token**: Bearer token authentication for API endpoints
- **Environment Variables**: Sensitive data stored in `.env` files
- **HTTPS**: SSL/TLS encryption with Let's Encrypt

### Security Best Practices
- Regular security updates
- Minimal attack surface
- Secure container configurations
- Network isolation with Docker
- Regular backup procedures

## 📁 Project Structure

```
cloud-native-analytics-dashboard/
├── backend/                    # FastAPI backend
│   ├── main.py                # Main FastAPI application
│   ├── auth.py                # Authentication middleware
│   ├── metrics.py             # Prometheus metrics
│   ├── requirements.txt       # Python dependencies
│   └── Dockerfile            # Backend container config
├── frontend/                  # React frontend
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── App.js           # Main React app
│   │   └── index.js         # Entry point
│   ├── package.json         # Node.js dependencies
│   └── Dockerfile           # Frontend container config
├── nginx/                    # NGINX configuration
│   └── nginx.conf           # Reverse proxy config
├── monitoring/              # Monitoring configuration
│   ├── prometheus.yml       # Prometheus config
│   └── grafana/
│       └── provisioning/    # Grafana provisioning
├── .github/
│   └── workflows/
│       └── ci-cd.yml        # GitHub Actions workflow
├── docker-compose.yml       # Multi-container orchestration
├── .env.template           # Environment variables template
├── deploy.sh               # Deployment automation script
└── README.md              # This file
```

## 📚 API Documentation

### Authentication
```http
Authorization: Bearer your-auth-token
```

### Endpoints

#### GET /api/prices
Returns current cryptocurrency prices.

**Response:**
```json
{
  "data": [
    {
      "id": "bitcoin",
      "rank": "1",
      "symbol": "BTC",
      "name": "Bitcoin",
      "priceUsd": "45000.00",
      "changePercent24Hr": "2.5"
    }
  ],
  "timestamp": "2024-01-15T10:30:00Z"
}
```

#### GET /metrics
Prometheus metrics endpoint.

**Response:**
```
# HELP http_requests_total Total number of HTTP requests
# TYPE http_requests_total counter
http_requests_total{method="GET",endpoint="/api/prices"} 123
```

#### GET /health
Health check endpoint.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

## 🐛 Troubleshooting

### Common Issues

#### Docker Permission Denied
```bash
# Add user to docker group
sudo usermod -aG docker $USER
# Logout and login again
```

#### Port Already in Use
```bash
# Find process using port
sudo lsof -i :8000
# Kill process
sudo kill -9 <PID>
```

#### Container Won't Start
```bash
# Check logs
docker-compose logs service-name
# Check container status
docker-compose ps
```

#### SSL Certificate Issues
```bash
# Renew certificates
sudo certbot renew
# Restart nginx
sudo systemctl restart nginx
```

### Debugging Commands
```bash
# View all logs
docker-compose logs -f

# Access container shell
docker-compose exec backend bash
docker-compose exec frontend bash

# Check service status
docker-compose ps

# Restart specific service
docker-compose restart backend
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow Python PEP 8 style guide
- Use meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all containers build successfully

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [CoinCap API](https://docs.coincap.io/) for free cryptocurrency data
- [FastAPI](https://fastapi.tiangolo.com/) for the excellent Python framework
- [React](https://reactjs.org/) for the frontend library
- [Docker](https://www.docker.com/) for containerization
- [Prometheus](https://prometheus.io/) and [Grafana](https://grafana.com/) for monitoring

## 📞 Support

For questions or issues:
- Create an issue on GitHub
- Check the troubleshooting section
- Review the documentation

---

**Built with ❤️ for DevOps learning and demonstration purposes**

**Perfect for showcasing in interviews at companies like MSCI, demonstrating cloud computing, APIs, data operations, analytics, and DevOps practices.**
