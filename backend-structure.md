
# Event Booking Platform Microservices Structure

## Overview
This document outlines the structure for the 4 microservices used in the Event Booking Platform:
- UserService (Port 5000)
- EventService (Port 5001)
- BookingService (Port 5002)
- NotificationService (Port 5003)

Each service will be in its own folder with its own package.json, dependencies, and .env file.

## Common Structure for All Microservices
Each microservice follows this basic structure:
```
ServiceName/
├── .env                  # Environment variables (MongoDB connection, ports, etc.)
├── package.json          # Dependencies and scripts
├── src/
│   ├── index.js          # Entry point
│   ├── config/           # Configuration (database, environment variables)
│   ├── models/           # Data models (MongoDB schemas)
│   ├── routes/           # API routes
│   ├── controllers/      # Request handlers
│   ├── middleware/       # Middleware functions (auth, validation)
│   ├── services/         # Business logic
│   └── utils/            # Utility functions
```

## UserService (Port 5000)
```
UserService/
├── .env
├── package.json
├── src/
│   ├── index.js
│   ├── config/
│   │   ├── db.js           # MongoDB connection
│   │   └── env.js          # Environment variables
│   ├── models/
│   │   └── User.js         # User schema
│   ├── routes/
│   │   ├── authRoutes.js   # Login/signup routes
│   │   └── userRoutes.js   # User profile routes
│   ├── controllers/
│   │   ├── authController.js
│   │   └── userController.js
│   ├── middleware/
│   │   └── auth.js         # JWT authentication
│   └── utils/
│       └── jwtHelper.js    # Token generation
```

## EventService (Port 5001)
```
EventService/
├── .env
├── package.json
├── src/
│   ├── index.js
│   ├── config/
│   ├── models/
│   │   └── Event.js        # Event schema
│   ├── routes/
│   │   └── eventRoutes.js  # Event CRUD & availability
│   ├── controllers/
│   │   └── eventController.js
│   ├── middleware/
│   │   └── auth.js         # JWT verification
│   └── services/
│       └── eventService.js # Event business logic
```

## BookingService (Port 5002)
```
BookingService/
├── .env
├── package.json
├── src/
│   ├── index.js
│   ├── config/
│   ├── models/
│   │   └── Booking.js      # Booking schema
│   ├── routes/
│   │   └── bookingRoutes.js
│   ├── controllers/
│   │   └── bookingController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── services/
│   │   ├── bookingService.js
│   │   └── paymentService.js # Mock payment gateway
│   └── utils/
│       └── rabbitmq.js       # RabbitMQ connection & publish
```

## NotificationService (Port 5003)
```
NotificationService/
├── .env
├── package.json
├── src/
│   ├── index.js
│   ├── config/
│   ├── models/
│   │   └── Notification.js # Notification schema
│   ├── routes/
│   │   └── notificationRoutes.js
│   ├── controllers/
│   │   └── notificationController.js
│   ├── services/
│   │   ├── notificationService.js
│   │   └── emailService.js  # Email sending (mock)
│   └── utils/
│       └── rabbitmq.js      # RabbitMQ consumer
```

## Communication
- **REST API**: For synchronous communication between services
- **RabbitMQ**: For asynchronous communication (BookingService -> NotificationService)

## Environment Variables
Each service will have its own .env file with these variables:
```
# Common in all services
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/service_name
PORT=500x (depending on service)
JWT_SECRET=your_jwt_secret

# Additional for BookingService and NotificationService
RABBITMQ_URL=amqp://guest:guest@localhost
```

## Required npm packages for each service
- express
- mongoose
- dotenv
- cors
- jsonwebtoken
- bcryptjs
- For BookingService & NotificationService:
  - amqplib (for RabbitMQ)
