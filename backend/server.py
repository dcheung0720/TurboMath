from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)

@app.route('/submit', methods=['POST'])
def submit():
    data = request.get_json()

    # Process the form data
    user_ans = data['ans']
    
    print(data['ans'] == data['number1'] * data['number2'] )
    print(data['number1'] * data['number2'])

    # Return a response as JSON
    response = {'message': 'Form submitted successfully',
                'correct': '' + str(int(user_ans) == int(data['number1'] * data['number2']))}
    
    return jsonify(response)

if __name__ == '__main__':
    app.run()