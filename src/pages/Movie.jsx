import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const Movie = () => {
  const { id } = useParams();
  const api_key = "c3f04fb91ba5e5d7b38df22f9c846a2e";
  const imgUrl = "https://image.tmdb.org/t/p/original";
  const [movieImages, setMovieImages] = useState([]);

  const [movieData, setMovieData] = useState();
  useEffect(() => {
    const getData = async () => {
      await axios
        .get(
          `https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=${api_key}`
        )
        .then((res) => setMovieData(res.data));
    };
    const getImages = async () =>
      await axios
        .get(
          `https://api.themoviedb.org/3/movie/${id}/images?api_key=${api_key}`
        )
        .then((result) => setMovieImages(result.data.backdrops));

    return () => {
      setInterval(() => {
        getData();
        getImages();
      }, 1000);
    };
  }, []);
  let first10Items = movieImages.slice(0, 6);
  return (
    <>
      {movieData !== undefined ? (
        <div className="main-movie flex justify-between col">
          <div className="top flex">
            <div className="left flex">
              <img src={`${imgUrl}/${movieData.poster_path}`} alt="" />
            </div>
            <div className="right flex col left">
              <h1>
                {movieData.title} <span>({movieData.original_title})</span>
              </h1>
              <p>
                {movieData.release_date}
                {movieData.genres.map((item) => {
                  return <section>{item.name}</section>;
                })}
              </p>
              <p>{movieData.tagline}</p>
              <div className="overview">
                <h2>Overview</h2>
                <p style={{ maxWidth: "600px" }}>{movieData.overview}</p>
              </div>
            </div>
          </div>
          <div className="bottom flex">
            {first10Items.map((item) => {
              return <img src={`${imgUrl}/${item.file_path}`} alt="" />;
            })}
          </div>
        </div>
      ) : (
        <h1>Loding...</h1>
      )}
    </>
  );
};

export default Movie;
