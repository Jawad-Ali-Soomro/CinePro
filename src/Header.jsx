import React, { useState } from "react";
import { AiFillPlayCircle, AiOutlineSearch } from "react-icons/ai";
import { useEffect } from "react";

const Header = () => {
  const [scrolling, setScrolling] = useState();
  useEffect(() => {
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
    };
  }, []);

  return (
    <div>
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
              <a href="/search/movie/1">Movies</a>
            </li>
            <li>
              <a href="/search/tv/1">SHows</a>
            </li>
            <li>
              <a href="hello">popular</a>
            </li>
            <li>
              <a>upcoming</a>
            </li>
            <li>
              <AiOutlineSearch className="icon" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
