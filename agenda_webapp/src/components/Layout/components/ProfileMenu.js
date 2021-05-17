
import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from "react-redux"
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';


// users
import avatar from '../../../assets/images/profile.png';

class ProfileMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menu: false,
            username: props.data.username
        };
        this.toggle = this.toggle.bind(this);
    }


    toggle() {
        this.setState(prevState => ({
            menu: !prevState.menu
        }));
    }

    render() {

        return (
            <React.Fragment>
                {this.state.username && (
                    <Dropdown isOpen={this.state.menu} toggle={this.toggle} className="d-inline-block" >
                        <DropdownToggle className="btn header-item waves-effect" id="page-header-user-dropdown" tag="button">
                            <img className="rounded-circle header-profile-user" src={avatar} alt="Header Avatar" />
                            <span className="d-none d-xl-inline-block ml-2 mr-1">{this.state.username}</span>
                            <i className="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
                        </DropdownToggle>
                        <DropdownMenu right>
                            <Link to="/logout" className="dropdown-item">
                                <i className="bx bx-power-off font-size-16 align-middle mr-1 text-danger"></i>
                                <span>Salir</span>
                            </Link>
                        </DropdownMenu>
                    </Dropdown>
                )}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    const {
        data
    } = state.auth

    return {
        data
    }
}

export default withRouter(connect(mapStateToProps, {})(ProfileMenu));
