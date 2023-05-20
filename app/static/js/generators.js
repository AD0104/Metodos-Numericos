import {replace_target_content, is_plotted_graph, retrieve_element_by_id} from "./auxiliaries.js";
let currentGraphic;
let xMin=-10, xMax=10;
export function create_new_element(tag){
    return document.createElement(tag);
}
export function create_newton_raphson_fields(){
    //Layout for Equation Container and Input
    let eq_val_row = create_new_element("div");
    eq_val_row.classList.add("row");
    let eq_val_label = create_new_element("label");
    eq_val_label.classList.add("label");
    eq_val_label.innerText="Ecuación";
    let eq_val_input = create_new_element("input");
    eq_val_input.classList.add("input","is-medium");
    eq_val_input.id = "equation";
    eq_val_row.appendChild(eq_val_label);
    eq_val_row.appendChild(eq_val_input);
    //Layout for X0 Container and Input
    let init_val_row = create_new_element("div");
    init_val_row.classList.add("row");
    let init_val_label = create_new_element("label");
    init_val_label.classList.add("label");
    init_val_label.innerText="Valor inicial (X0)";
    let init_val_input = create_new_element("input");
    init_val_input.classList.add("input","is-medium");
    init_val_input.id = "initial-x";
    init_val_row.appendChild(init_val_label);
    init_val_row.appendChild(init_val_input);
    //Layout for Iterations Container and Input
    let it_val_row = create_new_element("div");
    it_val_row.classList.add("row");
    let it_value_label = create_new_element("label");
    it_value_label.classList.add("label");
    it_value_label.innerText="Iteraciones";
    let it_val_input = create_new_element("input");
    it_val_input.classList.add("input","is-medium");
    it_val_input.id = "iterations";
    it_val_row.appendChild(it_value_label);
    it_val_row.appendChild(it_val_input);
    //Layout for Submit Button Container and Input
    let submit_row = create_new_element("div");
    submit_row.classList.add("row");
    let submit_button = create_new_element("button");
    submit_button.innerText="Enviar datos";
    submit_button.type="submit";
    submit_button.classList.add("button");
    submit_button.id="newton-btn";
    submit_button.addEventListener("click", async () => {
        const equation = retrieve_element_by_id("equation").value;
        
        const graphics_plotter = retrieve_element_by_id("graphics-plotter")
        if(!is_plotted_graph(currentGraphic) )
            currentGraphic.destroy();
        generate_chart(graphics_plotter, equation.replaceAll("**","^"));

        let body = {
            'equation': equation,
            'initial-x': retrieve_element_by_id("initial-x").value,
            'iterations': retrieve_element_by_id("iterations").value
        };
        body = JSON.stringify(body);
        let headers = new Headers({"Content-Type":"application/json"})
        let configs = {
            method: "POST",
            headers: headers,
            mode: "cors",
            cache: "default",
            body: body
        };
        let url = "/newton-raphson";
        let response = await (await fetch(url, configs)).json()
        create_table_data_newton(retrieve_element_by_id("data-table"), response.iteration_values);
        

    });
    submit_row.appendChild(submit_button);
    return [eq_val_row,init_val_row,it_val_row, submit_row];
}

