from flask import render_template, request
from app import create_app
from app.newton_raphson import NewtonRaphson
from app.jacobi import Jacobi
from app.fixed_point import FixedPoint
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

    is_sqrt = "sqrt" in equation

    newton = NewtonRaphson(equation, initial_x, iterations, is_sqrt)
    iteration_values = newton.resolve(newton.x0)
    return json_response({'status':200,'message':'Ok', 'iteration_values': iteration_values})

@app.route("/jacobi", methods=["POST"])
def jacobi():
    payload = {}
    try:
        payload = request.get_json()
    except:
        raise Exception("Something went wrong while receiving the request payload")

    if not payload:
        return json_response({"status":400, "message":"Existen campos vacios"})

    for value in payload.values():
        if value == "":
            return json_response({'status':400,'message':'Existen campos vacios'})

    x_func = payload["x-function"]
    y_func = payload["y-function"]
    z_func = payload["z-function"]
    error  = payload["error"]

    jacobi = Jacobi(x_func, y_func, z_func, float(error))
    response_payload = jacobi.resolve(0,0,0)

    return json_response({'status':200,'message':'Ok', 'iteration_values': response_payload})

@app.route("/fixed-point", methods=["POST"])
def fixed_point():
    payload = {}
    try:
        payload = request.get_json()
    except:
        raise Exception("Something went wrong while receiving the request payload")

    if not payload:
        return json_response({"status":400, "message":"Existen campos vacios"})

    for value in payload.values():
        if value == "":
            return json_response({'status':400,'message':'Existen campos vacios'})

    initial = int(payload["initial"])
    func = payload["function"]
    tolera = float(payload["tolera"])
    iter_max = int(payload["iter-max"])

    fixd_pnt = FixedPoint(func, tolera, iter_max)
    response_payload = fixd_pnt.resolve(initial)

    return json_response({'status':200,'message':'Ok', 'iteration_values': response_payload})
