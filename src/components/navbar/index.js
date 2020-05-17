import React from 'react';
import {Link,useHistory} from 'react-router-dom';
import {FaPowerOff,FaUser} from 'react-icons/fa';
import logoBranca from '../../assets/logoBranca.svg';
import './styles.css';


export default function NavBar(){
    return(
        <header>
            <img src={logoBranca} alt="Amigo Chocolate"/>
            <span>Olá Usuário!</span>
            <button type="button">
                <FaPowerOff size={25} color="#D62525"/>
                <Link to="/"/>
            </button>
            <button type="button">
                <FaUser size={25} color="#fff"/>
            </button>
        </header>
    );
}