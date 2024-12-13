import { Fragment, useEffect } from "react";
import ChernoffFace from "../ChernoffFace";
import Eyebrows from "../ChernoffFaceElement/Eyebrows";
import FaceComponentProvider from "../ChernoffFaceElement/FaceComponentProvider";
import Eyes from "../ChernoffFaceElement/Eyes";
import Ears from "../ChernoffFaceElement/Ears";
import Nose from "../ChernoffFaceElement/Nose";
import Mouth from "../ChernoffFaceElement/Mouth";

const characteristicsTab = [
  [
    <Eyebrows size={1} />,
    <Eyebrows size={2} />,
    <Eyebrows size={3} />,
    <Eyebrows size={4} />,
  ],
  [
    <Eyes size={1} posX1={35} posY1={25} posX2={65} posY2={25} />,
    <Eyes size={2} posX1={35} posY1={25} posX2={65} posY2={25} />,
    <Eyes size={3} posX1={35} posY1={25} posX2={65} posY2={25} />,
    <Eyes size={4} posX1={35} posY1={25} posX2={65} posY2={25} />,
  ],
  [
    <Ears size={1} posX1={30} posY1={25} posX2={70} posY2={25} />,
    <Ears size={2} posX1={30} posY1={25} posX2={70} posY2={25} />,
    <Ears size={3} posX1={30} posY1={25} posX2={70} posY2={25} />,
    <Ears size={4} posX1={30} posY1={25} posX2={70} posY2={25} />,
  ],
  [
    <Nose size={1} posX={50} posY={25} />,
    <Nose size={2} posX={50} posY={25} />,
    <Nose size={3} posX={50} posY={25} />,
    <Nose size={4} posX={50} posY={25} />,
  ],
  [
    <Mouth size={1} />,
    <Mouth size={2} />,
    <Mouth size={3} />,
    <Mouth size={4} />,
  ],
];

