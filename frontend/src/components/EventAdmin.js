import React, { Component } from 'react'
import { Card, Button, CardTitle, CardText, Col, Badge } from 'reactstrap';
import { Mutation } from 'react-apollo'
import { DELETEEVENT_MUTATION, EVENTS_QUERY, MYEVENTS_QUERY, CREATEBYME_QUERY, EVENT_QUERY } from '../graphql'
import EditEvent from './EditEvent'
import moment from 'moment'

export default class EventAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleted: false
    }
  }


  deleteEventComplete = (Cache, { data }) => {
    this.setState({
      deleted: true
    })
    window.alert("Successful Delete!")
  }

  render() {
    const { id, title, descript, members, createBy, date } = this.props.event
    return (
      <Col sm={this.props.sm} style={{ marginTop: 10 }}>
        <Card body outline color="success">
          <CardTitle ><h4>{title}</h4><Badge color="secondary">{members.length} people join </Badge></CardTitle>
          <CardText>description: {descript}</CardText>
          <CardText>date:  {moment(date).format('YYYY/M/DD  h:mm a')}</CardText>
          <CardText>create by: {createBy.username}</CardText>
          <EditEvent deleted={this.state.deleted} event={this.props.event} />
          <Mutation
            mutation={DELETEEVENT_MUTATION}
            refetchQueries={[{ query: EVENT_QUERY }, { query: MYEVENTS_QUERY }, { query: EVENTS_QUERY }, { query: CREATEBYME_QUERY }]}
            update={this.deleteEventComplete}
          >
            {(mutation, { loading, error }) => {
              this.deleteEventMutation = mutation
              if (error) {
                window.alert(error.message)
              }
              return (
                <Button
                  color="danger"
                  style={{ marginTop: 10 }}
                  disabled={this.state.deleted}
                  onClick={
                    (e) => {
                      this.deleteEventMutation({
                        variables: {
                          id: id
                        }
                      })
                    }
                  }
                >
                  Delete
                </Button>
              )
            }}
          </Mutation>
        </Card>
      </Col>
    )
  }
}

EventAdmin.defaultProps = {
  sm: '4'
}