let fields_target = retrieve_element_by_id("data-container");
document
    .getElementById("method-selector")
    .addEventListener("change", () => {
        let select_object = retrieve_element_by_id("method-selector");
        let current_option_selected = select_object.options[select_object.selectedIndex].value;
        let options = []
        switch(current_option_selected){
            case 'newton-raphson':
                options = spawn_newton_raphson_fields();
                clear_fields_container(fields_target, options);
                break;
            default:
                options = [];
                clear_fields_container(fields_target, options);
        }
    });

function retrieve_element_by_id(target){
    return document.getElementById(target);
}

function create_new_element(tag){
    return document.createElement(tag);
}

function clear_fields_container(target, children){
    target.replaceChildren(...children);
}

function spawn_newton_raphson_fields(){
    let equation_value_row = create_new_element("div");
    equation_value_row.classList.add("row");
    let equation_value_label = create_new_element("label");
    equation_value_label.classList.add("label");
    equation_value_label.innerText="Ecuación";
    let equation_value_input = create_new_element("input");
    equation_value_input.classList.add("input","is-medium");
    equation_value_input.id = "equation";

    equation_value_row.appendChild(equation_value_label);
    equation_value_row.appendChild(equation_value_input);

    let initial_value_row = create_new_element("div");
    initial_value_row.classList.add("row");
    let initial_value_label = create_new_element("label");
    initial_value_label.classList.add("label");
    initial_value_label.innerText="Valor inicial (X0)";
    let initial_value_input = create_new_element("input");
    initial_value_input.classList.add("input","is-medium");
    initial_value_input.id = "initial-x";

    initial_value_row.appendChild(initial_value_label);
    initial_value_row.appendChild(initial_value_input);

    let iteration_value_row = create_new_element("div");
    iteration_value_row.classList.add("row");
    let iteration_value_label = create_new_element("label");
    iteration_value_label.classList.add("label");
    iteration_value_label.innerText="Iteraciones";
    let iteration_value_input = create_new_element("input");
    iteration_value_input.classList.add("input","is-medium");
    iteration_value_input.id = "iterations";

    iteration_value_row.appendChild(iteration_value_label);
    iteration_value_row.appendChild(iteration_value_input);

    let submit_row = create_new_element("div");
    submit_row.classList.add("row");
    let submit_button = create_new_element("button");
    submit_button.innerText="Enviar datos";
    submit_button.type="submit";
    submit_button.classList.add("button");
    submit_button.id="newton-btn";
    submit_button.addEventListener("click", async () => {
        let equation = retrieve_element_by_id("equation").value;
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
        console.log(response)

    });
    submit_row.appendChild(submit_button);

    return [equation_value_row,initial_value_row,iteration_value_row, submit_row];
}

