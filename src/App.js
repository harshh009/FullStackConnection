import { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [form, setForm] = useState({});
  const [users, setUsers] = useState([]);

  function handleForm(e) {
    // console.log(e.target.value, e.target.name);
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(form);
    fetch("http://localhost:8080/user", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }

  const getUser = async () => {
    const response = await fetch("http://localhost:8080/user", {
      method: "GET",
    });
    const data = await response.json();
    console.log(`Response send via Node js 7`, data);
    setUsers(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="App">
      <h1>Connecting React With Node/Express and MongoDb</h1>
      {/* <p>{JSON.stringify(form)}</p>  JSUT FOR TESTIG PURPOSES */}
      <form className="form" onSubmit={() => handleSubmit(event)}>
        <span>Username </span>
        <input
          type="text"
          placeholder="Enter Username"
          name="username"
          onChange={() => handleForm(event)}
        />
        <span> Password </span>
        <input
          type="text"
          placeholder="Enter Password"
          name="password"
          onChange={() => handleForm(event)}
        />
        <button type="submit"> Submit</button>
      </form>
      <div className="display-get user page">
        <ul>
          {users.map((user) => (
            <li key={user._id}>{user.username}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
