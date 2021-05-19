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
import activityActions from "../../store/activities/actions"
import activityTypeActions from "../../store/activity_types/actions"

// components
import Breadcrumbs from "../../components/Breadcrumb"
import { IconLoading } from '../../components/Icons'
import { ListTable, EditableForm, Filters, Calendar } from "./components"


export let CalendarView = props => {
    const {
        getAllActivityTypes,
        getAll,
        create,
        retrieve,
        update,
        destroy,
        detail,
        original,
        edit,
        list,
        options,
        remove,
        activity_types,
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
        getAllActivityTypes()
    }, [getAllActivityTypes])

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
            setShowEditModal(false)
            setShowConfirmDeleteAlert(false)
            setShowDeletedAlert(true)
            getAll(params)
        }
    }, [remove, getAll, params])

    const handleReload = props => {
        const newParams = { ...params, ...props }
        setParams(newParams)
        getAll(newParams)
    }

    const handleOnChangeFilter = props => {
        const newParams = { ...params, ...props }
        setParams(newParams)
        getAll(newParams)
    }

    const handleOnCreate = props => {
        create(props)
    }

    const handleRetrieve = id => {
        setShowEditModal(true)
        retrieve(id)
    }

    const handleOnEdit = props => {
        update(props.id, props)
    }

    const handleDestroy = item => {
        setItemToDelete(item)
        setShowConfirmDeleteAlert(true)
    }

    const handleChangeMonth = (start, end) => {
        const newParams = { ...params, ...{ schedule_at__gte: start, finish_at__lte: end, } }
        setParams(newParams)
        getAll(newParams)
    }

    return (
        <React.Fragment>
            {showCreatedAlert &&
                <SweetAlert
                    title="Actividad creada satisfactoriamente."
                    success
                    confirmBtnBsStyle="success"
                    onConfirm={() => setShowCreatedAlert(false)}
                />
            }
            {showConfirmDeleteAlert &&
                <SweetAlert
                    title={`¿Está seguro de eliminar la Actividad?`}
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
                    title="Actividad eliminada satisfactoriamente."
                    success
                    confirmBtnBsStyle="success"
                    onConfirm={() => setShowDeletedAlert(false)}
                />
            }
            {showUpdatedAlert &&
                <SweetAlert
                    title="Actividad actualizada satisfactoriamente."
                    success
                    confirmBtnBsStyle="success"
                    onConfirm={() => setShowUpdatedAlert(false)}
                />
            }
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Inicio" breadcrumbItem="Actividades" />

                    <Row>
                        <Col>
                            <Card>
                                <CardBody>
                                    <Row className="mb-4">
                                        <Col md={6}>
                                            <Filters
                                                handleOnChangeFilter={handleOnChangeFilter}
                                                activity_types={activity_types}
                                            />
                                        </Col>
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
                                            <Calendar
                                                events={options}
                                                handleChangeMonth={handleChangeMonth}
                                                handleEventClick={handleRetrieve}
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
                    <h5 className="modal-title mt-0">Agregar Actividad</h5>
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
                    <h5 className="modal-title mt-0">Editar Actividad: <strong>{_.get(detail.data, "id")}</strong></h5>
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
                        <i className="fa fa-times"></i> Cerrar
                        </Button>
                    {_.get(detail.data, "status", "") === "active" &&
                        <>
                            <Button
                                color="danger"
                                onClick={() => handleDestroy(detail.data)}
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
                        </>
                    }
                </div>
            </Modal>
        </React.Fragment>
    )
}


const mapStateToProps = ({
    activities: {
        original,
        detail,
        edit,
        list,
        options,
        remove
    },
    activity_types,
}) => {
    return {
        original,
        detail,
        edit,
        list,
        options,
        remove,
        activity_types,
    }
}

CalendarView = connect(mapStateToProps, {
    getAllActivityTypes: activityTypeActions.getAllOptionsRequest,
    getAll: activityActions.getAllOptionsRequest,
    create: activityActions.createRequest,
    retrieve: activityActions.retrieveRequest,
    update: activityActions.updateRequest,
    destroy: activityActions.destroyRequest,
})(CalendarView)
