import React, { useState } from 'react';
import axios from 'axios';

const Chat = () => {
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);

    const sendMessage = async () => {
        if (message.trim()) {
            // Add the user's message to the chat
            setChat((prevChat) => [...prevChat, { user: 'You', text: message }]);
            setMessage('');

            try {
                // Send the message to the backend
                const response = await axios.post('http://localhost:5000/api/chat', { message });

                // Add the AI's response to the chat using the latest state
                setChat((prevChat) => [
                    ...prevChat,
                    { user: 'AI', text: response.data.reply }, // Ensure this matches the backend response structure
                ]);
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };

    return (
        <div>
            <div>
                {chat.map((msg, index) => (
                    <p key={index}>
                        <strong>{msg.user}:</strong> {msg.text}
                    </p>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Chat;