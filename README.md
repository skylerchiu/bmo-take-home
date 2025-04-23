# Application Summary

A single-page web-based application was made to meet the requirements of the assessment

## Tools and Libraries

Frontend:
- React
- Highcharts for the bar and price chart
- AG Grid for the interactive table

Backend:
- Flask 
- pandas

The frontend and backend are each containerized. Both can be started with `docker compose up`

## Application Design

### User workflow
1. The user is prompted to upload a CSV file for their desired ETF
2. Once uploaded, the file is sent to the flask backend through a POST request and is parsed into a pandas DataFrame
3. Once the basket is obtained, the pricing data is merged in to create the data needed for the 3 charts
4. All the data is returned in a singular response, and is assigned to their frontend components through the states
5. The reports render and can be analyzed by the trader


## Assumptions
- All ETF files will be organized the same way with the same headers and CSV formatting, as well as the same column names with no pre-processing needed
- Assume that the pricing data is always formatted the same way as found in the prices.csv
- Price data is available for all possible contituents and can be found prices.csv
- Assumes filename is the name/ticker of the ETF for displaying purposes



