const express = require("express");  // express server
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();  //config method

connectDb();
const app = express();   // creation of app
const port = process.env.PORT || 5000;   // port

app.use(express.json());   // provides a parser

app.use("/api/contacts",require("./routes/contactRoutes"));
app.use("/api/users",require("./routes/userRoutes"));
app.use(errorHandler);  // used the middleware

// listen on the port we created
// a callback
app.listen(port, ()=>{
    console.log(`server running on port ${port}`);
});
