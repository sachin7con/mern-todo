require("dotenv").config();
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("API is running...");
}); // for backend response  

connectDB();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});