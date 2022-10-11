import CrudService from "../../bases/crudService";
import NotificationModel, { Notification } from "./notification.model";

class NotificationService extends CrudService<Notification> {
  constructor() {
    super(NotificationModel);
  }
}

const notificationService = new NotificationService();

export default notificationService;
