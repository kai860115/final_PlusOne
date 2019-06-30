import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, Alert } from 'reactstrap';
import { UPDATEEVENT_MUTATION, MYEVENTS_QUERY, EVENTS_QUERY, CREATEBYME_QUERY, EVENT_QUERY } from '../graphql'
import { Mutation } from 'react-apollo'
import moment from 'moment'

export default class EditEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      title: props.event.title,
      descript: props.event.descript,
      date: moment(props.event.date).format('YYYY-MM-DD'),
      time: moment(props.event.date).format('HH:mm')
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,
      title: this.props.event.title,
      descript: this.props.event.descript,
      date: moment(this.props.event.date).format('YYYY-MM-DD'),
      time: moment(this.props.event.date).format('HH:mm')
    }));
  }

  validator = ()=> {
    const { title, descript, date, time } = this.state
    if (!title || !descript || !date || !time) return true
    return false
  }

  handleSubmit = e => {
    e.preventDefault()
    const { title, descript, date, time } = this.state

    if (!title || !descript || !date || !time) return

    this.updateEvent({
      variables: {
        id: this.props.event.id,
        title: title,
        descript: descript,
        date: date + ' ' + time
      }
    })

  }

  updateEventComplete = (Cache, { data }) => {
    this.setState(prevState => ({
      modal: !prevState.modal,
      title: "",
      descript: "",
      date: '',
      time: ''
    }));
  }

  render() {
    return (
      <React.Fragment>
        <Button color="success" disabled={this.props.deleted} onClick={this.toggle}>Edit</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Edit Activitie</ModalHeader>
          <Mutation
            mutation={UPDATEEVENT_MUTATION}
            update={this.updateEventComplete}
            refetchQueries={[{ query: EVENT_QUERY },{ query: MYEVENTS_QUERY }, { query: EVENTS_QUERY }, { query: CREATEBYME_QUERY }]}
          >
            {(mutation, { loading, error }) => {
              this.updateEvent = mutation
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

                      defaultValue={this.props.event.title}
                    />
                    <br />
                    <Label for="eventDescription">Description</Label>
                    <Input
                      type="textarea"
                      name="description"
                      id="eventDescription"
                      onChange={e => this.setState({ descript: e.target.value })}

                      defaultValue={this.props.event.descript}
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
                    <Button color="success" disabled={this.validator()} onClick={this.handleSubmit}>Save</Button>{' '}
                    <Button color="danger" onClick={this.toggle}>Cancel</Button>
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