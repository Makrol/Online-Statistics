import React, { Fragment, useState } from "react";
import Papa from "papaparse";
import "./CsvUploader.css";

const CsvUploader = ({ data, setData }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          const [header, ...rows] = result.data;

          setData((prevData) => ({
            ...prevData,
            columns: header,
            tableData: rows,
            quartiles: [],
          }));
        },
        header: false,
        skipEmptyLines: true,
      });
    }
  };

  const handleSort = (columnIndex) => {
    let direction = "asc";
    if (sortConfig.key === columnIndex && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key: columnIndex, direction });

    setData((prevData) => ({
      ...prevData,
      tableData: [...prevData.tableData].sort((a, b) => {
        if (a[columnIndex] < b[columnIndex]) return direction === "asc" ? -1 : 1;
        if (a[columnIndex] > b[columnIndex]) return direction === "asc" ? 1 : -1;
        return 0;
      }),
    }));
  };

  const handleRemoveColumn = (columnIndex) => {
    setData((prevData) => ({
      ...prevData,
      columns: prevData.columns.filter((_, index) => index !== columnIndex),
      tableData: prevData.tableData.map((row) =>
        row.filter((_, index) => index !== columnIndex)
      ),
    }));
  };

  const toggleColumnSelection = (columns) => {
    setData((prevData) => {
      if (prevData.selectedColumns.includes(columns)) {
        return {
          ...prevData,
          selectedColumns: prevData.selectedColumns.filter(
            (col) => col !== columns
          ),
        };
      } else if (prevData.selectedColumns.length < 5) {
        return {
          ...prevData,
          selectedColumns: [...prevData.selectedColumns, columns],
        };
      } else {
        alert("Można wybrać maksymalnie 5 kolumny.");
        return prevData;
      }
    });
  };

  return (
    <Fragment>
      {data.tableData.length === 0 ? (
        <div>
          <h2>Wgraj plik CSV</h2>
          <input type="file" accept=".csv" onChange={handleFileUpload} />
        </div>
      ) : null}

      {data.tableData.length > 0 && (
        <>
          <table>
            <thead>
              <tr>
                {data.columns.map((col, index) => (
                  <th key={index}>
                    <span
                      onClick={() => handleSort(index)}
                      style={{ cursor: "pointer" }}
                    >
                      {col}
                      {sortConfig.key === index
                        ? sortConfig.direction === "asc"
                          ? " ▲"
                          : " ▼"
                        : ""}
                    </span>
                    <div>
                      <button
                        onClick={() => handleRemoveColumn(index)}
                        className="button"
                      >
                        Usuń
                      </button>
                      <button
                        onClick={() => toggleColumnSelection(col)}
                        className={`button select-button ${
                          data.selectedColumns.includes(col) ? "selected" : ""
                        }`}
                      >
                        {data.selectedColumns.includes(col)
                          ? "Anuluj wybór"
                          : "Wybierz"}
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.tableData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </Fragment>
  );
};

export default CsvUploader;

