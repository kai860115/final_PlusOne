import React, { Component } from 'react'
import { Row, Button } from 'reactstrap';
import { Query } from 'react-apollo'
import { EVENTS_QUERY } from '../graphql'
import Event from './Event'

export default class AllEvent extends Component {
  render() {
    return (
      <Query query={EVENTS_QUERY} fetchPolicy="cache-and-network">
        {({ loading, data, error }) => {
          if (loading) return <p>Loading...</p>
          if (error) return <p>Error...</p>
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
                  data.events.map(event => {
                    return (<Event key={event.id} event={event} />)
                  })
                }
                {
                  (data.events.length === 0) ? (<h4>No Activities</h4>) : ''
                }
                <br />
              </Row>

            </React.Fragment>
          )
        }}
      </Query>
    )
  }
}