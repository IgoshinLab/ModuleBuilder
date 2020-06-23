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

    presentParams = (block) => {
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
                        <th>{this.presentParams(block.params[key])}</th>
                        <th>Edit</th>
                        <th>Delete</th>
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

    render() {
        return <div className="content">
                <div className="header">Model Structure</div>
                <div className="sheet">
                    {Object.keys(this.props.nets).map((key) => {
                        return <div>
                        <h3>Model: {key}</h3>
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
                                <th>{block.input.map((item) => {
                                    return <li>{item}</li>})}
                                </th>
                                <th>{this.presentParams(block)}</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                            })}
                            </table>
                        </div>
                    })}
                </div>
            </div>
    }
}