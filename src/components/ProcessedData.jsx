import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { removeRow } from "../redux/sleepData";

const ProcessedData = () => {
  const data = useSelector((state) => state?.sleepData?.userData);
  const dispatch = useDispatch();

  const WINDOW_SIZE = 30;

  const getWindow = (data, startIndex) => {
    return data.slice(startIndex + 1, startIndex + WINDOW_SIZE + 1);
  };

  const calculateRollingAverage = (window) => {
    if (window.length === 0)
      return {
        dozing: NaN,
        snoozing: NaN,
        slumbering: NaN,
      };

    let dozing = 0;
    let snoozing = 0;
    let slumbering = 0;

    for (const row of window) {
      dozing += row.dozing;
      snoozing += row.snoozing;
      slumbering += row.slumbering;
    }

    return {
      dozing: dozing / 30,
      snoozing: snoozing / 30,
      slumbering: slumbering / 30,
    };
  };

  const calculateMoreThanUsual = (row, rollingAverages) => {
    return {
      dozingMoreThanUsual:
        row?.dozing - rollingAverages?.rollingAverage?.dozing,
      snoozingMoreThanUsual:
        row?.snoozing - rollingAverages?.rollingAverage?.snoozing,
      slumberingMoreThanUsual:
        row?.slumbering - rollingAverages?.rollingAverage?.slumbering,
    };
  };

  const calculateRow = (window) => {
    return {
      rollingAverage: calculateRollingAverage(window),
    };
  };

  const calculatedRows = data.map((row, index) => {
    const window = getWindow(data, index);

    let rollingAverages = calculateRow(window);
    let moreThanUsual = calculateMoreThanUsual(row, rollingAverages);

    return {
      ...row,
      ...rollingAverages,
      ...moreThanUsual,
    };
  });

  const renderRow = (row) => {
    const deviations = {
      dozing: row?.dozingMoreThanUsual,
      snoozing: row?.snoozingMoreThanUsual,
      slumbering: row?.slumberingMoreThanUsual,
    };

    const highestType = Object.keys(deviations).reduce((highest, current) => {
      return deviations[current] > deviations[highest] ? current : highest;
    }, "dozing");

    let withinMargin = false;
    if (
      row.deviance != null &&
      Math.abs(row.deviance - row[`${highestType}MoreThanUsual`]) <= 1
    ) {
      withinMargin = true;
    }

    const getColorValue = (value) => {
      if (value <= 20) return 100;
      if (value >= 60) return 70;

      // interpolate between 20 and 60
      const ratio = (value - 20) / (60 - 20);

      return Math.round(100 + ratio * (70 - 100));
    };

    let dozingAverageValue = getColorValue(row?.rollingAverage?.dozing);
    let snoozingAverageValue = getColorValue(row?.rollingAverage?.snoozing);
    let slumberingAverageValue = getColorValue(row?.rollingAverage?.slumbering);

    // if average Value is 20 or below, white -- set value to 0
    // if average value is 60 or above, max color. set value to 50
    // if number is inbetween, calculate a value between those.

    return (
      <div className={`processedRow ${row?.sleeptype}Row processedGrid`}>
        {/* <div className="userInput"> */}
        {/* <div className="graphNumbers"> */}
        <div className="dozingGraph">{row?.dozing}</div>
        <div className="snoozingGraph">{row?.snoozing}</div>
        <div className="slumberingGraph">{row?.slumbering}</div>
        {/* </div> */}
        {/* <div className="typeAndPercent"> */}
        {/* <div className="sleepType">{row?.sleeptype}</div> */}
        <div className="moreThanUsual">
          {row?.deviance !== null
            ? `${row.deviance}% more ${row?.sleeptype} than usual.`
            : ""}
        </div>
        {/* </div> */}
        {/* </div> */}
        {/* <div className="moreThanUsual"> */}
        <div
          className={`deviance ${highestType === "dozing" ? "devianceHighest" : ""} ${highestType === "dozing" && withinMargin ? "accurateDeviance" : ""} ${row.dozingMoreThanUsual >= 0 ? "" : "negativeDeviance"}`}
        >
          {row?.dozingMoreThanUsual.toFixed(2)}%
        </div>
        <div
          className={`deviance ${highestType === "snoozing" ? "devianceHighest" : ""} ${highestType === "snoozing" && withinMargin ? "accurateDeviance" : ""} ${row.snoozingMoreThanUsual >= 0 ? "" : "negativeDeviance"}`}
        >
          {row?.snoozingMoreThanUsual.toFixed(2)}%
        </div>
        <div
          className={`deviance ${highestType === "slumbering" ? "devianceHighest" : ""} ${highestType === "slumbering" && withinMargin ? "accurateDeviance" : ""} ${row.slumberingMoreThanUsual >= 0 ? "" : "negativeDeviance"}`}
        >
          {row?.slumberingMoreThanUsual.toFixed(2)}%
        </div>
        {/* </div> */}
        {/* <div className="rollingAverage"> */}
        <div
          className="dozingAverage average"
          style={{ backgroundColor: `hsl(51, 100%, ${dozingAverageValue}%)` }}
        >
          {row?.rollingAverage?.dozing.toFixed(2)}
        </div>
        <div
          className="snoozingAverage average"
          style={{
            backgroundColor: `hsl(192, 100%, ${snoozingAverageValue}%)`,
          }}
        >
          {row?.rollingAverage?.snoozing.toFixed(2)}
        </div>
        <div
          className="slumberingAverage average"
          style={{
            backgroundColor: `hsl(224, 100%, ${slumberingAverageValue}%)`,
          }}
        >
          {row?.rollingAverage?.slumbering.toFixed(2)}
        </div>
        {/* </div> */}
        <div className="date">{row?.date}</div>
      </div>
    );
  };

  return (
    <div style={{ paddingBottom: "120px" }} className="processedData">
      <div className="processedLayout">
        <div className="tip">
          <p>Most Recent</p>
          <h1>^</h1>
          <div className="line400"></div>
          <h1>v</h1>
          <p>Oldest</p>
        </div>

        <div style={{ padding: "20px" }}>
          <div className="processedHeader">
            <div>Session Type %</div>

            <div>More than Usual%</div>
            <div>% More than usual (Calc)</div>

            <div>Rolling Average</div>

            <div>Date</div>
          </div>
          <div className="processedSubHeader">
            <div>Dozing</div>
            <div>Snoozing</div>
            <div>Slumbering</div>
            <div></div>
            <div>Dozing</div>
            <div>Snoozing</div>
            <div>Slumbering</div>
            <div></div>
            <div>Dozing</div>
            <div>Snoozing</div>
            <div>Slumbering</div>
            <div></div>
          </div>
          {calculatedRows.map((row, index) => {
            return (
              <div className="extendedProcessedRow" key={`${row}-${index}`}>
                <div className="rowHandle">{index + 1}</div>
                {/* <pre key={index}>{JSON.stringify(row, null, 2)}</pre>; */}
                {renderRow(row)}
                <div className="rowButtons">
                  <button
                    className="button buttonDisabled"
                    // onClick={() => console.log(inputFields)}
                    disabled={true}
                  >
                    edit
                  </button>
                  <button
                    tabIndex={-1}
                    className="button deleteButton"
                    onClick={(e) => {
                      e.preventDefault();
                      // removeFields(index);
                      dispatch(removeRow(index));
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProcessedData;
