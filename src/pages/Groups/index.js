import React,{useState,useEffect} from 'react';
import Popup from "reactjs-popup";
import {Link,useHistory} from 'react-router-dom';
import {FaClipboardList,FaSync,FaRandom,FaPlus,FaTrash,FaUserCog,FaCalendarAlt,FaCalendarCheck,FaChartLine,FaUnlock,FaUsers,FaUserCircle,FaUserPlus,FaEdit} from 'react-icons/fa';
import grupoAmigos from '../../assets/grupoAmigos.svg';
import NavBar from  '../../components/navbar';
import './styles.css';
import api from '../../services/api';
import PopUp from'../../components/PopUp';
import PopUpDesejo from'../../components/PopUpDesejo';



export default function Groups(){
    const [popup,setpopup]=useState(false);
    const [popupDesejo,setpopupDesejo]=useState(false);
    const history=useHistory();
    const [Details, setDetails]=useState(false);
    const [Sortear, setSortear]=useState(false);
    const [groups, setGroups]=useState([]);
    const [oneGroup,setOneGroup]=useState([]);
    const [participantes,setParticipantes]=useState([]);
    const [idGroup,setidGroup]=useState('');
    const [NameGroup,setNameGroup]=useState('');


    const auth = { headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}};
    var dataId= {data: {_id:NameGroup}};
    
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
        setNameGroup(group.nome);
        localStorage.setItem('_id',group._id)
        console.log(localStorage._id);
        getParticipantes();
    }
    function handleParticipat(oneGroup){
        localStorage.setItem('_id',idGroup);
        localStorage.setItem('nomeGrupo',NameGroup);
        history.push('/addparticipant');
    }
    function handleEditGroup(){
        localStorage.setItem('_id',idGroup);
        history.push('/editgroup');
    }
    async function handleDeleteGroup(){
        setpopup(!popup);
    }
    
    function handleLista(){
        setpopupDesejo(!popupDesejo);
    }

    
    return(
        <div className="geral" >
            <NavBar/>
            {
                popupDesejo&&<PopUpDesejo/>
            }
            {
                popup&&<PopUp/>
            }
            <div className="container-groups" >
                
 
                <section className="groups-container">
                    <section className="title">
                        <section>
                            <FaSync size={20} color="#fff" onClick={()=>window.location.reload(true)}/>
                        <h1>
                            Seus grupos: {groups.length}
                        </h1>
                        
                        </section>
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
                                <FaClipboardList size={23} color="#44231A" onClick={handleLista}/>
                                <FaUserPlus size={23} color="#099630" onClick={(oneGroup)=>handleParticipat(oneGroup)}/>
                                <FaEdit size={23} color="#002740" onClick={handleEditGroup}/>
                                <FaTrash size={20} color="#D62525" onClick={handleDeleteGroup}/>
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
        </div>
    );
};

