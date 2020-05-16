import React from  'react';
import {Link} from 'react-router-dom';
import {FaSignInAlt} from 'react-icons/fa'
import './styles.css';

import logoGrande from '../../assets/logo-grande.svg';


export default function Logon(){
    return(
        <div className="logon-container">
            <section className ="form">
                <form onSubmit="">

                    <input type="email" placeholder="Email"/>
                    <input type="password" placeholder="Senha"/>

                    <button className="button" type="submit">Login</button>

                    <Link className="link" to="/register">
                    <FaSignInAlt size={16} color="//#0076BF"/>
                     Cadastrar-se
                    </Link>

                </form>
            </section>

            <section className="logo-principal">

                <img src={logoGrande} alt="Logo Amigo Chocolate"/>

            </section>

        </div>
    )
}