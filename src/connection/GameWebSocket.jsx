import { useState, useEffect, useCallback } from "react";
import { Client } from "@stomp/stompjs";
import { v4 as uuidv4 } from "uuid";

const useStompClient = (roomID) => {
  console.log(roomID);
  const [stompClient, setStompClient] = useState(null);
  const [messagesReceived, setMessagesReceived] = useState([]);

  // Function to handle incoming messages
  const onMessageReceived = useCallback((data) => {
    let message;
    try {
      message = JSON.parse(data.body);
    } catch (e) {
      console.log("Error");
      message = data.body;
    }
    setMessagesReceived((prevMessages) => [...prevMessages, message]);
  }, []);

  // Function to setup STOMP client
  const setupStompClient = useCallback(() => {
    const client = new Client({
      brokerURL: "ws://localhost:8080/ws",
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    console.log(roomID);
    client.onConnect = () => {
      // Subscribe to private messages if username is available
      if (roomID) {
        client.subscribe(`/game/${roomID}`, onMessageReceived);
      }
    };

    client.activate();
    setStompClient(client);

    return () => client.deactivate();
  }, [roomID, onMessageReceived]);

  // Initialize and clean up STOMP client
  useEffect(() => {
    if (!roomID) return;

    const cleanup = setupStompClient();
    return cleanup;
  }, [roomID, setupStompClient]);

  // Function to send a message
  const sendMessage = (newMessage) => {
    console.log("sendMessage called with:", newMessage);

    if (!stompClient || !roomID) {
      console.log("Stomp client or username not set");
      return;
    }

    const payload = {
      id: uuidv4(),
      from: roomID,
      to: newMessage.to,
      text: newMessage.text,
    };

    stompClient.publish({
      destination,
      body: JSON.stringify(payload),
    });

    setMessagesReceived((prevMessages) => {
      const updatedMessages = [...prevMessages, payload];
      console.log("Updated messages:", updatedMessages);
      return updatedMessages;
    });
  };

  return { stompClient, messagesReceived, sendMessage };
};

export { useStompClient };