export function create_jacobi_fields(){
    let x_function_row = create_new_element("div");
    x_function_row.classList.add("row");
    let x_function_label = create_new_element("label");
    x_function_label.classList.add("label");
    x_function_label.innerText="f(x)";
    let x_function_input = create_new_element("input");
    x_function_input.classList.add("input","is-medium");
    x_function_input.id = "x-function";
    x_function_row.appendChild(x_function_label);
    x_function_row.appendChild(x_function_input);

    let y_function_row = create_new_element("div");
    y_function_row.classList.add("row");
    let y_function_label = create_new_element("label");
    y_function_label.classList.add("label");
    y_function_label.innerText="f(y)";
    let y_function_input = create_new_element("input");
    y_function_input.classList.add("input","is-medium");
    y_function_input.id = "y-function";
    y_function_row.appendChild(y_function_label);
    y_function_row.appendChild(y_function_input);

    let z_function_row = create_new_element("div");
    z_function_row.classList.add("row");
    let z_function_label = create_new_element("label");
    z_function_label.classList.add("label");
    z_function_label.innerText="f(z)";
    let z_function_input = create_new_element("input");
    z_function_input.classList.add("input","is-medium");
    z_function_input.id = "z-function";
    z_function_row.appendChild(z_function_label);
    z_function_row.appendChild(z_function_input);

    let error_row = create_new_element("div");
    error_row.classList.add("row");
    let error_label = create_new_element("label");
    error_label.classList.add("label");
    error_label.innerText="error";
    let error_input = create_new_element("input");
    error_input.classList.add("input","is-medium");
    error_input.id = "error";
    error_row.appendChild(error_label);
    error_row.appendChild(error_input);

    //Layout for Submit Button Container and Input
    let submit_row = create_new_element("div");
    submit_row.classList.add("row");
    let submit_button = create_new_element("button");
    submit_button.innerText="Enviar datos";
    submit_button.type="submit";
    submit_button.classList.add("button");
    submit_button.id="jacobi-btn";
    submit_button.addEventListener("click", async () => {
        let body = {
            'x-function': retrieve_element_by_id("x-function").value,
            'y-function': retrieve_element_by_id("y-function").value,
            'z-function': retrieve_element_by_id("z-function").value,
            'error': retrieve_element_by_id("error").value
        };
        body = JSON.stringify(body);
        let headers = new Headers({"Content-Type":"application/json"})
        let configs = {
            method: "POST",
            headers: headers,
            mode: "cors",
            cache: "default",
            body: body
        };
        let url = "/jacobi";
        let response = await (await fetch(url, configs)).json()
        create_table_data_jacobi(retrieve_element_by_id("data-table"), response.iteration_values);
    });
    submit_row.appendChild(submit_button);

    return [x_function_row, y_function_row, z_function_row, error_row, submit_row];
}

export function create_fixed_point_fields(){
    let x_function_row = create_new_element("div");
    x_function_row.classList.add("row");
    let x_function_label = create_new_element("label");
    x_function_label.classList.add("label");
    x_function_label.innerText="g(x)";
    let x_function_input = create_new_element("input");
    x_function_input.classList.add("input","is-medium");
    x_function_input.id = "function";
    x_function_row.appendChild(x_function_label);
    x_function_row.appendChild(x_function_input);

    let init_val_row = create_new_element("div");
    init_val_row.classList.add("row");
    let init_val_label = create_new_element("label");
    init_val_label.classList.add("label");
    init_val_label.innerText="Valor inicial (X0)";
    let init_val_input = create_new_element("input");
    init_val_input.classList.add("input","is-medium");
    init_val_input.id = "initial";
    init_val_row.appendChild(init_val_label);
    init_val_row.appendChild(init_val_input);

    let it_val_row = create_new_element("div");
    it_val_row.classList.add("row");
    let it_value_label = create_new_element("label");
    it_value_label.classList.add("label");
    it_value_label.innerText="Iteraciones";
    let it_val_input = create_new_element("input");
    it_val_input.classList.add("input","is-medium");
    it_val_input.id = "iter-max";
    it_val_row.appendChild(it_value_label);
    it_val_row.appendChild(it_val_input);

    let tol_val_row = create_new_element("div");
    tol_val_row.classList.add("row");
    let tol_value_label = create_new_element("label");
    tol_value_label.classList.add("label");
    tol_value_label.innerText="Tolerancia";
    let tol_val_input = create_new_element("input");
    tol_val_input.classList.add("input","is-medium");
    tol_val_input.id = "tolera";
    tol_val_row.appendChild(tol_value_label);
    tol_val_row.appendChild(tol_val_input);

    let submit_row = create_new_element("div");
    submit_row.classList.add("row");
    let submit_button = create_new_element("button");
    submit_button.innerText="Enviar datos";
    submit_button.type="submit";
    submit_button.classList.add("button");
    submit_button.id="fixed-point-btn";
    submit_button.addEventListener("click", async () => {
        let body = {
            'function': retrieve_element_by_id("function").value,
            'tolera': retrieve_element_by_id("tolera").value,
            'iter-max': retrieve_element_by_id("iter-max").value,
            'initial': retrieve_element_by_id("initial").value
        };
        body = JSON.stringify(body);
        let headers = new Headers({"Content-Type":"application/json"})
        let configs = {
            method: "POST",
            headers: headers,
            mode: "cors",
            cache: "default",
            body: body
        };
        let url = "/fixed-point";
        let response = await (await fetch(url, configs)).json()
        create_table_data_fixpt(retrieve_element_by_id("data-table"), response.iteration_values);
    });
    submit_row.appendChild(submit_button);

    return [x_function_row, init_val_row, it_val_row, tol_val_row, submit_row]
}

