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
    Tu ne donnes jamais de réponses trop complexes.
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

    const lastUserMessage = agent.memory.filter((m) => m.from === "user").slice(-1)[0]?.content || "";

    if (lastUserMessage.toLowerCase().includes("react")) {
        reply = "React, c’est comme des briques LEGO pour construire ton site 🧩";
    } else if (lastUserMessage.toLowerCase().includes("typescript")) {
        reply = "TypeScript t’aide à éviter les erreurs avant même de lancer l’app 🛡️";
    } else {
        reply = "Dis-moi ce que tu veux apprendre aujourd’hui, on avance ensemble 💪";
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