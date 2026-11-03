import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide sender name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide sender email'],
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      default: '',
    },
    subject: {
      type: String,
      default: 'Membership Inquiry',
    },
    message: {
      type: String,
      required: [true, 'Please provide a message'],
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Contact = mongoose.model('Contact', contactSchema);
export default Contact;
