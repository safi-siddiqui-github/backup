from flask import Flask, Response
import psutil

app = Flask(__name__)

@app.route('/')
def welcome():
    return Response({"text": "welcome"})

@app.route('/cpu')
def cpu():
    return Response({f"Cpu percent is {psutil.cpu_percent()}"})

if __name__ == '__main__':
    print('Run this')
    app.run()

