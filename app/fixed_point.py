from sympy import symbols, S
from sympy.parsing.sympy_parser import parse_expr
class FixedPoint:
    def __init__(self, x_func, tolera, iter_max) -> None:
        self.x_symb = symbols("x")
        self.x_func = parse_expr(x_func) 
        self.tolera = tolera
        self.iter_max = iter_max
        
    def solve_function(self, x_val):
        return self.x_func.subs(self.x_symb, x_val)

    def resolve(self, a) -> dict[str, list[str]]:
        itr = 1
        b = self.solve_function(a)
        tramo = abs(b-a)
        data = {}
        data[str(itr)] = [str(a), str(tramo)]
        while(
            tramo >= self.tolera and 
            itr < self.iter_max 
        ):
            a = float(b) 
            b = self.solve_function(a)
            tramo = abs(b-a)
            itr += 1
            data[str(itr)] = [str(a), str(tramo)]
            
        response = b
        if(itr >= self.iter_max):
            response = S.NaN
        else:
            data[str(itr+1)] = [str(response), str(tramo)]

        return data


