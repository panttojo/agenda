import React from "react"
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    Media,
} from "reactstrap"
import { Link } from "react-router-dom"

// components
import Breadcrumbs from "../../components/Breadcrumb"


const Dashboard = props => {
    return (
        <React.Fragment>
            <div className="page-content">
                <Container>
                    <Breadcrumbs title="Inicio" breadcrumbItem="Dashboard" />
                </Container>
            </div>
        </React.Fragment>
    )
}

export default Dashboard
