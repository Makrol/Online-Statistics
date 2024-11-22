import React, { useEffect, useState } from 'react';
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
  const [quartiles, setQuartiles] = useState([]);

  const [data,setData] = useState({
    activeTab:0,
    tableData:[],
    columns:[],
    groupByColumn: null,
    selectedColumns: [],
    quartiles: []
  })

  useEffect(()=>{
    console.log(data)
  },[data])
  // Zawartość kart - każdy wpis odnosi się do konkretnego komponentu
  const tabs = [
    { id: 0, title: "Dane", component: <CsvUploader data={data} setData={setData}/> },
    { id: 1, title: "Twarze Chernoff'a", component: <ChernoffFaceTab data={data} setData={setData}/> },
    { id: 2, title: "Statystyki", component: <StatTabe/> },
  ];

  return (
    <div>
      {/* Przełączniki kart */}
      <div className='tabsMenu'>
        {tabs.map((tab, index) => (
          <div
            key={tab.id}
            onClick={() => setActiveTab(index)}
            style={{
              padding: "10px 20px",
              backgroundColor: activeTab === index ? "#50abe7" : "#bae0f3",
              color: activeTab === index ? "#fff" : "#000",
              marginRight: "5px",
              borderRadius: "10px",

            }}
          >
            {tab.title}
          </div>
        ))}
      </div>

      {/* Zawartość aktywnej karty */}
      <div className='tab'>
        {tabs[activeTab].component}
      </div>
    </div>
  );
}

export default Tabs;
