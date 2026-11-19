/**
 * KrishiConnect AI Kisan Chatbot Powered by Google Gemini 2.5 Flash
 * Key: Configured with custom agricultural system prompt & history
 */

const GEMINI_CONFIG = {
  API_KEY: "AQ.Ab8RN6Is3g58Xd_3mXGTQ0zUbBokVPjWt2NoHf3HyoMR5Zd6eQ",
  MODEL: "gemini-2.5-flash",
  ENDPOINT: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent"
};

const KRISHI_AI_SYSTEM_PROMPT = `You are "Krishi AI (कृषि मित्र)", an expert agricultural AI assistant for the KrishiConnect platform in India.
You assist Indian farmers, agricultural landowners, produce buyers, and students with:
1. Crop cultivation, soil health (pH, Nitrogen, Organic Carbon, fertilizers, pest control, irrigation).
2. KrishiConnect platform guidance (finding unused land, model land-use agreements based on NITI Aayog guidelines, 70/30 crop sharing).
3. e-NAM Mandi prices, APMC market rates, rabi/kharif seasonal crop advice (wheat, paddy, mustard, sugarcane, vegetables, dairy, ghee).
4. Direct farm-to-consumer marketplace advice.

Communication Style:
- Warm, respectful, highly encouraging ("नमस्ते किसान भाई", "Greetings", "जय जवान जय किसान").
- Can reply fluently in English, Hindi, or Hinglish depending on what the user asks.
- Concise, actionable, bulleted points when listing solutions or farming techniques.
- Mention relevant KrishiConnect pages (Find Land, Mandi Rates, Marketplace, Agreements) when applicable.`;

// In-memory conversation history
let krishiChatHistory = [];

