import React, { useState } from "react";
import React, { Fragment, useState } from "react";
import Papa from "papaparse";
import "./CsvUploader.css";

const CsvUploader = () => {
  const [tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState([]);
const CsvUploader = ({ data, setData }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [groupByColumn, setGroupByColumn] = useState(null);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [quartiles, setQuartiles] = useState({});

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          const data = result.data;
          const [header, ...rows] = data;

          setColumns(header);
          setTableData(rows);
          setQuartiles({});
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

    const sortedData = [...tableData].sort((a, b) => {
      if (a[columnIndex] < b[columnIndex]) return direction === "asc" ? -1 : 1;
      if (a[columnIndex] > b[columnIndex]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setTableData(sortedData);
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
    const newColumns = columns.filter((_, index) => index !== columnIndex);
    setColumns(newColumns);

    const newTableData = tableData.map((row) =>
      row.filter((_, index) => index !== columnIndex)
    );
    setTableData(newTableData);
    setData((prevData) => ({
      ...prevData,
      columns: prevData.columns.filter((_, index) => index !== columnIndex),
      tableData: prevData.tableData.map((row) =>
        row.filter((_, index) => index !== columnIndex)
      ),
    }));
  };

  const toggleColumnSelection = (column) => {
    if (selectedColumns.includes(column)) {
      setSelectedColumns((prevSelected) =>
        prevSelected.filter((col) => col !== column)
      );
    } else if (selectedColumns.length < 4) {
      setSelectedColumns((prevSelected) => [...prevSelected, column]);
    } else {
      alert("Można wybrać maksymalnie 4 kolumny.");
    }
  };

  const calculateQuartiles = () => {
    if (groupByColumn === null || selectedColumns.length === 0) return;

    const groupIndex = columns.indexOf(groupByColumn);
    const quartilesResults = {};

    const groups = tableData.reduce((acc, row) => {
      const key = row[groupIndex];
      const values = selectedColumns.map((col) => {
        const index = columns.indexOf(col);
        return parseFloat(row[index]);
      });

      if (!isNaN(values[0])) {
        if (!acc[key]) acc[key] = [];
        acc[key].push(values);
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
      return acc;
    }, {});

    for (let key in groups) {
      const groupValues = groups[key];

      const quartileValues = selectedColumns.map((column, colIndex) => {
        const values = groupValues.map((group) => group[colIndex]).sort((a, b) => a - b);

        const q1 = values[Math.floor(values.length / 4)];
        const q2 = values[Math.floor(values.length / 2)];
        const q3 = values[Math.floor((3 * values.length) / 4)];

        return { Q1: q1, Q2: q2, Q3: q3 };
      });

      quartilesResults[key] = quartileValues;
    }

    setQuartiles(quartilesResults);
    });
  };

  return (
    <div>
      <h2>Wgraj plik CSV</h2>
      <input type="file" accept=".csv" onChange={handleFileUpload} />

      {tableData.length > 0 && (
    <Fragment>
      {data.tableData.length === 0 ? (
        <div>
          <h2>Wgraj plik CSV</h2>
          <input type="file" accept=".csv" onChange={handleFileUpload} />
        </div>
      ) : null}

      {data.tableData.length > 0 && (
        <>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  {columns.map((col, index) => (
                    <th key={index}>
                      <span onClick={() => handleSort(index)} style={{ cursor: "pointer" }}>
                        {col}
                        {sortConfig.key === index
                          ? sortConfig.direction === "asc"
                            ? " ▲"
                            : " ▼"
                          : ""}
                      </span>
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
                        className="remove-button"
                        className="button"
                      >
                        Usuń
                      </button>
                      <button
                        onClick={() => toggleColumnSelection(col)}
                        className={`select-button ${
                          selectedColumns.includes(col) ? "selected" : ""
                        className={`button select-button ${
                          data.selectedColumns.includes(col) ? "selected" : ""
                        }`}
                      >
                        {selectedColumns.includes(col) ? "Anuluj wybór" : "Wybierz"}
                        {data.selectedColumns.includes(col)
                          ? "Anuluj wybór"
                          : "Wybierz"}
                      </button>
                    </th>
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
              </thead>
              <tbody>
                {tableData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="controls">
            <h3>Wybierz kolumnę do grupowania:</h3>
            <select
              onChange={(e) => setGroupByColumn(e.target.value)}
              value={groupByColumn || ""}
            >
              <option value="">Wybierz kolumnę</option>
              {columns.map((col, index) => (
                <option key={index} value={col}>
                  {col}
                </option>
              ))}
            </select>
            <button onClick={calculateQuartiles}>Oblicz kwartyli</button>
          </div>

          {Object.keys(quartiles).length > 0 && (
            <div className="quartile-results">
              <h3>Wyniki kwartyli:</h3>
              <ul>
                {Object.entries(quartiles).map(([group, quartileValues], index) => (
                  <li key={index}>
                    <strong>{group}:</strong>
                    {quartileValues.map((q, colIndex) => (
                      <div key={colIndex}>
                        {selectedColumns[colIndex]}: Q1: {q.Q1}, Q2: {q.Q2}, Q3: {q.Q3}
                      </div>
                    ))}
                  </li>
                ))}
              </ul>
            </div>
          )}
            </tbody>
          </table>
        </>
      )}
    </div>
    </Fragment>
  );
};

export default CsvUploader;

