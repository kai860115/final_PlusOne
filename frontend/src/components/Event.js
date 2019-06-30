import React, { Component } from 'react'
import { Card, Button, CardTitle, CardText, Col, Badge } from 'reactstrap';
import { Mutation } from 'react-apollo'
import { JOINEVENT_MUTATION, LEAVEEVENT_MUTATION, EVENTS_QUERY, MYEVENTS_QUERY } from '../graphql'
import moment from 'moment'

export default class Event extends Component {
  expired = () => {
    if (new Date(this.props.event.date) < new Date()) {
      return true
    }
    return false
  }

  joinValidator = () => {
    if (this.expired()) {
      return true
    }
    if (localStorage.getItem('uid')) {
      return this.props.event.members.some(e => e.id === localStorage.getItem('uid'))
    }
    return false
  }

  leaveValidator = () => {
    if (this.expired()) {
      return true
    }
    if (new Date(this.props.event.date) < new Date()) {
      return true
    }
    if (localStorage.getItem('uid')) {
      return !(this.props.event.members.some(e => e.id === localStorage.getItem('uid')))
    }
    return false
  }


  render() {
    const { id, title, descript, members, createBy, date } = this.props.event
    let color = "primary"
    if (this.joinValidator()) {
      color = 'success'
    }

    if (new Date(date) < new Date()) {
      color = "danger"
    }

    return (
      <Col sm={this.props.sm} style={{ marginTop: 10 }}>
        <Card body outline color={color}>
          <CardTitle ><h4>{title}</h4><Badge color="secondary"> +{members.length}{' '}</Badge></CardTitle>
          <CardText>description: {descript}</CardText>
          <CardText>date:  {moment(date).format('YYYY/M/DD  h:mm a')} {this.expired() ? 'expired' : ''}</CardText>
          <CardText>create by: {createBy.username}</CardText>
          <Mutation
            mutation={JOINEVENT_MUTATION}
            refetchQueries={[{ query: MYEVENTS_QUERY }, { query: EVENTS_QUERY }]}
          >
            {(mutation, { loading, error }) => {
              this.joinEventMutation = mutation
              if (error) {
                window.alert(error.message)
              }
              return (
                <Button
                  color="success"
                  style={{ marginTop: 10 }}
                  disabled={this.joinValidator()}
                  onClick={
                    (e) => {
                      this.joinEventMutation({
                        variables: {
                          id: id
                        }
                      })
                    }
                  }
                >
                  +1
                </Button>
              )
            }}
          </Mutation>
          <Mutation
            mutation={LEAVEEVENT_MUTATION}
            refetchQueries={[{ query: MYEVENTS_QUERY }, { query: EVENTS_QUERY }]}
          >
            {(mutation, { loading, error }) => {
              this.leaveEventMutation = mutation
              if (error) {
                window.alert(error.message)
              }
              return (
                <Button
                  color="danger"
                  style={{ marginTop: 10 }}
                  disabled={this.leaveValidator()}
                  onClick={
                    (e) => {
                      this.leaveEventMutation({
                        variables: {
                          id: id
                        }
                      })
                    }
                  }
                >
                  -1
                </Button>
              )
            }}
          </Mutation>
        </Card>
      </Col>
    )
  }
}


Event.defaultProps = {
  sm: '4'
}