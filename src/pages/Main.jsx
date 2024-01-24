import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CircularProgressbar } from "react-circular-progressbar";
import Header from "../Header";

const Main = () => {
  const navigate = useNavigate();
  const { page } = useParams();
  const [Page, setPage] = useState(2);
  const { category } = useParams();
  const api_key = "c3f04fb91ba5e5d7b38df22f9c846a2e";
  const baseUrl = "https://api.themoviedb.org/3";
  const imgUrl = "https://image.tmdb.org/t/p/original";
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const find_data = async () => {
      await axios
        .get(
          `${baseUrl}/${category}/popular?language=en-US&page=${page}&api_key=${api_key}`
        )
        .then((res) => setMovies(res.data.results));
    };
    return () => {
      find_data();
    };
  }, []);
  return (
    <div>
      <Header />
      <div className="upcoming-sect">
        {movies.map((item) => {
          return (
            <div className="upcoming-main" key={item.id}>
              <img
                src={`${imgUrl}/${item.poster_path}`}
                alt={`${item.title}`}
                onClick={() => navigate(`/${category}/${item.id}`)}
              />
              <section>
                {
                  <CircularProgressbar
                    styles={{
                      text: {
                        fill: "white",
                        fontSize: "20px",
                      },
                    }}
                    value={Math.round(item.vote_average * 10)}
                  />
                }
                <p>{Math.round(item.vote_average * 10)}</p>
              </section>
            </div>
          );
        })}
        <button
          className="btn-explore"
          onClick={() =>
            navigate(`/search/${category}/${Number(page) + 1}`) +
            window.location.reload()
          }
        >
          next
        </button>
      </div>
    </div>
  );
};

export default Main;
