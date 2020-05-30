import React,{useState,useEffect} from 'react';
import {Link,useHistory} from 'react-router-dom';
import {FaRandom,FaPlus,FaTrash,FaUserCog,FaCalendarAlt,FaCalendarCheck,FaCheck,FaChartLine,FaUnlock,FaUsers,FaUserCircle, FaCheckDouble,FaUserPlus,FaEdit} from 'react-icons/fa';
import grupoAmigos from '../../assets/grupoAmigos.svg';
import NavBar from  '../../components/navbar';
import './styles.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../../components/spinner';
import api from '../../services/api';


export default function Groups(){
    const history=useHistory();
    const [Details, setDetails]=useState(false);
    const [Sortear, setSortear]=useState(false);
    const [groups, setGroups]=useState([]);
    const [oneGroup,setOneGroup]=useState([]);
    const [participantes,setParticipantes]=useState([]);
    const [idGroup,setidGroup]=useState('');


    const auth = { headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}};
    var dataId= {data: {_id:idGroup}};
    
    useEffect(()=>{
        api.get('gruposusuario',auth)
        .then(response=>{
            setGroups(response.data);
        })
    },[localStorage.token]);

    async function getParticipantes(){
        console.log(dataId);
        const response =await api.get('participantes/'+idGroup,auth);
        setParticipantes(response.data);
    }
    function getDetails(group){
        setDetails(true);
        setOneGroup(group);
        setidGroup(group._id);
        console.log(idGroup);
        getParticipantes();
    }
    return(
        <div className="geral" >
            <NavBar/>
            <div className="container-groups" >
                <section className="groups-container">
                    <section className="title">
                        <h1>Seus grupos:</h1>
                        <button onClick={()=>history.push('/newgroup')}>
                            <FaPlus size={20} color="#037D25"/>
                            Cadastrar Grupo
                        </button>
                    </section>
                   
                    <ul>
                        {groups.map(group=>(
                            <li key={group._id} onClick={()=>getDetails(group)}>
                                <div className='group-header'>
                                    <h2>{group.nome}</h2>                          
                                    <FaTrash size={20} color="#D62525"/>
                                </div>
                                <section>
                                    <FaUserCog size={23} color="#002740"/>
                                    <strong>Criado por:</strong>
                                    <p>{group.criadoPor}</p>
                                </section>
                                <section>
                                    <FaCalendarAlt size={23} color="002740"/>
                                    <strong>Data do sorteio:</strong>
                                    <p>{group.dataSorteio}</p>
                                </section>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="img-container" >
                    
                {
                    !Details && <img src={grupoAmigos} alt="grupo Amigos"/>        
                }
                {
                    Details && 
                    <div className="groupDetails-container">
                        <div className='group-details-header'>
                            <h2>{oneGroup.nome}</h2>  
                            <section>
                                <FaUserPlus size={23} color="#099630"/>
                                <FaEdit size={23} color="#002740"/>
                                <FaTrash size={20} color="#D62525"/>
                            </section>                  
                            
                        </div>
                        <section className="itens">
                            
                            <section>
                                <FaUserCog size={23} color="#002740"/>
                                <strong>Criado por:</strong>
                                <p>{oneGroup.criadoPor}</p>
                            </section>
                            <section>
                                <FaCalendarAlt size={23} color="002740"/>
                                <strong>Data do sorteio:</strong>
                                <p>{oneGroup.dataSorteio}</p>
                            </section>
                            <section>
                                <FaCalendarCheck size={23} color="002740"/>
                                <strong>Data do evento:</strong>
                                <p>{oneGroup.dataEvento}</p>
                            </section>
                            <section>
                                <FaChartLine size={23} color="002740"/>
                                <strong>Faixa de preço:</strong>
                                <p>R${oneGroup.valorMinimo} - R${oneGroup.valorMaximo}</p>
                            </section>
                            <section>
                                <FaUnlock size={23} color="002740"/>
                                <strong>Status do Sorteio:</strong>
                                <p>{oneGroup.status}</p> 
                            </section>
                            <section>
                                <FaUsers size={23} color="002740"/>
                                <strong>Participantes:</strong>
                            </section>

                            <ul>
                                {participantes.map(participante=>(
                                    <li key={participante._id}>
                                        <FaUserCircle size={23} color="002740"/>
                                        <p>{participante.nome}</p>
                                    </li>
                                ))
                                }
                                
                                
                                <li>
                                    <FaUserCircle size={23} color="002740"/>
                                    <p>Participante</p>
                                </li>
                                <li>
                                    <FaUserCircle size={23} color="002740"/>
                                    <p>Participante</p>
                                </li>
                                <li>
                                    <FaUserCircle size={23} color="002740"/>
                                    <p>Participante</p>
                                </li>
                                <li>
                                    <FaUserCircle size={23} color="002740"/>
                                    <p>Participante</p>
                                </li>
                                <li>
                                    <FaUserCircle size={23} color="002740"/>
                                    <p>Participante</p>
                                </li>
                                <li>
                                    <FaUserCircle size={23} color="002740"/>
                                    <p>Participante</p>
                                </li>
                                <li>
                                    <FaUserCircle size={23} color="002740"/>
                                    <p>Participante</p>
                                </li>
                                <li>
                                    <FaUserCircle size={23} color="002740"/>
                                    <p>Participante</p>
                                </li>
                                <li>
                                    <FaUserCircle size={23} color="002740"/>
                                    <p>Participante</p>
                                </li>
                                <li>
                                    <FaUserCircle size={23} color="002740"/>
                                    <p>Participante</p>
                                </li>
                                <li>
                                    <FaUserCircle size={23} color="002740"/>
                                    <p>Participante</p>
                                </li>
                                <li>
                                    <FaUserCircle size={23} color="002740"/>
                                    <p>Participante</p>
                                </li>
                                <li>
                                    <FaUserCircle size={23} color="002740"/>
                                    <p>Participante</p>
                                </li>
                                <li>
                                    <FaUserCircle size={23} color="002740"/>
                                    <p>Participante</p>
                                </li>
                                <li>
                                    <FaUserCircle size={23} color="002740"/>
                                    <p>Participante</p>
                                </li>
                                <li>
                                    <FaUserCircle size={23} color="002740"/>
                                    <p>Participante</p>
                                </li>
                                <li>
                                    <FaUserCircle size={23} color="002740"/>
                                    <p>Participante</p>
                                </li>
                                <li>
                                    <FaUserCircle size={23} color="002740"/>
                                    <p>Participante</p>
                                </li>
                                <li>
                                    <FaUserCircle size={23} color="002740"/>
                                    <p>Participante</p>
                                </li>
                                <li>
                                    <FaUserCircle size={23} color="002740"/>
                                    <p>Participante</p>
                                </li>
                            
                                

                                
                            </ul>

                        </section>

                        <Link to="/registerdraw">
                            <div className="float-button" 
                                    onMouseOver={() => setSortear(true)} 
                                    onMouseOut={() => setSortear(false)} >
                                {Sortear ? "Sortear" : ""}
                                <FaRandom size="20px" />
                            </div>
                        </Link>
                    </div>
                }
                   
                    
                </section>
            </div>
            <ToastContainer/>
        </div>
    );
};

