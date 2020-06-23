import React from 'react';
import {Conv, Show} from ".";
import {Col} from 'react-bootstrap';
import Container from "@material-ui/core/Container";


class Interface extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        type: "conv",
        input: [],
        parent_names: ["E", "2"],
        conv_params: {
          num_in: 1,
          num_out: 1,
          kernel_size: 3,
          stride: 1,
          padding: 1,
          dilation: 1,
          bias: 0
        }
    }
    this.handleFiles = this.handleFiles.bind(this);
    this.saveHandler = this.saveHandler.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  receivedText = (e) => {
      let lines = e.target.result;
      let rst = JSON.parse(lines);
      this.props.loadNets(rst);
  }

  handleFiles = (event) => {
      let file = event.target.files[0];
      let fr = new FileReader();
      fr.onload = this.receivedText;
      fr.readAsText(file);
  }

  saveHandler = () => {
      let content = JSON.stringify(this.props.nets);
      let blob = new Blob([content], {type: "text/plain;charset=utf-8"});
      let FileSaver = require('file-saver');
      FileSaver.saveAs(blob, "temp.json");
  }

  onChange = (event) => {
      event.preventDefault();
      this.setState({
          [event.target.name]: event.target.value
      });
  };

  render() {
    return (
        <div className="builder_interface">
          <div className="builder">
              <Container>
                      <Col>
                          <Show {...this.props} containerRef={(ref) => this.current = ref} />
                          <input type="file" id="files" name="file" onChange={this.handleFiles} />
                          <input type="button" id="export" value="save" onClick={this.saveHandler}/>
                      </Col>
                      <Col sm={3}>
                          <div className="building_block">
                              <div className="content">
                                  <select name="type" value={this.state.type} onChange={this.onChange}>
                                      <option value="conv">Convolution</option>
                                      <option value="deconv">Deconvolution</option>
                                      <option value="linear">Linear</option>
                                      <option value="noise">Noise</option>
                                      <option value="AdaIN">AdaIN</option>
                                      <option value="const">Const</option>
                                      <option value="reshape">Reshape</option>
                                      <option value="reparameterize">Reparameterize</option>
                                      <option value="concat">Concat</option>
                                      <option value="normalization">Normalization</option>
                                      <option value="activation">Activation</option>
                                      <option value="sequential">Sequential</option>
                                  </select>
                              </div>
                          {this.state.type === "conv" &&
                          <Conv {...this.props}
                                parent_names={this.state.parent_names}
                                input={this.state.input}
                                params={this.state.conv_params}
                                containerRef={(ref) => this.current = ref} />}
                          </div>
                      </Col>
              </Container>
          </div>
        </div>
    )
  }
}

export default Interface;
