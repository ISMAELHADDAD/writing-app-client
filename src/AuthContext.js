import React from "react";

const AuthContext = React.createContext({
  id: null,
  name: '',
  token: '',
  expires_at: '',
  image_url: ''
});

export default AuthContext;
