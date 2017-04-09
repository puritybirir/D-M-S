import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

const Header = () => {
  const linkColor = {
    color: 'white',
    fontSize: 20
  };
  return (
    <nav>
      <MuiThemeProvider>
        <AppBar
          title="DMS"
        >
        <IndexLink to="/" style={linkColor}>
        Home
      </IndexLink>&nbsp;
      <Link style={linkColor}  to="/documents">Documents</Link>
        </AppBar>
      </MuiThemeProvider>
    </nav>
  );
};

export default Header;
