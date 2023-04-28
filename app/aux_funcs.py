from flask import Response, jsonify, make_response

def json_response(kwargs: dict)->Response:
    return make_response(jsonify(kwargs))

