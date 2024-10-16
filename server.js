const express = require('express');
const connectDB = require('./config/db');  
const cors = require('cors');
require('dotenv').config();

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));

app.use('/api/user', require('./routes/user'));

app.use('/api/project', require('./routes/project'));

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));