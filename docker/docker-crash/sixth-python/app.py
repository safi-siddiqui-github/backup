from flask import Flask;
app = Flask(__name__)
@app.route("/")
def hello_world():
    return "<h1>Welcome to docker pythons<h1>"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port='8000')