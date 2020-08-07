import React from 'react';
import {Conv, Show} from ".";


class Interface extends React.Component {

  constructor(props) {
    super(props);
    this.handleFiles = this.handleFiles.bind(this);
    this.saveHandler = this.saveHandler.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
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

  handleSelect = (event) => {
      event.preventDefault();
      this.props.handleSelect(event.target.value);
  };

  render() {
    return (
        <div className="builder_interface">
            model builder - v 0.1
          <div className="builder">
              <div className="left_panel">
                  <Show {...this.props} containerRef={(ref) => this.current = ref} />
                  <input type="file" id="files" name="file" onChange={this.handleFiles} />
                  <input type="button" id="export" value="save" onClick={this.saveHandler}/>
              </div>
              <div className="building_block">
                  <div className="content">
                      <select name="type" onChange={this.handleSelect}>
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
                          <option value="dropout2d">Dropout2d</option>
                      </select>
                  </div>
                  <Conv key={this.props.parent_names}
                        {...this.props}
                        containerRef={(ref) => this.current = ref} />
              </div>
          </div>
        </div>
    )
  }
}

export default Interface;
