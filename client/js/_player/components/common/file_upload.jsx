import React from 'react';
import _ from 'lodash';

export default class FileUpload extends React.Component {

  static propTypes = {
    selectAnswer: React.PropTypes.func,

    // User facing strings of the language specified by the 'locale' setting
    localizedStrings: React.PropTypes.object.isRequired // TODO when we add styles, localize strings
  };

  constructor() {
    super();
    this.state = {
      uplFile: null
    };
  }

  handleChange(e) {
    if (_.isFunction(this.props.selectAnswer)) {
      // We are currently only allowing a single file upload. Without enabling
      // multiple uploads on the file input, the file list will only be of size 1
      // and will get replaced every time the file is updated.
      this.props.selectAnswer(e.target.files[0]);
      this.setState({ uplFile:e.target.files[0].name });
    }
  }

  resetChange() {
    this.setState({ uplFile: '' });
    this.formInput.reset();
    this.inputField.click();
    this.props.selectAnswer('');
  }

  render() {
    return (
      <div>
        <form id="fileUpload" ref={(form) => { this.formInput = form; }}>
          <label htmlFor="file-upload" className="c-file-upload" >
            <span>{this.props.localizedStrings.chooseFile}</span>
            <input id="file-upload" ref={(input) => { this.inputField = input; }} onChange={e => this.handleChange(e)} type="file" className="c-file-upload-input" />
          </label>
        </form>
        <label htmlFor="file-upload2" className="c-file-upload" >
          <input type="text" value={this.state.uplFile ? this.state.uplFile : 'no file chosen'} />
          <button id="file-upload2" onClick={() => this.resetChange()} className="c-file-upload-input" > delete</button>
        </label>
      </div>
    );
  }
}


// if (this.state.uplFile !== '') {
//       fileUploadEl = (
//         <div className="c-file-upload">Your selected file: <span>{this.state.uplFile}</span>
//           <button onClick={() => { this.resetChange(); }}>select different file</button>
//         </div>
//       );
//     } else {
//       fileUploadEl = (
//         <form className="c-file-upload" id="fileUpload" ref={(form) => { this.formInput = form; }}>
//           <label htmlFor="file-upload">
//             <span>{this.props.localizedStrings.chooseFile}</span>
//             <input id="file-upload" onChange={e => this.handleChange(e)} type="file" />
//           </label>
//         </form>
//       );
//     }
