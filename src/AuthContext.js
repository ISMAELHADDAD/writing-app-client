import React from "react";

const AuthContext = React.createContext({
  authUser: {
    id: null,
    name: '',
    token: '',
    expires_at: '',
    image_url: ''
  },
  logged_in: false
});

export default AuthContext;
