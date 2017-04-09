import { Link } from 'react-router';
import React, { PropTypes } from 'react';
import DocumentListItem from './DocumentListItem';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const DocumentList = (props) => {
  const style = {
    height: 400,
    width: 400,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
  };

  return (
    <MuiThemeProvider>
    <ol className="list-group">
      {props.documents.map(document =>
      <Paper style={style} zDepth={1}>
          <li className="list-group-item" key={document.id}> <b>{document.title}</b> <br /> <br /> {document.content}</li>
      </Paper>
      )}
    </ol>

    </MuiThemeProvider>
  );
};

DocumentList.propTypes = {
  documents: PropTypes.array.isRequired
};

export default DocumentList;
