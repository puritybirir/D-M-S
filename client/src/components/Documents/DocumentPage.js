import { browserHistory } from 'react-router';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as documentActions from '../../actions/documentActions';
import DocumentForm from './DocumentForm';

class DocumentPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      document: this.props.document,
      saving: false,
      isEditing: false
    };
    this.saveDocument = this.saveDocument.bind(this);
    this.updateDocumentState = this.updateDocumentState.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.deleteDocument = this.deleteDocument.bind(this);
    this.redirect = this.redirect.bind(this);
  }


  componentWillReceiveProps(nextProps) {
    if (this.props.document.id != nextProps.document.id) {
      this.setState({ document: nextProps.document });
    }
    this.setState({ saving: false, isEditing: false });
  }

  toggleEdit() {
    this.setState({ isEditing: true });
  }

  updateDocumentState(event) {
    const field = event.target.name;
    const document = this.state.document;
    document[field] = event.target.value;
    return this.setState({ document });
  }

  deleteDocument(event) {
    this.props.actions.deleteDocument(this.state.document);
  }

  redirect() {
    browserHistory.push('/documents');
  }

  render() {
    if (this.state.isEditing) {
      return (
        <div>
          <h1>edit document</h1>
          <DocumentForm
            document={this.state.document}
            onSave={this.saveDocument}
            onChange={this.updateDocumentState}
            saving={this.state.saving}
          />
        </div>
      );
    }
    return (
      <div className="col-md-8 col-md-offset-2">
        <h1>{this.state.document.title}</h1>
        <p>content: {this.state.document.content}</p>
        <p>access: {this.state.document.access}</p>
        <button onClick={this.toggleEdit} className="btn btn-default  ">edit</button>
        <button onClick={this.deleteDocument} className="btn btn-default  ">delete</button>
      </div>
    );
  }
}

DocumentPage.PropTypes = {
  document: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function getDocumentById(documents, id) {
  const document = documents.find(doc => doc.id === id);
  return Object.assign({}, document);
}

function mapStateToProps(state, ownProps) {
  let document = { title: '', content: '', access: '' };
  const documentId = ownProps.params.id;
  if (documentId && state.documents.length > 0) {
    document = getDocumentById(state.documents, ownProps.params.id);
    return { document };
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(documentActions, dispatch)
  };
}


export default connect(mapStateToProps, { documentActions })(DocumentPage);
