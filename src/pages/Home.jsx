import axios from "axios";
import React, { useEffect, useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const api_key = "c3f04fb91ba5e5d7b38df22f9c846a2e";
  let [page, setPage] = useState(1);
  const now = "now_playing";
  const popular = "popular";
  const upcoming = "upcoming";
  const baseUrl = "https://api.themoviedb.org/3";
  const imgUrl = "https://image.tmdb.org/t/p/original";

  //   const [now_popular, setnow_popular] = useState([]);
  const [now_playing, setnow_playing] = useState([]);
  const [now_upcoming, setnow_upcoming] = useState([]);

  useEffect(() => {
    const get_now_playing = async () => {
      await axios
        .get(
          `${baseUrl}/movie/${now}?language=en-US&page=${page}&api_key=${api_key}`
        )
        .then((res) => setnow_playing(res.data.results));
    };
    const get_popular = async () => {
      await axios
        .get(
          `${baseUrl}/movie/${upcoming}?language=en-US&page=${page}&api_key=${api_key}`
        )
        .then((res) => setnow_upcoming(res.data.results));
    };

    return () => {
      setInterval(() => {
        get_now_playing();
        get_popular();
      }, 1000);
    };
  }, []);
  //   console.log(now_playing[0].poster_path);
  return (
    <div className="flex col">
      <div className="banner"></div>
      <div className="card_now_playing flex">
        <h1>Now Playing</h1>
        {now_playing.map((item, index) => {
          return (
            <div className="card flex col">
              <img
                src={`${imgUrl}/${item.poster_path}`}
                alt={item.title}
                onClick={() => navigate(`/movie/${item.id}`)}
              />
            </div>
          );
        })}
        <button>Explore More</button>
      </div>
      <div className="card_now_playing flex">
        <h1>upcoming</h1>
        {now_upcoming.map((item, index) => {
          return (
            <div className="card flex col">
              <img
                src={`${imgUrl}/${item.poster_path}`}
                alt={item.title}
                onClick={() => navigate(`/movie/${item.id}`)}
              />
            </div>
          );
        })}
        <button>Explore More</button>
      </div>
    </div>
  );
};

export default Home;
