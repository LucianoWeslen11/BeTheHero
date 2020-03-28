import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 

import api from '../../services/api'
import './styles.css';

// Imagens
import heroesImage from '../../assets/heroes.png'
import logoImage from '../../assets/logo.svg'

export default function Logon(){
  const [id, setId] =  useState('');
  const history = useHistory();

  async function handleLogin(e){
    e.preventDefault();

    try{
      const res = await api.post('sessions', {id});

      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', res.data.name);

      history.push('/profile');
    }catch(err){
      toast.error('ID Inválido, por favor digite um ID válido!')
    }
  }

  return (
    <div className="logon-container">
      <ToastContainer />
      <section className="form">
        <img src={logoImage} alt="BeTheHero"/>
        <form onSubmit={handleLogin}>
          <h1>Faça seu Logon</h1>
          <input 
            placeholder="Seu ID"
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <button className="button" type="submit">Entrar</button>
          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#E02041"/>
            Não tenho cadastro
          </Link>
        </form>
      </section>
      <img src={heroesImage} alt="Heroes"/>
    </div>
  );
}