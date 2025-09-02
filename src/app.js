// import express from "express";

// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({extended: true}))

// export default app;


import express from "express";
import cors from "cors"; 

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// allowed hosts
const allowedOrigins = ['http://localhost:3000', "https://autietravel.com", "https://www.autietravel.com"]

const corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
};

app.use(cors(corsOptions));

export default app;
