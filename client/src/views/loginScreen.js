import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import mytheme from '../theme';
import './style.css';
import Form from '../components/Form';
import logo from '../images/logo.png';

class LoginScreen extends React.Component{
    render(){
        return(
            <ThemeProvider theme={mytheme}>
                <div className="outer">
                    <div className="form">
                        <img src={logo} className="logo" alt="..."/>
                        <Form />
                    </div>
                </div>
            </ThemeProvider>
        )
    }
}
export default LoginScreen;