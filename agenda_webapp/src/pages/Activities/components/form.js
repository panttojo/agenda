import React, { useEffect, useState } from "react"
import _ from "lodash"
import { connect } from "react-redux"
import { useForm } from "react-hook-form"
import {
    Alert,
    Row,
    Col,
    Form,
    Label,
    Input,
    FormGroup,
    FormText,
    InputGroup,
    FormFeedback,
} from "reactstrap"
import DatePicker from "react-datepicker"
import Select from "react-select"
import moment from "moment"


// utils
import { getErrors } from "../../../helpers/utils"

// actions
import customerActions from "../../../store/customers/actions"
import userActions from "../../../store/users/actions"
import activityActions from "../../../store/activities/actions"


export let EditableForm = props => {
    const { register, handleSubmit, errors, reset } = useForm()
    const {
        cleanErrors,
        data,
        handleOnSubmit,
        getAllCustomers,
        getAllSellers,
        activity_types,
        customers,
        users,
        auth,
    } = props

    const err = getErrors(props.errors)
    const totalErrors = Object.keys(errors).length + err.totalErrors

    const [scheduleAt, setScheduleAt] = useState(null)
    const [activityType, setActivityType] = useState(null)
    const [customer, setCustomer] = useState(null)
    const [seller, setSeller] = useState(null)

    useEffect(() => {
        const payload = {
            ...data,
        }

        if (_.get(data, "id", false)) {
            setScheduleAt(moment(data.schedule_at).toDate())
            setActivityType({
                label: _.get(data.type, "description"),
                value: _.get(data.type, "id")
            })
            setCustomer({
                label: _.get(data.customer, "name"),
                value: _.get(data.customer, "id")
            })
            setSeller({
                label: `${_.get(data.seller, "username")} | ${_.get(data.seller, "full_name")}`,
                value: _.get(data.seller, "id")
            })

            payload["type"] = _.get(data.type, "id")
            payload["customer"] = _.get(data.customer, "id")
            payload["seller"] = _.get(data.seller, "id")
        }

        reset(payload)
    }, [reset, data])

    useEffect(() => {
        cleanErrors([])

        if (_.get(auth.data, "is_superuser", false)) {
            getAllSellers()
        } else {
            getAllCustomers()
        }
    }, [getAllSellers, cleanErrors])

    const handleSubmitData = data => {
        const payload = {
            ...data,
            schedule_at: scheduleAt
        }
        handleOnSubmit(payload)
    }

    const handleOnChangeSeller = props => {
        setSeller(props)
        setCustomer(null)
        getAllCustomers({ seller: _.get(props, "value") })
    }


    return (
        <Form
            id="user_form"
            className={"form-horizontal m-t-30 needs-validation" + (totalErrors && " was-validated")}
            onSubmit={handleSubmit(handleSubmitData)}
            noValidate
        >
            {err.validationErrors ?
                err.validationErrors.filter(e => e.field === undefined).map((error, key) =>
                    <Alert key={key} color="danger">
                        {error.message}
                    </Alert>
                ) : null
            }
            <Input type="hidden" name="id" innerRef={register} />

            <Row>
                <Col>
                    <FormGroup>
                        <Label htmlFor="schedule_at">Programado a las <span className="text-danger">*</span></Label>
                        <InputGroup>
                            <DatePicker
                                className="form-control"
                                innerRef={register({ required: true })}
                                onChange={setScheduleAt}
                                timeIntervals={15}
                                showTimeSelect
                                selectsStart
                                locale="es"
                                dateFormat="d MMMM, yyyy h:mm aa"
                                selected={scheduleAt}
                                minDate={new Date()}
                            />
                        </InputGroup>
                        {errors.schedule_at && errors.schedule_at.type === "required" && (
                            <FormText color="danger">
                                Este campo es obligatorio
                            </FormText>
                        )}
                        {err.validationErrors.find(error => error.field === "schedule_at") && (
                            <FormText color="danger">
                                {err.validationErrors.find(error => error.field === "schedule_at").message}
                            </FormText>
                        )}
                    </FormGroup>
                </Col>
                <Col>
                    <FormGroup>
                        <Label htmlFor="type">Tipo <span className="text-danger">*</span></Label>
                        <Input
                            style={{ display: "none" }}
                            id="type"
                            name="type"
                            required
                            value={_.get(activityType, "value", "")}
                            innerRef={register({ required: true })}
                        />
                        <Select
                            placeholder="Seleccionar..."
                            options={
                                activity_types.options.data.map(row => (
                                    { label: `${row.name}  |  ${row.value} minutos`, value: row.id }
                                ))
                            }
                            className="basic-multi-select"
                            classNamePrefix="select"
                            value={activityType}
                            isLoading={activity_types.options.loading}
                            onChange={setActivityType}
                        />
                        {errors.type && errors.type.type === "required" && (
                            <FormFeedback>Este campo es obligatorio</FormFeedback>
                        )}
                        {err.validationErrors.find(error => error.field === "type") && (
                            <FormText color="danger">
                                {err.validationErrors.find(error => error.field === "type").message}
                            </FormText>
                        )}
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                {_.get(auth.data, "is_superuser") &&
                    <Col>

                        <FormGroup>
                            <Label htmlFor="seller">Vendedor <span className="text-danger">*</span></Label>
                            <Input
                                style={{ display: "none" }}
                                id="seller"
                                name="seller"
                                required
                                value={_.get(seller, "value", "")}
                                innerRef={register({ required: true })}
                            />
                            <Select
                                placeholder="Seleccionar..."
                                options={
                                    users.options.data.map(row => (
                                        { label: `${row.username} | ${row.full_name}`, value: row.id }
                                    ))
                                }
                                value={seller}
                                isLoading={users.options.loading}
                                onChange={handleOnChangeSeller}
                            />
                            {errors.seller && errors.seller.type === "required" && (
                                <FormFeedback>Este campo es obligatorio</FormFeedback>
                            )}
                            {err.validationErrors.find(error => error.field === "seller") && (
                                <FormText color="danger">
                                    {err.validationErrors.find(error => error.field === "seller").message}
                                </FormText>
                            )}
                        </FormGroup>
                    </Col>
                }
                <Col>
                    <FormGroup>
                        <Label htmlFor="customer">Cliente <span className="text-danger">*</span></Label>
                        <Input
                            style={{ display: "none" }}
                            id="customer"
                            name="customer"
                            required
                            value={_.get(customer, "value", "")}
                            innerRef={register({ required: true })}
                        />
                        <Select
                            placeholder="Seleccionar..."
                            options={
                                customers.options.data.map(row => (
                                    { label: row.name, value: row.id }
                                ))
                            }
                            value={customer}
                            isLoading={customers.options.loading}
                            onChange={setCustomer}
                        />
                        {errors.customer && errors.customer.type === "required" && (
                            <FormFeedback>Este campo es obligatorio</FormFeedback>
                        )}
                        {err.validationErrors.find(error => error.field === "customer") && (
                            <FormText color="danger">
                                {err.validationErrors.find(error => error.field === "customer").message}
                            </FormText>
                        )}
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <FormGroup>
                        <Label htmlFor="notes">Notas <span className="text-danger">*</span></Label>
                        <Input
                            id="notes"
                            name="notes"
                            type="textarea"
                            innerRef={register}
                        />
                        {errors.notes && errors.notes.type === "required" && (
                            <FormFeedback>Este campo es obligatorio</FormFeedback>
                        )}
                        {err.validationErrors.find(error => error.field === "notes") && (
                            <FormText color="danger">
                                {err.validationErrors.find(error => error.field === "notes").message}
                            </FormText>
                        )}
                    </FormGroup>
                </Col>
            </Row>
        </Form>
    )

}

const mapStateToProps = ({ activity_types, customers, users, auth }) => {
    return {
        activity_types,
        customers,
        users,
        auth,
    }
}

EditableForm = connect(mapStateToProps, {
    getAllCustomers: customerActions.getAllOptionsRequest,
    getAllSellers: userActions.getAllOptionsRequest,
    cleanErrors: activityActions.createErrors,
})(EditableForm)
