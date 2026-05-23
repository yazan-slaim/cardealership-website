"use client";

import { useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

// We use an environment variable or default to local backend URL
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002/api";

export function useTelemetry(carId = null) {
  const dwellTimerRef = useRef(null);

  useEffect(() => {
    // 1. Initialize or retrieve the anonymous session ID
    let sessionId = localStorage.getItem("dos_session_id");
    if (!sessionId) {
      sessionId = uuidv4();
      localStorage.setItem("dos_session_id", sessionId);
    }

    const clientId = localStorage.getItem("dos_client_id") || null;

    // Helper to send events to backend
    const sendEvent = async (eventType, payload = {}) => {
      try {
        await fetch(`${BACKEND_URL}/leads/telemetry`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId,
            clientId,
            eventType,
            payload,
          }),
        });
      } catch (error) {
        console.error("Telemetry failed:", error);
      }
    };

    // 2. Track initial page view or stock view
    if (carId) {
      sendEvent("VIEW_STOCK", { carId, url: window.location.pathname });
    } else {
      sendEvent("PAGE_VISIT", { url: window.location.pathname });
    }

    // 3. Track 60s dwell time
    // Only trigger if the user stays on the page for 60 uninterrupted seconds
    dwellTimerRef.current = setTimeout(() => {
      sendEvent("DWELL_60S", { 
        url: window.location.pathname, 
        carId,
        duration: 60 
      });
    }, 60 * 1000);

    // Cleanup on unmount or navigation
    return () => {
      if (dwellTimerRef.current) {
        clearTimeout(dwellTimerRef.current);
      }
    };
  }, [carId]);
}

/**
 * Call this function when a user submits a form or authenticates.
 * It will identify the session and link historical anonymous data.
 */
export async function identifyUser(phoneNumber, name = "", source = "Direct") {
  const sessionId = localStorage.getItem("dos_session_id");
  if (!sessionId) return null;

  try {
    const response = await fetch(`${BACKEND_URL}/leads/identify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId, phoneNumber, name, source }),
    });

    const data = await response.json();
    if (data.success && data.clientId) {
      // Store clientId to use for future events in State 1
      localStorage.setItem("dos_client_id", data.clientId);
      return data.clientId;
    }
  } catch (error) {
    console.error("Failed to identify user:", error);
  }
  return null;
}
