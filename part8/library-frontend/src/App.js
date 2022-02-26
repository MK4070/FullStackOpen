import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommended from "./components/Recommended";
import { useEffect, useState } from "react";
import { useApolloClient } from "@apollo/client";

const Notify = ({ error }) => {
  if (!error) return null;
  return <div style={{ color: "red" }}>{error}</div>;
};

const App = () => {
  const [page, setPage] = useState("authors");
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  useEffect(() => {
    const token = localStorage.getItem("library-user-token");
    if (token) setToken(token);
  }, []);

  const notify = (message) => {
    setError(message);
    setTimeout(() => {
      setError(null);
    }, 5000);
  };

  const logout = () => {
    setToken(null);
    setPage("authors");
    localStorage.clear();
    client.resetStore();
  };

  const handleRecommended = () => {
    setPage("recommended");
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {!token && <button onClick={() => setPage("login")}>login</button>}
        {token && <button onClick={() => setPage("add")}>add book</button>}
        {token && <button onClick={handleRecommended}>recommended</button>}
        {token && <button onClick={logout}>logout</button>}
      </div>
      <Notify error={error} />
      <Authors show={page === "authors"} setError={notify} token={token} />

      <Books show={page === "books"} />

      <LoginForm
        show={page === "login"}
        setToken={setToken}
        setError={notify}
        setPage={setPage}
      />

      {token && <Recommended show={page === "recommended"} />}

      <NewBook show={page === "add"} setPage={setPage} client={client} />
    </div>
  );
};

export default App;
