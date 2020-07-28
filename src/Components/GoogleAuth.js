import React, { Component } from 'react'
import { signIn, signOut } from '../actions'
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";

 class GoogleAuth extends Component {       


    componentDidMount(){
        window.gapi.load('client:auth2', ()=> {
            window.gapi.client.init({
                clientId:  '797979677425-nnv3sfhg1fk3s48cmpdke2giud4kqg78.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = isSignedIn => {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    }

    onSignInClick = () => {
        this.auth.signIn();
    }

    onSignOutClick = () => {
        this.auth.signOut();
    }

    renderAuthButton () {
        if (this.props.isSignedIn === null) {
            return <div>
                I dont know if signed in
            </div>
        } else if (this.props.isSignedIn) {
            return <div>
                <Button onClick ={this.onSignOutClick}>
                    Sign out
                </Button>
            </div>
        } else {
            return (
                <Button onClick={this.onSignInClick}>
                    Sign in 
                </Button>
            )
        }
    }

    render() {
        return (
            <div>
                {this.renderAuthButton()}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { isSignedIn: state.auth.isSignedIn };
}

export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth)