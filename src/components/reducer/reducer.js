import {addBlock, loadNets} from "./actions";

export default function reducer(
    state = {
        type: "conv",
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
        }
    },
    action) {
    switch (action.type) {
        case "ADD_BLOCK":
            return addBlock(state, action.parent_names, action.content);
        case "LOAD":
            return loadNets(state, action.content);
        default:
            return state;
    }
}