
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const authRoutes =require("./adzone-backend/routes/authRoutes")
const app = express();


app.use(express.json());
const PORT = process.env.PORT || 5000;
const MONGO_URI = 'mongodb://localhost:27017/adZone';  
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:3001",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
app.use(bodyParser.json());

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

  app.use("/api", authRoutes);
  

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
