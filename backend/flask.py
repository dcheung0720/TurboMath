from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/submit', methods=['POST'])
def submit():
    # Access form data using request.form
    name = request.form['name']
    email = request.form['email']
    
    # Process the form data
    # ...

    # Return a response or render a template
    return 'Form submitted successfully'

if __name__ == '__main__':
    app.run()