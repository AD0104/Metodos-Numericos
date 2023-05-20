from sympy.parsing.sympy_parser import parse_expr
from sympy import symbols, S

class NewtonRaphson:
    def __init__(self, equation, x0, iterations, is_sqrt):
        self.x_symbol = symbols('x')
        self.equation = equation
        self.parsed_equation = parse_expr(equation)
        self.diff_equation = self.parsed_equation.diff(self.x_symbol)
        self.x0 = float(x0)
        self.iterations = int(iterations)
        self.is_sqrt = is_sqrt
        
    def normal_function(self,x_value_in_iteration):
        if(self.is_sqrt):
            if(x_value_in_iteration < 0):
                return 0
        return self.parsed_equation.subs(self.x_symbol, x_value_in_iteration)

    def deriv_function(self,x_value_in_iteration):
        if(self.is_sqrt):
            if(x_value_in_iteration < 0):
                return 0
        return self.diff_equation.subs(self.x_symbol, x_value_in_iteration) 

    def resolve(self, x_value):
        values_per_iteration = {}
        for iteration in range(self.iterations+1):
            iteration_values = {}

            normal_function_value = self.normal_function(x_value)
            deriv_function_value = self.deriv_function(x_value)
            if(deriv_function_value == 0):
                deriv_function_value = -1

            h = normal_function_value / deriv_function_value 
            abs_of_h = abs(h)
            
            if(
                deriv_function_value is S.NaN or 
                h is S.NaN or 
                abs_of_h is S.NaN 
            ):
                break

            if (normal_function_value != 0 and abs_of_h >= 0.0001):
                iteration_values[f"x{iteration}"] = f"{x_value:.5f}"
                iteration_values[f"f(x{iteration})"] = f"{normal_function_value:.5f}"
                iteration_values[f"f'(x{iteration})"] = f"{deriv_function_value:.5f}"
                x_value = x_value - h
                values_per_iteration[iteration] = iteration_values
            elif(abs_of_h <= 0.0001):
                iteration_values[f"x{iteration}"] = f"{x_value:.5f}"
                iteration_values[f"f(x{iteration})"] = f"{normal_function_value:.5f}"
                iteration_values[f"f'(x{iteration})"] = f"{deriv_function_value:.5f}"
                values_per_iteration[iteration] = iteration_values
                break
            elif(deriv_function_value == 0):
                break
        return values_per_iteration


