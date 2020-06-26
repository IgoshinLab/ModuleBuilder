import React from "react";

export class Show extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            index: 1
        };
        this.presentParams = this.presentParams.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const user = {
            username: this.state.username,
            password: this.state.password
        };
        this.props.handleSubmit("LOGIN", user);
    };

    presentParams = (block, parent_names) => {
        if(block.type === "sequential") {
            return <table>
                <tr>
                    <th>Order</th>
                    <th>Type</th>
                    <th>Name</th>
                    <th>Parameters</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                {Object.keys(block.params).map((key) => {
                    return <tr>
                        <th>{key}</th>
                        <th>{block.params[key].type}</th>
                        <th>{block.params[key].name}</th>
                        <th className="left_align">{this.presentParams(block.params[key], parent_names.concat(key))}</th>
                        <th><button type="button" onClick={this.handleManipulate("EDIT",parent_names.concat(key))}>Edit</button></th>
                        <th><button type="button" onClick={this.handleManipulate("DELETE",parent_names.concat(key))}>Delete</button></th>
                    </tr>
                })}
            </table>
        } else {
            if(block.hasOwnProperty("params"))
                return Object.keys(block.params).map((key) => {
                    if(block.params[key] instanceof Array)
                        return <li>{key}: {block.params[key].map((item) => {
                            return <span>{item} </span>
                            })}</li>
                    else
                        return <li>{key}: {block.params[key]}</li>
                })
        }
    }

    onChange = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleManipulate = (type, parent_names) => (event) => {
        event.preventDefault();
        this.props.handleManipulate(type, parent_names);
    }

    render() {
        return <div className="content">
                <div className="header">Model Structure</div>
                <div className="sheet">
                    {Object.keys(this.props.nets).map((key) => {
                        return <div>
                        <h3>Model: {key}</h3>
                            <button type="button" onClick={this.handleManipulate("DELETE", [key])}>Delete</button>
                            <table>
                                <tr>
                                    <th>Order</th>
                                    <th>Type</th>
                                    <th>Name</th>
                                    <th>Input</th>
                                    <th>Parameters</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            {Object.keys(this.props.nets[key]).map((index) => {
                            const block = this.props.nets[key][index];
                            return <tr>
                                <th>{index}</th>
                                <th>{block.type}</th>
                                <th>{block.name}</th>
                                <th className="left_align">{block.input.map((item) => {
                                    return <li>{item}</li>})}
                                </th>
                                <th className="left_align">{this.presentParams(block, [key, index])}</th>
                                <th><button type="button" onClick={this.handleManipulate("EDIT",[key, index])}>Edit</button></th>
                                <th><button type="button" onClick={this.handleManipulate("DELETE",[key, index])}>Delete</button></th>
                            </tr>
                            })}
                            </table>
                        </div>
                    })}
                </div>
            </div>
    }
}