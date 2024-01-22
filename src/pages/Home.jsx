import axios from "axios";
import React, { useEffect, useState } from "react";
import "../App.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import "swiper/css";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { AiFillPlayCircle, AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const api_key = "c3f04fb91ba5e5d7b38df22f9c846a2e";
  let [page, setPage] = useState(1);
  const now = "now_playing";
  const popular = "popular";
  const upcoming = "upcoming";
  const top_rated = "top_rated";
  const baseUrl = "https://api.themoviedb.org/3";
  const imgUrl = "https://image.tmdb.org/t/p/original";
  const [now_playing, setnow_playing] = useState([]);
  const [now_upcoming, setnow_upcoming] = useState([]);
  const [now_popular, setnow_popular] = useState([]);
  const [now_top_rated, setnow_top_rated] = useState([]);
  const [scrolling, setScrolling] = useState();

  useEffect(() => {
    const get_now_playing = async () => {
      await axios
        .get(
          `${baseUrl}/movie/${now}?language=en-US&page=${page}&api_key=${api_key}`
        )
        .then((res) => setnow_playing(res.data.results));
    };
    const get_upcoming = async () => {
      await axios
        .get(
          `${baseUrl}/movie/${upcoming}?language=en-US&page=${page}&api_key=${api_key}`
        )
        .then((res) => setnow_upcoming(res.data.results));
    };
    const get_popular = async () => {
      await axios
        .get(
          `${baseUrl}/movie/${popular}?language=en-US&page=${page}&api_key=${api_key}`
        )
        .then((res) => setnow_popular(res.data.results));
    };
    const get_top = async () => {
      await axios
        .get(
          `${baseUrl}/movie/${top_rated}?language=en-US&page=${page}&api_key=${api_key}`
        )
        .then((res) => setnow_top_rated(res.data.results));
    };
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      setInterval(() => {
        get_upcoming();
        get_now_playing();
        get_popular();
        get_top();
      }, 1000);
    };
  }, []);
  return (
    <div className=" col">
      <div
        className="header flex  justify-between"
        style={{
          background: `${scrolling == true ? "rgba(0,0,0,.5)" : "transparent"}`,
        }}
      >
        <div className="logo flex">
          <a href="" className="flex">
            Cinepr
            <AiFillPlayCircle />
          </a>
        </div>
        <div className="navs">
          <ul>
            <li>
              <a href="">Movies</a>
            </li>
            <li>
              <a href="">SHows</a>
            </li>
            <li>
              <a href="">popular</a>
            </li>
            <li>
              <a href="">upcoming</a>
            </li>
            <li>
              <AiOutlineSearch className="icon" />
            </li>
          </ul>
        </div>
      </div>
      <div className="hero-section">
        <Swiper
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          pagination={true}
          modules={[Autoplay]}
          className="mySwiper"
        >
          {now_playing.map((item) => {
            return (
              <>
                <SwiperSlide key={item.id}>
                  <img src={`${imgUrl}/${item.backdrop_path}`} alt="" />
                  <section className="content" key={item.id}>
                    <div className="main-content col">
                      <h1>{item.title}</h1>
                    </div>
                  </section>
                </SwiperSlide>
              </>
            );
          })}
        </Swiper>
      </div>
      <div className="upcoming-sect">
        <h1>Upcoming</h1>
        {now_upcoming.map((item) => {
          return (
            <div className="upcoming-main" key={item.id}>
              <img
                src={`${imgUrl}/${item.poster_path}`}
                alt={`${item.title}`}
                onClick={() => navigate(`/movie/${item.id}`)}
              />
            </div>
          );
        })}
        <button className="btn-explore">Explore</button>
      </div>
      <div className="upcoming-sect">
        <h1>popular</h1>
        {now_popular.map((item) => {
          return (
            <div className="upcoming-main" key={item.id}>
              <img
                src={`${imgUrl}/${item.poster_path}`}
                alt={`${item.title}`}
                onClick={() => navigate(`/movie/${item.id}`)}
              />
            </div>
          );
        })}
        <button className="btn-explore">Explore</button>
      </div>
      <div className="upcoming-sect">
        <h1>Top Rated</h1>
        {now_top_rated.map((item) => {
          return (
            <div className="upcoming-main" key={item.id}>
              <img
                src={`${imgUrl}/${item.poster_path}`}
                alt={`${item.title}`}
                onClick={() => navigate(`/movie/${item.id}`)}
              />
            </div>
          );
        })}
        <button className="btn-explore">Explore</button>
      </div>
    </div>
  );
};

export default Home;
