require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const i18next = require('i18next');
const i18nextMiddleware = require('i18next-http-middleware');
const Backend = require('i18next-fs-backend');
const path = require('path');

// App Init
const app = express();

// Multilingual Setup (i18n)
i18next
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    fallbackLng: 'en',
    backend: {
      loadPath: path.join(__dirname, 'locales/{{lng}}.json')
    }
  });

app.use(i18nextMiddleware.handle(i18next));

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');
const libraryRoutes = require('./routes/libraryRoutes');
const borrowRoutes = require('./routes/borrowRoutes');

app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);
app.use('/api/libraries', libraryRoutes);
app.use('/api/borrow', borrowRoutes);

// Firebase image route (optional if you have it)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Fallback Route
app.use((req, res) => {
  res.status(404).json({ message: req.t('route_not_found') });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: req.t('server_error'), error: err.message });
});

// Server Init
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
