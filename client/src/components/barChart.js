import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';


const BarChart = ({ barData }) => {
    const names = barData ? barData.map(e => e.name) : [];
    const options = {
        chart: { 
            type: 'bar',
            height: 500,
        },
        title: {
            text: 'Top 5 Holdings'
        },
        rangeSelector: {
            selected: 1 
        },
        navigator: {
            enabled: true
        },
        legend: {
            enabled: false
        },
        xAxis: {
            categories: names,
            title: {
                text: 'Constituent Name'
            }
        },
        yAxis: {
            title: {
                text: 'Holding Size'
            }
        },
        series: [{
            name: 'Holding Size',
            tooltip: {
                valueDecimals: 2
            },
            data: barData ? barData.map(e => ({
                y: e.holdings,
              })) : []
          }]
    }

    return (
    <div className = 'barContainer'>
         <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  )};
  
  export default BarChart;