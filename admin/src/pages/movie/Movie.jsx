import { Link, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import storage from "../../firebase";
import "./movie.css";
import { Publish } from "@material-ui/icons";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updateMovie } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";

export default function Movie() {
  const location = useLocation();
  const movies = location.movie;
  const [arrUploaditem, setArrUploaditem] = useState([]);
  const [movie, setMovie] = useState(null);
  const [img, setImg] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [uploaded, setUploaded] = useState(0);

  const { dispatch } = useContext(MovieContext);

  const handleChange = (e) => {
    const value = e.target.value;
    setMovie({ ...movie, [e.target.name]: value });
  };

  const upload = (items) => {
    items.forEach((item) => {
      const fileName = new Date().getTime() + item.label;
      const storage = getStorage();
      const storageRef = ref(storage, `/items/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, item.file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          } 
        },
        (error) => {
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;
            case 'storage/canceled':
              // User canceled the upload
              break;
      
            // ...
      
            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setMovie((prev) => {
              return { ...prev, [item.label]: url };
            });
            setUploaded((prev) => prev + 1);
          });
        }
      );
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    upload(arrUploaditem);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMovie(movies._id,movie, dispatch);
  };
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Movie</h1>
        <Link to="/newmovie">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={movies.img} alt="" className="productInfoImg" />
            <span className="productName">{movies.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{movies._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">genre:</span>
              <span className="productInfoValue">{movies.genre}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">year:</span>
              <span className="productInfoValue">{movies.year}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">limit:</span>
              <span className="productInfoValue">{movies.limit}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Movie Title</label>
            <input type="text" name="title" placeholder={movies.title} onChange={handleChange}/>
            <label>Year</label>
            <input type="text" name="year"  placeholder={movies.year} onChange={handleChange}/>
            <label>Genre</label>
            <input type="text" name="genre" placeholder={movies.genre} onChange={handleChange}/>
            <label>Limit</label>
            <input type="text" name="limit" placeholder={movies.limit} onChange={handleChange}/>
            <label>Trailer</label>
            <input type="file" name="trailer" placeholder={movies.trailer}  onChange={(e) => {setArrUploaditem(arrUploaditem.concat({ file: e.target.files[0], label: "trailer" }))}}/>
            <label>Video</label>
            <input type="file" name="video" placeholder={movies.video} onChange={(e) => {setArrUploaditem(arrUploaditem.concat({ file: e.target.files[0], label: "video" }))}}/>
            <label>Image</label>
            <input type="file" id="file" name="img" placeholder={movies.img} onChange={(e) => {setArrUploaditem(arrUploaditem.concat({ file: e.target.files[0], label: "img" }))}}/>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img
                src={movies.img}
                alt=""
                className="productUploadImg"
              />
            </div>
            {uploaded === arrUploaditem.length ? (
          <button className="productButton" onClick={handleSubmit}>
            Update
          </button>
        ) : (
          <button className="productButton" onClick={handleUpload}>
            Upload
          </button>
        )}
          </div>
        </form>
      </div>
    </div>
  );
}