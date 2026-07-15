import React from "react";
import { Link, NavLink } from "react-router-dom";

const About = () => {
  return (
    <div className="about">
      <h1>Credits</h1>
      <br />
      <h2>
        Created by: Temeraz and 00JIHW, with help from Condemor and Muzzah for
        data.
      </h2>
      <h2>Site coded by Zetarumi.</h2>
      <br />

      <br />
      <a
        href={
          "https://docs.google.com/spreadsheets/d/1VhohaRGCfZuQKw4m-cq8hcRk7F8ZqRMo4eOFyjZAe1E/edit?usp=sharing"
        }
        target="_blank"
      >
        <span>---Link to original sheet---</span>
      </a>

      <br />

      <br />

      <button className="button">
        <Link
          to="/diary"
          activeclassname="active"
          style={{ textDecoration: "none", color: "white" }}
        >
          To the Sleep Diary
        </Link>
      </button>
    </div>
  );
};

export default About;
