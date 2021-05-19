import React, { useState, useEffect } from "react"
import _ from "lodash"

import {
    Row,
    Col,
    InputGroup,
    FormGroup,
    Label,
} from "reactstrap"
import Select from "react-select"
import DatePicker from "react-datepicker"

// components
import { CollapsableBox } from "../../../components/Collapsable"


export let Filters = props => {
    const {
        activity_types,
        handleOnChangeFilter
    } = props

    const [type, setType] = useState(null)
    const [startAt, setStartAt] = useState(null)
    const [endAt, setEndAt] = useState(null)

    useEffect(() => {
        handleOnChangeFilter({
            type: _.get(type, "value", ""),
            schedule_at__gte: startAt,
            // schedule_at__lte: endAt,
            // finish_at__gte: startAt,
            finish_at__lte: endAt,
        })
    }, [type, startAt, endAt])

    return (
        <CollapsableBox>
            <Row className="mt-4">
                <Col>
                    <FormGroup>
                        <Label htmlFor="start_at">Inicio</Label>
                        <InputGroup>
                            <DatePicker
                                className="form-control"
                                onChange={setStartAt}
                                timeIntervals={15}
                                showTimeSelect
                                selectsStart
                                locale="es"
                                dateFormat="d MMMM, yyyy h:mm aa"
                                selected={startAt}
                                maxDate={endAt}
                            />
                        </InputGroup>
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Label htmlFor="end_at">Fin</Label>
                        <InputGroup>
                            <DatePicker
                                className="form-control"
                                onChange={setEndAt}
                                timeIntervals={15}
                                showTimeSelect
                                selectsStart
                                selectsEnd
                                locale="es"
                                dateFormat="d MMMM, yyyy h:mm aa"
                                selected={endAt}
                                startDate={startAt}
                                minDate={startAt}
                            />
                        </InputGroup>
                    </FormGroup>
                </Col>
                <Col>
                    <Label htmlFor="type">Tipo</Label>
                    <Select
                        isClearable
                        placeholder="Seleccionar..."
                        options={
                            activity_types.options.data.map(row => (
                                { label: row.description, value: row.id }
                            ))
                        }
                        isLoading={activity_types.options.loading}
                        value={type}
                        onChange={props => setType(props ? props : null)}
                    />
                </Col>
            </Row>
        </CollapsableBox>
    )
}
