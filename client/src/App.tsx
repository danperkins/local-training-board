import React from "react";
import { HelloWorld } from "./components/HelloWorld";
import { AuthProvider } from "./components/AuthProvider";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <AuthProvider>{token => <HelloWorld token={token} />}</AuthProvider>
    </div>
  );
};

export default App;
