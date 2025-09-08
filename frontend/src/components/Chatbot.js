import React, { useState, useRef, useEffect } from 'react';
import api from '../utils/api';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hello! I\'m your hotel booking assistant. How can I help you today?' }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = { type: 'user', text: inputText };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setLoading(true);

    try {
      // Simple rule-based chatbot responses
      const response = await generateBotResponse(inputText.toLowerCase());
      setTimeout(() => {
        setMessages(prev => [...prev, { type: 'bot', text: response }]);
        setLoading(false);
      }, 1000);
    } catch (error) {
      setMessages(prev => [...prev, { 
        type: 'bot', 
        text: 'Sorry, I encountered an error. Please try again.' 
      }]);
      setLoading(false);
    }
  };

  const generateBotResponse = async (userInput) => {
    // Simple keyword-based responses
    if (userInput.includes('book') && userInput.includes('hotel')) {
      // Extract location from user input
      const locations = ['delhi', 'mumbai', 'bangalore', 'chennai', 'kolkata', 'hyderabad', 'pune', 'goa'];
      const foundLocation = locations.find(loc => userInput.includes(loc));
      
      if (foundLocation) {
        try {
          // Fetch hotels in the specified location
          const response = await api.get('/hotels');
          const hotels = response.data;
          const locationHotels = hotels.filter(hotel => 
            hotel.location.city.toLowerCase().includes(foundLocation.toLowerCase())
          );
          
          if (locationHotels.length > 0) {
            const hotel = locationHotels[0];
            return `I found a great hotel for you in ${foundLocation}: ${hotel.name} at $${hotel.price}/night. Would you like me to help you book it?`;
          } else {
            return `I couldn't find any hotels in ${foundLocation} at the moment. Please check our hotels page for available options.`;
          }
        } catch (error) {
          return 'I\'m having trouble accessing hotel information right now. Please visit our hotels page to see available options.';
        }
      } else {
        return 'I can help you book a hotel! Please specify a location (e.g., "Book me a hotel in Delhi") and I\'ll find the best options for you.';
      }
    } else if (userInput.includes('price') || userInput.includes('cost')) {
      return 'Our hotel prices vary by location and season. You can see current prices on our hotels page. Most hotels range from $50-$300 per night.';
    } else if (userInput.includes('amenities') || userInput.includes('facilities')) {
      return 'Our hotels offer various amenities including WiFi, parking, swimming pools, fitness centers, restaurants, and room service. Check individual hotel pages for specific amenities.';
    } else if (userInput.includes('cancel') || userInput.includes('refund')) {
      return 'You can cancel your booking through your dashboard. Cancellation policies vary by hotel, but most allow free cancellation up to 24 hours before check-in.';
    } else if (userInput.includes('help') || userInput.includes('support')) {
      return 'I can help you with:\n• Finding and booking hotels\n• Checking prices and amenities\n• Cancellation policies\n• General hotel information\n\nWhat would you like to know?';
    } else if (userInput.includes('hello') || userInput.includes('hi')) {
      return 'Hello! Welcome to our hotel booking service. I\'m here to help you find and book the perfect hotel. What can I assist you with today?';
    } else {
      return 'I understand you\'re looking for help with hotel bookings. You can ask me about:\n• Booking hotels in specific locations\n• Hotel prices and amenities\n• Cancellation policies\n• General booking assistance\n\nHow can I help you?';
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="chatbot">
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h4 style={{ margin: 0 }}>Hotel Assistant</h4>
            <button 
              onClick={() => setIsOpen(false)}
              style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
            >
              ✕
            </button>
          </div>
          
          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div key={index} className={`chatbot-message message-${message.type}`}>
                {message.text}
              </div>
            ))}
            {loading && (
              <div className="chatbot-message message-bot">
                <em>Typing...</em>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="chatbot-input">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              disabled={loading}
            />
            <button onClick={handleSendMessage} disabled={loading || !inputText.trim()}>
              Send
            </button>
          </div>
        </div>
      )}
      
      <button 
        className="chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '✕' : '💬'}
      </button>
    </div>
  );
};

export default Chatbot;
