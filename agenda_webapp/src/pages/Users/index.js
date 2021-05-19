import React, { useEffect, useState } from "react"
import _ from "lodash"
import { connect } from "react-redux"
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    Button,
    Modal,
} from "reactstrap"
import SweetAlert from "react-bootstrap-sweetalert"

// actions
import userActions from "../../store/users/actions"

// components
import Breadcrumbs from "../../components/Breadcrumb"
import { IconLoading } from '../../components/Icons'
import { ListTable, EditableForm } from "./components"


let Users = props => {
    const {
        getAll,
        create,
        retrieve,
        update,
        destroy,
        detail,
        original,
        edit,
        list,
        remove,
    } = props

    const [params, setParams] = useState({})

    const [showAddModal, setShowAddModal] = useState(false)
    const [showCreatedAlert, setShowCreatedAlert] = useState(false)

    const [showEditModal, setShowEditModal] = useState(false)
    const [showUpdatedAlert, setShowUpdatedAlert] = useState(false)

    const [itemDelete, setItemToDelete] = useState({})
    const [showConfirmDeleteAlert, setShowConfirmDeleteAlert] = useState(false)
    const [showDeletedAlert, setShowDeletedAlert] = useState(false)

    useEffect(() => {
        if (original.success) {
            getAll(params)
            setShowCreatedAlert(true)
            setShowAddModal(false)
        }
    }, [original.success, getAll, params])

    useEffect(() => {
        if (edit.success) {
            setShowEditModal(false)
            setShowUpdatedAlert(true)
            getAll(params)
        }
    }, [edit, getAll, params])

    useEffect(() => {
        if (remove.success) {
            setShowConfirmDeleteAlert(false)
            setShowDeletedAlert(true)
            getAll(params)
        }
    }, [remove, getAll, params])

    const handleReload = props => {
        setParams(props)
        getAll(props)
    }

    const handleOnCreate = props => {
        create(props)
    }

    const handleRetrieve = id => {
        setShowEditModal(true)
        retrieve(id)
    }

    const handleOnEdit = props => {
        delete props["password_confirm"]
        const password = _.get(props, "password", false)
        const payload = { ...props }

        if (!password) {
            delete payload["password"]
        }

        update(props.id, payload)
    }

    const handleDestroy = item => {
        setItemToDelete(item)
        setShowConfirmDeleteAlert(true)
    }

    return (
        <React.Fragment>
            {showCreatedAlert &&
                <SweetAlert
                    title="Vendedor creado satisfactoriamente."
                    success
                    confirmBtnBsStyle="success"
                    onConfirm={() => setShowCreatedAlert(false)}
                />
            }
            {showConfirmDeleteAlert &&
                <SweetAlert
                    title={`¿Está seguro de eliminar el Vendedor: ${itemDelete.full_name}?`}
                    warning
                    showCancel
                    confirmBtnBsStyle="success"
                    cancelBtnBsStyle="danger"
                    confirmBtnText="Aceptar"
                    cancelBtnText="Cancelar"
                    onConfirm={() => destroy(itemDelete.id)}
                    onCancel={() => setShowConfirmDeleteAlert(false)}
                />
            }
            {showDeletedAlert &&
                <SweetAlert
                    title="Vendedor eliminado satisfactoriamente."
                    success
                    confirmBtnBsStyle="success"
                    onConfirm={() => setShowDeletedAlert(false)}
                />
            }
            {showUpdatedAlert &&
                <SweetAlert
                    title="Vendedor actualizado satisfactoriamente."
                    success
                    confirmBtnBsStyle="success"
                    onConfirm={() => setShowUpdatedAlert(false)}
                />
            }
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Inicio" breadcrumbItem="Vendedores" />

                    <Row>
                        <Col>
                            <Card>
                                <CardBody>
                                    <Row className="mb-4">
                                        <Col className="text-right">
                                            <Button
                                                color="success"
                                                onClick={() => {
                                                    setShowAddModal(true)
                                                }}
                                            >
                                                <i className="fa fa-plus" /> Nuevo
                                            </Button>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <ListTable
                                                list={list}
                                                detail={detail}
                                                remove={remove}
                                                handleReload={handleReload}
                                                handleRetrieve={handleRetrieve}
                                                handleDestroy={handleDestroy}
                                            />
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Add */}
            <Modal
                isOpen={showAddModal}
                toggle={() => setShowAddModal(!showAddModal)}
                size="lg"
            >
                <div className="modal-header">
                    <h5 className="modal-title mt-0">Agregar Vendedor</h5>
                    <button
                        type="button"
                        onClick={() => setShowAddModal(false)}
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <EditableForm
                        errors={original.errors}
                        handleOnSubmit={handleOnCreate}
                    />
                </div>
                <div className="modal-footer">
                    <Button
                        color="danger"
                        onClick={() => setShowAddModal(false)}
                    >
                        <i className="fa fa-ban"></i> Cancelar
                        </Button>
                    <Button
                        form="user_form"
                        color="success"
                        disabled={original.loading}
                    >
                        {original.loading ? <IconLoading /> : <i className="fa fa-save"></i>} Guardar
                    </Button>
                </div>
            </Modal>

            {/* Edit */}
            <Modal
                isOpen={showEditModal}
                toggle={() => setShowEditModal(!showEditModal)}
                size="lg"
            >
                <div className="modal-header">
                    <h5 className="modal-title mt-0">Editar Vendedor: <strong>{_.get(detail.data, "username")}</strong></h5>
                    <button
                        type="button"
                        onClick={() => setShowEditModal(false)}
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <EditableForm
                        data={detail.data}
                        errors={edit.errors}
                        handleOnSubmit={handleOnEdit}
                    />
                </div>
                <div className="modal-footer">
                    <Button
                        color="danger"
                        onClick={() => setShowEditModal(false)}
                    >
                        <i className="fa fa-ban"></i> Cancelar
                    </Button>
                    <Button
                        form="user_form"
                        color="success"
                        disabled={edit.loading}
                    >
                        {edit.loading ? <IconLoading /> : <i className="fa fa-save"></i>} Guardar
                    </Button>
                </div>
            </Modal>
        </React.Fragment>
    )
}


const mapStateToProps = ({
    users: {
        original,
        detail,
        edit,
        list,
        remove
    }
}) => {
    return {
        original,
        detail,
        edit,
        list,
        remove,
    }
}

export default Users = connect(mapStateToProps, {
    getAll: userActions.getAllRequest,
    create: userActions.createRequest,
    retrieve: userActions.retrieveRequest,
    update: userActions.updateRequest,
    destroy: userActions.destroyRequest,
})(Users)
