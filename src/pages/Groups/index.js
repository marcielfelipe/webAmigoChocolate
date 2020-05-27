import React,{useState} from 'react';
import {FaTrash,FaUserCog,FaCalendarAlt,FaCheck} from 'react-icons/fa';
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
                        <li >
                            <div className='group-header'>
                                <h2>Grupo 1</h2>                          
                                <FaTrash size={20} color="#D62525"/>
                            </div>
                            <section>
                                <FaUserCog size={23} color="#002740"/>
                                <strong>Criado por:</strong>
                                <p>Usuário</p>
                            </section>
                            <section>
                                <FaCalendarAlt size={23} color="002740"/>
                                <strong>Data do sorteio:</strong>
                                <p>10/10/2021</p>
                            </section>
                        </li>

                        <li>
                            <div className='group-header'>
                                <h2>Grupo 1</h2>                          
                                <FaTrash size={20} color="#D62525"/>
                            </div>
                            <section>
                                <FaUserCog size={23} color="#002740"/>
                                <strong>Criado por:</strong>
                                <p>Usuário</p>
                            </section>
                            <section>
                                <FaCalendarAlt size={23} color="002740"/>
                                <strong>Data do sorteio:</strong>
                                <p>10/10/2021</p>
                            </section>
                        </li>

                        <li>
                            <div className='group-header'>
                                <h2>Grupo 1</h2>                          
                                <FaTrash size={20} color="#D62525"/>
                            </div>
                            <section>
                                <FaUserCog size={23} color="#002740"/>
                                <strong>Criado por:</strong>
                                <p>Usuário</p>
                            </section>
                            <section>
                                <FaCalendarAlt size={23} color="002740"/>
                                <strong>Data do sorteio:</strong>
                                <p>10/10/2021</p>
                            </section>
                        </li>
                        
                        <li>
                            <div className='group-header'>
                                <h2>Grupo 1</h2>                          
                                <FaTrash size={20} color="#D62525"/>
                            </div>
                            <section>
                                <FaUserCog size={23} color="#002740"/>
                                <strong>Criado por:</strong>
                                <p>Usuário</p>
                            </section>
                            <section>
                                <FaCheck size={23} color="002740"/>
                                <strong>Status:</strong>
                                <p>Sorteado</p>
                            </section>
                        </li>
                        
                    </ul>
                </section>

                <section className="img-container">
                    <img src={grupoAmigos} alt="grupo Amigos"/>
                </section>
            </div>
        </div>
    );


};