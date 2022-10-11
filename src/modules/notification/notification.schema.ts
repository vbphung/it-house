import { gql } from "apollo-server-express";

const notificationSchema = gql`
  extend type Query {
    getAllNotifications: [Notification]
    getOneNotification: Notification
  }
  type Notification {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    accId: String!
    title: String!
    body: String!
    read: Boolean!
  }
`;

export default notificationSchema;
