import { Add, PlayArrow, ThumbDownOutlined, ThumbUpAltOutlined } from "@material-ui/icons";
import "./listitem.scss";
import {useState,useEffect} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

export default function ListItem({index,item}) {
  const [isHovered,setIsHovered] = useState(false);
  const [movie,setMovie] = useState({});
  useEffect(()=>{
    const getMovie = async ()=>{
      try{
        const res = await axios.get("movies/find/"+ item,{
          headers:{
            token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZTdjMDZjMTY2MWRmZjRkZmVmYTA5MCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0NTU5ODE0MSwiZXhwIjoxNjQ1Njg0NTQxfQ.yW9QqhdiqdNS0LEBI1mrS6DeVqPwjitl_5a32zhQpWk"
          }
        });
        setMovie(res.data);
        console.log(res.data);
      }catch(err){
        console.log(err);
      }
    }
    getMovie();
  },[item]);

  
  return (
    <Link to="/Watch" state={{ movie }}>
    <div 
        className="listItem"
        style={{left:isHovered && index*225-50+index*2.5}}
        onMouseEnter={()=>setIsHovered(true)}
        onMouseLeave={()=>setIsHovered(false)}
    >
        <img src={movie.img} alt="" />
        {isHovered && (
        <>
          <video src={movie.trailer} autoPlay={true} loop={true} />
          <div className="itemInfo">
            <div className="icons">
              <PlayArrow className="icon" />
              <Add className="icon" />
              <ThumbUpAltOutlined className="icon" />
              <ThumbDownOutlined className="icon" />
            </div>
            <div className="itemInfoTop">
              <span>{movie.duration}</span>
              <span className="limit">+{movie.limit}</span>
              <span>{movie.year}</span>
            </div>
            <div className="desc">
              {movie.desc}
            </div>
            <div className="genre">{movie.genre}</div>
          </div>
        </>
      )}
    </div>
    </Link>
  )
}
