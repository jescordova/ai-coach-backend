import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Serveur IA en ligne 🤖"});
})

app.post("/api/chat", (req, res) => {
    const { message } = req.body;

    res.json({
        reply: `Coach IA : j'ai reçu ton message ->  "${message}"`,
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Server lancé sur https://localhost:${PORT}`);
});