import React, { useEffect, useState } from "react";
import logo from "../assets/logo.svg";
import dislikee from "../assets/dislike.svg";
import like from "../assets/like.svg";
import {Link} from 'react-router-dom'
import api from "../services/api";
import "./Main.css";
//match tem todos os paramentros passado pela rota
export default function Main({ match }) {
  const [users, setUsers] = useState([]);

  //reload do usuário quando fizer login
  useEffect(() => {
    async function loadUser() {
      const response = await api.get("/devs", {
        headers: {
          user: match.params.id,
        },
      });
      setUsers(response.data);
    }
    loadUser();
  }, [match.params.id]);

  async function Like(id) {
    await api.post(`/devs/${id}/likes`, null, {
      headers: { user: match.params.id },
    });
    setUsers(users.filter((user) => user._id !== id));
  }

  async function Dislike(id) {
    //seungundo params é o corpo da requisições só com terceiro parametro consigo enviar os headers
    await api.post(`/devs/${id}/dislikes`, null, {
      headers: { user: match.params.id },
    });
    setUsers(users.filter((user) => user._id !== id));
  }
  return (
    <div className="main-container">
      <Link to="/">
      <img src={logo} alt="TinDev" />
      </Link>
      {users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              <img src={user.avatar} alt={user.name} />
              <footer>
                <strong>{user.name}</strong>
                <p>{user.bio}</p>
              </footer>
              <div className="buttons">
                <button type="button" onClick={() => Like(user._id)}>
                  <img src={like} alt="LIKE" />
                </button>
                <button type="button" onClick={() => Dislike(user._id)}>
                  <img src={dislikee} alt="DESLIKE" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empaty"><p>No momento não tem DEVS</p></div>
      )}
    </div>
  );
}
