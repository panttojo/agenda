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
    FormFeedback,
    FormText,
} from "reactstrap"
import Select from "react-select"

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
        auth,
        users,
    } = props

    const err = getErrors(props.errors)
    const totalErrors = Object.keys(errors).length + err.totalErrors

    const [user, setUser] = useState(null)


    useEffect(() => {
        getAllUsers()
    }, [getAllUsers])

    useEffect(() => {
        const payload = { ...data }
        if (_.get(data, "user", false)) {
            payload["user"] = _.get(data, "id", null)
            setUser({
                id: _.get(data, "id", null),
                label: `${_.get(data.user, "username")} ${_.get(data.user, "full_name")}`,
            })
        }
        reset(payload)
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

            {_.get(auth.data, "is_superuser") &&
                <Row>
                    <Col>
                        <FormGroup>
                            <Label htmlFor="user">Vendedor <span className="text-danger">*</span></Label>
                            <Input
                                style={{ display: "none" }}
                                type="text"
                                name="user"
                                id="user"
                                required
                                value={_.get(user, "value", "")}
                                innerRef={register({ required: true })}
                            />
                            <Select
                                placeholder="Seleccionar..."
                                options={
                                    users.options.data.map(row => (
                                        { label: `${row.username} | ${row.full_name}`, value: row.id }
                                    ))
                                }
                                value={user}
                                isLoading={users.options.loading}
                                onChange={setUser}
                            />
                            {errors.user && errors.user.type === "required" && (
                                <FormText color="danger">
                                    Este campo es obligatorio
                                </FormText>
                            )}
                            {err.validationErrors.find(error => error.field === "user") && (
                                <FormText color="danger">
                                    {err.validationErrors.find(error => error.field === "user").message}
                                </FormText>
                            )}
                        </FormGroup>
                    </Col>
                </Row>
            }
        </Form>
    )

}

const mapStateToProps = ({ auth, users }) => {
    return {
        auth,
        users,
    }
}

EditableForm = connect(mapStateToProps, {
    getAllUsers: userActions.getAllOptionsRequest,
})(EditableForm)
