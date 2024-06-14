// script.js

const data = [
    {
        userId: 'user1',
        name: 'Sam',
        unreadCount: 1,
        profilePictureURL: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
        chat: [
            {
                user1: {
                    message: 'Hello',
                    timeStamp: '10:40',
                },
                you: {
                    message: 'Hey',
                    timeStamp: '10:41',
                },
            },
            {
                user1: {
                    message: 'How are you doing?',
                    timeStamp: '10:41',
                },
                you: {
                    message: 'Fine mate, how about you?',
                    timeStamp: '10:42',
                },
            },
            {
                user1: {
                    message: 'great',
                    timeStamp: '10:44',
                },
                you: {
                    message: "Coming to my wedding right? I don't think you confirmed.",
                    timeStamp: '10:44',
                },
            },
            {
                user1: {
                    message: 'Oh yes. There is no way I am going to miss that.',
                    timeStamp: '10:44',
                },
                you: {
                    message: 'Awesome. See ya there. Let me know if you want me to book tickets.',
                    timeStamp: '10:45',
                },
            },
        ],
    },
    {
        userId: 'user2',
        name: 'Elon',
        unreadCount: 0,
        profilePictureURL: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
        chat: [
            {
                user2: {
                    message: 'there?',
                    timeStamp: '11:39',
                },
                you: {
                    message: 'yeah, whats up?',
                    timeStamp: '11:47',
                },
            },
            {
                user2: {
                    message: 'movie tomorrow?',
                    timeStamp: '11:49',
                },
                you: {
                    message: 'Yeah sure. let me know the timings. and which movie again?',
                    timeStamp: '11:52',
                },
            },
            {
                user2: {
                    message: 'the new mad max movie. Reviews are great.',
                    timeStamp: '11:52',
                },
                you: {
                    message: 'Oh yes, I have been waiting for that one.',
                    timeStamp: '11:54',
                },
            },
        ],
    },
    {
        userId: 'user3',
        name: 'Kate',
        unreadCount: 1,
        profilePictureURL: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg',
        chat: [
            {
                user2: {
                    message: 'that burger was delicious!',
                    timeStamp: '13:12',
                },
                you: {
                    message: 'Oh yes, no doubt.',
                    timeStamp: '13:13',
                },
            },
            {
                user2: {
                    message: 'We are definitely going to that place again.',
                    timeStamp: '13:13',
                },
                you: {
                    message: 'we are. My mouth waters whenever driving through that area',
                    timeStamp: '13:14',
                },
            },
            {
                user2: {
                    message: 'haha, I bet. Let\'s take Tony and Natasha too next time',
                    timeStamp: '13:14',
                },
                you: {
                    message: 'Sure. They would love it',
                    timeStamp: '13:15',
                },
            },
        ],
    },
];

// Load contacts
function loadContacts() {
    const contactsList = document.getElementById('contacts-list');
    contactsList.innerHTML = '';
    data.forEach(contact => {
        const contactElement = document.createElement('div');
        contactElement.className = 'contact';
        contactElement.setAttribute('data-user-id', contact.userId);

        const profilePicture = document.createElement('img');
        profilePicture.src = contact.profilePictureURL;

        const details = document.createElement('div');
        details.className = 'contact-details';

        const name = document.createElement('div');
        name.className = 'contact-name';
        name.textContent = contact.name;

        details.appendChild(name);

        contactElement.appendChild(profilePicture);
        contactElement.appendChild(details);

        if (contact.unreadCount > 0) {
            const unreadCount = document.createElement('div');
            unreadCount.className = 'unread-count';
            unreadCount.textContent = contact.unreadCount;
            contactElement.appendChild(unreadCount);
        }

        contactElement.addEventListener('click', () => {
            loadChat(contact.userId);
        });

        contactsList.appendChild(contactElement);
    });
}

// Load chat for selected contact
function loadChat(userId) {
    const chatHeader = document.getElementById('chat-header');
    const messagesContainer = document.getElementById('messages');
    const contact = data.find(c => c.userId === userId);

    if (!contact) return;

    chatHeader.innerHTML = `
        <img src="${contact.profilePictureURL}" alt="${contact.name}">
        <div>${contact.name}</div>
    `;

    messagesContainer.innerHTML = '';
    contact.chat.forEach(chatMessage => {
        for (const [sender, messageData] of Object.entries(chatMessage)) {
            const messageElement = document.createElement('div');
            messageElement.className = 'message';

            const messageText = document.createElement('div');
            messageText.textContent = messageData.message;

            const messageTime = document.createElement('div');
            messageTime.className = 'message-time';
            messageTime.textContent = messageData.timeStamp;

            if (sender === 'you') {
                messageText.className = 'my-message';
            } else {
                messageText.className = 'user-message';
            }

            messageElement.appendChild(messageText);
            messageElement.appendChild(messageTime);

            messagesContainer.appendChild(messageElement);
        }
    });
}

// Initialize the app
loadContacts();