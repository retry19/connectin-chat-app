/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

const GET_MY_CONTACTS = gql`
  query GetMyContacts($user_id: String!) {
    users(order_by: {name: asc}, where: {id: {_neq: $user_id}}) {
      id
      name
      picture
      status
    }
  }
`;

export {
  GET_MY_CONTACTS
};
