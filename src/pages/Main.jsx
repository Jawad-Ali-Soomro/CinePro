import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { AiFillRightCircle, AiFillLeftCircle } from "react-icons/ai";

const Main = () => {
  const navigate = useNavigate();
  const [now_playing, setnow_playing] = useState([]);
  const imgUrl = "https://image.tmdb.org/t/p/original";
  const api_key = "c3f04fb91ba5e5d7b38df22f9c846a2e";
  const baseUrl = "https://api.themoviedb.org/3";
  const now = "now_playing";
  const { page } = useParams();
  const { category } = useParams();
  if (page < 1) {
    return alert("You're At First Page");
  }
  useEffect(() => {
    const get_now_playing = async () => {
      await axios
        .get(
          `${baseUrl}/movie/${category}?language=en-US&page=${page}&api_key=${api_key}`
        )
        .then((res) => setnow_playing(res.data.results));
    };

    return () => {
      setInterval(() => {
        get_now_playing();
      }, 1000);
    };
  }, []);
  return (
    <div>
      <div className="card_now_playing card_main flex">
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
        <AiFillLeftCircle
          style={{ background: "red" }}
          className="btn-icon"
          onClick={() =>
            navigate(`/search/now_playing/${Number(page) - 1}`) +
            window.location.reload()
          }
        />
        <AiFillRightCircle
          className="btn-icon"
          onClick={() =>
            navigate(`/search/now_playing/${Number(page) + 1}`) +
            window.location.reload()
          }
        />
      </div>
    </div>
  );
};

export default Main;
