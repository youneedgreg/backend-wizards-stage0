# Backend Wizards Stage 0: Dynamic Profile Endpoint

## 🎯 Project Description

A RESTful API endpoint that returns profile information along with a dynamically fetched cat fact from an external API. Built with Node.js and Express.

## 🚀 Quick Start


### Installation

1. Clone or download the repository:
```bash
git clone https://github.com/youneedgreg/backend-wizards-stage0.git
cd backend-wizards-stage0
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with your information:
```bash
USER_EMAIL=email@gmail.com
USER_NAME=Your Full Name
USER_STACK=Node.js/Express
PORT=3000
```

### Running Locally
```bash
npm start
```

Server runs on `http://localhost:3000`

You should see:
```
╔════════════════════════════════════════╗
║   🧙 Backend Wizards Stage 0 API 🧙    ║
║   Server running on port 3000          ║
║   Local: http://localhost:3000         ║
║   Endpoint: http://localhost:3000/me   ║
╚════════════════════════════════════════╝
```

## 📡 API Endpoints

### GET `/me` - Profile Endpoint

Returns your profile information with a random cat fact.

**URL:** `http://localhost:3000/me`

**Method:** GET

**Response (200 OK):**
```json
{
  "status": "success",
  "user": {
    "email": "email@gmail.com",
    "name": "Your Full Name",
    "stack": "Node.js/Express"
  },
  "timestamp": "2025-10-18T14:32:45.123Z",
  "fact": "random generated cat fact"
}
```

### GET `/health` - Health Check
```bash
curl http://localhost:3000/health
```

### GET `/` - Welcome
```bash
curl http://localhost:3000/
```

## 🧪 Testing

### Test with curl
```bash
# Test the /me endpoint
curl http://localhost:3000/me

# Test multiple times to see different facts and timestamps
curl http://localhost:3000/me
curl http://localhost:3000/me
```

### Test in Browser

Open: `http://localhost:3000/me`

## 📦 Dependencies

- **express** - Web server framework
- **axios** - HTTP client for API calls
- **dotenv** - Environment variable management

## 🔧 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `USER_EMAIL` | Your email address | email@gmail.com |
| `USER_NAME` | Your full name | Gregory Temwa |
| `USER_STACK` | Your tech stack | Node.js/Express |
| `PORT` | Server port | 3000 |
| `NODE_ENV` | Environment | development |

## 📁 File Structure
```
backend-wizards-stage0/
├── src/
│   └── index.js              # Main server file
├── .env                       # Environment variables
├── .gitignore                 # Git ignore rules
├── README.md                  # This file
├── package.json               # Dependencies
└── node_modules/              # Dependencies folder
```

## 🚀 Deployment

Deploy to Railway:

1. Push to GitHub
2. Go to [railway.app](https://railway.com)
3. Connect your GitHub repo
4. Set environment variables
5. Deploy!


## 🐛 Debugging

Check console logs for:
- Request logs with timestamps
- API call details
- Error messages
- Response confirmations

## 📝 Notes

- New cat fact is fetched on every request
- Timestamp updates with every request
- External API has 5-second timeout
- CORS headers enabled
- Graceful error handling

## 🎓 What I Learned

- RESTful API design principles
- Consuming external APIs with error handling
- Environment variable management
- HTTP status codes and headers
- Express.js routing and middleware
- Deployment best practices

## 📚 Resources

- [Express.js Documentation](https://expressjs.com/)
- [Axios Documentation](https://axios-http.com/)
- [REST API Best Practices](https://restfulapi.net/)

---

**Status:** ✅ Backend Wizards Stage 0 Project

**Live URL:** https://backend-wizards-stage0-production-f082.up.railway.app/me

**GitHub:** https://github.com/youneedgreg/backend-wizards-stage0
```
