from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)

@app.route('/submit', methods=['POST'])
def submit():
    data = request.get_json()

    # Process the form data
    name = data['name']
    
    # ...

    # Return a response as JSON
    response = {'message': 'Form submitted successfully'}
    return jsonify(response)

if __name__ == '__main__':
    app.run()