function ChernoffFaceTab({ data, setData }) {
  const calculateGroupMeans = () => {
    if (data.groupByColumn === null || data.selectedColumns.length === 0) return;
  
    const groupIndex = data.columns.indexOf(data.groupByColumn);
    const groupMeans = [];
  
    // Grupowanie danych
    const groups = data.tableData.reduce((acc, row) => {
      const key = row[groupIndex];
      const values = data.selectedColumns.map((col) => {
        const colIndex = data.columns.indexOf(col);
        return parseFloat(row[colIndex]);
      });
  
      if (!isNaN(values[0])) {
        if (!acc[key]) acc[key] = [];
        acc[key].push(values);
      }
      return acc;
    }, {});
  
    // Obliczanie średnich dla każdej grupy
    for (let key in groups) {
      const groupValues = groups[key];
  
      const means = data.selectedColumns.map((column, colIndex) => {
        const values = groupValues.map((group) => group[colIndex]);
        const mean = (
          values.reduce((sum, val) => sum + val, 0) / values.length
        ).toFixed(2);
        return { name: column, mean };
      });
  
      groupMeans.push({ group: key, means });
    }
    debugger
    setData((prevData) => ({
      ...prevData,
      groupMeans,
    }));
  };
  
  const calculateGlobalQuartiles = () => {
    if (data.selectedColumns.length === 0) return;

    const result = data.selectedColumns.map((column) => {
      const colIndex = data.columns.indexOf(column);

      // Wyciąganie wszystkich wartości z kolumny
      const values = data.tableData
        .map((row) => parseFloat(row[colIndex]))
        .filter((value) => !isNaN(value)) // Filtruj wartości NaN
        .sort((a, b) => a - b); // Sortuj wartości

      if (values.length === 0) return null;

      // Obliczanie kwartylów
      const min = values[0].toFixed(2);
      const max = values[values.length - 1].toFixed(2);
      const mean = (
        values.reduce((sum, val) => sum + val, 0) / values.length
      ).toFixed(2);

      const getQuartile = (array, q) => {
        const pos = (array.length - 1) * q;
        const base = Math.floor(pos);
        const rest = pos - base;
        if (array[base + 1] !== undefined) {
          return (array[base] + rest * (array[base + 1] - array[base])).toFixed(
            2
          );
        } else {
          return array[base].toFixed(2);
        }
      };

      const Q1 = getQuartile(values, 0.25);
      const Q2 = getQuartile(values, 0.5);
      const Q3 = getQuartile(values, 0.75);

      return { name: column, min, Q1, Q2, Q3, max, mean };
    });
debugger
    setData((prevData) => ({
      ...prevData,
      calculatedQuartiles: result, // Usuwa null jeśli były puste kolumny
    }));

  };


  


  const generateCharacteristics = (localData,characteristicsNumber) => {
    debugger
    const result = [];
    let index = 0;
    localData.forEach((element) => {
      if (element.mean < data.calculatedQuartiles[characteristicsNumber].Q1) result.push(1);
      else if (element.mean < data.calculatedQuartiles[characteristicsNumber].Q2) result.push(2);
      else if (element.mean < data.calculatedQuartiles[characteristicsNumber].Q3) result.push(3);
      else result.push(4);
      index++;
    });

    return {
      eyes: result[1]-1,
      smile: result[4]-1,
      nose: result[3]-1,
      eyebrows: result[0]-1,
      ears: result[2]-1,
    };
  };

  useEffect(() => {
    console.log(data.quartiles);
  }, [data.quartiles]);

  return (
    <main>
      <div className="controls">
        <h3>Wybierz kolumnę do grupowania:</h3>
        <div>
          <select
            onChange={(e) =>
              setData((prevData) => ({
                ...prevData,
                groupByColumn: e.target.value,
              }))
            }
            value={data.groupByColumn || ""}
          >
            <option value="">Wybierz kolumnę</option>
            {data.columns.map((col, index) => (
              <option key={index} value={col}>
                {col}
              </option>
            ))}
          </select>
          <button
            className="button"
            onClick={() => {
              calculateGlobalQuartiles();
              calculateGroupMeans();
            }}
          >
            Oblicz kwartyli
          </button>
        </div>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:"20px"}}>
        <div className="quartilesTabContainer">
          <div className="quartilesTab">
            <table>
              <thead>
                <tr>
                  <th>Nazwa</th>
                  <th>Min</th>
                  <th>Q1</th>
                  <th>Q2</th>
                  <th>Q3</th>
                  <th>Max</th>
                  <th>Cecha 1</th>
                  <th>Przediał 1</th>
                  <th>Cecha 2</th>
                  <th>Przediał 2</th>
                  <th>Cecha 3</th>
                  <th>Przediał 3</th>
                  <th>Cecha 4</th>
                  <th>Przediał 4</th>
                </tr>
              </thead>
              <tbody>
                {data.calculatedQuartiles?.map((v, k) => (
                  <tr key={k}>
                    <td>{v.name}</td>
                    <td>{v.min}</td>
                    <td>{v.Q1}</td>
                    <td>{v.Q2}</td>
                    <td>{v.Q3}</td>
                    <td>{v.max}</td>
                    <td>
                      <FaceComponentProvider xSize={100} ySize={50}>
                        {characteristicsTab[k][0]}
                      </FaceComponentProvider>
                    </td>
                    <td>
                      {v.min}-{v.Q1}
                    </td>
                    <td>
                      <FaceComponentProvider xSize={100} ySize={50}>
                        {characteristicsTab[k][1]}
                      </FaceComponentProvider>
                    </td>
                    <td>
                      {v.Q1}-{v.Q2}
                    </td>
                    <td>
                      <FaceComponentProvider xSize={100} ySize={50}>
                        {characteristicsTab[k][2]}
                      </FaceComponentProvider>
                    </td>
                    <td>
                      {v.Q2}-{v.Q3}
                    </td>
                    <td>
                      <FaceComponentProvider xSize={100} ySize={50}>
                        {characteristicsTab[k][3]}
                      </FaceComponentProvider>
                    </td>
                    <td>
                      {v.Q3}-{v.max}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="quartilesTab">
          {data?.groupMeans?.map((v,k)=>{

            return(
              <div key={k}>
                {v.group}
                <ChernoffFace characteristics={generateCharacteristics(v.means,k)}/>
                {
                  v.means.map((v2,k2)=>(
                    <div key={k2}>{v2.name}:{v2.mean}</div>
                  ))
                }
              </div>
            )
          })}
        </div>
      </div>
    </main>
  );
}

export default ChernoffFaceTab;
