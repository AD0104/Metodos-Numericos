export function retrieve_element_by_id(target){
    return document.getElementById(target);
}

export function replace_target_content(target, children){
    target.replaceChildren(...children);
}

export function is_plotted_graph(currentGraphic){
    return currentGraphic == null;
}
