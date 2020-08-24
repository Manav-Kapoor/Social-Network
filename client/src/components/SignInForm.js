import React from 'react';
import {reduxForm, Field} from 'redux-form';
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import {signIn} from '../actions';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import '../views/style.css';

const MyButton = styled(Button)({
  float: 'right',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    padding: '10px 30px',
    margin: '1rem 0'
})
const validate = values => {
  const errors = {}
  const requiredFields = [
    'email',
    'password'
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address'
  }
  return errors
}
const renderTextField = ({
    label,
    input,
    type,
    meta: { touched, invalid, error },
    ...custom
  }) => (
    <TextField
      label={label}
      type={type}
      placeholder={label}
      error={touched && invalid}
      helperText={touched && error}
      autoComplete="off"
      {...input}
      {...custom}
    />
)
class SignInForm extends React.Component{
    onSubmit = (user) =>{
      this.props.signIn(user);
    }
    render(){
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <div className="sign-in-form">
                    <Field
                    className="fields"
                    name="email"
                    type="text"
                    component={renderTextField}
                    label="Email"
                    />
                    <Field
                    className="fields"
                    name="password"
                    type="password"
                    component={renderTextField}
                    label="Password"
                    />
                    {this.props.errors.error ? <Typography as="h5" component="h6" className="error-text">
                      {this.props.errors.error}
                    </Typography> : <></>}
                    <MyButton variant="contained" color="primary" type="submit" className="submit-btn">Log In</MyButton>
                </div>
            </form>
        );
    }
}

const mapStateToProps = state => {
  return{
    errors: state.errors
  }
}
const mapDispatchToProps = dispatch =>{
  return{
    signIn: (user) => dispatch(signIn(user))
  }
}

const form = reduxForm({
  form: 'SignInForm', // a unique identifier for this form
  validate,
})(SignInForm);

export default connect(mapStateToProps, mapDispatchToProps)(form);