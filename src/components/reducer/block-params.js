export const default_params = {
    conv: {
        num_in: {type: "number", value: 1},
        num_out: {type: "number", value: 1},
        kernel_size: {type: "text", value: 3},
        stride: {type: "text", value: 1},
        padding: {type: "text", value: 1},
        dilation: {type: "text", value: 1},
        bias: {type: "text", value: 1}
    },
    deconv: {
        num_in: {type: "number", value: 1},
        num_out: {type: "number", value: 1},
        kernel_size: {type: "text", value: 3},
        stride: {type: "text", value: 1},
        padding: {type: "text", value: 1},
        dilation: {type: "text", value: 1},
        output_padding: {type: "text", value: 1}
    },
    linear: {
        num_in: {type: "number", value: 1},
        num_out: {type: "number", value: 1}
    },
    noise: {
        num_in: {type: "number", value: 1}
    },
    AdaIN: {
        num_in: {type: "number", value: 1},
        num_out: {type: "number", value: 1}
    },
    const: {
        num_in: {type: "number", value: 1},
        img_size: {type: "text", value: [4, 4]}
    },
    reshape: {
        depth: {type: "text", value: [-1, 1, 1, 1]}
    },
    concat: {
        axis: {type: "number", value: 1}
    },
    normalization: {
        type: {type: "select", value: ["BatchNorm2d", "PixelNorm"]}
    },
    activation: {
        type: {type: "select", value: ["LeakyReLU", "Sigmoid", "ReLU"]}
    }
}

export function getBlockParams(state, block_type) {
    let allState = Object.assign({}, state);
    allState.type = block_type;
    if(default_params.hasOwnProperty(block_type))
        allState = Object.assign(allState, {params: default_params[block_type]});
    else
        allState = Object.assign(allState, {params: {}});
    return allState;
}

export function editBlock(state, parent_names) {
    let newState = Object.assign({}, state);
    let content = newState.nets;
    if(parent_names.length < 2)
        return newState;
    for(let i = 0; i < 2; i++) {
        if(content.hasOwnProperty(parent_names[i]))
            content = content[parent_names[i]];
        else
            return newState;
    }
    if(parent_names.length > 2)
        for(let i = 2; i < parent_names.length; i++) {
            if(content.hasOwnProperty("params"))
                if(content.params.hasOwnProperty(parent_names[i]))
                    content = content.params[parent_names[i]];
        }
    let block = {
        "input": [],
        "parent_names": content.hasOwnProperty("parent_names") ?
            content["parent_names"] : parent_names,
        "name": content.hasOwnProperty("name") ? content["name"] : "x",
    }
    if(content.hasOwnProperty("input")) {
        for(let i = 0; i < content.input.length; i++) {
            block.input.push(content.input[i])
        }
    } // The input should be assigned a new memory
    if(content.hasOwnProperty("type"))
        block.type = content.type;
        if(content.hasOwnProperty("params"))
            block.params = {}
            if(content.type !== "sequential")   // Sequential has no parameters
                Object.keys(default_params[content.type]).map((key) => {
                    // Can only pick an option from select
                    block.params[key] = {
                        type: default_params[content.type][key].type,
                        value: default_params[content.type][key].type === "select" ?
                            default_params[content.type][key].value : content.params[key]
                    }
                })
    newState = Object.assign(newState, block);
    return newState;
}