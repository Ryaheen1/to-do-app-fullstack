import ListHeader from "./components/ListHeader"
import "./App.css"
import {useEffect,useState} from "react"
import ListItem from "./components/ListItem"
import Auth from "./components/Auth"
import { useCookies } from 'react-cookie'



const App=()=> {
  
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const [tasks,setTasks]=useState(null)
  const authToken = cookies.AuthToken
  const userEmail = cookies.Email
 
  const getData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`)
      if (response.status === 200) {
        const json = await response.json()
        setTasks(json)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (authToken) {
      // Fetch data here
      getData();
    }
  }, []);

  console.log(tasks)

 //Sort by date
 const sortedTasks = tasks?.sort((a, b) => new Date(a.date) - new Date(b.date))

  return (
    <div className="app">
    {!authToken && <Auth />}
    {authToken && 
      <>
      <ListHeader listName={'✨ Tasks List '} getData={getData} />
      <p className="user-email">Welcome back {userEmail}</p>
    {sortedTasks?.map((task) => (
      <ListItem key={task.id} task={task} getData={getData} />
    ))}
      </>
    }
   <div>
    {userEmail && userEmail.length >= 3 && (
      <p className="copyright">{userEmail.substring(0, 3)}@copyright</p>
    )}
  </div>

  </div>
)
}

export default App;
