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
    goal: "Aider l'utilisateur à progresser en développement web pas à pas",
    plan: [
        "Comprendre la question",
        "Expliquer simplement",
        "Donner un petit conseil pratique",
        "Encourager l'utilisateur",
    ],
    memory: [], // historique des messages
}

const MAX_MEMORY = 6;

function saveToMemory(from, content) {
  agent.memory.push({ from, content });

  if (agent.memory.length > MAX_MEMORY) {
    agent.memory.shift(); // supprime le plus ancien
  }
}

app.post("/api/chat", (req, res) => {
    const { message } = req.body;

    agent.state = "thinking";
    saveToMemory("user", message);

    let reply = "";

    if (message.toLowerCase().includes("react")) {
        reply = "🎯 Objectif: progresser.\n";
        reply += "React, c’est comme des briques LEGO pour ton site 🧩.\n";
        reply += "👉 Conseil: crée un petit composant aujourd’hui.\n";
        reply += "Tu avances bien 💪";
    } else {
        reply =
        "Dis-moi ce que tu veux apprendre aujourd’hui, on fait ça étape par étape 🙂";
    }
    saveToMemory("agent", reply);
    agent.state = "answering";

    res.json({
        reply,
        goal: agent.goal,
        state: agent.state,
        memory: agent.memory,
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Server lancé sur https://localhost:${PORT}`);
});