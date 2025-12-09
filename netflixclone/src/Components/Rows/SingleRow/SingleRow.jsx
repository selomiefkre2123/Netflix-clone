import React,{useEffect,useState} from 'react'
import axios from "../../../Utils/axios"
import "./singlerow.css"
import movieTrailer from "movie-trailer" // finds trailer link.
import YouTube from "react-youtube" // displays the trailer by creating automatic component.

const SingleRow = ({title,fetchUrl,isLargeRow}) => {
    const [movies,setMovie]=useState([]);
    const [trailerUrl,setTrailerUrl]= useState("");
    // trailerUrl → stores YouTube video ID of the selected movie trailer.

    const base_url="https://image.tmdb.org/t/p/original";  // Base images URL.

    useEffect(()=>{
        (async()=>{
            try{
                // console.log(fetchUrl)
                const request=await axios.get(fetchUrl);
                // console.log(request)
                setMovie(request.data.results);
            }
            catch(error){
                console.log("error",error)
            }
        })()
    },[fetchUrl]);

    const handleClick = (movie)=>{
        if(trailerUrl){
            setTrailerUrl('')
            //  If a trailer is already playing--> Stop playing trailer
        }else{
            movieTrailer(movie?.title || movie?.name || movie?.original_name)
            .then((url)=>{
              // console.log(url);
              const urlParams = new URLSearchParams(new URL(url).search);
              
              // console.log(new URL(url));
              // console.log(urlParams);
              // console.log(urlParams.get("v"));
              setTrailerUrl(urlParams.get("v"));

              // movie-trailer-->give movie name → searches & gives you the YouTube link of the trailer..
              // movieTrailer("Avengers")-->returns-->https://www.youtube.com/watch?v=JfVOs4VSpmA&t=10s
              // then extract the v value, which is the YouTube video ID.
              // You pass this ID to the YouTube component to play the trailer.
              // setTrailerUrl(videoId) shows the trailer.
            })
        }
    }
    // https://www.youtube.com/watch -->main URL
    // ?v=JfVOs4VSpmA&t=10s QUERY PART(everything after the question mark) It contains key value pairs.

    //    v	JfVOs4VSpmA	The YouTube video ID
    //    t	10s	The video will start at 10 seconds

    //   new URL(url)-->Convert string whole url → URL object.
    //    .host       "www.youtube.com"
    //    .pathname   "/watch"
    //    .search    ?v=JfVOs4VSpmA&t=10s
    //    new URL(url).search-->Extracts “query part” i.e-->?v=JfVOs4VSpmA&t=10s
    //   new URLSearchParams(...)-->Converts into an object like:
    //   { v: "JfVOs4VSpmA",   t: "10s"}

    const opts ={
        height:'390',
        width:'100%',
        playerVars:{
            autoplay:1,
        }
    }
  return (
    <div className="row">
      <h1>{title}</h1>
      <div className="row_posters">
        {movies?.map((movie, index) => (
          <img
            onClick={() => handleClick(movie)}
            key={index}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
          />
        ))}
      </div>
      <div style={{ padding: "40px" }}>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        {/* react-youtube package create automatically a React component called <YouTube />.
            then ID you extracted from movie-trailer gets passed to YouTube component that plays YouTube videos inside your website. */}
      </div>
    </div>
  );
}

export default SingleRow;