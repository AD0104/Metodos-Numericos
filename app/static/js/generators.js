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
        create_table_data(retrieve_element_by_id("data-table"), response.iteration_values);
        

    });
    submit_row.appendChild(submit_button);
    return [eq_val_row,init_val_row,it_val_row, submit_row];
}

export function create_table_data(target, values) {
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
