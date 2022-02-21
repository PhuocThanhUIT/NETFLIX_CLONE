import "./home.scss"
import Navbar from "../../components/navbar/Navbar"
import Featured from "../../components/featured/Featured"
import List from "../../components/list/List"
import { useState,useEffect } from "react"
import axios from "axios";
const Home = ({type,genre}) => {
  const [lists,setLists] = useState([]);
  useEffect(() =>{
    const getRandomLists = async ()=>{
      try{
        const res = await axios.get(
          `lists${type? "?type"+type:""}${genre?"?genre"+genre:""}`,{
            headers:{
              token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZTdjMDZjMTY2MWRmZjRkZmVmYTA5MCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0NTQ1NDM2MiwiZXhwIjoxNjQ1NTQwNzYyfQ.gqceBd32dmB0ofAjhp5f0_bCw7LinHFYYcByvCtTRdk"
            }
          });
          setLists(res.data);
      }catch(err){
        console.log(err);
      }
    }
    getRandomLists();
  },[type,genre]);

  return (
    <div className="home">
        <Navbar/>
        <Featured type={type}/>
        {lists.map((list)=>(
          <List list = {list}/>
        ))}
    </div>
  )
}

export default Home