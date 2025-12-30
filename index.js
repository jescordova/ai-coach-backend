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

const actions = {
    GIVE_EXERCISE: "give_exercise",
    GIVE_EXPLANATION: "give_explanation",
    ENCOURAGE: "encourage",
};

function decideAction(message) {
  const msg = message.toLowerCase();

  if (msg.includes("exercice") || msg.includes("pratique")) {
    return actions.GIVE_EXERCISE;
  }

  if (msg.includes("react") || msg.includes("typescript")) {
    return actions.GIVE_EXPLANATION;
  }

  return actions.ENCOURAGE;
}

app.post("/api/chat", (req, res) => {
    const { message } = req.body;

    agent.state = "thinking";
    saveToMemory("user", message);

    const action = decideAction(message);

    let reply = "";

    switch (action) {
    case actions.GIVE_EXERCISE:
        reply =
            "🛠️ Exercice: crée un composant React `Button` avec une prop `label`.\n" +
            "Objectif: comprendre les props.\n" +
            "Tu peux le faire 💪";
        break;

        case actions.GIVE_EXPLANATION:
        reply =
            "📘 Explication simple: React, c’est des composants réutilisables 🧩.\n" +
            "Petit conseil: commence toujours petit.\n" +
            "Tu avances bien 👏";
        break;

        default:
        reply =
            "Je suis là pour t’aider. Dis-moi ce que tu veux apprendre aujourd’hui 🙂";
    }

    saveToMemory("agent", reply);
    agent.state = "answering";

    res.json({
        reply,
        action,
        state: agent.state,
        memorySize: agent.memory.length,
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Server lancé sur https://localhost:${PORT}`);
});