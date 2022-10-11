import Context from "../../helpers/graphql/context";
import notificationService from "./notification.service";

const notificationResolvers = {
  Query: {
    getAllNotifications: async (root: any, args: any, context: Context) => {
      return await notificationService.findAll();
    },
    getOneNotification: async (root: any, args: any, context: Context) => {
      const { id } = args;
      return await notificationService.findById(id);
    },
  },
};

export default notificationResolvers;
