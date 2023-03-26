import React from "react";

export const NotificationContext = React.createContext({
  status: false,
  message: "",
  messageType: "",
  showMessage: () => { },
  clearMessage: () => { },
});

