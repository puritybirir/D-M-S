import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import DocumentPage from './DocumentPage';

const DocumentListItem = ({document}) => {
  return (
    <li className="list-group-item"><Link to={'/documents/' + document.id}>{document.name}</Link></li>
  );
};

DocumentListItem.propTypes = {
  document: PropTypes.object.isRequired
};

export default DocumentListItem;
