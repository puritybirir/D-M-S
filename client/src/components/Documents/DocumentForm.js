import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React, { PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

class DocumentForm extends React.Component {

  render() {
    return (
      <div>
          <MuiThemeProvider>
            <div>
              <TextField
                hintText="Title"
                type="text"
                onChange={this.props.onChange}
                defaultValue={this.props.document.title}
                style={{ width: 600 }}
                name="title"
              />
              <TextField
                hintText="Content"
                type="text"
                onChange={this.props.onChange}
                defaultValue={this.props.document.content}
                style={{ width: 600 }}
                name="content"
              />
              <TextField
                hintText="Access"
                type="text"
                onChange={this.props.onChange}
                defaultValue={this.props.document.access}
                style={{ width: 600 }}
                name="access"
              />
            </div>
          </MuiThemeProvider>
          <input
            type="submit"
            label="submit"
            disabled={this.props.saving}
            className="btn btn-primary"
            onClick={this.props.onSave}
            href="/documents"
          />
      </div>
    );
  }
}

DocumentForm.propTypes = {
  document: React.PropTypes.object.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool
};

export default DocumentForm;
