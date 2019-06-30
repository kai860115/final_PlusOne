import React, { Component } from 'react'
import { Container, Row } from 'reactstrap';
import { Query } from 'react-apollo'
import { CREATEBYME_QUERY } from '../graphql'
import EventAdmin from './EventAdmin'

export default class MyEvent extends Component {
  render() {
    if (!localStorage.getItem('uid')) {
      return (
        <Container style={{ display: 'flex', textAlign: 'center', justifyContent: 'center', alignContent: 'center' }}>
          <Row>
            <h4>Please Login First</h4>
          </Row>
        </Container>
      )
    }
    return (
      <Query query={CREATEBYME_QUERY} fetchPolicy="cache-and-network">
        {({ loading, error, data }) => {
          if (error) return <p>{error.message}</p>
          if (loading) return <p>Loading...</p>
          if (data.createByMe) {
            return (
              <Container >
                <Row style={{ flexWrap: "wrap" }}>
                  {
                    data.createByMe.map(event => {
                      return (<EventAdmin key={event.id} event={event} />)
                    })
                  }
                  {
                    (data.createByMe.length === 0) ? (<h4>No Activities</h4>): ''
                  }
                </Row>
              </Container>
            )
          }
          return <p>Internet Error...</p>
        }}
      </Query>
    )
  }
}