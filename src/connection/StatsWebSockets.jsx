import { useState, useEffect, useCallback } from "react";
import { Client } from "@stomp/stompjs";
import { v4 as uuidv4 } from "uuid";

const statsWebSocket = () => {
  const [stompClient, setStompClient] = useState(null);
  const [messagesReceived, setMessagesReceived] = useState([]);

  // Function to handle incoming messages
  const onMessageReceived = useCallback((data) => {
    try {
      const message = JSON.parse(data.body);
      setMessagesReceived((prevMessages) => [...prevMessages, message]);
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

    client.onConnect = () => {
      client.subscribe(`/stats/live`, onMessageReceived);
    };

    client.activate();
    setStompClient(client);

    return () => client.deactivate();
  }, [onMessageReceived]);

  // Initialize and clean up STOMP client
  useEffect(() => {
    const cleanup = setupStompClient();
    return cleanup;
  }, [setupStompClient]);

  return { stompClient, messagesReceived };
};

export { statsWebSocket };
