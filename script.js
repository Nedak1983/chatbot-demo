// Elemente holen
const bubble = document.getElementById("chat-bubble");
const windowEl = document.getElementById("chat-window");
const closeBtn = document.getElementById("chat-close");
const input = document.getElementById("chat-input");
const sendBtn = document.getElementById("chat-send");
const messages = document.getElementById("chat-messages");

// Öffnen / Schließen
bubble.onclick = () => {
  windowEl.classList.remove("hidden");
};

closeBtn.onclick = () => {
  windowEl.classList.add("hidden");
};

// Nachricht anzeigen
function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.textContent = text;
  msg.style.margin = "6px 0";
  msg.style.textAlign = sender === "user" ? "right" : "left";
  messages.appendChild(msg);
  messages.scrollTop = messages.scrollHeight;
}

// Nachricht senden
async function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  const response = await fetch("https://vait.app.n8n.cloud/webhook/1046e82e-5bb3-47c9-bf4c-ae8c44e0909c/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: text,
      user: "test-user"
    })
  });

  const data = await response.json();
  addMessage(data.reply, "bot");
}

// Events
sendBtn.onclick = sendMessage;

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});

