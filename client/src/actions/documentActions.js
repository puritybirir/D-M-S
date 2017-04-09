import documentApi from '../api/documentApi';

export function loadDocumentsSuccess(documents) {
  return { type: 'LOAD_DOCUMENTS_SUCCESS', documents };
}

export function loadDocuments() {
  return function (dispatch) {
    return documentApi.getAllDocuments().then((documents) => {
      dispatch(loadDocumentsSuccess(documents));
    }).catch((error) => {
      throw (error);
    });
  };
}

export function createDocumentSuccess(document) {
  return { type: 'CREATE_DOCUMENT_SUCCESS', document };
}

export function createDocument(document) {
  return function (dispatch) {
    return documentApi.createDocument(document).then((responseDocument) => {
      console.log(responseDocument, 'response');
      dispatch(createDocumentSuccess(responseDocument));
    }).catch((error) => { throw (error); });
  };
}
