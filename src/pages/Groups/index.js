import React from 'react';
import {Link} from 'react-router-dom';
import {FaPowerOff,FaUser,FaPlus,FaTrash} from 'react-icons/fa';
import logoBranca from '../../assets/logoBranca.svg';
import grupoAmigos from '../../assets/grupoAmigos.svg';
import NavBar from  '../../components/navbar';

import './styles.css';

export default function Groups(){
    return(
        
        <div className="geral">
            <NavBar/>
            <div className="container">
                <section className="groups-container">
                    <h1>Seus grupos:</h1>
                    <ul>
                        <li>
                            <div>
                                <h2>Grupo 1</h2>
                                <button type="button">
                                    <FaTrash size={20} color="#D62525"/>
                                </button>
                            </div>
                            

                            <strong>Criado por:</strong>
                            <p>Usuário</p>

                            <strong>Data do sorteio:</strong>
                            <p>10/10/2021</p>
                            
                        </li>
                        
                        
                    </ul>
                </section>
                <section className="img-container">
                    <img src={grupoAmigos} alt="grupo Amigos"/>
                </section>
            </div>
            

        </div>
    );


}