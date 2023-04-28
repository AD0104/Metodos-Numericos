from sympy.parsing.sympy_parser import parse_expr
from sympy import symbols

class NewtonRaphson:
    def __init__(self, equation, x0, iterations):
        self.x_symbol = symbols('x')
        self.equation = equation
        self.parsed_equation = parse_expr(equation)
        self.diff_equation = self.parsed_equation.diff(self.x_symbol)
        self.x0 = float(x0)
        self.iterations = int(iterations)
        
    def normal_function(self,iteration_value):
        return self.parsed_equation.subs(self.x_symbol, iteration_value)

    def deriv_function(self,iteration_value):
        return self.diff_equation.subs(self.x_symbol, iteration_value) 

    def resolve(self, x_value):
        coordinates_per_iteration = {}
        return_status = ""
        for iteration in range(self.iterations):
            current_coordinates = {}
            normal_function_value = self.normal_function(x_value)
            deriv_function_value = self.deriv_function(x_value)
            h = normal_function_value / deriv_function_value 
            abs_of_h = abs(h)
            if (normal_function_value != 0 and abs_of_h >= 0.0001):
                current_coordinates["x"] = f"{x_value:.5f}"
                current_coordinates["y"] = f"{normal_function_value:.5f}"
                x_value = x_value - h
                coordinates_per_iteration[iteration] = current_coordinates
            elif(abs_of_h <= 0.0001):
                return_status = "Accuracy more than 4 places"
                current_coordinates["x"] = f"{x_value:.5f}"
                current_coordinates["y"] = f"{normal_function_value:.5f}"
                coordinates_per_iteration[iteration] = current_coordinates
                break
            elif(deriv_function_value == 0):
                return_status = "Derivative is 0"
                break
        return (return_status, coordinates_per_iteration)


