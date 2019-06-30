import React, { Component } from 'react'
import Event from './Event'
import EventAdmin from './EventAdmin'
import {EVENT_QUERY} from '../graphql'
import { Query } from 'react-apollo'


export default class EventCard extends Component {
  render() {
    const { id } = this.props
    return (
      <Query query={EVENT_QUERY} variables={{id: id}} fetchPolicy="cache-and-network">
        {({ loading, data, error }) => {
          if (loading) return <p>Loading...</p>
          if (error) return <p>Error...</p>
          if (data.event.createBy.id === localStorage.getItem('uid')) {
            return <EventAdmin event={data.event} sm=''/>
          }
          return (
            <Event event={data.event} sm='' />
          )
        }}
      </Query>
    )
  }
}
