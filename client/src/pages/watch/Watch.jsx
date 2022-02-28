import { ArrowBackOutlined } from "@material-ui/icons"
import "./watch.scss"
import {Link, useLocation} from 'react-router-dom'

export default function Watch() {
  const location = useLocation();
  console.log(location);
  const movie = location.state.movie;
  console.log(movie);
  return (
    <div className="watch">
      <Link to="/">
      <div className="back">
            <ArrowBackOutlined/>
            Home
        </div>
      </Link>
        
        <video
            className="video"
            muted
            autoPlay
            process
            controls
            src={movie.video}
        />
    </div>
  )
}
