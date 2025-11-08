import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";


const EmployeeMessage = () => {
  const [chats, setChats] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [showEmoji2, setShowEmoji2] = useState(false);
  const messagesEndRef = useRef(null);

  // Mock data


  const profileImages = {
  // Male profiles
  anthony: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  elliot: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face", 
  stephan: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  michael: "https://images.unsplash.com/photo-1517070208541-6ddc4d3efbcb?w=150&h=150&fit=crop&crop=face",
  harvey: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
  brian: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face",
  doglas: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=150&h=150&fit=crop&crop=face",
  
  // Female profiles
  rebecca: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  lori: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
  linda: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
  sarah: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face",
  jennifer: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
  emily: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face",
  
  // Current user (you)
  currentUser: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face"
};
  const mockChats = [
    {
      id: 1,
      name: "Anthony Lewis",
      avatar: profileImages.stephan,
      status: "online",
      lastMessage: "is typing...",
      time: "02:40 PM",
      unread: 0,
      isTyping: true,
      department: "HR Manager",
      messages: [
        { 
          id: 1, 
          text: "Hi John, I wanted to update you on a new company policy regarding remote work.", 
          sender: "them", 
          time: "08:00 AM",
          hasEmoji: true
        },
        { 
          id: 2, 
          text: "Do you have a moment?", 
          sender: "them", 
          time: "08:00 AM",
          hasEmoji: true
        },
        { 
          id: 3, 
          text: "Sure, Sarah. What's the new policy?", 
          sender: "me", 
          time: "08:00 AM" 
        },
        { 
          id: 4, 
          text: "Starting next month, we'll be implementing a hybrid work model. Employees can work from home up to three days a week.", 
          sender: "them", 
          time: "08:00 AM",
          hasEmoji: true
        },
        { 
          id: 5, 
          text: "That sounds great! Are there any specific requirements for tracking our hours when working remotely?", 
          sender: "me", 
          time: "08:00 AM",
          hasEmoji: true
        },
      ],
    },
    {
      id: 2,
      name: "Elliot Murray",
      avatar: profileImages.doglas ,
      status: "online",
      lastMessage: "Document shared",
      time: "06:12 AM",
      unread: 3,
      hasDocument: true,
      department: "Team Lead",
      messages: [
        { 
          id: 1, 
          text: "Please review the project document I shared.", 
          sender: "them", 
          time: "06:00 AM" 
        },
      ],
    },
    {
      id: 3,
      name: "Rebecca Smith",
      avatar: profileImages.michael ,
      status: "away",
      lastMessage: "Hi How are you? 🔥",
      time: "Sunday",
      unread: 2,
      department: "Design Team",
      messages: [
        { 
          id: 1, 
          text: "Hi! Let's catch up on the design project.", 
          sender: "them", 
          time: "Sunday" 
        },
      ],
    },
    {
      id: 4,
      name: "Stephan Peralt",
      avatar: profileImages.brian,
      status: "online",
      lastMessage: "Missed Video Call",
      time: "03:15 AM",
      unread: 0,
      missedCall: true,
      department: "Development",
      messages: [],
    },
  ];

  useEffect(() => {
    setChats(mockChats);
    if (mockChats.length > 0 && !selectedChat) {
      setSelectedChat(mockChats[0]);
    }
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

    const newMessage = {
      id: Date.now(),
      text: message,
      sender: "me",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updatedChats = chats.map((chat) =>
      chat.id === selectedChat.id
        ? {
            ...chat,
            messages: [...chat.messages, newMessage],
            lastMessage: message,
            time: newMessage.time,
            unread: 0,
          }
        : chat
    );

    setChats(updatedChats);
    setSelectedChat(updatedChats.find((chat) => chat.id === selectedChat.id));
    setMessage("");
  };

  const emojiList = [
    "assets/img/icons/emonji-02.svg",
    "assets/img/icons/emonji-05.svg",
    "assets/img/icons/emonji-06.svg",
    "assets/img/icons/emonji-07.svg",
    "assets/img/icons/emonji-08.svg",
    "assets/img/icons/emonji-03.svg",
    "assets/img/icons/emonji-10.svg",
    "assets/img/icons/emonji-09.svg"
  ];

  // Simple image component replacement
  const ImageWithBasePath = ({ src, className, alt }) => {
    return <img src={src} className={className} alt={alt} />;
  };

  return (
    <div className="page-wrapper employee-chat-wrapper">
      <div className="content">
        {/* Enhanced Page Header */}
        <div className="page-header d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
          <div className="header-content">
            <h1 className="page-title fw-bold text-gradient mb-2">Messages</h1>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item">
                  <Link to="/employee/dashboard" className="text-decoration-none">
                    <i className="ti ti-smart-home me-2"></i>
                    Dashboard
                  </Link>
                </li>
                <li className="breadcrumb-item">Application</li>
                <li className="breadcrumb-item active text-primary">Messages</li>
              </ol>
            </nav>
          </div>
          <div className="header-actions mt-3 mt-md-0">
            <div className="d-flex gap-2">
              <button className="btn btn-outline-primary btn-sm">
                <i className="ti ti-plus me-1"></i>
                New Chat
              </button>
              <button className="btn btn-primary btn-sm">
                <i className="ti ti-users me-1"></i>
                Group Chat
              </button>
            </div>
          </div>
        </div>

        {/* Main Chat Container */}
        <div className="chat-main-container">
          <div className="row g-0 h-100">
            {/* Chat Sidebar */}
            <div className="col-lg-4 col-xl-3">
              <div className="chat-sidebar h-100">
                {/* Sidebar Header */}
                <div className="sidebar-header p-4 border-bottom">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="sidebar-title mb-0 fw-bold">Conversations</h4>
                    <span className="badge bg-primary rounded-pill">{chats.length}</span>
                  </div>
                  
                  {/* Search Box */}
                  <div className="search-wrap">
                    <form>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search For Contacts or Messages"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <span className="input-group-text">
                          <i className="ti ti-search" />
                        </span>
                      </div>
                    </form>
                  </div>
                </div>

                {/* Chat List */}
                <div className="sidebar-body chat-body" id="chatsidebar">
                  {/* Left Chat Title */}
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="chat-title">All Chats</h5>
                  </div>
                  
                  <div className="chat-users-wrap">
                    {filteredChats.map((chat) => (
                      <div className={`chat-list ${selectedChat?.id === chat.id ? 'active' : ''}`} key={chat.id}>
                        <div className="chat-user-list" onClick={() => setSelectedChat(chat)}>
                          <div className={`avatar avatar-lg ${chat.status} me-2`}>
                            <ImageWithBasePath
                              src={chat.avatar}
                              className="rounded-circle"
                              alt="image"
                            />
                          </div>
                          <div className="chat-user-info">
                            <div className="chat-user-msg">
                              <h6>{chat.name}</h6>
                              <p>
                                {chat.isTyping ? (
                                  <span className="animate-typing">
                                    is typing
                                    <span className="dot" />
                                    <span className="dot" />
                                    <span className="dot" />
                                  </span>
                                ) : chat.hasDocument ? (
                                  <>
                                    <i className="ti ti-file me-1" />
                                    Document
                                  </>
                                ) : chat.missedCall ? (
                                  <span className="text-danger">
                                    <i className="ti ti-video-off me-2" />
                                    Missed Video Call
                                  </span>
                                ) : (
                                  chat.lastMessage
                                )}
                              </p>
                            </div>
                            <div className="chat-user-time">
                              <span className="time">{chat.time}</span>
                              <div className="chat-pin">
                                {chat.unread > 0 ? (
                                  <span className="count-message fs-12 fw-semibold">
                                    {chat.unread}
                                  </span>
                                ) : chat.hasDocument ? (
                                  <i className="ti ti-checks text-success" />
                                ) : (
                                  <i className="ti ti-pin me-2" />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="chat-dropdown">
                          <Link to="#" data-bs-toggle="dropdown">
                            <i className="ti ti-dots-vertical" />
                          </Link>
                          <ul className="dropdown-menu dropdown-menu-end p-3">
                            <li>
                              <Link className="dropdown-item" to="#">
                                <i className="ti ti-box-align-right me-2" />
                                Archive Chat
                              </Link>
                            </li>
                            <li>
                              <Link className="dropdown-item" to="#">
                                <i className="ti ti-heart me-2" />
                                Mark as Favourite
                              </Link>
                            </li>
                            <li>
                              <Link className="dropdown-item" to="#">
                                <i className="ti ti-check me-2" />
                                Mark as Unread
                              </Link>
                            </li>
                            <li>
                              <Link className="dropdown-item" to="#">
                                <i className="ti ti-pinned me-2" />
                                Pin Chats
                              </Link>
                            </li>
                            <li>
                              <Link className="dropdown-item" to="#">
                                <i className="ti ti-trash me-2" />
                                Delete
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Rest of your component remains the same... */}
            {/* Chat Area and other components */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeMessage;