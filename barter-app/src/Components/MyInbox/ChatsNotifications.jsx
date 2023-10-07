import React, { useState } from 'react';
import './ChatsNotifications.css';
import Navbar from '../Navbar/Navbar';

function ChatsNotifications() {
    const [activeTab, setActiveTab] = useState('chats');

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    return (
        <>
        <Navbar className="NavbarD" fixed="top" />
        <div className="container">
            <div className="tab-container">
                <div
                    className={`tab ${activeTab === 'chats' ? 'active' : ''}`}
                    onClick={() => handleTabClick('chats')}
                >
                    Chats
                </div>
                <div
                    className={`tab ${activeTab === 'notifications' ? 'active' : ''}`}
                    onClick={() => handleTabClick('notifications')}
                >
                    Notifications
                </div>
            </div>
            <div className="tab-content">
                {activeTab === 'chats' && (
                    <div className="chats">
                        <h2>Recent Conversations</h2>
                        <div className="cards">
                            <div className="card">
                                <h3>Name of Person</h3>
                                <p>Conversation</p>
                            </div>
                            <div className="card">
                                <h3>Name of Person</h3>
                                <p>Conversation</p>
                            </div>
                        </div>
                    </div>
                )}
                {activeTab === 'notifications' && (
                    <div className="notifications">
                        <h2>Recent Notifications</h2>
                        <div className="cards">
                            <div className="card">
                                <p>Notification</p>
                            </div>
                            <div className="card">
                                <p>Notification</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
        </>
    );
}

export default ChatsNotifications;
