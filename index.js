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
    let reply = "Je ne comprends pas encore 🤔";

    if (message.toLowerCase().includes("react")) {
        reply = "React est une librairie pour créer des interfaces UI 🧩";
    } else if (message.toLowerCase().includes("typescript")) {
        reply = "TypeScript aide à éviter des bugs grâce aux types 🛡️"
    } else if (message.toLowerCase().includes("ia")) {
        reply = "L’IA, c’est donner des règles + du contexte + un objectif 🧠";
    } else if (message.toLowerCase().includes("chatgpt")) {
        reply = "ChatGPT est un assistant IA créé par OpenAI 🤖"
    } else if (message.toLowerCase().includes("openai")) {
        reply = "OpenAI est une entreprise qui développe des IA 🤖"
    }

    res.json({ reply });
});

app.listen(PORT, () => {
    console.log(`🚀 Server lancé sur https://localhost:${PORT}`);
});