import Modal from './Model';
import { useState } from 'react';
import { Cookies, useCookies } from 'react-cookie';

const ListHeader=({listName,getData})=> {
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const [showModal,setShowModal]=useState(null)

  const signout=()=>{
    removeCookie("AuthToken")
    removeCookie('Email')
    window.location.reload()
    }
    return (
      <div className="ListHeader" >
       <h1 style={{color:"gray"}}>{listName}</h1> 
       <div className="button-container">
        <button type="button" className="create" onClick={()=>setShowModal(true)}>Add new</button>
        <button type="button" className="signout" onClick={()=>signout()}>Sign Out</button>
        
       </div>
      { showModal && <Modal modes={'create'} setShowModal={setShowModal} getData={getData}/>}
      </div>
    ); 
  }
  
  export default ListHeader;