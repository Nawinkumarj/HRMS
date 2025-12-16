import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "./../Styles/Sethu.css"; 


const EmployeeMessage = () => {
  const [chats, setChats] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);

  // Profile Images
  const profileImages = {
    anthony: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150",
    elliot: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150",
    stephan: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150",
    michael: "https://images.unsplash.com/photo-1517070208541-6ddc4d3efbcb?w=150&h=150",
    harvey: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150",
    brian: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150",
    doglas: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=150&h=150",
    rebecca: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150",
    lori: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150",
    linda: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150",
    sarah: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150",
    jennifer: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150",
    emily: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150",
    currentUser: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150",
    grpIcon: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=300&h=300&crop=faces&fit=crop"

  };

  // Mock Chats
  const mockChats = [
    {
      id: 1,
      name: "Sethu",
      // avatar: profileImages.stephan,
      status: "online",
      lastMessage: "is typing...",
      time: "02:40 PM",
      unread: 0,
      isTyping: true,
      messages: [
        { id: 1, text: "Hi John, quick update on the new policy...", sender: "them", time: "08:00 AM" },
        { id: 2, text: "Do you have a moment?", sender: "them", time: "08:01 AM" },
        { id: 3, text: "Sure, what's up?", sender: "me", time: "08:02 AM" }
      ],
    },
    {
      id: 2,
      name: "Nawin",
      avatar: profileImages.doglas,
      status: "online",
      lastMessage: "Document shared",
      time: "06:12 AM",
      unread: 3,
      messages: [
        { id: 1, text: "Please review the project document", sender: "them", time: "06:00 AM" },
      ],
    },
    {
  id: 3,
  name: "HR Team",
    avatar: profileImages.grpIcon,
  group: true,
  members: ["Sethu", "Nawin", "Harish"],

  lastMessage: "nawin: Updated leave policy",
  messages: [
    { id: 1, text: "Upload the new leave circular", senderName: "Sethu", sender: "them", time: "08:00 AM" },
    { id: 2, text: "Done, uploaded", senderName: "Harish", sender: "them", time: "08:05 AM" },
    { id: 3, text: "Thanks!", senderName: "Me", sender: "me", time: "08:06 AM" }
  ],
}

 
  ];

  useEffect(() => {
    setChats(mockChats);
    setSelectedChat(mockChats[0]);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [selectedChat?.messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim() || !selectedChat) return;

    const newMsg = {
      id: Date.now(),
      text: message,
      sender: "me",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const updatedChats = chats.map((chat) =>
      chat.id === selectedChat.id
        ? {
            ...chat,
            messages: [...chat.messages, newMsg],
            lastMessage: message,
            time: newMsg.time,
            unread: 0,
          }
        : chat
    );

    setChats(updatedChats);
    setSelectedChat(updatedChats.find((c) => c.id === selectedChat.id));
    setMessage("");
  };

  return (
    <div className="chat-container">
      {/* Sidebar */}
      <div className="chat-sidebar">
        <div className="sidebar-header">
          <h3>Messages</h3>
          <span className="count">{chats.length}</span>
        </div>

        <div className="sidebar-search">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="chat-list">
          {filteredChats.map((chat) => (
            <div
              key={chat.id}
              className={`chat-item ${selectedChat?.id === chat.id ? "active" : ""}`}
              onClick={() => setSelectedChat(chat)}
            >
              <img src={chat.avatar} className="chat-avatar" alt="" />

              <div className="chat-info">
                <div className="chat-top">
                  <h4>{chat.name}</h4>
                  <span className="chat-time">{chat.time}</span>
                </div>

                <div className="chat-bottom">
                  <p className="last-msg">
                    {chat.isTyping ? (
                      <span className="typing-dot">Typing...</span>
                    ) : (
                      chat.lastMessage
                    )}
                  </p>

                  {chat.unread > 0 && (
                    <span className="unread-badge">{chat.unread}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Main */}
      <div className="chat-main">
        {selectedChat ? (
          <>
            {/* Header */}
            <div className="chat-top-bar">
              <img src={selectedChat.avatar} className="chat-top-avatar" alt="" />
              <div>
                <h4>{selectedChat.name}</h4>
                <span className="status-text">
                  {selectedChat.isTyping ? "Typing..." : selectedChat.status}
                </span>
              </div>
            </div>
            

            {/* Messages */}
            <div className="chat-messages">
              {selectedChat.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`message-bubble ${msg.sender === "me" ? "me" : "them"}`}
                >
                  <p>{msg.text}</p>
                  <span className="msg-time">{msg.time}</span>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Footer */}
            <form className="chat-footer" onSubmit={handleSendMessage}>
              <input
                type="text"
                className="chat-input"
                placeholder="Write your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />

              <button type="submit" className="send-btn">
          <i class="bi bi-send-fill"></i>



              </button>
            </form>
          </>
        ) : (
          <div className="no-chat-selected">Select a chat to begin.</div>
        )}
      </div>
    </div>
  );
};

export default EmployeeMessage;