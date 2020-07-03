import React from "react";

export class Conv extends React.Component {

    constructor(props) {
        super(props);
        let params = {};
        if(this.props.hasOwnProperty("params")) {
            Object.keys(this.props.params).map((key) => {
                if(this.props.params[key].type === "select")
                    params[key] = this.props.params[key]["value"][0];
                else
                    params[key] = this.props.params[key]["value"];
            })
        }
        this.state = {
            parent_names: this.props.parent_names,
            type: this.props.type,
            name: this.props.name,
            input: this.props.input,
            params: params
        };
        this.addAnItem = this.addAnItem.bind(this);
        this.changeAnItem = this.changeAnItem.bind(this);
        this.deleteAnItem = this.deleteAnItem.bind(this);
        this.changeAParam = this.changeAParam.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // This function is called whenever you change the parameters.
    componentWillReceiveProps(nextProps) {
        let params = {};
        if(nextProps.hasOwnProperty("params")) {
            Object.keys(nextProps.params).map((key) => {
                if(nextProps.params[key].type === "select")
                    params[key] = nextProps.params[key]["value"][0];
                else
                    params[key] = nextProps.params[key]["value"];
            })
        }
        this.setState({
            parent_names: nextProps.parent_names,
            type: nextProps.type,
            name: nextProps.name,
            input: nextProps.input,
            params: params});
    }

    addAnItem = (event) => {
        event.preventDefault();
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
        let content = {
            type: this.state.type,
            name: this.state.name,
            params: this.state.params,
        };
        if(this.state.parent_names.length < 2) {
            this.setState({
                alert: "You have to specify a parent name!"
            })
            return 0
        } else {    // Only the outer block need to have input
            if(this.state.parent_names.length === 2) {
                content["input"] = this.state.input;
            }
            this.setState({
                alert: ""
            })
        }
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
                    <label>{this.props.type}</label>
                    <table>
                    <tr className="form-group">
                        <th><label htmlFor="name">block_name</label></th>
                        <th><input type="text" name="name" id="name" placeholder="conv" value={this.state.name} onChange={this.onChange}/></th>
                    </tr>
                    {this.state.parent_names.map((value, index) => {
                        return <tr className="form-group">
                            <th><label htmlFor="parent_names">parent_name_{index}</label></th>
                            <th><input type="text" name="parent_names" placeholder={value}
                                   onChange={this.changeAnItem(index)}/></th>
                        </tr>
                    })}
                    <tr>
                        <th><button type="button" name="parent_names" onClick={this.addAnItem}>Add a parent name</button></th>
                        <th>
                            {this.state.parent_names.length > 0 &&
                            <button type="button" name="parent_names" onClick={this.deleteAnItem}>Delete a parent name</button>}</th>
                    </tr>
                    {this.state.input.map((value, index) => {
                        return <tr className="form-group">
                            <th><label htmlFor="input">input_{index}</label></th>
                            <th><input type="text" name="input" placeholder={value}
                                       onChange={this.changeAnItem(index)}/></th>
                        </tr>
                    })}
                    <tr>
                        <th><button type="button" name="input" onClick={this.addAnItem}>Add an input</button></th>
                        <th>{this.state.input.length > 0 &&
                        <button type="button" name="input" onClick={this.deleteAnItem}>Delete an input</button>}</th>
                    </tr>
                    {this.state.hasOwnProperty("params") &&
                    Object.keys(this.state.params).map((key) =>{
                        if(this.props.params[key].type === "select") {
                            return <tr className="form-group">
                                <th><label htmlFor={key}>{key}</label></th>
                                <th><select name={key} id={key} onChange={this.changeAParam}>
                                    {this.props.params[key]["value"].map((value) =>
                                        <option value={value}>{value}</option>
                                    )}
                                </select></th>
                            </tr>
                        }
                        else {
                            return <tr className="form-group">
                                <th><label htmlFor={key}>{key}</label></th>
                                <th><input type={this.props.params[key].type} name={key} id={key} placeholder={this.props.params[key].value} value={this.state.params[key]}
                                       onChange={this.changeAParam}/></th>
                            </tr>
                        }
                    })}
                    </table>
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