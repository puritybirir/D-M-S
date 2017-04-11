import Paper from 'material-ui/Paper';
import { Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createUser } from '../../../actions/authActions';

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.createUser(this.state).then(
      () => {
        this.context.router.push('/');
      }
    );
  }
  render() {
    const style = {
      height: 600,
      width: 600,
      margin: 20,
      textAlign: 'center',
      display: 'inline-block',
    };
    const button = {
      backgroundColor: '#0db9f2',
      width: 100,
      color: 'white'
    };
    return (
      <MuiThemeProvider>
        <div style={{ marginLeft: 600, marginTop: 20 }}>
          <Paper style={style} zDepth={1} >
            <form onSubmit={this.onSubmit} >
              <div className="field-line">
                <TextField
                  floatingLabelText="User Name"
                  onChange={this.onChange}
                  type="text"
                  name="userName"
                  className="field-line"
                  value={this.state.userName}
                />
                <br />
                <TextField
                  floatingLabelText="First Name"
                  onChange={this.onChange}
                  type="text"
                  name="firstName"
                  className="field-line"
                  value={this.state.firstName}
                />
                <br />
                <TextField
                  floatingLabelText="Last Name"
                  onChange={this.onChange}
                  type="text"
                  name="lastName"
                  className="field-line"
                  value={this.state.lastName}
                />
                <br />
                <TextField
                  floatingLabelText="Email"
                  onChange={this.onChange}
                  type="email"
                  name="email"
                  className="field-line"
                  value={this.state.email}
                />
                <br />
                <TextField
                  floatingLabelText="Password"
                  onChange={this.onChange}
                  type="password"
                  name="password"
                  className="field-line"
                  value={this.state.password}
                />
                <br />
                <TextField
                  floatingLabelText="Password Confirmation"
                  onChange={this.onChange}
                  type="password"
                  name="passwordConfirmation"
                  className="field-line"
                  value={this.state.passwordConfirmation}
                />
              </div>
              <br /> <br />
              <div className="form-group">
                <button className="btn btn-primary btn-lg" style={button}>
                  Sign Up
          </button>
                <br /><br />
                Have an account?<Link to="/login" style={{ color: 'blue' }}>Log In</Link>
              </div>
            </form>
          </Paper>
        </div>
      </MuiThemeProvider>
    );
  }
}

SignUpForm.propTypes = {
  createUser: PropTypes.func.isRequired
};

SignUpForm.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(null, { createUser })(SignUpForm);

