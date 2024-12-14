import axios from "axios"
import { useEffect, useState } from "react"

export const getUser = () =>{
    const [user, setUser] = useState([])
    useEffect(()=>{
        async function main(){
          const response = await axios.get('http://localhost:4000/user/dashboard', {
            headers:{
              Authorization: localStorage.getItem("Token")
            }
          })
          setUser(response.data.user)
        }
        main()
      },[])
    return user;
}