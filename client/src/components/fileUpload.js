import React, { useState } from 'react';

const apiUrl = process.env.REACT_APP_API_URL;

const FileUpload = ({ file, setFile, setTableData, setPriceData, setBarData, setETFName, setLatestDate }) => {
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && selectedFile.type === 'text/csv') {
            setFile(selectedFile);
        } else {
            alert('Please upload a CSV file');
        }
      };

    const handleUpload = async () => {
        if (!file) {
          alert('Please select a file to upload');
          return;
        }
    
        const formData = new FormData();
        formData.append('file', file);
        try{
          const response = await fetch(`${apiUrl}/fileUpload`, {
            method: 'POST',
            body: formData,
          })
          const resp = await response.json();
          setTableData(resp.table)
          setPriceData(resp.price_data)
          setBarData(resp.bar)
          setETFName(resp.name)
          setLatestDate(resp.date)
        }
        catch (error){
          console.error('ERROR', error);

        }
          

      };

    return(
    <div className = 'fileUploadContainer'>
        <a>Please select an ETF .csv file and press 'Upload'</a>
        <div className='inputContainer'>
          <input  className="fileInput" type="file" accept=".csv" onChange={handleFileChange} />
        </div>
        <button className='uploadButton' onClick={handleUpload}>Upload</button>
    </div>
  )};
  
  export default FileUpload;