import React, { Component } from "react"
import _ from "lodash"
import MetisMenu from "metismenujs"
import { connect } from 'react-redux'
import { Link, withRouter } from "react-router-dom"


class SidebarContent extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {
        this.initMenu()
    }

    componentDidUpdate(prevProps) {
        if (this.props.type !== prevProps.type) {
            this.initMenu()
        }
    }

    initMenu() {
        new MetisMenu("#side-menu")

        var matchingMenuItem = null
        var ul = document.getElementById("side-menu")
        var items = ul.getElementsByTagName("a")
        for (var i = 0; i < items.length; ++i) {
            if (this.props.location.pathname === items[i].pathname) {
                matchingMenuItem = items[i]
                break
            }
        }
        if (matchingMenuItem) {
            this.activateParentDropdown(matchingMenuItem)
        }
    }

    activateParentDropdown = item => {
        item.classList.add("active")
        const parent = item.parentElement

        if (parent) {
            parent.classList.add("mm-active")
            const parent2 = parent.parentElement

            if (parent2) {
                parent2.classList.add("mm-show")

                const parent3 = parent2.parentElement

                if (parent3) {
                    parent3.classList.add("mm-active") // li
                    parent3.childNodes[0].classList.add("mm-active") //a
                    const parent4 = parent3.parentElement
                    if (parent4) {
                        parent4.classList.add("mm-active")
                    }
                }
            }
            return false
        }
        return false
    }

    render() {
        const { auth } = this.props

        return (
            <div id="sidebar-menu">
                <ul className="metismenu list-unstyled" id="side-menu">
                    <li className="menu-title">Menu</li>
                    <li>
                        <Link to="/dashboard" className="waves-effect">
                            <i className="fa fa-tachometer-alt"></i>
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/#" className="has-arrow waves-effect">
                            <i className="fa fa-list"></i>
                            <span>Catalogo</span>
                        </Link>
                        <ul className="sub-menu" aria-expanded="false">
                            {_.get(auth.data, "is_superuser", false) &&
                                <li>
                                    <Link to="/vendedores" className="waves-effect">Vendedores</Link>
                                </li>
                            }
                            <li>
                                <Link to="/tipos-de-actividad" className="waves-effect">Tipos de Actividad</Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link to="/clientes" className="waves-effect">
                            <i className="fa fa-users"></i>
                            <span>Clientes</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/#" className="has-arrow waves-effect">
                            <i className="fa fa-tasks"></i>
                            <span>Actividades</span>
                        </Link>
                        <ul className="sub-menu" aria-expanded="false">
                            <li>
                                <Link to="/tabla-de-actividades" className="waves-effect">Tabla</Link>
                            </li>
                            <li>
                                <Link to="/calendario-de-actividades" className="waves-effect">Calendario</Link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        )
    }
}

const mapStateToProps = ({ auth }) => {
    return {
        auth
    }
}

export default withRouter(connect(mapStateToProps, {})(SidebarContent));
