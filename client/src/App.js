import React, { useState } from "react";
import axios from 'axios';

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginForm, setLoginForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loginForm) {
      console.log("login: " + username, password);
      axios({
        method: 'post',
        data: {
          username,
          password
        },
        withCredentials: true,
        url: 'http://localhost:4000/register'
      }).then((res) => {
        console.log(res.data);
      })
    } else {
      console.log("register: " + username, password);
      axios({
        method: 'post',
        data: {
          username,
          password
        },
        withCredentials: true,
        url: 'http://localhost:4000/login'
      }).then((res) => {
        console.log(res.data);
      })
    }
  };

  const getUser = () => {
    axios({
      method: 'get',
      withCredentials: true,
      url: 'http://localhost:4000/getuser'
    })
  }

  const handleFormSwitch = () => {
    setLoginForm(!loginForm);
    setUsername('');
    setPassword('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>{loginForm ? "Login" : "Register"}</h1>
        <div>
          <label>
            Username
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label htmlFor="username">Password</label>
          <input
            name="username"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">{loginForm ? "Login" : "Register"}</button>
        <button type="button" onClick={handleFormSwitch}>{loginForm ? "Sign up?" : "Go to Login"}</button>
      </form>

      <div className="mt-5">
        <button onClick={getUser}>Get User</button>
      </div>
    </div>
  );
}

export default App;
