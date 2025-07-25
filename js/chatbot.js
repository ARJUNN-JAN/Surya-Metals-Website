// Chatbot functionality
class SuryaMetalsChatbot {
    constructor() {
        this.isOpen = false;
        this.currentLanguage = 'en';
        this.recognition = null;
        this.synthesis = window.speechSynthesis;
        this.companyInfo = {
            name: "Surya Metals",
            tagline: "Shaping Steel. Building Futures.",
            owner: "Mr. Binu V. M.",
            services: ["5-star hotel construction", "commercial buildings", "industrial structures", "custom fabrication"],
            location: "IDA Plot, Champannoor Industrial Estate, Angamaly South, Ernakulam, Kerala - 683573",
            phone: "+91 98XXXXXXXX",
            email: "info@suryametals.com"
        };
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeSpeechRecognition();
        this.showWelcomeMessage();
    }

    setupEventListeners() {
        const toggleBtn = document.getElementById('chatbot-toggle');
        const closeBtn = document.getElementById('chatbot-close');
        const sendBtn = document.getElementById('send-btn');
        const voiceBtn = document.getElementById('voice-btn');
        const input = document.getElementById('chatbot-input');

        toggleBtn.addEventListener('click', () => this.toggleChat());
        closeBtn.addEventListener('click', () => this.closeChat());
        sendBtn.addEventListener('click', () => this.sendMessage());
        voiceBtn.addEventListener('click', () => this.startVoiceRecognition());
        
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
    }

