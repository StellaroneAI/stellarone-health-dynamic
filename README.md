# StellarOne Health - Dynamic Website

A comprehensive non-static website for StellarOne Health's AI-powered Revenue Cycle Management platform, built with Express.js and featuring server-side functionality.

## 🚀 Features

### **Non-Static Functionality**
- **Server-Side Rendering**: Dynamic HTML generation with Express.js
- **API Endpoints**: RESTful backend for data management
- **Real-Time Data**: Live metrics and analytics from server
- **Form Processing**: Server-side contact form handling
- **AI Integration**: Backend AI chat assistant
- **Database Ready**: Prepared for database integration

### **Core Pages**
- **Landing Page**: Professional hero section with live metrics
- **Dashboard**: Real-time RCM analytics and KPIs
- **AI Features**: Interactive AI assistant chat
- **Contact**: Dynamic form with server validation

### **API Endpoints**
- `GET /api/metrics` - Retrieve revenue metrics
- `GET /api/claims` - Get claims data
- `POST /api/contact` - Submit contact forms
- `POST /api/ai/chat` - AI assistant interactions

## 🛠 Installation & Setup

### **Prerequisites**
- Node.js 16+ installed
- npm or yarn package manager

### **Quick Start**

1. **Install Dependencies**
   ```bash
   npm install express cors
   # For development
   npm install --save-dev nodemon
   ```

2. **Start the Server**
   ```bash
   # Production
   node website-dynamic.js
   
   # Development (with auto-reload)
   npx nodemon website-dynamic.js
   ```

3. **Access the Website**
   - Open: `http://localhost:3000`
   - Server runs on port 3000 by default

### **Environment Configuration**
```bash
# Optional: Set custom port
export PORT=8080

# Start with custom port
PORT=8080 node website-dynamic.js
```

## 📁 File Structure

```
stellarone-health-dynamic/
├── website-dynamic.js      # Main Express.js server
├── package-dynamic.json    # Node.js dependencies
├── README-dynamic.md       # This documentation
└── assets/                 # Static assets (optional)
```

## 🔧 Server Architecture

### **Express.js Backend**
```javascript
// Main server setup
const app = express();
app.use(express.json());
app.use(cors());

// Dynamic HTML generation
app.get('/', (req, res) => {
  res.send(getDynamicHTML());
});
```

### **API Routes**
```javascript
// Contact form processing
app.post('/api/contact', (req, res) => {
  // Server-side form validation
  // Data persistence logic
  // Email notifications (if configured)
});

// AI chat integration  
app.post('/api/ai/chat', (req, res) => {
  // AI response generation
  // Context management
  // Response optimization
});
```

### **Data Management**
- **In-Memory Storage**: Contact requests and analytics
- **Real-Time Metrics**: Live KPI calculations
- **Session Management**: Ready for user sessions
- **Database Ready**: Easy integration with PostgreSQL/MongoDB

## 🎨 Frontend Features

### **Dynamic Content**
- **Live Metrics**: Server-generated real-time data
- **Interactive Chat**: AI assistant with backend processing
- **Form Validation**: Client and server-side validation
- **Responsive Design**: Mobile-optimized interface

### **Modern UI Components**
- **Glassmorphism Effects**: Professional visual design
- **Smooth Animations**: CSS transitions and transforms
- **Interactive Elements**: Hover effects and transitions
- **Brand Colors**: Blue-indigo-slate color scheme

## 🔌 API Integration

### **Metrics Endpoint**
```javascript
// GET /api/metrics?period=30
{
  "metrics": [
    {
      "type": "revenue",
      "value": 2800000,
      "change": 18,
      "period": "30"
    }
  ]
}
```

### **Contact Form**
```javascript
// POST /api/contact
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@hospital.com",
  "organization": "City General Hospital",
  "phone": "+1-555-0123",
  "message": "Interested in RCM platform"
}
```

### **AI Chat**
```javascript
// POST /api/ai/chat
{
  "message": "How can I reduce claim denials?"
}

// Response
{
  "response": "I can help you reduce denials! Our AI system..."
}
```

## 🚀 Deployment Options

### **Local Development**
```bash
# Clone and start
git clone <repository>
cd stellarone-health-dynamic
npm install express cors
node website-dynamic.js
```

### **Production Deployment**

#### **Heroku**
```bash
# Create Procfile
echo "web: node website-dynamic.js" > Procfile

# Deploy
heroku create stellarone-health
git push heroku main
```

#### **Digital Ocean**
```bash
# Copy files to server
scp website-dynamic.js user@server:/var/www/
scp package-dynamic.json user@server:/var/www/

# Install and start
ssh user@server
cd /var/www
npm install
pm2 start website-dynamic.js
```

#### **AWS EC2**
```bash
# Upload files
aws s3 cp . s3://deployment-bucket/ --recursive

# Launch instance
# Install Node.js
# Run: node website-dynamic.js
```

## 🔧 Customization

### **Adding Database**
```javascript
// Add database connection
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// Update contact form
app.post('/api/contact', async (req, res) => {
  const { firstName, lastName, email } = req.body;
  
  await pool.query(
    'INSERT INTO contacts (first_name, last_name, email) VALUES ($1, $2, $3)',
    [firstName, lastName, email]
  );
  
  res.json({ success: true });
});
```

### **Adding Authentication**
```javascript
// Add session management
const session = require('express-session');

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));

// Protected routes
app.get('/admin', requireAuth, (req, res) => {
  // Admin panel
});
```

### **Email Integration**
```javascript
// Add email notifications
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

app.post('/api/contact', async (req, res) => {
  // Save to database
  // Send email notification
  await transporter.sendMail({
    to: 'team@stellaronehealth.in',
    subject: 'New Contact Request',
    text: `New contact from ${req.body.firstName} ${req.body.lastName}`
  });
});
```

## 🌟 Advanced Features

### **Real-Time Updates**
```javascript
// Add WebSocket support
const { Server } = require('socket.io');
const io = new Server(server);

io.on('connection', (socket) => {
  // Send live metric updates
  setInterval(() => {
    socket.emit('metrics', getLiveMetrics());
  }, 5000);
});
```

### **API Rate Limiting**
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

### **Caching**
```javascript
const redis = require('redis');
const client = redis.createClient();

app.get('/api/metrics', async (req, res) => {
  const cached = await client.get('metrics');
  if (cached) {
    return res.json(JSON.parse(cached));
  }
  
  const metrics = generateMetrics();
  await client.setex('metrics', 300, JSON.stringify(metrics));
  res.json(metrics);
});
```

## 📈 Performance Optimization

### **Compression**
```javascript
const compression = require('compression');
app.use(compression());
```

### **Static File Serving**
```javascript
app.use('/assets', express.static('assets', {
  maxAge: '1d',
  etag: true
}));
```

### **Security Headers**
```javascript
const helmet = require('helmet');
app.use(helmet());
```

## 🔍 Monitoring

### **Logging**
```javascript
const morgan = require('morgan');
app.use(morgan('combined'));

// Custom logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});
```

### **Health Check**
```javascript
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});
```

## 🤝 Support

For technical support or customization requests:
- **Email**: tech@stellaronehealth.in
- **Documentation**: Available in this README
- **Issues**: Check console logs for debugging

## 📄 License

MIT License - See LICENSE file for details.

---

**StellarOne Health** - Transforming healthcare revenue cycle management with AI-powered automation and insights.
