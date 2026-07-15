import React from "react";

const Tutorial = () => {
  return (
    <div className="about">
      <span>Tutorial coming soon lol</span>
      <br />
      <br />

      <h2>Quick notes:</h2>
      <br />
      <span>- You can add multiple rows at once.</span>
      <span>
        All of those rows you add will be sent to the top of the list.
      </span>
      <br />
      <span>
        - You can use arrow keys to navigate between rows when adding data.
      </span>
      <br />
      <span>- You can type the corresponding letter for the sleep type.</span>
      <br />
      <span>- Dates are completely optional and have no function.</span>
      <span>
        You can use it to reference which sleep session the row belongs to.
      </span>

      <br />
      <br />

      <h2>TODO:</h2>
      <br />
      <span>- I gotta add a delete all button</span>
      <span>
        - I also gotta add a way to save and import data in case you wanna
        switch devices
      </span>
      <br />
      <span>- Edit functionality coming soon... or something</span>
    </div>
  );
};

export default Tutorial;
