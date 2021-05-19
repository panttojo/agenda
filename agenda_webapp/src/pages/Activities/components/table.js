import React from "react"
import _ from "lodash"
import { connect } from "react-redux"
import {
    Row,
    Col,
    Alert,
} from "reactstrap"
import Moment from "react-moment"

// utils
import { getErrors } from "../../../helpers/utils"
import { DATE_TIME_FMT } from "../../../helpers/dates"

// components
import { EditButton, CancelSButton } from "../../../components/Buttons"
import { CDataTable } from "../../../components/CDataTable"


export let ListTable = props => {

    const {
        handleRetrieve,
        handleDestroy,
        handleReload,
        list,
        detail,
        remove,
        auth,
    } = props

    const err = getErrors(list.errors)

    let header = [
        {
            title: "Cliente",
            prop: "customer",
            cell: row => _.get(row.customer, "name", ""),
        },
        {
            title: "Tipo",
            prop: "type",
            cell: row => _.get(row.type, "description", ""),
        },
        {
            title: "Programado a las",
            prop: "schedule_at",
            sortable: true,
            cell: row => (
                <Moment format={DATE_TIME_FMT}>
                    {row.schedule_at}
                </Moment>
            )
        },
    ]

    if (_.get(auth.data, "is_superuser", false)) {
        header.push(...[
            {
                title: "Vendedor",
                prop: "seller",
                cell: row => `${_.get(row.seller, "username")} | ${_.get(row.seller, "full_name")}`
            },
            {
                title: "Estado",
                prop: "status_label",
            },
        ])
    }

    header.push({
        title: "Acciones",
        prop: "id",
        cell: row => (
            row.status === "active" &&
            <>
                <EditButton
                    loading={detail.loading}
                    click={() => { handleRetrieve(row.id) }}
                    title="Editar"
                />
                {" "}
                <CancelSButton
                    loading={remove.loading}
                    click={() => { handleDestroy(row) }}
                    title="Eliminar"
                />
            </>
        )
    })


    return (
        <Row>
            <Col>
                {err.generalErrors ?
                    err.generalErrors.map((error, key) =>
                        <Alert key={key} color="danger">
                            {error.message}
                        </Alert>
                    ) : null
                }
                <CDataTable
                    list={list}
                    tableHeaders={header}
                    handleReload={handleReload}
                    loading={list.loading}
                    initalSort={{ prop: "schedule_at", isAscending: false }}
                />
            </Col>
        </Row>
    )
}

const mapStateToProps = ({ auth }) => {
    return {
        auth
    }
}

ListTable = connect(mapStateToProps, {})(ListTable)
