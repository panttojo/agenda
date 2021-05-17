import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import userActions from '../../store/auth/actions';

export let Logout = props => {

    useEffect(() => {
        props.logoutUser(props.history);
    }, [props])


    return <React.Fragment></React.Fragment>;

}

Logout = withRouter(connect(null, {
    logoutUser: userActions.logoutRequest
})(Logout));