// Inject Chatbot Widget into DOM on every page
function initKrishiAIChatbot() {
  if (document.getElementById("krishiAiWidget")) return;

  const widgetHTML = `
    <!-- Floating AI Farmer Circle Button -->
    <div id="krishiAiWidget" class="krishi-ai-floating-container">
      <button id="krishiAiToggleBtn" class="krishi-ai-circle-btn shadow-lg" onclick="toggleKrishiChat()" title="Ask Krishi AI Assistant (Gemini Powered)">
        <div class="farmer-avatar-ring">
          <img src="https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&w=150&q=80" alt="Kisan AI" class="farmer-avatar-img">
        </div>
        <span class="krishi-ai-pulse-badge"></span>
        <span class="krishi-ai-btn-label d-none d-md-inline-block">Ask Krishi AI</span>
      </button>

      <!-- Small Chatbox Window -->
      <div id="krishiAiChatbox" class="krishi-ai-chatbox shadow-2xl d-none">
        <!-- Header -->
        <div class="krishi-ai-header">
          <div class="d-flex align-items-center gap-2">
            <div class="farmer-avatar-sm">
              <img src="https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&w=100&q=80" alt="Kisan">
            </div>
            <div>
              <div class="fw-bold text-white fs-6 lh-1">Krishi AI • कृषि मित्र</div>
              <small class="text-white-50" style="font-size:0.75rem;">Powered by Gemini 2.5 Flash</small>
            </div>
          </div>
          <div class="d-flex align-items-center gap-1">
            <button class="btn btn-sm btn-link text-white p-1" onclick="clearKrishiChat()" title="Clear Chat"><i class="bi bi-arrow-clockwise"></i></button>
            <button class="btn btn-sm btn-link text-white p-1" onclick="toggleKrishiChat()" title="Close"><i class="bi bi-x-lg"></i></button>
          </div>
        </div>

        <!-- Quick Question Chips -->
        <div class="krishi-ai-chips">
          <span class="chip" onclick="askQuickPrompt('मंडी भाव कैसे चेक करें?')">🌾 Mandi Bhav</span>
          <span class="chip" onclick="askQuickPrompt('How does 70/30 land profit sharing work?')">📜 70/30 Lease</span>
          <span class="chip" onclick="askQuickPrompt('What is the best soil pH for wheat crop?')">🌱 Wheat Soil</span>
          <span class="chip" onclick="askQuickPrompt('How can I sell pure cow ghee directly on KrishiConnect?')">🥛 Sell Ghee</span>
        </div>

        <!-- Messages Area -->
        <div id="krishiChatMessages" class="krishi-ai-messages">
          <div class="krishi-msg bot-msg">
            <div class="bubble">
              <strong>नमस्ते किसान साथी! 🙏</strong><br>
              I am your <strong>Krishi AI Assistant</strong>, powered by Google Gemini. Ask me anything about farming, soil health, Mandi rates, land agreements, or buying/selling crops!
            </div>
          </div>
        </div>

        <!-- Input Area -->
        <form id="krishiChatForm" onsubmit="handleChatSubmit(event)" class="krishi-ai-input-form">
          <div class="input-group">
            <input type="text" id="krishiChatInput" class="form-control" placeholder="Ask any question... (हिंदी या English)" autocomplete="off" required>
            <button type="button" class="btn btn-light text-success border-0 px-2" onclick="voiceInputForChat()" title="Voice Dictate">
              <i class="bi bi-mic-fill"></i>
            </button>
            <button type="submit" id="krishiSendBtn" class="btn btn-success border-0 px-3">
              <i class="bi bi-send-fill"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", widgetHTML);
}

function toggleKrishiChat() {
  const box = document.getElementById("krishiAiChatbox");
  const toggleBtn = document.getElementById("krishiAiToggleBtn");
  if (!box) return;

  if (box.classList.contains("d-none")) {
    box.classList.remove("d-none");
    box.classList.add("animate-fade-in");
    document.getElementById("krishiChatInput").focus();
  } else {
    box.classList.add("d-none");
  }
}

function clearKrishiChat() {
  krishiChatHistory = [];
  const msgArea = document.getElementById("krishiChatMessages");
  msgArea.innerHTML = `
    <div class="krishi-msg bot-msg">
      <div class="bubble">
        <strong>नमस्ते! 🙏</strong> Chat cleared. How can I assist your farming today?
      </div>
    </div>
  `;
}

function askQuickPrompt(text) {
  document.getElementById("krishiChatInput").value = text;
  document.getElementById("krishiChatForm").dispatchEvent(new Event('submit'));
}

async function handleChatSubmit(e) {
  e.preventDefault();
  const input = document.getElementById("krishiChatInput");
  const text = input.value.trim();
  if (!text) return;

  input.value = "";
  appendChatMessage(text, "user");

  // Show typing indicator
  const typingId = appendTypingIndicator();

  try {
    const aiReply = await callGeminiAPI(text);
    removeTypingIndicator(typingId);
    appendChatMessage(aiReply, "bot");
  } catch (err) {
    removeTypingIndicator(typingId);
    appendChatMessage("माफ़ कीजिये, AI सेवा से संपर्क नहीं हो पाया। Please verify network connection or try again shortly.", "bot");
    console.error("Gemini AI Error:", err);
  }
}

function appendChatMessage(text, sender) {
  const container = document.getElementById("krishiChatMessages");
  const div = document.createElement("div");
  div.className = `krishi-msg ${sender === 'user' ? 'user-msg' : 'bot-msg'}`;

  // Simple formatting: Convert newlines and markdown-like bold
  const formatted = text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>');

  div.innerHTML = `<div class="bubble">${formatted}</div>`;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function appendTypingIndicator() {
  const container = document.getElementById("krishiChatMessages");
  const id = "typing-" + Date.now();
  const div = document.createElement("div");
  div.id = id;
  div.className = "krishi-msg bot-msg";
  div.innerHTML = `
    <div class="bubble typing-bubble">
      <span></span><span></span><span></span>
    </div>
  `;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
  return id;
}

function removeTypingIndicator(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

async function callGeminiAPI(userPrompt) {
  // Add to conversation history
  krishiChatHistory.push({
    role: "user",
    parts: [{ text: userPrompt }]
  });

  // Keep last 8 turns to avoid token overflow
  if (krishiChatHistory.length > 8) {
    krishiChatHistory = krishiChatHistory.slice(-8);
  }

  const payload = {
    system_instruction: {
      parts: [{ text: KRISHI_AI_SYSTEM_PROMPT }]
    },
    contents: krishiChatHistory,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 600
    }
  };

  const response = await fetch(`${GEMINI_CONFIG.ENDPOINT}?key=${GEMINI_CONFIG.API_KEY}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`Gemini HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  const botText = data.candidates?.[0]?.content?.parts?.[0]?.text || "कृषि कनेक्ट में आपकी सहायता के लिए धन्यवाद।";

  // Record bot response in history
  krishiChatHistory.push({
    role: "model",
    parts: [{ text: botText }]
  });

  return botText;
}

// Voice input using Web Speech Recognition
function voiceInputForChat() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    showToast("Voice recognition not supported in this browser. Try Chrome/Edge.", "info");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = 'hi-IN';
  recognition.interimResults = false;

  showToast("Listening... बोलिए (Speak now)", "info");
  recognition.start();

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    document.getElementById("krishiChatInput").value = transcript;
    document.getElementById("krishiChatForm").dispatchEvent(new Event('submit'));
  };

  recognition.onerror = (event) => {
    showToast("Could not recognize voice: " + event.error, "danger");
  };
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  initKrishiAIChatbot();
});

