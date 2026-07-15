import React from "react";
import AddData from "../components/AddData";
import ProcessedData from "../components/ProcessedData";

const Diary = () => {
  let data = [
    {
      id: 1,
      dozing: 0,
      snoozing: 0,
      slumbering: 100,
      type: "slumbering",
      date: "",
      deviance: null,
    },
    {
      id: 2,
      dozing: 0,
      snoozing: 0,
      slumbering: 100,
      type: "slumbering",
      date: "",
      deviance: null,
    },
  ];

  return (
    <div className="mainContainer">
      {/* Diary */}
      <AddData />
      <ProcessedData />
    </div>
  );
};

export default Diary;
