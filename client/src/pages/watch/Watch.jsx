import { ArrowBackOutlined } from "@material-ui/icons"
import "./watch.scss"
import {Link, useLocation} from 'react-router-dom'
import ReactPlayer from 'react-player'

export default function Watch() {
  const location = useLocation();
  const movie = location.state.movie;
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
