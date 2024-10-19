const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const multer = require('multer');

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Middleware
app.use(bodyParser.json());
app.use(express.static(__dirname)); // Serve HTML from the same directory

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Farmnest', {
});

// Define a Mongoose schema and model
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    mobile: Number,
    password: String,
});

const User = mongoose.model('User', userSchema);

// API endpoint to handle form submissionno
app.post('/submit', async (req, res) => {
  try {
    const { firstName, lastName, email, mobile, password } = req.body;

    // Save to MongoDB
    const newUser = new User({firstName, lastName, email, mobile, password });
    await newUser.save();

    res.json({ message: 'Data saved successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving data.' });
  }
});


// API endpoint for login
app.post('/login', async (req, res) => {
    try {
      const { email,password } = req.body;
  
      // Search for the user by email
      const user = await User.findOne({ email, password });
      if (user) {
        res.json({ success: true, firstName:user.firstName, password: user.password}
        );
      } else {
        res.json({ success: false, message: 'User not found.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error logging in.' });
    }
  });

  const sellerSchema = new mongoose.Schema({
    Name: String,
    DateOfBirth: Date,
    SelectIdentityCard: String,
    IdentityCardNumber: Number,
    Address: String,
    MobileNumber: Number,
    Email: String,
    Password: String,
  });
  
  const Seller = mongoose.model('Seller', sellerSchema);
  
  // API endpoint to handle form submissions
  app.post('/submit-seller', async (req, res) => {
    try {
      const {
        Name,
        DateOfBirth,
        SelectIdentityCard,
        IdentityCardNumber,
        Address,
        MobileNumber,
        Email,
        Password,
      } = req.body;
  
      // Create a new seller document
      const newSeller = new Seller({
        Name,
        DateOfBirth,
        SelectIdentityCard,
        IdentityCardNumber,
        Address,
        MobileNumber,
        Email,
        Password,
      });
  
      // Save the seller to the database
      await newSeller.save();
  
      res.json({ message: 'Data saved successfully! Welcome, seller.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error saving data.' });
    }
  });
  

// Start the server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
