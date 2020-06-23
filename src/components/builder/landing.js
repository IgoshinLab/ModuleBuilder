import Interface from "./interface";
import {connect} from "react-redux";

function containerRef(ref){
    this.current = ref;
}

// Map Redux state to component props
function mapStateToProps(state) {
    return {
        type: state.type,
        nets: state.nets
    }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
    return {
        handleSubmit: (type, parent_names, content) => {
            const action = {
                type: type,
                parent_names: parent_names,
                content: content
            };
            dispatch(action);
        },
        loadNets: (content) => {
            const action = {
                type: "LOAD",
                content: content
            };
            dispatch(action);
        },
        containerRef: containerRef,
    }
}

export const Landing = connect(
    mapStateToProps,
    mapDispatchToProps
)(Interface);