import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DocumentList from './DocumentList';
import NewDocumentPage from './NewDocumentPage';
import { loadDocuments } from '../../actions/documentActions';
import ContentAdd from 'material-ui/svg-icons/content/add';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FloatingActionButton from 'material-ui/FloatingActionButton';

const style = {
  marginRight: 20,
};



class DocumentsPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      document: {
        title: '',
        content: '',
        access: ''
      }
    };
  }
  componentWillMount() {
    this.props.loadDocuments();
  }
  render() {
    const documents = this.props.documents;
    return (
      <MuiThemeProvider>
      <div className="col-md-12">
        <h1>Documents <Link to={'/documents/new'} className="btn btn-primary"><FloatingActionButton style={style}><ContentAdd /> Document</FloatingActionButton></Link></h1>
        <div className="col-md-4">
          <DocumentList documents={documents} />
        </div>
        <div className="col-md-8">
          {this.props.children}
        </div>
      </div>
      </MuiThemeProvider>
    );
  }
}

DocumentsPage.propTypes = {
  documents: PropTypes.array.isRequired,
  children: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  if (state.documents.length > 0) {
    return {
      documents: state.documents
    };
  } else {
    return {
      documents: [{ id: '', title: '', content: '', access: '' }]
    };
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(loadDocuments, dispatch) };
}

export default connect(mapStateToProps, { loadDocuments })(DocumentsPage);




