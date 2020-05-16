import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {FaArrowLeft} from 'react-icons/fa'
import './styles.css';

import logoGrande from '../../assets/logo-grande.svg';
import api from '../../services/api';


export default function Register(){
    const [nome, setNome]= useState('');
    const [dataNascimento, setDataNascimento]= useState('');
    const [email, setEmail]= useState('');
    const [senha, setSenha]= useState('');


    async function handleRegister(e){
        e.preventDefault();

        const data ={
            nome,
            dataNascimento,
            email,
            senha
        };

        try{
            const response = await api.post('usuario',data);
            alert (response.data.msg);
        } catch(err){
            alert ('Erro ao cadastrar usuário.');
        }
        
    }




    return(
        <div className="register-container">
           <section className ="form">
                <form onSubmit={handleRegister}>
                    <input 
                        type="text" 
                        placeholder="Nome"
                        value={nome}
                        onChange={e=> setNome(e.target.value)}
                    />
                    <input 
                        type="date" 
                        placeholder="Data de Nascimento"
                        value={dataNascimento}
                        onChange={e=> setDataNascimento(e.target.value)}
                    />
                    <input 
                        type="email" 
                        placeholder="Email"
                        value={email}
                        onChange={e=> setEmail(e.target.value)}
                    />
                    <input 
                        type="password" 
                        placeholder="Senha"
                        value={senha}
                        onChange={e=> setSenha(e.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>

                    <Link className="link" to="/">
                    <FaArrowLeft size={16} color="#0076BF"/>
                     Tenho cadastro
                    </Link>

                </form>

            </section>
        
            <section className="logo-principal">
                <img src={logoGrande} alt="logo Amigo Chocolate"/>
            </section>

        </div>
    );

}