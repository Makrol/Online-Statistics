import React, { useState } from 'react';
import DataTab from './DataTab';
import ChernoffFaceTab from './ChernoffFaceTab';
import StatTabe from './StatTab';
import CsvUploader from '../CsvUploader';

function Tabs() {
  // Ustawienie stanu dla aktywnej karty
  const [activeTab, setActiveTab] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [groupByColumn, setGroupByColumn] = useState(null);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [quartiles, setQuartiles] = useState({});

  // Zawartość kart - każdy wpis odnosi się do konkretnego komponentu
  const tabs = [
    { id: 0, title: "Dane", component: <CsvUploader 
      tableData={tableData} setTableData={setTableData}
      columns={columns} setColumns={setColumns}
      quartiles={quartiles} setQuartiles={setQuartiles}
      selectedColumns={selectedColumns} setSelectedColumns={setSelectedColumns}
      groupByColumn={groupByColumn} setGroupByColumn={setGroupByColumn}/> },
    { id: 1, title: "Twarze Chernoff'a", component: <ChernoffFaceTab
      tableData={tableData} setTableData={setTableData}
      columns={columns} setColumns={setColumns}
      quartiles={quartiles} setQuartiles={setQuartiles}
      selectedColumns={selectedColumns} setSelectedColumns={setSelectedColumns}
      groupByColumn={groupByColumn} setGroupByColumn={setGroupByColumn}/> },
    { id: 2, title: "Statystyki", component: <StatTabe/> },
  ];

  return (
    <div>
      {/* Przełączniki kart */}
      <div style={{ display: "flex", cursor: "pointer" }}>
        {tabs.map((tab, index) => (
          <div
            key={tab.id}
            onClick={() => setActiveTab(index)}
            style={{
              padding: "10px 20px",
              backgroundColor: activeTab === index ? "#007bff" : "#e0e0e0",
              color: activeTab === index ? "#fff" : "#000",
              marginRight: "5px",
            }}
          >
            {tab.title}
          </div>
        ))}
      </div>

      {/* Zawartość aktywnej karty */}
      <div style={{ padding: "20px", border: "1px solid #e0e0e0", marginTop: "10px" }}>
        {tabs[activeTab].component}
      </div>
    </div>
  );
}

export default Tabs;
