import React from "react";
import {instanceOf} from "prop-types";

export class Conv extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            parent_names: this.props.parent_names,
            type: "conv",
            name: "conv",
            input: this.props.input,
            params: this.props.params
        };
        this.addAnItem = this.addAnItem.bind(this);
        this.changeAnItem = this.changeAnItem.bind(this);
        this.deleteAnItem = this.deleteAnItem.bind(this);
        this.changeAParam = this.changeAParam.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    addAnItem = (event) => {
        event.preventDefault();
        console.log(event.target.name);
        let newList = this.state[event.target.name];
        newList.push("x");
        this.setState({
            [event.target.name]: newList
        });
    }

    changeAnItem = (index) => (event) => {
        event.preventDefault();
        let newInput = this.state[event.target.name];
        newInput[index] = event.target.value;
        this.setState({
            [event.target.name]:newInput
        });
    }

    deleteAnItem = (event) => {
        event.preventDefault();
        let newList = this.state[event.target.name];
        newList.splice(-1,1);
        this.setState({
            [event.target.name]: newList
        });
    }

    changeAParam = (event) => {
        event.preventDefault();
        let newParam = this.state.params;
        newParam[event.target.name] = event.target.value;
        this.setState({
            param: newParam
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const content = {
            type: this.state.type,
            name: this.state.name,
            input: this.state.input,
            params: this.state.params
        };
        let parent_names = this.state.parent_names;

        let flag = 0;
        let nets = this.props.nets;

        for(let key in nets) {
            if(nets.hasOwnProperty(key))
                if(nets[key]["name"] === content.name) flag = 1;
        }

        if(flag === 1)
            this.setState({alert: "Duplicated name!"});
        else
            this.props.handleSubmit("ADD_BLOCK", parent_names, content);

    };

    onChange = (event) => {
        event.preventDefault();

        this.setState({
            [event.target.name]: event.target.value
        });
    };

    render() {
        return <div className="content">
                <form className="form" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">block_name</label>
                        <input type="text" name="name" id="name" placeholder="conv" value={this.state.name} onChange={this.onChange}/>
                    </div>
                    {this.state.parent_names.map((value, index) => {
                        return <div className="form-group">
                            <label htmlFor="parent_names">parent_name_{index}</label>
                            <input type="text" name="parent_names" placeholder={value}
                                   onChange={this.changeAnItem(index)}/>
                        </div>
                    })}
                    <button type="button" name="parent_names" onClick={this.addAnItem}>Add a parent name</button>
                    {this.state.parent_names.length > 0 &&
                    <button type="button" name="parent_names" onClick={this.deleteAnItem}>Delete a parent name</button>}
                    {this.state.input.map((value, index) => {
                        return <div className="form-group">
                            <label htmlFor="input">input_{index}</label>
                            <input type="text" name="input" placeholder={value}
                                   onChange={this.changeAnItem(index)}/>
                        </div>
                    })}
                    <button type="button" name="input" onClick={this.addAnItem}>Add an input</button>
                    {this.state.input.length > 0 &&
                    <button type="button" name="input" onClick={this.deleteAnItem}>Delete an input</button>}
                    {Object.keys(this.state.params).map((key) =>{
                        return <div className="form-group">
                            <label htmlFor={key}>{key}</label>
                            <input type="text" name={key} id={key} placeholder={this.state.params[key]} value={this.state.params[key]}
                                   onChange={this.changeAParam}/>
                        </div>
                    })}
                    <div className="footer">
                        <button type="submit" className="btn" id="btn-login">
                            Submit
                        </button>
                        <div className="alert">
                            {this.state.alert}
                        </div>
                    </div>
                </form>
            </div>
    }
}