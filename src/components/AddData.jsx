import React, { useState, useCallback, useRef } from "react";
import debounce from "lodash/debounce";
import DatePickerField from "./DatePickerField";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { addRows } from "../redux/sleepData";

const AddData = () => {
  const refs = useRef({});
  const dispatch = useDispatch();

  const createEmptyRow = () => ({
    dozing: 0,
    snoozing: 0,
    slumbering: 0,
    deviance: null,
    sleeptype: "",
    date: null,
  });

  const [inputFields, setInputFields] = useState([
    {
      dozing: 0,
      snoozing: 0,
      slumbering: 0,
      deviance: null,
      sleeptype: "",
      date: null,
    },
  ]);

  const columns = [
    "dozing",
    "snoozing",
    "slumbering",
    "deviance",
    "sleeptype",
    "date",
  ];

  const [activeCell, setActiveCell] = useState({
    row: 0,
    col: 0,
  });

  const focusCell = (row, col) => {
    const field = columns[col];
    refs.current[`${row}-${field}`]?.focus();
  };

  const validateRow = (row) => {
    return row.sleeptype != null && row.sleeptype !== "";
  };

  const handleKeyDown = (rowIndex, colIndex) => (e) => {
    const navKeys = ["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp"];

    if (!navKeys.includes(e.key)) return;
    e.preventDefault();

    const colCount = columns.length;
    const rowCount = inputFields.length;

    let { row, col } = { row: rowIndex, col: colIndex };

    switch (e.key) {
      case "ArrowRight":
        col = Math.min(col + 1, colCount - 1);
        break;
      case "ArrowLeft":
        col = Math.max(col - 1, 0);
        break;
      case "ArrowDown":
        if (rowIndex === rowCount - 1) {
          addFields();
          setTimeout(() => {
            focusCell(rowCount, col);
          }, 0);

          return;
        }
        row++;

        break;
      case "ArrowUp":
        row = Math.max(row - 1, 0);
        break;
      default:
        return;
    }
    focusCell(row, col);
  };

  const clamp = (value) => {
    const num = Number(value);

    if (Number.isNaN(num)) return "";

    return Math.max(0, Math.min(100, num));
  };

  const handleFormChange = (index, field, value) => {
    let data = [...inputFields];
    data[index][field] = value;
    setInputFields(data);
  };

  const addFields = () => {
    let newField = {
      dozing: 0,
      snoozing: 0,
      slumbering: 0,
      deviance: null,
      sleeptype: "",
      date: null,
    };

    setInputFields([...inputFields, newField]);
  };

  const removeFields = (index) => {
    let data = [...inputFields];
    data.splice(index, 1);
    setInputFields(data);
  };

  const sleepTypes = [
    { value: "dozing", label: "D - Dozing", key: "d" },
    { value: "snoozing", label: "Z - Snoozing", key: "z" },
    { value: "slumbering", label: "S - Slumbering", key: "s" },
    { value: "balanced", label: "B - Balanced", key: "b" },
  ];

  const handleSleepTypeKeyDown = (index) => (e) => {
    const key = e.key.toLowerCase();

    const match = sleepTypes.find((t) => t.key === key);

    if (match) {
      e.preventDefault();
      handleFormChange(index, "sleeptype", match.value);
    }
  };

  const customStyles = {
    container: (provided) => ({
      ...provided,
      marginTop: "5px;",
      marginRight: "10px",
    }),
    control: (provided) => ({
      ...provided,
      width: "100%",
      display: "flex",
      alignItems: "center",
      paddingLeft: "15px",
      paddingRight: "15px",
    }),
    valueContainer: (provided) => ({
      ...provided,
      paddingLeft: "0px",
      paddingRight: "8px",
    }),
  };

  const customStylesActive = {
    container: (provided) => ({
      ...provided,
      marginTop: "5px;",
      marginRight: "10px",
    }),
    control: (provided) => ({
      ...provided,
      width: "100%",
      display: "flex",
      alignItems: "center",
      paddingLeft: "15px",
      paddingRight: "15px",
      height: "50px",
      borderWidth: "5px",
      borderColor: "rgb(0, 132, 255)",
    }),
    valueContainer: (provided) => ({
      ...provided,
      paddingLeft: "0px",
      paddingRight: "8px",
    }),
  };

  return (
    <div style={{ paddingBottom: "120px" }} className="addData">
      <div className="processedLayout">
        <div className="tip tip2">
          <p>Most Recent</p>
          <h1>^</h1>
          <div className="line400"></div>
          <h1>v</h1>
          <p>Oldest</p>
        </div>
        <div className="addDataContent">
          <div className="gridRow headerRow">
            <div></div>
            <div>Dozing %</div>
            <div>Snoozing %</div>
            <div>Slumbering %</div>
            <div>Deviance %</div>
            <div>{`Sleep Type (D, Z, S, B)`}</div>
            <div>Date</div>
          </div>
          <div style={{ display: "flex", alignContent: "space-between" }}>
            <form>
              {inputFields.map((input, index) => {
                return (
                  <div key={index} className="gridRow">
                    <h2 style={{ color: "white" }}>{index + 1}</h2>
                    <input
                      name="dozing"
                      id={`${index}-dozing`}
                      ref={(el) => {
                        refs.current[`${index}-dozing`] = el;
                      }}
                      className="addDataInput"
                      type="number"
                      min="0"
                      max="100"
                      value={input.dozing}
                      onChange={(event) =>
                        handleFormChange(index, "dozing", event.target.value)
                      }
                      onBlur={(e) => {
                        const value = clamp(e.target.value);

                        handleFormChange(index, "dozing", value);
                      }}
                      placeholder="Dozing"
                      onFocus={() =>
                        setActiveCell({ row: index, field: "dozing" })
                      }
                      onKeyDown={handleKeyDown(index, 0)}
                      onWheel={(e) => e.target.blur()}
                    />
                    <input
                      name="snoozing"
                      id={`${index}-snoozing`}
                      ref={(el) => {
                        refs.current[`${index}-snoozing`] = el;
                      }}
                      className="addDataInput"
                      type="number"
                      min="0"
                      max="100"
                      value={input.snoozing}
                      onChange={(event) =>
                        handleFormChange(index, "snoozing", event.target.value)
                      }
                      onBlur={(e) => {
                        const value = clamp(e.target.value);

                        handleFormChange(index, "snoozing", value);
                      }}
                      placeholder="Snoozing"
                      onFocus={() =>
                        setActiveCell({ row: index, field: "snoozing" })
                      }
                      onKeyDown={handleKeyDown(index, 1)}
                      onWheel={(e) => e.target.blur()}
                    />
                    <input
                      name="slumbering"
                      id={`${index}-slumbering`}
                      ref={(el) => {
                        refs.current[`${index}-slumbering`] = el;
                      }}
                      className="addDataInput"
                      type="number"
                      min="0"
                      max="100"
                      value={input.slumbering}
                      onChange={(event) =>
                        handleFormChange(
                          index,
                          "slumbering",
                          event.target.value,
                        )
                      }
                      onBlur={(e) => {
                        const value = clamp(e.target.value);

                        handleFormChange(index, "slumbering", value);
                      }}
                      placeholder="Slumbering"
                      onFocus={() =>
                        setActiveCell({ row: index, field: "slumbering" })
                      }
                      onKeyDown={handleKeyDown(index, 2)}
                      onWheel={(e) => e.target.blur()}
                    />
                    <input
                      name="deviance"
                      id={`${index}-deviance`}
                      ref={(el) => {
                        refs.current[`${index}-deviance`] = el;
                      }}
                      className="addDataInput"
                      type="number"
                      min="0"
                      max="100"
                      value={input.deviance ?? ""}
                      onChange={(event) =>
                        handleFormChange(index, "deviance", event.target.value)
                      }
                      onBlur={(e) => {
                        handleFormChange(index, "deviance", e.target.value);
                      }}
                      placeholder="?"
                      onFocus={() =>
                        setActiveCell({ row: index, field: "deviance" })
                      }
                      onKeyDown={handleKeyDown(index, 3)}
                      onWheel={(e) => e.target.blur()}
                    />
                    <Select
                      key={`${index}-sleeptype`}
                      required
                      options={sleepTypes}
                      id={`${index}-sleeptype`}
                      ref={(el) => {
                        refs.current[`${index}-sleeptype`] = el;
                      }}
                      isSearchable={false}
                      backspaceRemovesValue
                      value={sleepTypes.find(
                        (o) => o.value === input.sleeptype,
                      )}
                      styles={
                        activeCell.row === index &&
                        activeCell.field === "sleeptype"
                          ? customStylesActive
                          : customStyles
                      }
                      onChange={(option) => {
                        console.log(option.value);
                        handleFormChange(index, "sleeptype", option.value);
                      }}
                      placeholder="Sleep Type"
                      onFocus={() =>
                        setActiveCell({ row: index, field: "sleeptype" })
                      }
                      onKeyDown={(e) => {
                        handleSleepTypeKeyDown(index)(e);
                        handleKeyDown(index, 4)(e);
                      }}
                      onBlur={() => {
                        setActiveCell({ row: index, field: null });
                      }}
                    />
                    <DatePickerField
                      value={input.date}
                      id={`${index}-date`}
                      onChange={(date) => {
                        if (!date) {
                          handleFormChange(index, "date", null);
                          return;
                        }

                        const year = date.getFullYear();
                        const month = String(date.getMonth() + 1).padStart(
                          2,
                          "0",
                        );
                        const day = String(date.getDate()).padStart(2, "0");

                        const formatted = `${year}/${month}/${day}`;

                        handleFormChange(index, "date", formatted);
                      }}
                      onKeyDown={handleKeyDown(index, 5)}
                      enableTabLoop={false}
                    />
                    <button
                      tabIndex={-1}
                      className="button deleteButton"
                      onClick={(e) => {
                        e.preventDefault();
                        removeFields(index);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                );
              })}
            </form>
          </div>
          <button
            className="button"
            onClick={() => addFields()}
            style={{ marginTop: "10px" }}
          >
            Add New Row
          </button>

          <button
            className="button"
            onClick={() => {
              const invalidRows = inputFields.some((row) => !validateRow(row));

              if (invalidRows) {
                alert("Please fill in sleeptype");
                return;
              }

              dispatch(addRows(inputFields));
              setInputFields([createEmptyRow()]);
              console.log(inputFields);
            }}
            style={{ marginTop: "20px" }}
          >
            Submit to Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddData;
