const express   = require('express'); 
const connectDB = require('./config/connect');
const path      = require('path');

const app = express();

// Connect to the database
connectDB();

// View Engine and Middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

// Set the static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', require('./routes/routes'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on ${PORT}...`));

