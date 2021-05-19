import React, { useState } from 'react';
import {
    Row,
    Col,
    ListGroup,
    ListGroupItem,
    Collapse
} from "reactstrap"


export let CollapsableBox = props => {
    const {
        children
    } = props;

    const [isOpen, setIsOpen] = useState(true);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <Row className="mb-4">
            <Col>
                <ListGroup onClick={toggle} style={{ cursor: 'pointer' }}>
                    <ListGroupItem>
                        {
                            !isOpen ?
                                <>
                                    <i className="mdi mdi-filter-plus mdi-24px" />
                                    <i className="fas fa-angle-down fa-2x float-right" />
                                </> :
                                <>
                                    <i className="mdi mdi-filter-minus mdi-24px" />
                                    <i className="fas fa-angle-up fa-2x float-right" />
                                </>
                        }
                    </ListGroupItem>
                </ListGroup>
                <Collapse isOpen={isOpen}>
                    {children}
                </Collapse>
            </Col>
        </Row>
    )
}
