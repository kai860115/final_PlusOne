import React, { Component } from 'react'
import { Container, Row, Button } from 'reactstrap';
import { Query } from 'react-apollo'
import { MYEVENTS_QUERY } from '../graphql'
import Event from './Event'

export default class MyEvent extends Component {
  render() {
    if (!localStorage.getItem('token')) {
      return (
        <Container style={{ display: 'flex', textAlign: 'center', justifyContent: 'center', alignContent: 'center' }}>
          <Row>
            <h4>Please Login First</h4>
          </Row>
        </Container>
      )
    }
    return (
      <Query query={MYEVENTS_QUERY} fetchPolicy="cache-and-network">
        {({ loading, error, data }) => {
          if (error) return <p>{error.message}</p>
          if (loading) return <p>Loading...</p>
          if (data.myEvents) {
            return (
              <React.Fragment>
                <div>
                  <div style={{ marginTop: 10 }}>
                    <Button disabled outline color="danger">expired</Button>{' '}
                    <Button disabled outline color="success">+1</Button>{' '}
                    <Button disabled outline color="primary">-1</Button>{' '}
                  </div>
                </div>
                  <Row style={{ flexWrap: "wrap" }}>
                    {
                      data.myEvents.map(event => {
                        return (<Event key={event.id} event={event} />)
                      })
                    }
                    {
                      (data.myEvents.length === 0) ? (<h4>No Activities</h4>) : ''
                    }
                  </Row>
              </React.Fragment>
            )
          }
          return <p>Internet Error...</p>
        }}
      </Query>

    )
  }
}