import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import DocumentsPage from './components/Documents/DocumentsPage';
import DocumentPage from './components/Documents/DocumentPage';
import NewDocumentPage from './components/Documents/NewDocumentPage';
import SignUpPage from './components/Auth/SignUp/SignUpPage';
import LoginPage from './components/Auth/Login/LoginPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/signup" component={SignUpPage} />
    <Route path="/login" component={LoginPage} />
    <Route path="/documents" component={DocumentsPage} >
      <Route path="/documents/new" component={NewDocumentPage} />
      <Route path="/documents/:id" component={DocumentPage} />
    </Route>
  </Route>
);
