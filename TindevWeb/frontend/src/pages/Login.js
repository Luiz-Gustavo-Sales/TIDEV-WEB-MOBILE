import React, { useState } from "react";
import api from "../services/api";
import "./Login.css";
import logo from "../assets/logo.svg";

export default function Login({ history }) {
  const [username, setUsername] = useState("");


  async function handlerSubmit(e) {
    //evitando comportamento padrão dro submit do FORM
    e.preventDefault();
    const response = await api.post("/devs", {
      username,
    });
    const { _id } = response.data;
    history.push(`/main/${_id}`);
  }

  function capturarName(e) {
    setUsername(e.target.value);
  }

  return (
    <div className="login-container">
      <form onSubmit={handlerSubmit}>
        <img src={logo} alt="TinDev" />
        <input
          placeholder="Digite seu usuário no GitHub"
          value={username}
          //usando fucntion para caputrar o nmae
          onChange={capturarName}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
