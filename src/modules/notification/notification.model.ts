import mongoose, { Schema } from "mongoose";

import BaseDocument from "../../bases/baseDoc";
import { getModelDataLoader } from "../../helpers/dataloader";
import Mongo from "../../helpers/mongo";

type Notification = BaseDocument & {
  accId?: string;
  title?: string;
  body?: string;
  read?: boolean;
};

const notificationSchema = new mongoose.Schema(
  {
    accId: { type: Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

notificationSchema.index({ accId: 1 });
notificationSchema.index({ title: "text" });

const NotificationModel = Mongo.model<Notification>(
  "Notification",
  notificationSchema
);

const NotificationLoader = getModelDataLoader(NotificationModel);

export default NotificationModel;
export { Notification, NotificationLoader };
