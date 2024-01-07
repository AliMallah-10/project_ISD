const express = require("express");
const app = express();
const cors = require("cors");
const dbconnect = require("./config/dbconnect");
const bodyparse = require("body-parser");
require("dotenv").config(); // Load environment variables from .env file

app.use(
  cors({
    origin: "http://localhost:3001", // Allow requests from this origin
    credentials: true, // Allow credentials (cookies, authorization headers)
  })
);

const appointments = require("./routes/appointmentsRoutes");
const users = require("./routes/usersRoutes");
const comanagerR = require("./routes/coManagerRequestsRoutes");
const doctorRegistration = require("./routes/doctorRegistrationRequestsRoutes");
const DoctorSchedule = require("./routes/doctorSchedulesRoutes");
const patientReminder = require("./routes/patientRemindersRoutes");
const reviewsRating = require("./routes/reviewsRatingsRoutes");

// Access environment variables
const port = process.env.PORT || 7000;
// const mongodbUri = process.env.MONGODB_URI;
// const jwtSecret = process.env.JWT_SECRET;

app.use(bodyparse.json()); // Parse JSON
app.use(bodyparse.urlencoded({ extended: true })); // Parse URL-enc

// todo Routes:

app.use("/Appointments", appointments);
app.use("/Users", users);
app.use("/comanager", comanagerR);
app.use("/DoctorRegisration", doctorRegistration);
app.use("/Doctorschedule", DoctorSchedule);
app.use("/Patientreminder", patientReminder);
app.use("/Reviewsandratings", reviewsRating);
// app.use(cors());

//! Middleware Setup
// app.use(express.json()); // Parse JSON request bodies
// app.use(express.urlencoded({ extended: false })); // Parse URL-encoded request bodies

// //! Import and use your middleware here
// const authenticationMiddleware = require("./middlewares/authenticationMiddleware");
// const authorizationMiddleware = require("./middlewares/authorizationMiddleware");
// const validationMiddleware = require("./middlewares/validationMiddleware");

// //! Use your middleware
// app.use(authenticationMiddleware);
// app.use(authorizationMiddleware);
// app.use(validationMiddleware);

// app.put("/getUserById", (req, res) => {
//   res.send("Hello World!");
// });

app.listen(port, () => {
  console.log(`Good app listening on port ${port}`);
});
