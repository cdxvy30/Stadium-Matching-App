
//consider is read

import React, { useState, useEffect } from 'react';
import './MessageList.scss';
import FooterBar from '../../components/FooterBar/FooterBar.jsx';
import Header from '../../components/Header/Header.jsx';
import mockMessages from '../../mockData/mockMessage.js'; // Make sure this path is correct

const MessageList = () => {
    const [messages, setMessages] = useState([]);
    const [visibleMessages, setVisibleMessages] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [readMessageIds, setReadMessageIds] = useState(new Set()); // State to keep track of read messages

    useEffect(() => {
      // Load mock data instead of fetching from an API
      setMessages(mockMessages);
    }, []);

    useEffect(() => {
      // Initial load
      if (messages.length > 0) {
        setVisibleMessages(messages.slice(0, 10)); // Initially show 10 messages
      }
    }, [messages]);

    const loadMoreMessages = () => {
      // Load more messages
      const currentLength = visibleMessages.length;
      const newVisibleMessages = messages.slice(
        currentLength,
        currentLength + 10 // Load 10 more messages at a time
      );

      if (newVisibleMessages.length === 0) {
        setHasMore(false); // No more messages to load
      } else {
        setVisibleMessages([...visibleMessages, ...newVisibleMessages]);
      }
    };

    const handleReadMessage = (messageId) => {
      setReadMessageIds(new Set(readMessageIds).add(messageId)); // Mark the message as read
      // In a real app, you would also update the backend here
    };

    return (
      <div>
        <Header title="通知" />
        <div className="message-list">
          {visibleMessages.map((message) => (
            <div
              key={message.id}
              className={`message-item ${readMessageIds.has(message.id) ? 'read' : ''}`}
              onClick={() => handleReadMessage(message.id)}
            >
              <div className="message-content">
                <h3>{message.title}</h3>
                <p>{message.date}</p>
                <p>{message.detail}</p>
              </div>
            </div>
          ))}
        </div>
        <FooterBar />
      </div>
    );
};

export default MessageList;










/* 1st version no read consideration

import React, { useState, useEffect } from 'react';
import './MessageList.scss';
import FooterBar from '../../components/FooterBar/FooterBar.jsx'; 
import Header from '../../components/Header/Header.jsx'; 
import mockMessages from '../../mockData/mockMessage.js'; // You will need to create this mock data file

const MessageList = () => {
    const [messages, setMessages] = useState([]);
    const [visibleMessages, setVisibleMessages] = useState([]);
    const [hasMore, setHasMore] = useState(true);
  
    useEffect(() => {
      // Load mock data instead of fetching from an API
      setMessages(mockMessages);
    }, []);
  
    useEffect(() => {
      // Initial load
      if (messages.length > 0) {
        setVisibleMessages(messages.slice(0, 10)); // Initially show 10 messages
      }
    }, [messages]);
  
    const loadMoreMessages = () => {
      // Load more messages
      const currentLength = visibleMessages.length;
      const newVisibleMessages = messages.slice(
        currentLength,
        currentLength + 10 // Load 10 more messages at a time
      );
  
      if (newVisibleMessages.length === 0) {
        setHasMore(false); // No more messages to load
      } else {
        setVisibleMessages([...visibleMessages, ...newVisibleMessages]);
      }
    };

  return (
    <div>
      <Header title="通知" />
      <div className="message-list">
        {visibleMessages.map((message) => (
          <div key={message.id} className="message-item">
            <div className="message-content">
              <h3>{message.title}</h3>
              <p>{message.date}</p>
              <p>{message.detail}</p>
            </div>
          </div>
        ))}
      </div>
      <FooterBar />
    </div>
  );
};

export default MessageList;
*/