    initializeSpeechRecognition() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            this.recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            this.recognition.lang = 'en-US';

            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                document.getElementById('chatbot-input').value = transcript;
                this.sendMessage();
            };
        }
    }

    toggleChat() {
        const chatbot = document.getElementById('chatbot');
        if (this.isOpen) {
            this.closeChat();
        } else {
            chatbot.style.display = 'flex';
            this.isOpen = true;
        }
    }

    closeChat() {
        const chatbot = document.getElementById('chatbot');
        chatbot.style.display = 'none';
        this.isOpen = false;
    }

    showWelcomeMessage() {
        setTimeout(() => {
            this.addMessage("Hello! I'm Demma, your assistant from Surya Metals. How can I help you today? / ഹലോ! ഞാൻ സൂര്യ മെറ്റൽസിൽ നിന്നുള്ള നിങ്ങളുടെ സഹായി ഡെമ്മയാണ്. ഇന്ന് എങ്ങനെ സഹായിക്കാം?", 'bot');
        }, 1000);
    }

    sendMessage() {
        const input = document.getElementById('chatbot-input');
        const message = input.value.trim();
        
        if (!message) return;

        this.addMessage(message, 'user');
        input.value = '';

        // Simulate processing delay
        setTimeout(() => {
            const response = this.generateResponse(message);
            this.addMessage(response, 'bot');
            this.speakResponse(response);
        }, 1000);
    }

    addMessage(message, sender) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        messageDiv.innerHTML = `
            <div class="message-content">
                ${message}
            </div>
            <div class="message-time">
                ${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </div>
        `;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    generateResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Detect language
        if (this.containsMalayalam(message)) {
            this.currentLanguage = 'ml';
            return this.getMalayalamResponse(lowerMessage);
        } else {
            this.currentLanguage = 'en';
            return this.getEnglishResponse(lowerMessage);
        }
    }

    containsMalayalam(text) {
        // Simple check for Malayalam characters
        return /[\u0D00-\u0D7F]/.test(text);
    }

    getEnglishResponse(message) {
        // Services related
        if (message.includes('service') || message.includes('what do you do')) {
            return `We specialize in: ${this.companyInfo.services.join(', ')}. We're experts in steel fabrication for luxury hotels, commercial buildings, and custom industrial projects.`;
        }
        
        // Location related
        if (message.includes('location') || message.includes('address') || message.includes('where')) {
            return `We're located at ${this.companyInfo.location}. We serve clients across Kerala and neighboring states.`;
        }
        
        // Contact related
        if (message.includes('contact') || message.includes('phone') || message.includes('call')) {
            return `You can reach us at ${this.companyInfo.phone} or email us at ${this.companyInfo.email}. Would you like me to help you schedule a consultation?`;
        }
        
        // About company
        if (message.includes('about') || message.includes('company') || message.includes('surya metals')) {
            return `${this.companyInfo.name} is Kerala's leading steel fabrication company led by ${this.companyInfo.owner}, Vice President of KSSIA Ernakulam District. Our tagline: "${this.companyInfo.tagline}"`;
        }
        
        // Project inquiry
        if (message.includes('project') || message.includes('quote') || message.includes('estimate')) {
            return `I'd be happy to help with your project! Could you please provide details about: 1) Project type (hotel, commercial, industrial) 2) Location 3) Timeline 4) Your contact information?`;
        }
        
        // Greeting
        if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
            return `Hello! Welcome to Surya Metals. I'm here to assist you with any questions about our steel fabrication services. How can I help you today?`;
        }
        
        // Default response
        return `Thank you for your message. I'm here to help with information about our steel fabrication services, projects, location, and contact details. Could you please be more specific about what you'd like to know?`;
    }

    getMalayalamResponse(message) {
        // Basic Malayalam responses (you can expand this)
        if (message.includes('സേവന') || message.includes('എന്താണ്')) {
            return `ഞങ്ങൾ ഇവയിൽ സ്പെഷ്യലൈസ് ചെയ്യുന്നു: ഫൈവ് സ്റ്റാർ ഹോട്ടൽ നിർമ്മാണം, വാണിജ്യ കെട്ടിടങ്ങൾ, വ്യാവസായിക ഘടനകൾ, കസ്റ്റം ഫാബ്രിക്കേഷൻ.`;
        }
        
        if (message.includes('സ്ഥലം') || message.includes('വിലാസം')) {
            return `ഞങ്ങളുടെ സ്ഥലം: ${this.companyInfo.location}. കേരളത്തിലും അയൽ സംസ്ഥാനങ്ങളിലും സേവനം നൽകുന്നു.`;
        }
        
        return `നിങ്ങളുടെ സന്ദേശത്തിന് നന്ദി. ഞങ്ങളുടെ സ്റ്റീൽ ഫാബ്രിക്കേഷൻ സേവനങ്ങളെക്കുറിച്ച് കൂടുതൽ അറിയാൻ ആഗ്രഹിക്കുന്നുണ്ടോ?`;
    }

    speakResponse(text) {
        if (this.synthesis && this.synthesis.speaking) {
            this.synthesis.cancel();
        }

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = this.currentLanguage === 'ml' ? 'hi-IN' : 'en-US'; // Using Hindi for Malayalam approximation
        utterance.rate = 0.8;
        utterance.pitch = 1;

        this.synthesis.speak(utterance);
    }

    startVoiceRecognition() {
        if (this.recognition) {
            this.recognition.lang = this.currentLanguage === 'ml' ? 'hi-IN' : 'en-US';
            this.recognition.start();
        }
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SuryaMetalsChatbot();
});

// Add CSS for chatbot messages
const chatbotStyles = `
.message {
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
}

.message.user {
    align-items: flex-end;
}

.message.bot {
    align-items: flex-start;
}

.message-content {
    max-width: 80%;
    padding: 0.5rem 1rem;
    border-radius: 1rem;
    word-wrap: break-word;
}

.message.user .message-content {
    background: #2c5aa0;
    color: white;
}

.message.bot .message-content {
    background: #f1f1f1;
    color: #333;
}

.message-time {
    font-size: 0.7rem;
    color: #999;
    margin-top: 0.25rem;
    padding: 0 0.5rem;
}
`;

// Inject chatbot styles
const style = document.createElement('style');
style.textContent = chatbotStyles;
document.head.appendChild(style);
