import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const agentRules = `
    Tu es un coach IA pour développeur.
    Tu expliques simplement, comme à un enfant.
    Tu encourages toujours l'utilisateur.
    Tu poses des questions pour aider à avancer.
    Tu ne donnes jamais de réponses trop longues.
`;

app.get("/", (req, res) => {
    res.json({ message: "Serveur IA en ligne 🤖"});
})

// 🧠 Agent IA simple
const agent = {
    role: "Coach IA pour développeur déutant",
    state: "idle", // idle | thinking | answering
    memory: [], // historique des messages
}

app.post("/api/chat", (req, res) => {
    const { message } = req.body;

    agent.state = "thinking";

    agent.memory.push({
        from: "user",
        content: message,
    });

    let reply = "";

// Exemple d'application des règles
const isSimpleLanguage = agentRules.includes("enfant");
const mustEncourage = agentRules.includes("encourages");

if (message.toLowerCase().includes("react")) {
    reply = isSimpleLanguage
        ? "React, c’est comme des LEGO pour construire un site 🧩"
        : "React est une librairie UI.";

    if (mustEncourage) {
        reply += " Tu avances super bien 💪";
    }
    } else {
    reply = "Dis-moi ce que tu veux apprendre, je suis là pour t’aider 🙂";
    }

    agent.memory.push({
        from: "agent",
        content: reply,
    });

    agent.state = "answering";

    res.json({
        reply,
        state: agent.state,
        memorySize: agent.memory.length
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Server lancé sur https://localhost:${PORT}`);
});