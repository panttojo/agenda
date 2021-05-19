import React, { useEffect } from "react"
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
} from "reactstrap"

// utils
import { getErrors } from "../../../helpers/utils"

// actions
import userActions from "../../../store/users/actions"


export let EditableForm = props => {
    const { register, handleSubmit, errors, reset } = useForm()
    const {
        getAllUsers,
        data,
        handleOnSubmit,
    } = props

    const err = getErrors(props.errors)
    const totalErrors = Object.keys(errors).length + err.totalErrors

    useEffect(() => {
        getAllUsers()
    }, [getAllUsers])

    useEffect(() => {
        reset(data)
    }, [reset, data])


    return (
        <Form
            id="user_form"
            className={"form-horizontal m-t-30 needs-validation" + (totalErrors && " was-validated")}
            onSubmit={handleSubmit(handleOnSubmit)}
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
                        <Label htmlFor="name">Nombre <span className="text-danger">*</span></Label>
                        <Input
                            type="text"
                            name="name"
                            id="name"
                            required
                            innerRef={register({ required: true })}
                        />
                        {errors.name && errors.name.type === "required" && (
                            <FormText color="danger">
                                Este campo es obligatorio
                            </FormText>
                        )}
                        {err.validationErrors.find(error => error.field === "name") && (
                            <FormText color="danger">
                                {err.validationErrors.find(error => error.field === "name").message}
                            </FormText>
                        )}
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <FormGroup>
                        <Label htmlFor="value">Valor en minutos <span className="text-danger">*</span></Label>
                        <Input
                            type="number"
                            name="value"
                            id="value"
                            min={1}
                            required
                            innerRef={register({ required: true })}
                        />
                        {errors.value && errors.value.type === "required" && (
                            <FormText color="danger">
                                Este campo es obligatorio
                            </FormText>
                        )}
                        {err.validationErrors.find(error => error.field === "value") && (
                            <FormText color="danger">
                                {err.validationErrors.find(error => error.field === "value").message}
                            </FormText>
                        )}
                    </FormGroup>
                </Col>
            </Row>
        </Form>
    )

}

EditableForm = connect(null, {
    getAllUsers: userActions.getAllOptionsRequest,
})(EditableForm)
