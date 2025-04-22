from flask import Flask, jsonify, request
from flask_cors import CORS



app = Flask(__name__)
CORS(app) 





@app.route('/', methods=['GET'])
def get_drawings():
    return jsonify({'response': 'Hello!'}), 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=9000, debug=True)