import {addBlock, deleteBlock, loadNets} from "./actions";
import {default_params, editBlock, getBlockParams} from "./block-params";

export default function reducer(
    state = {
        nets:
            {E: {
                "1": {
                    "type": "conv",
                    "name": "conv",
                    "input": ["x"],
                    "params": {
                        "num_in": 64,
                        "num_out": 128,
                        "kernel_size": 7,
                        "stride": 4,
                        "padding": 3,
                        "dilation": 1,
                        "bias": 0
                    },
                }
            }
        },
        type: "conv",
        input: [],
        parent_names: ["E", "1"],
        name: "x",
        params: default_params["conv"]
    },
    action) {
    switch (action.type) {
        case "ADD_BLOCK":
            return addBlock(state, action.parent_names, action.content);
        case "LOAD":
            return loadNets(state, action.content);
        case "SWITCH":
            return getBlockParams(state, action.block_type);
        case "EDIT":
            return editBlock(state, action.parent_names);
        case "DELETE":
            return deleteBlock(state, action.parent_names);
        default:
            return state;
    }
}