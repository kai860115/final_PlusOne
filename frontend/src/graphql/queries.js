import { gql } from 'apollo-boost'

export const EVENTS_QUERY = gql`
  query {
    events {
      id
      title
      descript
      createBy{
        username
        id
      },
      members {
        id
      }
      date
    }
  }
`

export const MYEVENTS_QUERY = gql`
  query {
    myEvents {
      id
      title
      descript
      createBy{
        username
        id
      },
      members {
        id
      }
      date
    }
  }
`

export const CREATEBYME_QUERY = gql`
  query {
    createByMe {
      id
      title
      descript
      createBy{
        username
        id
      },
      members {
        id
      }
      date
    }
  }
`


export const ME_QUERY = gql`
  query {
    me {
      id
      username
      name
    }
  }
`


export const EVENT_QUERY = gql`
  query event($id: ID!) {
    event(id: $id) {
      id
      title
      descript
      createBy{
        username
        id
      },
      members {
        id
      }
      date
    }
  }
`