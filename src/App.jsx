// App.js

import React, { useState, useEffect } from 'react';
// import './styles.css';

// Sample Data
const data = [
    {
        userId: 'user1',
        name: 'Sam',
        unreadCount: 1,
        profilePictureURL: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
        chat: [
            { user1: { message: 'Hello', timeStamp: '10:40' }, you: { message: 'Hey', timeStamp: '10:41' } },
            { user1: { message: 'How are you doing?', timeStamp: '10:41' }, you: { message: 'Fine mate, how about you?', timeStamp: '10:42' } },
            { user1: { message: 'great', timeStamp: '10:44' }, you: { message: "Coming to my wedding right? I don't think you confirmed.", timeStamp: '10:44' } },
            { user1: { message: 'Oh yes. There is no way I am going to miss that.', timeStamp: '10:44' }, you: { message: 'Awesome. See ya there. Let me know if you want me to book tickets.', timeStamp: '10:45' } },
        ],
    },
    {
        userId: 'user2',
        name: 'Elon',
        unreadCount: 0,
        profilePictureURL: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
        chat: [
            { user2: { message: 'there?', timeStamp: '11:39' }, you: { message: 'yeah, whats up?', timeStamp: '11:47' } },
            { user2: { message: 'movie tomorrow?', timeStamp: '11:49' }, you: { message: 'Yeah sure. let me know the timings. and which movie again?', timeStamp: '11:52' } },
            { user2: { message: 'the new mad max movie. Reviews are great.', timeStamp: '11:52' }, you: { message: 'Oh yes, I have been waiting for that one.', timeStamp: '11:54' } },
        ],
    },
    {
        userId: 'user3',
        name: 'Kate',
        unreadCount: 1,
        profilePictureURL: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg',
        chat: [
            { user2: { message: 'that burger was delicious!', timeStamp: '13:12' }, you: { message: 'Oh yes, no doubt.', timeStamp: '13:13' } },
            { user2: { message: 'We are definitely going to that place again.', timeStamp: '13:13' }, you: { message: 'we are. My mouth waters whenever driving through that area', timeStamp: '13:14' } },
            { user2: { message: "haha, I bet. Let's take Tony and Natasha too next time", timeStamp: '13:14' }, you: { message: 'Sure. They would love it', timeStamp: '13:15' } },
        ],
    },
];

// Main App Component
const App = () => {
    const [contacts, setContacts] = useState([]);
    const [selectedContact, setSelectedContact] = useState(null);
    const [currentMessage, setCurrentMessage] = useState('');

    useEffect(() => {
        // Load contacts initially
        setContacts(data);
    }, []);

    const loadChat = (userId) => {
        const contact = contacts.find(c => c.userId === userId);
        setSelectedContact(contact);
    };

    const handleSendMessage = () => {
        if (currentMessage.trim() !== '') {
            const updatedChat = [...selectedContact.chat, { you: { message: currentMessage, timeStamp: new Date().toLocaleTimeString() } }];
            const updatedContact = { ...selectedContact, chat: updatedChat };
            const updatedContacts = contacts.map(contact => contact.userId === updatedContact.userId ? updatedContact : contact);

            setContacts(updatedContacts);
            setSelectedContact(updatedContact);
            setCurrentMessage('');
        }
    };

    return (
        <div id="app">
            <Sidebar contacts={contacts} loadChat={loadChat} />
            <ChatArea
                selectedContact={selectedContact}
                currentMessage={currentMessage}
                setCurrentMessage={setCurrentMessage}
                handleSendMessage={handleSendMessage}
            />
        </div>
    );
};

// Sidebar Component
const Sidebar = ({ contacts, loadChat }) => (
    <div className="sidebar">
        <ContactsList contacts={contacts} loadChat={loadChat} />
    </div>
);

// ContactsList Component
const ContactsList = ({ contacts, loadChat }) => (
    <div className="contacts-list" id="contacts-list">
        {contacts.map(contact => (
            <div key={contact.userId} className="contact" onClick={() => loadChat(contact.userId)}>
                <img src={contact.profilePictureURL} alt={contact.name} />
                <div className="contact-details">
                    <div className="contact-name">{contact.name}</div>
                </div>
                {contact.unreadCount > 0 && (
                    <div className="unread-count">{contact.unreadCount}</div>
                )}
            </div>
        ))}
    </div>
);

// ChatArea Component
const ChatArea = ({ selectedContact, currentMessage, setCurrentMessage, handleSendMessage }) => (
    <div className="chat-area">
        <ChatHeader selectedContact={selectedContact} />
        <Messages selectedContact={selectedContact} />
        <ChatInput
            currentMessage={currentMessage}
            setCurrentMessage={setCurrentMessage}
            handleSendMessage={handleSendMessage}
        />
    </div>
);

// ChatHeader Component
const ChatHeader = ({ selectedContact }) => (
    <div className="chat-header" id="chat-header">
        {selectedContact && (
            <>
                <img src={selectedContact.profilePictureURL} alt={selectedContact.name} />
                <div>{selectedContact.name}</div>
            </>
        )}
    </div>
);

// Messages Component
const Messages = ({ selectedContact }) => (
    <div className="messages" id="messages">
        {selectedContact && selectedContact.chat.map((chatMessage, index) => (
            Object.entries(chatMessage).map(([sender, messageData]) => (
                <div key={index} className="message">
                    <div className={sender === 'you' ? 'my-message' : 'user-message'}>
                        {messageData.message}
                    </div>
                    <div className="message-time">
                        {messageData.timeStamp}
                    </div>
                </div>
            ))
        ))}
    </div>
);

// ChatInput Component
const ChatInput = ({ currentMessage, setCurrentMessage, handleSendMessage }) => (
    <div className="chat-input">
        <input
            type="text"
            placeholder="Type a message..."
            id="message-input"
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
        />
        <button id="send-button" onClick={handleSendMessage}>Send</button>
    </div>
);

export default App;
