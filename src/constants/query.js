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
  `,
  GET_MESSAGE_GROUP: gql`
    subscription GetMessageGroup($my_user_id: String!) {
      messages(order_by: {created_at: desc}, where: {
        _and: [
          {
            deleted_at: {
              _is_null: true
            }
          },
          {
            to_user_id: {
              _is_null: false
            }
          },
          {
            _or: [
              {
                from_user_id: {
                  _eq: $my_user_id
                }
              },
              {
                to_user_id: {
                  _eq: $my_user_id
                }
              }
            ]
          }
        ]
      }) {
        id
        message
        created_at
        to_user {
          id
          name
          picture
          status
        }
        from_user {
          id
          name
          picture
          status
        }
      }
    }  
  `,
  GET_PUBLIC_MESSAGE: gql`
    subscription GetPublicMessage {
      messages(limit: 1, where: {_and: {deleted_at: {_is_null: true}, to_user_id: {_is_null: true}}}, order_by: {created_at: desc}) {
        id
        message
        created_at
        from_user {
          id
          name
          picture
          status
        }
      }
    }
  `,
  INSERT_MESSAGE: gql`
    mutation InsertMessage($from_user_id: String!, $message: String!, $to_user_id: String = "") {
      insert_messages_one(object: {from_user_id: $from_user_id, message: $message, to_user_id: $to_user_id}) {
        id
      }
    }  
  `,
  UPDATE_USER: gql`
    mutation UpdateUser($user_id: String!, $name: String!, $status: String = "") {
      update_users(where: {id: {_eq: $user_id}}, _set: {name: $name, status: $status}) {
        returning {
          id
        }
      }
    }  
  `
};
