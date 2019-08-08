import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../util/MyButton';

import { connect } from 'react-redux';
import { editUserDetails} from "../redux/actions/userActions";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import TextFiled from '@material-ui/core/TextField';


const styles = {
    button : {
        float : 'right'
    }
};

class EditDetails extends Component{
    state = {
        bio : '',
        website : '',
        location : '',
        open : false
    };
    handleOpen  = () =>{
        this.setState({open : true});
        this.mapUserDetailsToState(this.props.credentials);
    };
    handleClose = () =>{
        this.setState({open :false})
    };
    handleSubmit = () =>{
        const userDetails = {
            bio : this.state.bio,
            website : this.state.website,
            location : this.state.location
        }
        this.props.editUserDetails(userDetails);
        this.handleClose();
    };
    handleChange = (event) =>{
        this.setState({
            [event.target.name] : event.target.value
        })
    };
    componentDidMount() {
        const { credentials } = this.props;
        this.mapUserDetailsToState(credentials)
    }
    mapUserDetailsToState = (credentials) =>{
        this.setState({
            bio : credentials.bio ? credentials.bio : '',
            website : credentials.website ? credentials.website : '',
            location : credentials.location ? credentials.location : '',
        })
    };
    render(){
        const {classes} = this.props;
        return(
            <Fragment>
                <MyButton tip="Edit Details" onClick={this.handleOpen} btnClassName={classes.button} >
                    <EditIcon color="primary"/>
                </MyButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm">
                    <DialogTitle>Edit Your Details</DialogTitle>
                    <DialogContent>
                        <form>
                            <TextFiled
                                name="bio"
                                type="text"
                                label="Bio"
                                multiline
                                rows="3"
                                placeholder="A short Bio About yourselft"
                                className={classes.textField}
                                value={this.state.bio}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <TextFiled
                                name="website"
                                type="text"
                                label="Website"
                                multiline
                                rows="3"
                                placeholder="Your Personal/Professional Webiste"
                                className={classes.textField}
                                value={this.state.website}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <TextFiled
                                name="location"
                                type="text"
                                label="Location"
                                multiline
                                rows="3"
                                placeholder="Where you live"
                                className={classes.textField}
                                value={this.state.location}
                                onChange={this.handleChange}
                                fullWidth
                            />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">Cancel</Button>
                        <Button onClick={this.handleSubmit} color="primary">Save</Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) =>({
    credentials : state.user.credentials
});

EditDetails.prototypes = {
    editUserDetails : PropTypes.func.isRequired,
    classes : PropTypes.object.isRequired

};

export default connect(mapStateToProps, {editUserDetails})(withStyles(styles)(EditDetails));