import { Link, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { updateList } from "../../context/listContext/apiCalls";
import "./list.css";
import {  getMovies } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { ListContext } from "../../context/listContext/ListContext";
import { useHistory } from "react-router-dom";

export default function List() {
  const location = useLocation();
  const lists = location.list;
  const [list, setList] = useState(null);
  const [arrContent, setArrContent] = useState(lists.content);
  const history = useHistory();

  const { dispatch } = useContext(ListContext);
  const { movies, dispatch: dispatchMovie } = useContext(MovieContext);

  useEffect(() => {
    getMovies(dispatchMovie);
  }, [dispatchMovie]);

  const handleChange = (e) => {
    const value = e.target.value;
    setList({ ...list, [e.target.name]: value });
  };

  const handleAddContentSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    if(!arrContent.includes(value)){
      setArrContent(arrContent.concat(value));
    }
    setList({ ...list, [e.target.name]: arrContent });
  };
  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setArrContent(arrContent.filter(item => item != value));
    setList({ ...list, [e.target.name]: arrContent });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateList(lists._id,list, dispatch);
    history.push("/lists");
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">List</h1>
        <Link to="/newList">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <span className="productName">{lists.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{lists._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">genre:</span>
              <span className="productInfoValue">{lists.genre}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">type:</span>
              <span className="productInfoValue">{lists.type}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>List Title</label>
            <input type="text" name="title" placeholder={lists.title} onChange={handleChange}/>
            <label>Type</label>
            <input type="text" name="type" placeholder={lists.type} onChange={handleChange}/>
            <label>Genre</label>
            <input type="text" name="genre" placeholder={lists.genre} onChange={handleChange}/>
          </div>
          <div className="formRight">
          <div className="addProductItem">
            <label>Content</label>
            <select
              multiple
              name="content"
              onChange={handleSelect}
              style={{ height: "280px" }}
            >
              {arrContent.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="formRight">
          <div className="addProductItem">
            <label>Movie</label>
            <select
              multiple
              name="content"
              onChange={handleAddContentSelect}
              style={{ height: "280px" }}
            >
              {movies.map((movie) => (
                <option key={movie._id} value={movie._id}>
                  {movie.title}
                </option>
              ))}
            </select>
          </div>
        </div>
          <div className="productFormRight">
            <button className="productButton" onClick={handleSubmit}>Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}