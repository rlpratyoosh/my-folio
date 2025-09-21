"use client";

import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { FaCheckCircle, FaEye, FaHourglassHalf } from "react-icons/fa";

interface Message {
    id: string;
    name: string;
    email: string;
    message: string;
    createdAt: string;
    read: boolean;
}

export default function ContactsPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            setLoading(true);
            const response = await fetch("/api/message", {
                method: "GET",
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to fetch messages");
            }

            const data = await response.json();
            setMessages(data);
        } catch (error) {
            console.error("Error fetching messages:", error);
            setError(error instanceof Error ? error.message : "An unknown error occurred");
        } finally {
            setLoading(false);
        }
    };

    const markAsRead = async (id: string) => {
        try {
            const response = await fetch(`/api/message?id=${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ read: true }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to mark message as read");
            }

            // Update local state
            setMessages(prevMessages => prevMessages.map(msg => (msg.id === id ? { ...msg, read: true } : msg)));

            // If this is the selected message, update it
            if (selectedMessage && selectedMessage.id === id) {
                setSelectedMessage({ ...selectedMessage, read: true });
            }
        } catch (error) {
            console.error("Error marking message as read:", error);
        }
    };

    const openMessageDetails = (message: Message) => {
        setSelectedMessage(message);
        setShowModal(true);

        // If message is not read, mark it as read
        if (!message.read) {
            markAsRead(message.id);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedMessage(null);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[70vh] w-full">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center p-8 bg-red-100/10 rounded-lg border border-red-300/20 text-red-500 my-4">
                <h3 className="text-xl mb-2">Error</h3>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="w-full px-4 py-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Contact Messages</h1>
                <Button onClick={fetchMessages}>Refresh</Button>
            </div>

            {messages.length === 0 ? (
                <div className="text-center p-8 bg-gray-100/10 rounded-lg border border-gray-300/20">
                    <h3 className="text-xl mb-2">No Messages</h3>
                    <p className="text-gray-400">You haven&apos;t received any messages yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {messages.map(message => (
                        <div
                            key={message.id}
                            className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                                message.read
                                    ? "bg-gray-900/20 border-gray-700/30"
                                    : "bg-green-900/10 border-green-700/30 font-medium"
                            }`}
                            onClick={() => openMessageDetails(message)}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-2">
                                    {message.read ? (
                                        <FaCheckCircle className="text-gray-400 text-sm" />
                                    ) : (
                                        <FaHourglassHalf className="text-green-400 text-sm animate-pulse" />
                                    )}
                                    <h3 className="text-xl">{message.name}</h3>
                                </div>
                                <span className="text-sm text-gray-400">
                                    {format(new Date(message.createdAt), "MMM d, yyyy h:mm a")}
                                </span>
                            </div>
                            <p className="text-gray-300 text-sm mb-2">{message.email}</p>
                            <p className="text-gray-400 truncate">{message.message}</p>
                            <div className="flex justify-end mt-3">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={e => {
                                        e.stopPropagation();
                                        openMessageDetails(message);
                                    }}
                                >
                                    <FaEye className="mr-2" /> View
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Message Detail Modal */}
            {showModal && selectedMessage && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-background border border-border rounded-lg shadow-xl w-full max-w-2xl p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h2 className="text-2xl font-bold">{selectedMessage.name}</h2>
                                <p className="text-gray-400">{selectedMessage.email}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span
                                    className={`px-2 py-1 rounded-full text-xs ${
                                        selectedMessage.read
                                            ? "bg-gray-800/50 text-gray-300"
                                            : "bg-green-900/20 text-green-400"
                                    }`}
                                >
                                    {selectedMessage.read ? "Read" : "Unread"}
                                </span>
                                <span className="text-sm text-gray-400">
                                    {format(new Date(selectedMessage.createdAt), "MMM d, yyyy h:mm a")}
                                </span>
                            </div>
                        </div>

                        <div className="bg-gray-900/20 p-4 rounded-lg my-4 min-h-[150px]">
                            <p className="whitespace-pre-wrap">{selectedMessage.message}</p>
                        </div>

                        <div className="flex justify-end gap-3 mt-4">
                            {!selectedMessage.read && (
                                <Button variant="outline" onClick={() => markAsRead(selectedMessage.id)}>
                                    Mark as Read
                                </Button>
                            )}
                            <Button onClick={closeModal}>Close</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
