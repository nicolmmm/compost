import "./App.css";
import Navbar from "./components/Navbar";
import { Home } from "./components/pages/Home";
import { SignUp } from "./components/pages/SignUp";
import { Login } from "./components/pages/Login";
import { PostPage } from "./components/pages/PostPage";
import { useState } from "react";
import { SearchPage } from "./components/pages/SearchPage";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="body">
          <div className="head-and-body">
            <Navbar />

            <div className="rendered-page">
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/signup" element={<SignUp />}></Route>
                <Route path="/search" element={<SearchPage />}></Route>
                <Route path="/post" element={<PostPage />}></Route>
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
