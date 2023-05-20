from sympy import symbols
from sympy.parsing.sympy_parser import parse_expr
class Jacobi:
    def __init__(self, x_func, y_func, z_func, error) -> None:
        self.x_symb = symbols('x')
        self.y_symb = symbols('y')
        self.z_symb = symbols('z')

        self.x_func = parse_expr(x_func)
        self.y_func = parse_expr(y_func)
        self.z_func = parse_expr(z_func)

        self.error = error

    def func_x(self, x_value, y_value, z_value):
        return self.x_func.subs(
                [
                    (self.x_symb, x_value),
                    (self.y_symb, y_value),
                    (self.z_symb, z_value)
                ]
        )            
    def func_y(self, x_value, y_value, z_value):
        return self.y_func.subs(
                [
                    (self.x_symb, x_value),
                    (self.y_symb, y_value),
                    (self.z_symb, z_value)
                ]
        )            
    def func_z(self, x_value, y_value, z_value):
        return self.z_func.subs(
                [
                    (self.x_symb, x_value),
                    (self.y_symb, y_value),
                    (self.z_symb, z_value)
                ]
        )            

    def resolve(self, x_current, y_current, z_current) -> dict[str,list[str]]:
        count = 1
        flag = True
        x, y, z = 0,0,0
        data = {}
        while(flag):
            x_current = float(self.func_x(x, y, z))
            y_current = float(self.func_y(x, y, z))
            z_current = float(self.func_z(x, y, z))

            error_x = abs(x-x_current)
            error_y = abs(y-y_current)
            error_z = abs(z-z_current)

            data[str(count)] = [str(x_current), str(y_current), str(z_current),
                                str(error_x), str(error_y), str(error_z)]

            count += 1
            x = x_current
            y = y_current
            z = z_current

            flag = error_x > self.error and error_y > self.error and error_z > self.error

        return data
