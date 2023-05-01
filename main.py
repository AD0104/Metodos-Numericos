from flask import render_template, request
from app import create_app
from app.newton_raphson import NewtonRaphson
from app.aux_funcs import json_response

app = create_app()

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/newton-raphson", methods=["POST"])
def newton_raphson():
    payload = {}
    try:
        payload = request.get_json()
    except:
        raise Exception("Something went wrong while receiving the request payload")
    if not payload: #Request body is empty
        return json_response({'status':400,'message':'Payload is empty'})
    for value in payload.values():
        if value == "":
            return json_response({'status':400,'message':'Existen campos vacios'})
    equation = payload["equation"]
    initial_x = payload["initial-x"]
    iterations = payload["iterations"]

    newton = NewtonRaphson(equation, initial_x, iterations)
    iteration_values = newton.resolve(newton.x0)
    return json_response({'status':200,'message':'Ok', 'iteration_values': iteration_values})
