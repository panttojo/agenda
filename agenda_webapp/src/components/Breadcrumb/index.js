import React from 'react'
import { Link } from "react-router-dom"
import { Row, Col, Breadcrumb, BreadcrumbItem } from "reactstrap"


const Breadcrumbs = props => (
    <Row>
        <Col xs="12">
            <div className="page-title-box d-flex align-items-center justify-content-between">
                <h4 className="mb-0 font-size-18">{props.breadcrumbItem}</h4>
                <div className="page-title-right">
                    <Breadcrumb listClassName="m-0">
                        <BreadcrumbItem>
                            <Link to="/">{props.title}</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                            <Link to="#">{props.breadcrumbItem}</Link>
                        </BreadcrumbItem>
                    </Breadcrumb>
                </div>
            </div>
        </Col>
    </Row>
)

export default Breadcrumbs
