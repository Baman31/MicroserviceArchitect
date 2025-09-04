import { useState, useEffect } from "react";
import { MessageCircle, X, Send, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { trackEvent } from "@/lib/analytics";

interface WhatsAppChatProps {
  phoneNumber?: string;
  defaultMessage?: string;
}

export default function WhatsAppChat({ 
  phoneNumber = "+919876543210", 
  defaultMessage = "Hi! I'm interested in your IT services. Can you help me?" 
}: WhatsAppChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState(defaultMessage);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Show chat widget after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenChat = () => {
    setIsOpen(true);
    trackEvent('whatsapp_chat', 'open', 'chat_widget');
  };

  const handleCloseChat = () => {
    setIsOpen(false);
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;

    // Prepare WhatsApp message
    const fullMessage = name && email 
      ? `Name: ${name}\nEmail: ${email}\n\nMessage: ${message}`
      : message;

    const encodedMessage = encodeURIComponent(fullMessage);
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
    
    // Track event
    trackEvent('whatsapp_chat', 'send_message', 'chat_widget');
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Reset form
    setMessage(defaultMessage);
    setName("");
    setEmail("");
    setIsOpen(false);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Chat Widget Button */}
      <div 
        className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${
          isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        <Button
          onClick={handleOpenChat}
          className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-xl transition-all duration-300 group animate-bounce"
          data-testid="whatsapp-chat-button"
        >
          <MessageCircle className="h-8 w-8 text-white group-hover:scale-110 transition-transform" />
        </Button>
        
        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-black/80 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Chat with us on WhatsApp
        </div>
      </div>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
          isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        }`}
      >
        <div className="w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Header */}
          <div className="bg-green-500 text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">TechVantage Solutions</h3>
                <p className="text-sm text-green-100">Typically replies in minutes</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCloseChat}
              className="text-white hover:bg-white/20 h-8 w-8"
              data-testid="whatsapp-chat-close"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Chat Content */}
          <div className="p-4 space-y-4">
            {/* Greeting Message */}
            <div className="flex items-start space-x-2">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="h-4 w-4 text-white" />
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 max-w-xs">
                <p className="text-sm text-gray-800 dark:text-gray-200">
                  Hi there! 👋 How can we help you today? Feel free to share your project requirements.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <Input
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-sm"
                  data-testid="whatsapp-name-input"
                />
                <Input
                  placeholder="Email (optional)"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-sm"
                  data-testid="whatsapp-email-input"
                />
              </div>
              
              <Textarea
                placeholder="Type your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="text-sm resize-none"
                rows={3}
                data-testid="whatsapp-message-input"
              />
              
              <Button
                onClick={handleSendMessage}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-medium"
                disabled={!message.trim()}
                data-testid="whatsapp-send-button"
              >
                <Send className="h-4 w-4 mr-2" />
                Send to WhatsApp
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="border-t border-gray-200 dark:border-gray-600 pt-3">
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>🔒 Secure & Private</span>
                <span>⚡ Quick Response</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40"
          onClick={handleCloseChat}
        />
      )}
    </>
  );
}