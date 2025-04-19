
// Savvy AI Support Widget
// This file would be hosted on a CDN in production

(function() {
  // Configuration (would be loaded from API in production)
  let config = {
    apiKey: null,
    brandName: "Savvy AI",
    brandColor: "#4F46E5",
    welcomeMessage: "👋 Hi there! I'm your AI assistant. How can I help you today?",
    placeholderText: "Type your question...",
    initialPromptsEnabled: true,
    initialPrompts: [
      "How do I track my order?",
      "What's your return policy?",
      "Do you offer international shipping?"
    ],
    widgetPosition: "bottom-right",
    theme: "light",
    showTimestamp: true
  };

  // Load config from script tag attributes
  function loadConfig() {
    const scriptTag = document.currentScript || (function() {
      const scripts = document.getElementsByTagName('script');
      return scripts[scripts.length - 1];
    })();
    
    if (scriptTag) {
      // Get API key
      config.apiKey = scriptTag.getAttribute('data-api-key');
      
      // Optional overrides
      const position = scriptTag.getAttribute('data-position');
      if (position === 'left') config.widgetPosition = 'bottom-left';
      
      const color = scriptTag.getAttribute('data-color');
      if (color) config.brandColor = color;
      
      const brandName = scriptTag.getAttribute('data-brand-name');
      if (brandName) config.brandName = brandName;
    }
    
    // In production, we would fetch full config from server using API key
    if (config.apiKey) {
      // fetchConfigFromServer(config.apiKey).then(serverConfig => {
      //   config = { ...config, ...serverConfig };
      //   initWidget();
      // });
    }
    
    return config;
  }

  // Create the chat widget DOM element
  function createWidgetElement() {
    // Create container
    const container = document.createElement('div');
    container.id = 'savvy-ai-container';
    container.style.position = 'fixed';
    container.style.zIndex = '9999';
    
    if (config.widgetPosition === 'bottom-left') {
      container.style.left = '20px';
      container.style.bottom = '20px';
    } else {
      container.style.right = '20px';
      container.style.bottom = '20px';
    }
    
    // Create chat button
    const button = document.createElement('button');
    button.id = 'savvy-ai-button';
    button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>';
    button.style.width = '56px';
    button.style.height = '56px';
    button.style.borderRadius = '50%';
    button.style.backgroundColor = config.brandColor;
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    button.style.cursor = 'pointer';
    button.style.display = 'flex';
    button.style.alignItems = 'center';
    button.style.justifyContent = 'center';
    
    // Add event listener to toggle chat window
    button.addEventListener('click', toggleChatWindow);
    
    container.appendChild(button);
    document.body.appendChild(container);
    
    return container;
  }

  // Create the chat window
  function createChatWindow() {
    const chatContainer = document.createElement('div');
    chatContainer.id = 'savvy-ai-chat';
    chatContainer.style.display = 'none';
    chatContainer.style.position = 'fixed';
    chatContainer.style.width = '350px';
    chatContainer.style.height = '500px';
    chatContainer.style.maxHeight = '80vh';
    chatContainer.style.backgroundColor = 'white';
    chatContainer.style.borderRadius = '12px';
    chatContainer.style.overflow = 'hidden';
    chatContainer.style.boxShadow = '0 10px 15px rgba(0, 0, 0, 0.1)';
    chatContainer.style.flexDirection = 'column';
    chatContainer.style.marginBottom = '70px';
    
    if (config.widgetPosition === 'bottom-left') {
      chatContainer.style.left = '20px';
      chatContainer.style.bottom = '20px';
    } else {
      chatContainer.style.right = '20px';
      chatContainer.style.bottom = '20px';
    }
    
    // Chat header
    const chatHeader = document.createElement('div');
    chatHeader.style.backgroundColor = config.brandColor;
    chatHeader.style.color = 'white';
    chatHeader.style.padding = '12px 16px';
    chatHeader.style.fontWeight = 'bold';
    chatHeader.style.display = 'flex';
    chatHeader.style.justifyContent = 'space-between';
    chatHeader.style.alignItems = 'center';
    chatHeader.innerHTML = `
      <div>${config.brandName} Support</div>
      <div id="savvy-ai-close" style="cursor: pointer;">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </div>
    `;
    
    // Chat messages container
    const chatMessages = document.createElement('div');
    chatMessages.id = 'savvy-ai-messages';
    chatMessages.style.height = 'calc(100% - 120px)';
    chatMessages.style.overflow = 'auto';
    chatMessages.style.padding = '16px';
    
    // Add welcome message
    const welcomeMessage = document.createElement('div');
    welcomeMessage.className = 'savvy-ai-message savvy-ai-bot';
    welcomeMessage.innerHTML = `
      <div style="display: flex; margin-bottom: 16px;">
        <div style="width: 32px; height: 32px; border-radius: 50%; background-color: ${config.brandColor}; display: flex; align-items: center; justify-content: center; margin-right: 8px;">
          <span style="color: white; font-size: 14px;">AI</span>
        </div>
        <div style="background-color: #EBF5FF; padding: 12px 16px; border-radius: 12px; max-width: 80%;">
          <div>${config.welcomeMessage}</div>
          <div style="font-size: 11px; color: #666; margin-top: 4px;">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
        </div>
      </div>
    `;
    chatMessages.appendChild(welcomeMessage);
    
    // Chat input
    const chatInputContainer = document.createElement('div');
    chatInputContainer.style.borderTop = '1px solid #eee';
    chatInputContainer.style.padding = '16px';
    
    // Suggested prompts
    if (config.initialPromptsEnabled && config.initialPrompts.length > 0) {
      const suggestedPrompts = document.createElement('div');
      suggestedPrompts.style.display = 'flex';
      suggestedPrompts.style.flexWrap = 'wrap';
      suggestedPrompts.style.gap = '8px';
      suggestedPrompts.style.marginBottom = '12px';
      
      config.initialPrompts.forEach(prompt => {
        const promptButton = document.createElement('button');
        promptButton.innerText = prompt;
        promptButton.style.backgroundColor = '#F3F4F6';
        promptButton.style.border = 'none';
        promptButton.style.padding = '6px 12px';
        promptButton.style.borderRadius = '16px';
        promptButton.style.fontSize = '12px';
        promptButton.style.cursor = 'pointer';
        
        promptButton.addEventListener('click', () => {
          sendMessage(prompt);
        });
        
        suggestedPrompts.appendChild(promptButton);
      });
      
      chatInputContainer.appendChild(suggestedPrompts);
    }
    
    // Input form
    const inputForm = document.createElement('form');
    inputForm.id = 'savvy-ai-input-form';
    inputForm.style.display = 'flex';
    inputForm.style.gap = '8px';
    
    const textInput = document.createElement('input');
    textInput.id = 'savvy-ai-input';
    textInput.type = 'text';
    textInput.placeholder = config.placeholderText;
    textInput.style.flex = '1';
    textInput.style.padding = '10px 16px';
    textInput.style.borderRadius = '8px';
    textInput.style.border = '1px solid #ddd';
    
    const sendButton = document.createElement('button');
    sendButton.type = 'submit';
    sendButton.style.backgroundColor = config.brandColor;
    sendButton.style.color = 'white';
    sendButton.style.border = 'none';
    sendButton.style.borderRadius = '8px';
    sendButton.style.padding = '10px';
    sendButton.style.cursor = 'pointer';
    sendButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
    `;
    
    inputForm.appendChild(textInput);
    inputForm.appendChild(sendButton);
    chatInputContainer.appendChild(inputForm);
    
    // Build chat window
    chatContainer.appendChild(chatHeader);
    chatContainer.appendChild(chatMessages);
    chatContainer.appendChild(chatInputContainer);
    
    // Add event listeners
    document.getElementById('savvy-ai-container').appendChild(chatContainer);
    document.getElementById('savvy-ai-close').addEventListener('click', toggleChatWindow);
    document.getElementById('savvy-ai-input-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('savvy-ai-input') as HTMLInputElement;
      const message = input.value.trim();
      if (message) {
        sendMessage(message);
        input.value = '';
      }
    });
    
    return chatContainer;
  }

  // Toggle chat window
  function toggleChatWindow() {
    const chatWindow = document.getElementById('savvy-ai-chat');
    const button = document.getElementById('savvy-ai-button');
    
    if (chatWindow.style.display === 'none') {
      chatWindow.style.display = 'flex';
      button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
      document.getElementById('savvy-ai-input').focus();
    } else {
      chatWindow.style.display = 'none';
      button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>';
    }
  }

  // Extract page data for context (simplified version)
  function extractPageData() {
    return {
      url: window.location.href,
      title: document.title,
      meta: Array.from(document.querySelectorAll('meta'))
        .reduce((acc, meta) => {
          if (meta.name && meta.content) {
            acc[meta.name] = meta.content;
          }
          return acc;
        }, {}),
      // In a real implementation, we would scan for product information,
      // prices, and other structured data
    };
  }

  // Send message to AI
  function sendMessage(message) {
    const messagesContainer = document.getElementById('savvy-ai-messages');
    
    // Add user message
    const userMessageElement = document.createElement('div');
    userMessageElement.className = 'savvy-ai-message savvy-ai-user';
    userMessageElement.innerHTML = `
      <div style="display: flex; justify-content: flex-end; margin-bottom: 16px;">
        <div style="background-color: #F3F4F6; padding: 12px 16px; border-radius: 12px; max-width: 80%;">
          <div>${message}</div>
          <div style="font-size: 11px; color: #666; margin-top: 4px;">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
        </div>
        <div style="width: 32px; height: 32px; border-radius: 50%; background-color: #9CA3AF; display: flex; align-items: center; justify-content: center; margin-left: 8px;">
          <span style="color: white; font-size: 14px;">You</span>
        </div>
      </div>
    `;
    messagesContainer.appendChild(userMessageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Display typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'savvy-ai-message savvy-ai-bot savvy-ai-typing';
    typingIndicator.innerHTML = `
      <div style="display: flex; margin-bottom: 16px;">
        <div style="width: 32px; height: 32px; border-radius: 50%; background-color: ${config.brandColor}; display: flex; align-items: center; justify-content: center; margin-right: 8px;">
          <span style="color: white; font-size: 14px;">AI</span>
        </div>
        <div style="background-color: #EBF5FF; padding: 12px 16px; border-radius: 12px; max-width: 80%;">
          <div>
            <span class="typing-dot" style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background-color: #666; margin-right: 4px; animation: typing 1s infinite;"></span>
            <span class="typing-dot" style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background-color: #666; margin-right: 4px; animation: typing 1s infinite 0.2s;"></span>
            <span class="typing-dot" style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background-color: #666; animation: typing 1s infinite 0.4s;"></span>
          </div>
        </div>
      </div>
    `;
    messagesContainer.appendChild(typingIndicator);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Add animation style
    if (!document.getElementById('savvy-ai-styles')) {
      const styleSheet = document.createElement('style');
      styleSheet.id = 'savvy-ai-styles';
      styleSheet.innerHTML = `
        @keyframes typing {
          0% { opacity: 0.3; }
          50% { opacity: 1; }
          100% { opacity: 0.3; }
        }
      `;
      document.head.appendChild(styleSheet);
    }
    
    // Fetch context from current page if enabled
    let context = {};
    if (config.loadPageData) {
      context = extractPageData();
    }
    
    // In a real implementation, this would call your AI backend
    setTimeout(() => {
      // Remove typing indicator
      const typingElement = document.querySelector('.savvy-ai-typing');
      if (typingElement) {
        messagesContainer.removeChild(typingElement);
      }
      
      // Sample responses based on message content
      let response;
      const lowercaseMessage = message.toLowerCase();
      
      if (lowercaseMessage.includes('track') && lowercaseMessage.includes('order')) {
        response = "You can track your order by visiting the 'Order Status' page and entering your order number and email. Alternatively, if you have an account, you can log in to see all your recent orders and their delivery status.";
      } else if (lowercaseMessage.includes('return') || lowercaseMessage.includes('refund')) {
        response = "Our return policy allows returns within 30 days of purchase for a full refund. Items must be unused and in original packaging. You can initiate a return from the 'My Orders' section of your account or contact us directly for assistance.";
      } else if (lowercaseMessage.includes('shipping') && (lowercaseMessage.includes('international') || lowercaseMessage.includes('outside'))) {
        response = "Yes, we offer international shipping to over 50 countries. Shipping costs and delivery times vary by location. You can see the specific options for your country during checkout. For most countries, delivery takes 7-14 business days.";
      } else if (lowercaseMessage.includes('payment') || lowercaseMessage.includes('pay')) {
        response = "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and Apple Pay. All payment information is securely processed and encrypted. For certain regions, we also offer buy-now-pay-later options like Klarna and Afterpay.";
      } else {
        response = "Thank you for your message! I'll do my best to help. Could you provide more details so I can give you the most accurate information?";
      }
      
      // Add AI response
      const botMessageElement = document.createElement('div');
      botMessageElement.className = 'savvy-ai-message savvy-ai-bot';
      botMessageElement.innerHTML = `
        <div style="display: flex; margin-bottom: 16px;">
          <div style="width: 32px; height: 32px; border-radius: 50%; background-color: ${config.brandColor}; display: flex; align-items: center; justify-content: center; margin-right: 8px;">
            <span style="color: white; font-size: 14px;">AI</span>
          </div>
          <div style="background-color: #EBF5FF; padding: 12px 16px; border-radius: 12px; max-width: 80%;">
            <div>${response}</div>
            <div style="font-size: 11px; color: #666; margin-top: 4px;">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
          </div>
        </div>
      `;
      messagesContainer.appendChild(botMessageElement);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
      
      // In a real implementation, we would send usage analytics to the server
      if (config.apiKey) {
        // logChatInteraction(config.apiKey, message, response, context);
      }
      
    }, 1500);
  }

  // Initialize the widget
  function initWidget() {
    const widgetContainer = createWidgetElement();
    createChatWindow();
  }

  // Load config and initialize
  const widgetConfig = loadConfig();
  initWidget();
})();
