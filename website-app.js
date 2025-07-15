document.addEventListener('DOMContentLoaded', () => {

    // --- Data ---
    const kpiData = {
        30: { revenue: { value: '$2.8M', change: '+18%' }, accuracy: { value: '99.2%', change: '+12%' }, claims: { value: '15.8K', change: '+25%' }, days: { value: '18.5', change: '-22%' }},
        90: { revenue: { value: '$8.4M', change: '+22%' }, accuracy: { value: '98.9%', change: '+15%' }, claims: { value: '47.2K', change: '+30%' }, days: { value: '19.2', change: '-18%' }},
        365: { revenue: { value: '$34.2M', change: '+35%' }, accuracy: { value: '98.4%', change: '+28%' }, claims: { value: '189K', change: '+42%' }, days: { value: '21.8', change: '-25%' }}
    };

    // --- Functions ---
    
    /**
     * Hides all sections and shows the one with the specified ID.
     * @param {string} sectionId The ID of the section to show.
     */
    function showSection(sectionId) {
        document.querySelectorAll('section[id]').forEach(section => {
            section.classList.add('hidden');
        });

        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.remove('hidden');
        }

        // Update navigation active state
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
        
        if (sectionId === 'dashboard') {
            updateKPIs();
        }
    }

    /**
     * Updates the KPI cards on the dashboard based on the selected time period.
     */
    function updateKPIs() {
        const timePeriodSelect = document.getElementById('time-period');
        const kpiGrid = document.getElementById('kpi-grid');
        
        if (!timePeriodSelect || !kpiGrid) return;

        const period = timePeriodSelect.value;
        const data = kpiData[period];

        kpiGrid.innerHTML = `
            <div class="kpi-card"><div class="metric-value">${data.revenue.value}</div><div class="metric-label">Total Revenue (${data.revenue.change})</div></div>
            <div class="kpi-card"><div class="metric-value">${data.accuracy.value}</div><div class="metric-label">Claim Accuracy (${data.accuracy.change})</div></div>
            <div class="kpi-card"><div class="metric-value">${data.claims.value}</div><div class="metric-label">Claims Processed (${data.claims.change})</div></div>
            <div class="kpi-card"><div class="metric-value">${data.days.value}</div><div class="metric-label">Avg Collection Days (${data.days.change})</div></div>
        `;
    }

    /**
     * Generates a simulated AI response based on keywords in the user's message.
     * @param {string} message The user's input message.
     * @returns {string} The simulated AI response.
     */
    function getAIResponse(message) {
        const lowerMessage = message.toLowerCase();
        if (lowerMessage.includes('denial') || lowerMessage.includes('reject')) {
            return "Our AI system has reduced denial rates by 95% on average by catching common errors in coding, documentation, and eligibility. Would you like to explore a specific area?";
        } else if (lowerMessage.includes('revenue') || lowerMessage.includes('money')) {
            return "We help optimize revenue by accelerating claim processing to an average of 18 days and automating follow-ups. This typically increases collections by over 20%.";
        } else if (lowerMessage.includes('claim') || lowerMessage.includes('billing')) {
            return "Our smart claim validation catches 99.8% of errors before submission by checking coding accuracy, documentation, and payer-specific requirements in real-time.";
        } else {
            return "Thanks for your question! I can assist with claim processing, denial management, and revenue optimization. What specific area would you like to explore?";
        }
    }
    
    /**
     * Appends a message to the chat interface.
     * @param {string} text The message text to display.
     * @param {string} sender The sender of the message ('user' or 'ai').
     */
    function addMessageToChat(text, sender) {
        const messagesContainer = document.getElementById('chat-messages');
        if (!messagesContainer) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = 'message';
        
        if (sender === 'user') {
            messageDiv.innerHTML = `<div class="message-content" style="background: var(--color-blue-600); color: var(--color-white); margin-left: auto;">${text}</div>`;
        } else {
            messageDiv.innerHTML = `<div class="message-avatar">AI</div><div class="message-content">${text}</div>`;
        }
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // --- Event Listeners Setup ---

    // Use Event Delegation for Navigation
    document.body.addEventListener('click', (e) => {
        const target = e.target.closest('a[href^="#"], button[data-section]');
        if (target) {
            e.preventDefault();
            const sectionId = target.dataset.section || target.getAttribute('href').substring(1);
            if (sectionId) {
                showSection(sectionId);
            }
        }
    });

    // Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            const navMenu = document.getElementById('nav-menu');
            if (navMenu) {
                // Toggling a class is better for CSS control
                navMenu.classList.toggle('active-mobile'); 
            }
        });
    }

    // Dashboard Time Period Selector
    const timePeriodSelect = document.getElementById('time-period');
    if (timePeriodSelect) {
        timePeriodSelect.addEventListener('change', updateKPIs);
    }
    
    // AI Chat Submission
    const chatSendButton = document.getElementById('chat-send');
    const chatInput = document.getElementById('chat-input');
    
    function handleChatSubmit() {
        if (chatInput && chatInput.value.trim() !== '') {
            const userMessage = chatInput.value.trim();
            addMessageToChat(userMessage, 'user');
            chatInput.value = '';

            setTimeout(() => {
                const aiResponse = getAIResponse(userMessage);
                addMessageToChat(aiResponse, 'ai');
            }, 1000);
        }
    }

    if (chatSendButton) {
        chatSendButton.addEventListener('click', handleChatSubmit);
    }
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleChatSubmit();
            }
        });
    }

    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.textContent = 'Submitting...';
            submitButton.disabled = true;

            setTimeout(() => {
                alert('Thank you for your interest! Our team will contact you within 24 hours.');
                contactForm.reset();
                submitButton.textContent = 'Request Demo';
                submitButton.disabled = false;
            }, 1500);
        });
    }

    // --- Initializer ---
    showSection('home'); // Show home section by default
});
