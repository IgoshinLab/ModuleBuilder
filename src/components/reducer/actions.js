import {default_params} from "./block-params";

function updateDictParams(net, parent_names, content) {
    if(parent_names.length === 1) {
        if (content.type === "sequential" && net.hasOwnProperty(parent_names[0]))
            content.params = net[parent_names[0]].params;
        net[parent_names[0]] = content;
    } else if (parent_names.length > 1) {
        if(!net.hasOwnProperty(parent_names[0]))
            net[parent_names[0]] = {params: {}}
        net[parent_names[0]]["params"] = updateDictParams(net[parent_names[0]]["params"], parent_names.slice(1), content)
    }
    //console.log(net);
    return net;
}

function updateDict(net, parent_names, content) {
    if(!net.hasOwnProperty(parent_names[0]))
        net[parent_names[0]] = {};
    if(parent_names.length === 2) {
        if(content.type === "sequential" && net[parent_names[0]].hasOwnProperty(parent_names[1]))
            content.params = net[parent_names[0]][parent_names[1]].params;
        net[parent_names[0]][parent_names[1]] = content;
    }
    else if (parent_names.length > 2) {
        if(!net[parent_names[0]].hasOwnProperty(parent_names[1]))
            net[parent_names[0]][parent_names[1]] = {params: {}};
        net[parent_names[0]][parent_names[1]]["params"] = updateDictParams(net[parent_names[0]][parent_names[1]]["params"],
        parent_names.slice(2), content)
    }
    return net;
}

// This function is used to transform a string of numbers into numbers
function validContentParams(content) {
    let newContent = Object.assign({}, content);
    if(newContent.hasOwnProperty("input")) {
        let newInput = [];
        for(let i = 0; i < newContent.input.length; i++) {
            newInput.push(newContent.input[i])
        }
        newContent.input = newInput;
    }
    if(newContent.hasOwnProperty("params"))
        Object.keys(newContent.params).map((key) => {
            if(default_params[newContent.type][key].type === "text" || default_params[newContent.type][key].type === "number")
                if(typeof(newContent.params[key]) == "string")
                    if(newContent.params[key].indexOf(',') === -1)
                        newContent.params[key] = parseInt(newContent.params[key]);
                    else {
                        let content_elements = newContent.params[key].split(',')
                        let update_content = []
                        for(let i = 0; i < content_elements.length; i++)
                            update_content.push(parseInt(content_elements[i]))
                        newContent.params[key] = update_content;
                    }
        })
    return newContent;
}

export function addBlock(state, parent_names, content) {
    let allNets = Object.assign({}, state.nets);
    let newContent = validContentParams(content);
    allNets = updateDict(allNets, parent_names, newContent);
    let newState = Object.assign({}, state);
    newState.nets = allNets;
    return Object.assign(newState, {nets: allNets});
}

function deleteKeyParams(dict, key_list) {
    if(key_list.length === 1)
        delete dict[key_list[0]];
    else if (key_list.length > 1)
        dict[key_list[0]]["params"] = deleteKeyParams(dict[key_list[0]]["params"], key_list.slice(1));
    return dict;
}


function deleteKey(dict, key_list) {
    if(key_list.length === 1)
        delete dict[key_list[0]];
    if(key_list.length === 2)
        delete dict[key_list[0]][key_list[1]];

    else if (key_list.length > 2)
        dict[key_list[0]][key_list[1]]["params"] = deleteKeyParams(dict[key_list[0]][key_list[1]]["params"], key_list.slice(2));
    return dict;
}

export function deleteBlock(state, parent_names) {
    let allNets = Object.assign({}, state.nets);
    allNets = deleteKey(allNets, parent_names);
    let newState = Object.assign({}, state);
    return Object.assign(newState, {nets: allNets});
}


export function loadNets(state, content) {
    let newState = Object.assign({}, state);
    newState.nets = content;
    return newState;
}

