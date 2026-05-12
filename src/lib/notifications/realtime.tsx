'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface RealtimeContextValue {
  subscribe: (channel: string, callback: (data: any) => void) => void;
  unsubscribe: (channel: string) => void;
}

const RealtimeContext = createContext<RealtimeContextValue>({
  subscribe: () => {},
  unsubscribe: () => {},
});

export function RealtimeProvider({ children }: { children: React.ReactNode }) {
  // Currently a stub for SSE or WebSocket.
  // When ready, we can initialize `EventSource` or `Socket.io` here.

  const subscribe = (channel: string, callback: (data: any) => void) => {
    // console.log(`Subscribed to ${channel}`);
  };

  const unsubscribe = (channel: string) => {
    // console.log(`Unsubscribed from ${channel}`);
  };

  return (
    <RealtimeContext.Provider value={{ subscribe, unsubscribe }}>
      {children}
    </RealtimeContext.Provider>
  );
}

export function useRealtime() {
  return useContext(RealtimeContext);
}
