import React, { useState } from "react";
import Papa from "papaparse";
import "./CsvUploader.css";

const CsvUploader = ({tableData,setTableData,
                      columns,setColumns,
                      quartiles,setQuartiles,
                      selectedColumns,setSelectedColumns,
                      groupByColumn,setGroupByColumn}) => {


  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });


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
  };

  const handleRemoveColumn = (columnIndex) => {
    const newColumns = columns.filter((_, index) => index !== columnIndex);
    setColumns(newColumns);

    const newTableData = tableData.map((row) =>
      row.filter((_, index) => index !== columnIndex)
    );
    setTableData(newTableData);
  };

  const toggleColumnSelection = (column) => {
    if (selectedColumns.includes(column)) {
      setSelectedColumns((prevSelected) =>
        prevSelected.filter((col) => col !== column)
      );
    } else if (selectedColumns.length < 5) {
      setSelectedColumns((prevSelected) => [...prevSelected, column]);
    } else {
      alert("Można wybrać maksymalnie 5 kolumny.");
    }
  };


  return (
    <div>
      <h2>Wgraj plik CSV</h2>
      <input type="file" accept=".csv" onChange={handleFileUpload} />

      {tableData.length > 0 && (
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
                      <button
                        onClick={() => handleRemoveColumn(index)}
                        className="remove-button"
                      >
                        Usuń
                      </button>
                      <button
                        onClick={() => toggleColumnSelection(col)}
                        className={`select-button ${
                          selectedColumns.includes(col) ? "selected" : ""
                        }`}
                      >
                        {selectedColumns.includes(col) ? "Anuluj wybór" : "Wybierz"}
                      </button>
                    </th>
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
        </>
      )}
    </div>
  );
};

export default CsvUploader;
