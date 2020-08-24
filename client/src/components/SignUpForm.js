import React from 'react';
import {reduxForm, Field} from 'redux-form';
import TextField from '@material-ui/core/TextField'
import { Button, Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import {signUp} from '../actions';
import { connect } from 'react-redux';
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
      'name',
      'email',
      'password',
      'confirmPassword'
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
class SignUpForm extends React.Component{
    onSubmit = (user) =>{
      if(user.password !== user.confirmPassword){
        alert('Passwords do not match!');
      }else{
        delete user.confirmPassword;
        this.props.signUp(user);
      }
    }
    render(){
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <div>
                    <Field
                    className="fields"
                    name="name"
                    type="text"
                    component={renderTextField}
                    label="Name"
                    />
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
                    <Field
                    className="fields"
                    name="confirmPassword"
                    type="password"
                    component={renderTextField}
                    label="Confirm Password"
                    />
                    {this.props.errors.error ? <Typography as="h5" component="h6" className="error-text">
                      {this.props.errors.error}
                    </Typography> : <></>}
                    <MyButton variant="contained" color="primary" type="submit" className="submit-btn">Sign Up</MyButton>
                </div>
            </form>
        );
    }
}

const form = reduxForm({
  form: 'SignUpForm', // a unique identifier for this form
  validate
  // asyncValidate
})(SignUpForm);

const mapStateToProps = state => {
  return{
    errors: state.errors
  }
}

const mapDispatchToProps = dispatch => {
  return{
    signUp: (user) => {dispatch(signUp(user))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(form);