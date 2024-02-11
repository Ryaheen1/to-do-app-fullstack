import React, { useState } from 'react';
import { useCookies } from 'react-cookie'


const Model = ({modes,setShowModal, getData, task}) => {
  const [cookies, setCookie, removeCookie] = useCookies(['user'])

   const editMode1= modes ==='edit'? true:false;

  const [data,setData]=useState({
    user_email: editMode1 ? task.user_email : cookies.Email,
    title:editMode1 ? task.title : null,
    progress:editMode1 ? task.progress : 50,
    date: editMode1? task.date: new Date()
  })


  const postData = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (response.status === 200) {
        setShowModal(null)
        getData()
      }
    } catch (error) {
      console.error(error)
    }
  }

  
  console.log(process.env.REACT_APP_SERVERURL);


  const editData = async (e) => {
    e.preventDefault()
    try {
      
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (response.status === 200) {
        console.log('WORKED')
        setShowModal(false)
       getData()
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleChange = (e) => {
    console.log("handleChange");
    const {name,value}=e.target;
    console.log({name,value})

    setData(data => ({
      ...data, 
      [name]:value
    }))
    console.log(data)
  }

  return (
    <div className="overlay">
      <div className="model">
        <div className="form-title-container">
          <h3 style={{color:"gray"}}>Let's {modes} your task</h3>
          <button onClick={()=>setShowModal(false)} className='delete'style={{ borderRadius: '50px', margin:"10px" }} >X</button>
        </div>
        <form>
          <input
            required
            maxLength={30}
            placeholder="Your task goes here"
            name="title"
            value={data.title}
            onChange={handleChange}
          />
          <br />
          <label for="range">Drage to select your current progess</label>
          <input
            required
            type="range"
            id='range'
            min="0"
            max="100"
            name="progress"
            value={data.progress}
            onChange={handleChange}
            style={{background:'rgb(229, 237, 159)', margin:"10px", height:"10px"}}
            className="form-range"
            />
          <input className={modes} type="submit" onClick={editMode1?editData:postData}  />
          
        </form>
      </div>
    </div>
  );
}

export default Model;
