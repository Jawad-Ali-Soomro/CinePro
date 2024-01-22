import axios from "axios";
import React, { useEffect, useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineArrowDown } from "react-icons/ai";
import { PulseLoader } from "react-spinners";
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
  const [scrolling, setScrolling] = useState(false);

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
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      setInterval(() => {
        get_now_playing();
        get_popular();
      }, 1000);
      setInterval(() => {
        setPage(page + 1);
      }, 10000);
    };
  }, []);
  return (
    <div className="flex col">
      <div className="banner">
        {now_upcoming[0] !== undefined ? (
          <img src={`${imgUrl}/${now_upcoming[0].poster_path}`} alt="" />
        ) : (
          <div className="loader">
            <PulseLoader
              color={"rgba(241.5, 199.5, 52.5, 1)"}
              loading={true}
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        )}
        <div className="content flex col">
          <h1>Explore Millions Of Movies with us</h1>
          <h2>
            Empower your movie nights with our hero-approved recommendations –
            where every film is a chance to embrace your inner adventurer.
          </h2>
          <AiOutlineArrowDown className="icon" />
        </div>
      </div>
      <div className="card_now_playing flex">
        <h1>Now Playing</h1>
        {now_playing.map((item, index) => {
          return (
            <div className="card flex col" key={item.id}>
              <img
                src={`${imgUrl}/${item.poster_path}`}
                alt={item.title}
                onClick={() => navigate(`/movie/${item.id}`)}
              />
            </div>
          );
        })}
        <button
          className="flex justify-between"
          onClick={() => navigate(`/search/${now}/2`)}
        >
          Explore More <AiOutlineArrowRight />
        </button>
      </div>
      <div className="card_now_playing flex">
        <h1>upcoming</h1>
        {now_upcoming.map((item, index) => {
          return (
            <div className="card flex col" key={item.id}>
              <img
                src={`${imgUrl}/${item.poster_path}`}
                alt={item.title}
                onClick={() => navigate(`/movie/${item.id}`)}
              />
            </div>
          );
        })}
        <button
          className="flex justify-between"
          onClick={() => navigate(`/search/${upcoming}/2`)}
        >
          Explore More <AiOutlineArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Home;
