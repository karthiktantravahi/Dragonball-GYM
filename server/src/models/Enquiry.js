import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide applicant name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide applicant email'],
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Please provide applicant phone number'],
      trim: true,
    },
    preferredPlan: {
      type: String,
      default: 'Super Saiyan',
    },
    preferredLocation: {
      type: String,
      default: 'The Citadel (Flagship Downtown)',
    },
    fitnessGoal: {
      type: String,
      default: 'Hypertrophy & Strength',
    },
    notes: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['pending', 'contacted', 'converted', 'archived'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

const Enquiry = mongoose.model('Enquiry', enquirySchema);
export default Enquiry;
