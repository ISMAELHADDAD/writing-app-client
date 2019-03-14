import React from "react";

const AuthContext = React.createContext({
  authUser: {
    id: null,
    name: '',
    token: '',
    expiresAt: '',
    imageUrl: ''
  },
  loggedIn: false
});

export default AuthContext;
