
import BigCalendar from "react-big-calendar";
import moment from 'moment'
import React, { Component } from 'react'
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Query } from 'react-apollo'
import { EVENTS_QUERY } from '../graphql'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import EventCard from './EventCard'

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      id: ''
    }
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  handleSelectEvent = (event) => {
    this.setState(prevState => ({
      modal: !prevState.modal,
      id: event.id
    }))
  }

  eventStyleGetter = (event, start, end, isSelected) => {
    console.log(event)
    let style = {
      backgroundColor: '#E74C3C',
      opacity: 0.8,
      border: '0px',
      display: 'block'
    }
    if (localStorage.getItem('uid')) {
      if (event.members.some(e => e.id === localStorage.getItem('uid'))) {
        style.backgroundColor = '#18BC9C'
      }
      if (event.createBy.id === localStorage.getItem('uid')) {
        style.backgroundColor = '#2C3E50 '
      }
    }
    return {
      style: style
    };
  }

  render() {
    return (
      <React.Fragment>
        <Query query={EVENTS_QUERY} fetchPolicy="cache-and-network">

          {({ loading, data, error }) => {
            if (loading) return <p>Loading...</p>
            if (error) return <p>Error...</p>
            const events = data.events.map(event => {
              return {
                id: event.id,
                title: event.title,
                members: event.members,
                createBy: event.createBy,
                start: new Date(event.date),
                end: new Date(event.date)
              }
            })

            return (
              <div style={{ height: 550 }}>
                <BigCalendar
                  selectable
                  localizer={localizer}
                  events={events}
                  startAccessor="start"
                  endAccessor="end"
                  step={60}
                  defaultview="month"
                  onSelectEvent={this.handleSelectEvent}
                  eventPropGetter={(this.eventStyleGetter)}
                />
              </div>
            )
          }}
        </Query>
        <div>
          <div style={{ marginTop: 75 }}>
            <Button disabled color="primary">Create By Me</Button>{' '}
            <Button disabled color="success">+1</Button>{' '}
            <Button disabled color="danger">-1</Button>{' '}
          </div>
        </div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Activity Card</ModalHeader>
          <ModalBody>
            <EventCard id={this.state.id} />
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    )
  }
}
