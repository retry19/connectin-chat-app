import { gql } from '@apollo/client';

export default {
  GET_MY_CONTACTS: gql`
    query GetMyContacts($user_id: String!) {
      users(order_by: {name: asc}, where: {id: {_neq: $user_id}}) {
        id
        name
        picture
        status
      }
    }
  `,
  GET_USER_BY_ID: gql`
    query GetUserById($user_id: String = "") {
      users(where: {id: {_eq: $user_id}}) {
        id
        name
        picture
        status
      }
    }
  `,
  GET_CHAT: gql`
    subscription GetChat($where: messages_bool_exp = {}) {
      messages(where: $where, order_by: { created_at: asc }) {
        id
        created_at
        from_user_id
        message
        to_user_id
      }
    }
  `
};
