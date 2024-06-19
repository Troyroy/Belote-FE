import { useState, useEffect, useCallback } from "react";
import { Client } from "@stomp/stompjs";
import { v4 as uuidv4 } from "uuid";

const lobbyWebSocket = (lobbyID) => {
  const [stompClient, setStompClient] = useState(null);
  const [messagesReceived, setMessagesReceived] = useState([]);

  // Function to handle incoming messages
  const onMessageReceived = useCallback((data) => {
    try {
      const message = JSON.parse(data.body);
      console.log(message);
      setMessagesReceived((prevMessages) => [...prevMessages, message]);
      console.log("timeout in websockets");
    } catch {
      setMessagesReceived((prevMessages) => [...prevMessages, "connect"]);
    }
  }, []);

  // Function to setup STOMP client
  const setupStompClient = useCallback(() => {
    const client = new Client({
      //brokerURL: "ws://localhost:8080/ws",
      brokerURL: "wss://belote-backend-latest.onrender.com/ws",
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    console.log(lobbyID);
    client.onConnect = () => {
      if (lobbyID) {
        client.subscribe(`/lobby/${lobbyID}`, onMessageReceived);
        console.log("sub");
      }
    };

    client.activate();
    setStompClient(client);

    return () => client.deactivate();
  }, [lobbyID, onMessageReceived]);

  // Initialize and clean up STOMP client
  useEffect(() => {
    if (!lobbyID) return;

    const cleanup = setupStompClient();
    return cleanup;
  }, [lobbyID, setupStompClient]);

  // Function to send a message
  const sendMessage = (newMessage) => {
    console.log("sendMessage called with:", newMessage);

    if (!stompClient || !lobbyID) {
      console.log("Stomp client or username not set");
      return;
    }

    const payload = {
      id: uuidv4(),
      from: lobbyID,
      to: newMessage.to,
      text: newMessage.text,
    };

    console.log("Payload to be sent:", payload);

    console.log("Destination:", `/lobby/${lobbyID}`);

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

export { lobbyWebSocket };
