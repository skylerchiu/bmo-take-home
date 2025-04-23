from flask import Flask, jsonify, request
from flask_cors import CORS

import pandas as pd

app = Flask(__name__)
CORS(app) 

prices = pd.read_csv('prices.csv')

@app.route('/fileUpload', methods=['POST'])
def parse_etf():
    try:
        if 'file' not in request.files:
            return "No file part", 400
        file = request.files['file']
        if file.filename == '':
            return "No selected file", 400

        df = pd.read_csv(file)

        if not 'name' in df.columns or not 'weight' in df.columns:
            return jsonify({'error': 'Not a valid CSV format'}), 500

        # Interactive table
        prices['DATE'] = pd.to_datetime(prices['DATE']) 
        latest_prices = prices.sort_values('DATE', ascending=False).iloc[0]
        latest_date = latest_prices['DATE']
        latest_prices = latest_prices.drop('DATE')
        table_df = df.copy()
        table_df['price'] = table_df['name'].map(latest_prices)

        # Price chart
        weightings = dict(zip(df['name'], df['weight']))
        price_history_df = prices[['DATE'] + list(weightings.keys())]
        for i in weightings.keys():
            price_history_df[i] *= weightings[i]
        price_history_df['Price'] = price_history_df.drop(columns='DATE').sum(axis=1)
        price_history_df = price_history_df[['DATE', 'Price']]


        # Bar chart
        bar_df = table_df.copy()
        bar_df['holdings'] = bar_df['weight'] * bar_df['price']
        bar_df = bar_df.sort_values('holdings', ascending=False).head(5)


        return jsonify({'table': table_df.to_dict(orient='records'), 'price_data': price_history_df.to_dict(orient='records'), 'bar': bar_df.to_dict(orient='records'),
                        'name': file.filename[:-4], 'date' : latest_date.strftime('%b %d %Y')})
    
    except Exception as e:
        app.logger.error(f"Error: {str(e)}")
        return jsonify({'error': str(e)}), 500
    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=9000, debug=True)