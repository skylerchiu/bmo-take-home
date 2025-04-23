import React from 'react';
import Highcharts from 'highcharts/highstock'; 
import HighchartsReact from 'highcharts-react-official';

const apiUrl = process.env.REACT_APP_API_URL;

const PriceChart = ({ priceData }) => {

    const options = {
        chart: {
            zoomType: 'x',
            height: 500
        },
        title:{
            text: null
        },
        rangeSelector: {
            enabled: true,
            selected: 2,
            buttons: [
                { type: 'week', count: 1, text: '1W' },
                { type: 'month', count: 1, text: '1M' },
                { type: 'all', text: 'All' }
            ],
        },
        navigator: {
            enabled: true
        },
        xAxis: {
            type: 'datetime',
            title: {
                text: 'Date'
            }
        },
        yAxis: {
            title: {
                text: 'Closing Price'
            }
        },
        series: [{
            type: 'line',
            name: 'Closing Price',
            marker: {
                enabled: false  
            },
            tooltip: {
                valueDecimals: 2
            },
            data: priceData ? priceData.map(e => [
                new Date(e.DATE).getTime(),
                e.Price
            ]) : []
          }]
    }

    return (
    <div className = 'priceContainer'>
         <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  )};
  
  export default PriceChart;