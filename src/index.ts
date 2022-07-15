import express from "express";
import mongoose, { ConnectOptions } from "mongoose";
import { json } from "body-parser";
import cors from "cors";
import morgan from "morgan";
import  helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import swaggerDocument  from "./swagger.json";
import { CarRouter } from "./routes/car";

// defining the Express app
const app = express();

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

//adding express router
app.use(CarRouter);

// Connecting to Mongo DB
mongoose.connect('mongodb://mongo:27017/cardb', {useNewUrlParser: true} as ConnectOptions);
const conn = mongoose.connection;
conn.on('connected', () => {
    console.log('database is connected successfully');
});
conn.on('disconnected',() =>{
    console.log('database is disconnected successfully');
})
conn.on('error', console.error.bind(console, 'connection error:'));

//swagger documentation about api
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// starting the server
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
