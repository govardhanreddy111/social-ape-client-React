import React, {Component} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import AppIcon from '../images/icon.png';
import {Link} from 'react-router-dom'

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { connect }  from 'react-redux';
import {signUpUser} from "../redux/actions/userActions";

const styles = {
    form :{
        textAlign : 'center'
    },
    image :{
        margin :'20px auto'
    },
    pageTitle : {
        margin :'10px auto'
    },
    textField : {
        margin : '10px auto'
    },
    button : {
        marginTop : 20,
        position : 'relative'
    },
    customError : {
        color : 'red',
        fontSize : '0.8rem',
        marginTop: 10
    },
    progress : {
        position: 'absolute'
    }
};


class Signup extends Component{
    constructor(){
        super();
        this.state = {
            email : '',
            password : '',
            confirmPassword :  '',
            handle: '',
            errors : {}
        }
    }
    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.UI.errors) {
            this.setState({
                errors: nextProps.UI.errors
            })
        }
    }
    handleSubmit = (event) =>{
        event.preventDefault();
        this.setState({
            loading : true
        });
        const newUserData = {
            email : this.state.email,
            password  :this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle : this.state.handle
        };
        this.props.signUpUser(newUserData, this.props.history);
    };
    handleChange = (event) =>{
        this.setState({
            [event.target.name] : event.target.value
        })
    };
    render() {
        const { classes, UI : {loading} } = this.props;
        const { errors } = this.state;
        return(
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm >
                    <img src={AppIcon} alt="Monkey" className={classes.image} />
                    <Typography variant="h2" className={classes.pageTitle}>Sign Up
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField
                            id="email"
                            name="email"
                            label="Email"
                            className={classes.textField}
                            helperText={errors.email}
                            error={!!errors.email}
                            value={this.state.email}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            className={classes.textField}
                            helperText={errors.password}
                            error={!!errors.password}
                            value={this.state.password}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            id="confirmPassword"
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            className={classes.textField}
                            helperText={errors.confirmPassword}
                            error={!!errors.confirmPassword}
                            value={this.state.confirmPassword}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            id="handle"
                            name="handle"
                            label="Handle"
                            className={classes.textField}
                            helperText={errors.handle}
                            error={!!errors.handle}
                            value={this.state.handle}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            disabled={loading}
                        >Sign Up {loading && <CircularProgress size={30} className={classes.progress}/>}
                        </Button><br/>
                        <small>Already have an account ? login <Link to="/login">here</Link></small>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        )
    }
}

Signup.propTypes = {
    classes : PropTypes.object.isRequired,
    user : PropTypes.object.isRequired,
    UI : PropTypes.object.isRequired,
    signUpUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    user : state.user,
    UI : state.UI
});

export default connect(mapStateToProps,{ signUpUser })(withStyles(styles)(Signup));