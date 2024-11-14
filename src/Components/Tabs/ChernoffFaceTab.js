import { useEffect, useState } from "react";
import ChernoffFaceTable from "../../ChernoffFaceTable";
import ChernoffFace from "../ChernoffFace";


function ChernoffFaceTab({
  tableData,
  setTableData,
  columns,
  setColumns,
  quartiles,
  setQuartiles,
  selectedColumns,
  setSelectedColumns,
  groupByColumn,
  setGroupByColumn,
}) {
    const [quartilesGlobal,setQuartilesGlobal] = useState({});


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
      }
      return acc;
    }, {});
  
    for (let key in groups) {
      const groupValues = groups[key];
  
      const quartileValues = selectedColumns.map((column, colIndex) => {
        const values = groupValues.map((group) => group[colIndex]).sort((a, b) => a - b);
  
        const min = values[0];
        const max = values[values.length - 1];
        const q33 = values[Math.floor(values.length * 0.33)];
        const median = values[Math.floor(values.length / 2)];
        const q66 = values[Math.floor(values.length * 0.66)];
        const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
  
        return { min, Q33: q33, median, Q66: q66, max, mean };
      });
  
      quartilesResults[key] = quartileValues;
    }
  
    setQuartiles(quartilesResults);
  };
  
  const calculateGlobalQuartiles = () => {
    if (selectedColumns.length === 0) return;
  
    const globalQuartiles = selectedColumns.map((column) => {
      const colIndex = columns.indexOf(column);
      const values = tableData
        .map((row) => parseFloat(row[colIndex]))
        .filter((value) => !isNaN(value))
        .sort((a, b) => a - b);
  
      const min = values[0];
      const max = values[values.length - 1];
      const q33 = values[Math.floor(values.length * 0.33)];
      const median = values[Math.floor(values.length / 2)];
      const q66 = values[Math.floor(values.length * 0.66)];
      const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
  
      return { column, min, Q33: q33, median, Q66: q66, max, mean };
    });
  
    setQuartilesGlobal(globalQuartiles);
  };
  const onClickCalculateQuartiles = () =>{
    calculateGlobalQuartiles();
    calculateQuartiles();
  }
  const generateCharacteristics = (data) =>{
    if(quartilesGlobal.length===undefined)
      return null;
    
    const result = [];
    let index = 0;
    data[1].forEach(element => {
      if(element.mean<quartilesGlobal[index].Q33)
        result.push(1);
      else if(element.mean<quartilesGlobal[index].Q66)
        result.push(2);
      else
        result.push(3);
      index++;
    });
    
    return {
      eyes: result[0],
      smile: result[1],
      nose: result[2],
      eyebrows: result[3],
      ears: result[4],
    };
  }
  useEffect(()=>{

  },[quartiles])
  return (
    <div>
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
        <button onClick={onClickCalculateQuartiles}>Oblicz kwartyli</button>
      </div>
        {Object.keys(quartiles).length > 0 && (
          <div className="quartile-results">
            <h3>Wyniki kwartyli:</h3>
            <ul style={{listStyleType:"none"}}>
              {Object.entries(quartiles).map(
                ([group, quartileValues], index) => (
                  <li key={index}>
                    <strong>{group}:</strong>
                    {quartileValues.map((q, colIndex) => (
                      <div key={colIndex}>
                        {selectedColumns[colIndex]}: min: {q.min}, q33: {q.q33}, mediana:{q.median} q66: {q.q66}, max: {q.max}, średnia: {q.mean }
                        {q.Q3}
                      </div>
                    ))}
                  </li>
                )
              )}
            </ul>
          </div>
        )}


      <ChernoffFaceTable quartilesGlobal={quartilesGlobal}/>
      
     
      {
        Object.entries(quartiles).map((v,k)=>{
          const characteristics = generateCharacteristics(v);
          if(characteristics!==null)
            return(
            
              <ChernoffFace key={k} characteristics={characteristics} />
            )
          else
            return(
              <div/>
            )
        })
      }
    </div>
  );
}
export default ChernoffFaceTab;
