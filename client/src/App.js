import "./App.css";
import Navbar from "./components/Navbar";
import { Home } from "./components/pages/Home";
import { SignUp } from "./components/pages/SignUp";
import { Login } from "./components/pages/Login";
import { SingleStation } from "./components/pages/SingleStation";
import { PostPage } from "./components/pages/PostPage";
import { useState } from "react";
import { SearchPage } from "./components/pages/SearchPage";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
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
                <Route
                  path="/search/:stationId"
                  element={<SingleStation />}
                ></Route>
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
