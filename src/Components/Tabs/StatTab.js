import React, { useEffect } from "react";
import { mean, median, std, min, max, sum } from "mathjs";

function StatTab({ data, setData }) {
  useEffect(() => {
    const calculateStatistics = () => {
      const stats = data.columns.reduce((acc, columnName, colIndex) => {
        if (
          data.selectedColumns.length > 0 &&
          !data.selectedColumns.some((item) => item === columnName)
        ) {
          acc[columnName] = {};
          return acc;
        }

        const columnData = data.tableData.map((row) => {
          return !isNaN(parseFloat(row[colIndex]))
            ? row[colIndex]
            : parseFloat(row[colIndex]);
        });

        if (
          Object.values(columnData).some((item) => isNaN(item)) ||
          /\b(id|ID|Id)\b/.test(columnName)
        ) {
          acc[columnName] = {};
          return acc;
        }

        acc[columnName] = {
          mean: mean(columnData),
          median: median(columnData),
          std: std(columnData),
          min: min(columnData),
          max: max(columnData),
          sum: sum(columnData),
          //   count: columnData.length,
        };

        return acc;
      }, {});
      // Zaktualizuj dane, jeśli statystyki są różne od obecnych
      if (JSON.stringify(stats) !== JSON.stringify(data.statistics)) {
        setData((prevData) => ({
          ...prevData,
          statistics: stats,
        }));
      }
    };

    calculateStatistics();
  }, [data, setData]);

  return (
    <main>
      <h1>Statystyki agregujące</h1>
      {data.statistics && Object.keys(data.statistics).length > 0 && (
        <div>
          {Object.entries(data.statistics).map(([column, stats]) =>
            (!/\b(id|ID|Id)\b/.test(column) &&
              data.selectedColumns.length > 0 &&
              data.selectedColumns.some((item) => item === column)) ||
            (!/\b(id|ID|Id)\b/.test(column) &&
              data.selectedColumns.length === 0) ? (
              <div key={column}>
                <h3>{column}</h3>
                {!Object.values(stats).some((item) => isNaN(item)) &&
                Object.values(stats).length > 0 ? (
                  <>
                    <p>Średnia: {stats?.mean?.toFixed(2)}</p>
                    <p>Mediana: {stats?.median?.toFixed(2)}</p>
                    <p>Odchylenie standardowe: {stats?.std?.toFixed(2)}</p>
                    <p>Minimum: {stats?.min}</p>
                    <p>Maksimum: {stats?.max}</p>
                    <p>Suma: {stats?.sum?.toFixed(2)}</p>
                    {/* <p>Liczba danych: {stats?.count}</p> */}
                  </>
                ) : (
                  <p>Kolumna nie posiada danych liczbowych</p>
                )}
              </div>
            ) : null
          )}
        </div>
      )}
    </main>
  );
}

export default StatTab;
