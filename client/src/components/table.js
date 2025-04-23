import React, { useRef, useEffect} from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const apiUrl = process.env.REACT_APP_API_URL;

const ETFTable = ({ rowData }) => {
    const gridRef = useRef();
    const columnDefs = [
        { field: 'name', headerName: 'Constituent', sortable: true, filter: true },
        { field: 'price',  headerName: 'Latest Close Price', sortable: true, filter: true },
        { field: 'weight',  headerName: 'Weight' , sortable: true, filter: true, sort: 'desc'  }
    ]

    const onGridReady = (params) => {
        gridRef.current = params.api;
        params.api.sizeColumnsToFit();
    };

    useEffect(() => {
        if (gridRef.current) {
            if (rowData && rowData.length > 0) {
                gridRef.current.setRowData(rowData);
            } else {
                gridRef.current.setRowData([]);
            }
        }
    }, [rowData]);

    const gridOptions = {
        overlayNoRowsTemplate: '<span></span>',
        overlayLoadingTemplate: '<span></span>'
    }

    return(
    <div className = 'tableContainer'>
        <div className="ag-theme-alpine" style={{ height: 500, width: '100%' }}>
            <AgGridReact gridOptions={gridOptions} rowData={rowData} columnDefs={columnDefs} onGridReady={onGridReady} />
        </div>
    </div>
  )};
  
  export default ETFTable;