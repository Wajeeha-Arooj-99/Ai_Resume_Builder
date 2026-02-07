import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 300;

app.use(express.json())
app.use(cors())

app.get('/', (req, res)=> res.send("Server is live..."))