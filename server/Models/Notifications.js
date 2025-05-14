import mongoose from 'mongoose';

const notificationSchema = 
new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  recipients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  isGlobal: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;
