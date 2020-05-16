import React from 'react';
import {Link} from 'react-router-dom';
import {FaArrowLeft} from 'react-icons/fa'
import './styles.css';
import logoGrande from '../../assets/logo-grande.svg';



export default function Register(){
    return(
        <div className="register-container">
           <section className ="form">
                <form onSubmit="">
                    <input type="text" placeholder="Nome"/>
                    <input type="date" placeholder="Data de Nascimento"/>
                    <input type="email" placeholder="Email"/>
                    <input type="password" placeholder="Senha"/>

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