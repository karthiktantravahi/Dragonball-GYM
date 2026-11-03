import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import { connectDB } from './config/db.js';

// Route imports
import authRoutes from './routes/authRoutes.js';
import enquiryRoutes from './routes/enquiryRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import planRoutes from './routes/planRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

// Middleware imports
import { notFound, errorHandler } from './middleware/errorHandler.js';

// Load environment variables
dotenv.config();

// Validate critical environment variables in production
if (process.env.NODE_ENV === 'production') {
  const isDefaultOrInsecureJwt = !process.env.JWT_SECRET ||
    process.env.JWT_SECRET.length < 32 ||
    process.env.JWT_SECRET.includes('change_in_production') ||
    process.env.JWT_SECRET.includes('replace_with_secure') ||
    process.env.JWT_SECRET === 'dragonball_gym_ultra_instinct_secret_token_9000';

  if (isDefaultOrInsecureJwt) {
    console.error('[SECURITY FATAL] Production startup rejected: Insecure, default, or missing JWT_SECRET (must be >= 32 characters).');
    process.exit(1);
  }

  if (!process.env.MONGO_URI || process.env.MONGO_URI.includes('<username>')) {
    console.error('[SECURITY FATAL] Production startup rejected: Insecure or missing MONGO_URI.');
    process.exit(1);
  }

  if (!process.env.CLIENT_URL) {
    console.warn('[CONFIG WARNING] Missing recommended production CLIENT_URL for CORS.');
  }
}

// Initialize Express App
const app = express();

// Connect to MongoDB
connectDB();

// Parse configured client origins (supports comma-separated list and trims trailing slashes)
const configuredOrigins = (process.env.CLIENT_URL || '')
  .split(',')
  .map((url) => url.trim().replace(/\/+$/, ''))
  .filter(Boolean);

const defaultDevOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  'http://localhost:4173',
];

const allowedOrigins = Array.from(new Set([...defaultDevOrigins, ...configuredOrigins]));

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. mobile apps, curl, uptime monitors, same-origin)
    if (!origin) return callback(null, true);

    const cleanOrigin = origin.replace(/\/+$/, '');

    // Allow if explicitly matched
    if (allowedOrigins.includes(cleanOrigin)) {
      return callback(null, true);
    }

    // Allow Vercel preview deployments if configured origin includes vercel.app
    const isVercelOrigin = /\.vercel\.app$/.test(cleanOrigin);
    const hasVercelConfigured = configuredOrigins.some((url) => url.includes('vercel.app'));
    if (isVercelOrigin && hasVercelConfigured) {
      return callback(null, true);
    }

    // In development mode, allow any local or dev origin
    if (process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// HTTP Request Logging
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
} else {
  app.use(morgan('dev'));
}

// Health Check Routes
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    brand: 'DRAGONBALL GYM',
    tagline: 'Unleash Your Inner Power',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/admin', adminRoutes);

// Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`  DRAGONBALL GYM - EXECUTIVE REST API ENGINE   `);
  console.log(`  Status  : Active & Listening                 `);
  console.log(`  Port    : http://localhost:${PORT}             `);
  console.log(`  Mode    : ${process.env.NODE_ENV || 'development'}`);
  console.log(`===============================================`);
});

export default app;
