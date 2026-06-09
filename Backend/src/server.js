const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const  connectDB = require('./config/db');
const errorHandler = require("./middleware/errorMiddleware");
const ticketRoutes =  require("./routes/ticketRoutes")
const userRoutes = require("./routes/userRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
dotenv.config();
connectDB();

const app = express();

app.use(helmet());  
app.use(express.json());    
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
})
);

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        success: false,
        message: 'Too many requests from this IP, please try again after 15 minutes'
    },

});

app.use(limiter);

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to QTechy Support Hub API'
    });
});

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

app.use("/api/tickets", ticketRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        status:'healthy',
        service: "API is healthy"
    });
});
app.use("/api/users", userRoutes);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
