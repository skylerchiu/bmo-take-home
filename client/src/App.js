import './App.css';
import React, { useState } from 'react';
import FileUpload from './components/fileUpload'
import ETFTable from './components/table';
import PriceChart from './components/priceChart';
import BarChart from './components/barChart';

const apiUrl = process.env.REACT_APP_API_URL;

function App() {

  const [tableData, setTableData] = useState(null);
  const [priceData, setPriceData] = useState(null);
  const [barData, setBarData] = useState(null)
  const [file, setFile] = useState(null);
  const [name, setETFName] = useState(null)
  const [latestDate, setLatestDate] = useState(null)

  return (
    <div className="App">
      <header className='header'>
        ETF Viewer
      </header>
      <div className="container">

          <FileUpload file={file} setFile={setFile} setTableData={setTableData} setPriceData={setPriceData} setBarData={setBarData} setETFName={setETFName} setLatestDate={setLatestDate} />
          {name && <div className='etfTitle'>Showing Data For: {name} as of {latestDate}</div> }
          <div className='basketContainer'>
            <div className='sectionTitle'>Basket Details</div>
            <div className='basketContent'>
              <ETFTable rowData={tableData} />
              <BarChart barData={barData} />
            </div>
          </div>

          <div className = 'priceChartContainer'>
            <div className='sectionTitle'>Historical Price Action</div>
              <PriceChart priceData={priceData}/>
          </div>

      </div>
    </div>
  );
}

export default App;
