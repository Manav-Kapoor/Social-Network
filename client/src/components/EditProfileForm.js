import React from 'react';
import Button from '@material-ui/core/Button';
import {reduxForm, Field} from 'redux-form';
import {connect} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import '../views/style.css';
import {changePassword} from '../actions';

class EditProfileForm extends React.Component{

  renderTextField = ({
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

    onSubmit = (data) =>{
      if((data.password && !data.confirmPassword) || (!data.password && data.confirmPassword)){
        alert('Fill both!');
      }
      const pass = data;
      delete pass.confirmPassword;
      this.props.changePassword(this.props.user.token, pass);
    }
  render(){
    return (
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
            <div>
                <Field
                    className="fields"
                    name="password"
                    type="password"
                    component={this.renderTextField}
                    label="Password"
                />
                <Field
                    className="fields"
                    name="confirmPassword"
                    type="password"
                    component={this.renderTextField}
                    label="Confirm Password"
                />
                <Button variant="contained" color="primary" type="submit" className="edit-btn">Save Changes</Button>
            </div>
        </form>
      );
  }
}


const mapStateToProps = state =>{
    return{
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
  return {
      changePassword: (token, pass) => {dispatch(changePassword(token, pass))}
  }
}

const form = reduxForm({
    form: 'EditProfileForm', // a unique identifier for this form
    // validate,
    // asyncValidate
})(EditProfileForm);

export default connect(mapStateToProps, mapDispatchToProps)(form);