import Paper from 'material-ui/Paper';
import { Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../../actions/authActions';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.loginUser(this.state).then(
      () => {
        this.context.router.push('/documents');
      }
    );
  }
  render() {
    const style = {
      height: 400,
      width: 400,
      margin: 20,
      textAlign: 'center',
      display: 'inline-block',
    };
    const button = {
      backgroundColor: '#0db9f2',
      width: 100,
      color: 'white'
    }
    return (
      <MuiThemeProvider>
        <div style={{ marginLeft: 600, marginTop: 20 }}>
          <Paper style={style} zDepth={1} >
            <form onSubmit={this.onSubmit} >
              <div className="field-line">
                <TextField
                  floatingLabelText="Email"
                  value={this.state.email}
                  onChange={this.onChange}
                  type="email"
                  name="email"
                  className="field-line"
                />
                <br />
                <TextField
                  floatingLabelText="Password"
                  value={this.state.password}
                  onChange={this.onChange}
                  type="password"
                  name="password"
                  className="field-line"
                />
              </div>
              <br /> <br />
              <div className="form-group">
                <button className="btn btn-primary btn-lg" style={button}>
                  Log In
          </button>
                <br /><br />
                Don't have an account?<Link to="/signup" style={{ color: 'blue' }}>Signup</Link>
              </div>
            </form>
          </Paper>
        </div>
      </MuiThemeProvider>
    );
  }
}

LoginForm.propTypes = {
  loginUser: PropTypes.func.isRequired
};

LoginForm.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(null, { loginUser })(LoginForm);
