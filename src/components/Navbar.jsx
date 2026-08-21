import React, { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { exportData } from "../utils/dataExport";
import { importData } from "../utils/dataImport";
import { setSleepData } from "../redux/sleepData";

const Navbar = () => {
  const sleepData = useSelector((state) => state.sleepData.userData);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (!file) {
      setError("No file selected!");
      return;
    }

    try {
      const data = await importData(file);
      dispatch(setSleepData(data));

      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <nav className="navbar">
        <h2>
          <NavLink to="/about">Sleep Diary</NavLink>
        </h2>
        <ul style={{ listStyleType: "none", display: "flex" }}>
          <li style={{ marginRight: "20px" }}>
            <NavLink to="/diary" activeclassname="active">
              Sleep Data
            </NavLink>
          </li>
          <li style={{ marginRight: "20px" }}>
            <NavLink to="/tutorial" activeclassname="active">
              Tutorial
            </NavLink>
          </li>
          {/* Buttons */}
          <li style={{ marginRight: "10px" }}>
            <button
              className="importButton"
              onClick={() => fileInputRef.current.click()}
            >
              Import
            </button>
          </li>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <li>
            <button
              className="exportButton"
              onClick={() => exportData(sleepData)}
            >
              Export
            </button>
          </li>
        </ul>
      </nav>
      {error && (
        <p
          style={{
            color: "red",
            marginTop: "70px",
            marginLeft: "50px",
            zIndex: "2",
            position: "absolute",
            backgroundColor: "rgba(255, 255, 255, 0.69)",
            padding: "10px",
          }}
        >
          {error}
        </p>
      )}
    </>
  );
};

export default Navbar;
