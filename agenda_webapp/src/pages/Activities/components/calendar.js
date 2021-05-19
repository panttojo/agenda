import React from "react"
import _ from "lodash"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import BootstrapTheme from "@fullcalendar/bootstrap"
import moment from "moment"


export let Calendar = props => {

    const {
        handleChangeMonth,
        handleEventClick,
        events,
    } = props

    return (
        <FullCalendar
            id="calendar"
            slotDuration={"00:30:00"}
            defaultView="dayGridMonth"
            plugins={[BootstrapTheme, dayGridPlugin]}
            handleWindowResize={true}
            themeSystem="bootstrap"
            header={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,dayGridWeek,dayGridDay"
            }}
            locale="es"
            events={events.data.map(row => {
                let className = "text-white"
                const now = moment()
                const scheduleAt = moment(row.schedule_at)
                const finishAt = moment(row.finish_at)

                if (row.status === "canceled") {
                    className += " bg-soft-danger"
                }
                else if (now > finishAt) {
                    className += " bg-soft-dark"
                } else if (now >= scheduleAt && now <= finishAt) {
                    className += " bg-info"
                } else {
                    className += " bg-success"
                }

                return {
                    id: row.id,
                    title: `${_.get(row.type, "name")} | ${_.get(row.customer, "name")}`,
                    start: row.schedule_at,
                    end: row.finish_at,
                    className: className
                }
            })}
            eventLimit={true}
            selectable={true}
            datesSet={props => handleChangeMonth(props.startStr, props.endStr)}
            eventClick={props => handleEventClick(props.event._def.publicId)}
        />
    )
}