export function create_table_data_jacobi(target, values){
    const table = create_new_element("table");
    table.classList.add("table");
    const headers = ["Iteración", "Xi", "Yi", "Zi", "Error Xi", "Error Yi", "Error Zi"];

    // Insert Table Headers
    const header = table.createTHead();
    let table_row = header.insertRow();
    for (let index = 0; index < headers.length; index++) {
        const cell = create_new_element("th");
        cell.innerHTML = headers[index];
        table_row.appendChild(cell);
    }

    for(let [iteration, array] of Object.entries(values) ){
        table_row = table.insertRow();
        table_row.classList.add("table-row");
        let cell = table_row.insertCell();
        cell.innerHTML=iteration;
        cell.classList.add("table-row-cell");
        for (const element of array) {
            cell = table_row.insertCell();
            cell.innerHTML=element;
            cell.classList.add("table-row-cell");
        }
    }
    

    replace_target_content(target, [table]); 
}

export function create_table_data_fixpt(target, values){
    const table = create_new_element("table");
    table.classList.add("table");
    const headers = ["Iteración", "Xi", "Error Xi"];

    // Insert Table Headers
    const header = table.createTHead();
    let table_row = header.insertRow();
    for (let index = 0; index < headers.length; index++) {
        const cell = create_new_element("th");
        cell.innerHTML = headers[index];
        table_row.appendChild(cell);
    }

    for(let [iteration, array] of Object.entries(values) ){
        table_row = table.insertRow();
        table_row.classList.add("table-row");
        let cell = table_row.insertCell();
        cell.innerHTML=iteration;
        cell.classList.add("table-row-cell");
        for (const element of array) {
            cell = table_row.insertCell();
            cell.innerHTML=element;
            cell.classList.add("table-row-cell");
        }
    }
    

    replace_target_content(target, [table]); 
}

export function create_table_data_newton(target, values) {
    const table = create_new_element('table');
    table.classList.add("table");

    for(let [iteration, iteration_values] of Object.entries(values) ){
        const table_row = table.insertRow();
        table_row.classList.add("table-row");
        for(let [iteration_key, iteration_value] of Object.entries(iteration_values) ){
            const table_data = table_row.insertCell();
            table_data.classList.add("table-row-cell");
            if(iteration_key.includes("f'") ){
                table_data.appendChild(document.createTextNode(`${iteration_key} : ${iteration_value}`) );
            }else if(iteration_key.includes("f(") ){
                table_data.appendChild(document.createTextNode(`${iteration_key} : ${iteration_value}`) );
            }else{
                table_data.appendChild(document.createTextNode(`${iteration_key} : ${iteration_value}`) );
            }
            
        }
    }

    replace_target_content(target, [table]);
}

export function generate_chart(target,equation){
    const xValues = generate_xData();
    const yValues = generate_yData(equation, xValues);
    const data = {
        labels: xValues,
        datasets: [{
            label: equation,
            data: yValues,
            fill: false,
            tension: 0.4
        }]
    };
    const options = {
        responsive: true,
        scales: {
            x: {
                ticks: {
                    beginAtZero: true
                }
            }
        }
    };
    const config = {
        type: 'line',
        data: data,
        options: options
    };

    if(!is_plotted_graph())
        currentGraphic.destroy();

    currentGraphic = new Chart(target, config);
}

export function generate_xData(){
    let xValues = [];
    for(let i=xMin; i<=xMax; i+=0.01)
        xValues.push(parseFloat(i).toFixed(4).toString())
    return xValues;
}

export function generate_yData(equation, xValues){
    let yValues = [];
    xValues.forEach(element => {
        const result = math.evaluate(equation, {x:parseFloat(element).toFixed(2)});
        yValues.push(result);
    });
    return yValues
}
