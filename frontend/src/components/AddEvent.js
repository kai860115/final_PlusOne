import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, Alert } from 'reactstrap';
import { CREATEEVENT_MUTATION, MYEVENTS_QUERY, EVENTS_QUERY, CREATEBYME_QUERY, EVENT_QUERY } from '../graphql'
import { Mutation } from 'react-apollo'
import moment from 'moment'

export default class AddEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      title: "",
      descript: "",
      date: moment(new Date()).format('YYYY-MM-DD'),
      time: moment(new Date()).format('HH:mm')
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,
      title: "",
      descript: "",
      date: moment(new Date()).format('YYYY-MM-DD'),
      time: moment(new Date()).format('HH:mm')
    }));
  }

  validator = () => {
    const { title, descript} = this.state
    if (!title || !descript) return true
    return false
  }

  handleSubmit = e => {
    e.preventDefault()

    const { title, descript, date, time } = this.state

    if (!title || !descript || !date || !time) return new Error('Empty Input!')

    this.createEvent({
      variables: {
        title: title,
        descript: descript,
        date: date + ' ' + time
      }
    })

  }

  createEventComplete = (Cache, { data }) => {
    this.setState(prevState => ({
      modal: !prevState.modal,
      title: "",
      descript: "",
      date: moment(new Date()).format('YYYY-MM-DD'),
      time: moment(new Date()).format('HH:mm')
    }));
  }

  render() {
    return (
      <React.Fragment>
        <Button color="secondary" onClick={this.toggle}>Add Activities</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add Event</ModalHeader>
          <Mutation
            mutation={CREATEEVENT_MUTATION}
            update={this.createEventComplete}
            refetchQueries={[{ query: EVENT_QUERY }, { query: MYEVENTS_QUERY }, { query: EVENTS_QUERY }, { query: CREATEBYME_QUERY }]}
          >
            {(mutation, { loading, error }) => {
              this.createEvent = mutation
              return (
                <React.Fragment>
                  <ModalBody>
                    <Label for="eventTitle">Title</Label>
                    <Input
                      type="title"
                      name="title"
                      id="eventTitle"
                      placeholder="with a placeholder"
                      onChange={e => this.setState({ title: e.target.value })}

                      value={this.state.title}
                    />
                    <br />
                    <Label for="eventDescription">Description</Label>
                    <Input
                      type="textarea"
                      name="description"
                      id="eventDescription"
                      onChange={e => this.setState({ descript: e.target.value })}

                      value={this.state.descript}
                    />
                    <br />
                    <Label for="eventDate">Date</Label>
                    <Input
                      type="date"
                      name="date"
                      id="eventDate"
                      placeholder="date placeholder"
                      onChange={e => {
                        this.setState({ date: e.target.value })
                      }}
                      value={this.state.date}
                    />
                    <br />
                    <Label for="eventTime">Time</Label>
                    <Input
                      type="time"
                      name="time"
                      id="eventTime"
                      placeholder="time placeholder"
                      onChange={e => {
                        this.setState({ time: e.target.value })
                      }}
                      value={this.state.time}
                    />
                    <br />
                    {error &&
                      <Alert color="danger">
                        {error.message}
                      </Alert>}
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={this.handleSubmit} disabled={this.validator()}>Add</Button>{' '}
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                  </ModalFooter>
                </React.Fragment>
              )
            }}
          </Mutation>
        </Modal>
      </React.Fragment>
    );
  }
}