import {create_newton_raphson_fields} from "./generators.js";
import {replace_target_content, retrieve_element_by_id} from "./auxiliaries.js";
let fields_target = retrieve_element_by_id("data-container");
document
    .getElementById("method-selector")
    .addEventListener("change", () => {
        let select_object = retrieve_element_by_id("method-selector");
        let current_option_selected = select_object.options[select_object.selectedIndex].value;
        let options = []
        switch(current_option_selected){
            case 'newton-raphson':
                options = create_newton_raphson_fields();
                replace_target_content(fields_target, options);
                break;
            default:
                options = [];
                replace_target_content(fields_target, options);
        }
    });


