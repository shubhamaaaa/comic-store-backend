const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const comicRoutes = require('./routes/comicRoutes');
// const errorHandler = require('./middlewares/errorMiddleware'); // Uncomment if using error middleware

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// API Routes
app.use('/api/comics', comicRoutes);

// Error Handling Middleware
// app.use(errorHandler); // Uncomment if using error middleware

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
