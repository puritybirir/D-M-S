import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createDocument, loadDocuments } from '../../actions/documentActions';
import DocumentForm from './DocumentForm';


class NewDocumentPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      document: {
        title: '',
        content: '',
        access: ''
      },
      saving: false
    };
    this.saveDocument = this.saveDocument.bind(this);
    this.updateDocumentState = this.updateDocumentState.bind(this);
  }

  updateDocumentState(event) {
    const field = event.target.name;
    const document = this.state.document;
    document[field] = event.target.value;
    return this.setState({ document });
  }

  saveDocument() {
    this.props.createDocument(this.state.document);
  }

  render() {
    return (
      <div>
        <h1>New Document</h1>
        <DocumentForm
          document={this.state.document}
          onSave={this.saveDocument}
          onChange={this.updateDocumentState}
        />
      </div>
    );
  }
}

NewDocumentPage.propTypes = {
  // actions: PropTypes.object.isRequired,
  createDocument: PropTypes.func.isRequired,
  loadDocuments: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  if (state.documents.length > 0) {
    return {
      documents: state.documents
    };
  }
  return {
    documents: [{ title: '', content: '', access: '' }]
  };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ createDocument, loadDocuments }, dispatch)
  };
}

export default connect(mapStateToProps, {
  createDocument, loadDocuments
})(NewDocumentPage);
