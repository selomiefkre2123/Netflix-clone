import React, { useEffect, useState } from "react";
import axios from "../../Utils/axios";
import requests from "../../Utils/requests";
import "./Banner.css";


function truncate(str, n) {
  return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}
// its shorten long movie descriptions-->If the text is longer than the limit n, it cuts it and adds "..."

const Banner = () => {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    (async ()=> {
      try{
           const request = await axios.get(requests.fetchNetflixOriginals);
           console.log(request)
           setMovie(request.data.results[
          Math.floor(Math.random() * request.data.results.length)]);

        //   request.data.results is an array.

        //  Math.floor(Math.random() * request.data.results.length) gives a random index.

        //  request.data.results[randomIndex] returns one object from that array.

        //  setMovie() updates the state by storing that object.
        
      } catch(error){
        console.log("error",error);
      }
    })();
  }, []);
  return (
    <div className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="banner-contents">
        <h1 className="banner_title">
          {movie?.name || movie?.title || movie?.original_name}
        </h1>
        <div className="banner_buttons">
          <button className="banner-button play">Play</button>
          <button className="banner-button">My List</button>
        </div>
        <h1 className="banner_description">{truncate(movie?.overview, 150)}</h1>
      </div>
      <div className="fadebottom" />
    </div>
  );
};

export default Banner;
