function updateDict(net, name_list, content) {
    if(name_list.length === 1)
        net[name_list[0]] = content
    else
        net[name_list[0]] = updateDict(net[name_list[0]], name_list.slice(1), content)
    return net
}



export function addBlock(state, parent_names, content) {
    let allNets = Object.assign({}, state.nets);

    allNets = updateDict(allNets, parent_names, content);
    return {
        type: state.type,
        nets: allNets
    };
}

export function loadNets(state, content) {
    return {
        type: state.type,
        nets: content
    }
}