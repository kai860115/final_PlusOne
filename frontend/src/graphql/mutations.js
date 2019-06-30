import { gql } from 'apollo-boost'

export const SIGNUP_MUTATION = gql`
  mutation signUp(
    $email: String!,
    $username: String!,
    $name: String!,
    $password: String!,
  ) {
    signUp(
      data: {
        email: $email,
        username: $username,
        name: $name,
        password: $password,
      }
    ) {
      id
      email
      username
      name
    }
  }
`

export const SIGNIN_MUTATION = gql`
  mutation signIn(
    $email: String!,
    $password: String!
  ) {
    signIn(
      email: $email,
      password: $password
    ) {
      token
      id
      username
    }
  }
`

export const JOINEVENT_MUTATION = gql`
  mutation joinEvent(
    $id: ID!
  ) {
    joinEvent(
      id: $id
    ) {
      id
    }
  }
`

export const LEAVEEVENT_MUTATION = gql`
  mutation leaveEvent(
    $id: ID!
  ) {
    leaveEvent(
      id: $id
    ) {
      id
    }
  }
`

export const DELETEEVENT_MUTATION = gql`
  mutation deleteEvent(
    $id: ID!
  ) {
    deleteEvent(
      id: $id
    ) {
      id
    }
  }
`

export const CREATEEVENT_MUTATION = gql`
  mutation createEvent(
    $title: String!,
    $descript: String!,
    $date: String!
  ) {
    createEvent(data: {
      title: $title,
      descript: $descript,
      date: $date
    }) {
      title
    }
  }
`

export const UPDATEEVENT_MUTATION = gql`
  mutation updateEvent(
    $id: ID!,
    $title: String!,
    $descript: String!,
    $date: String!
  ) {
    updateEvent(
      id: $id
      data: {
      title: $title,
      descript: $descript,
      date: $date
    }) {
      title
    }
  }
`