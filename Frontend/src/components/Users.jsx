import { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users = () => {
  const [users, setUsers] = useState([]);
  // Replace with backend call
  const [filter, setFilter] = useState("");

    useEffect(()=>{
     axios.get("http://localhost:4000/user/Finduser?username=" + filter , {
      headers: {
        Authorization: localStorage.getItem("Token")
      }
     })
     .then((response)=>{
      setUsers(response.data.users)
     })
        
    }, [filter])

  return (
    <div className="flex flex-col gap-1 w-96">
      <div className="font-bold text-lg">Transactions</div>
      <div className="my-2">
        <input onChange={(e)=>{
          setFilter(e.target.value)
        }}
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-2 border rounded border-slate-200"
        ></input>
      </div>
      <div>
        {users.map(user => <User user={user} />)}
      </div>
    </div>
  );
};


function User({ user }) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
          {user.name[0]}
          </div>
        </div>
        <div className="flex flex-col justify-center h-ful">
          <div>
             {user.username}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center h-ful">
        <Button onClick={(e)=>{
            navigate("/transfer?id=" + user._id + "&username=" + user.username);
        }} label={"Send Money"} />
      </div>
    </div>
  );
}
