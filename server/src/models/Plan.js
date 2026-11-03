import mongoose from 'mongoose';

const planSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide tier name'],
      uppercase: true,
      trim: true,
    },
    tagline: {
      type: String,
      required: [true, 'Please provide tagline'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide price per month'],
    },
    billingPeriod: {
      type: String,
      default: 'monthly',
    },
    popular: {
      type: Boolean,
      default: false,
    },
    badge: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: '',
    },
    accentColor: {
      type: String,
      default: '',
    },
    features: {
      type: [String],
      default: [],
    },
    notIncluded: {
      type: [String],
      default: [],
    },
    ctaText: {
      type: String,
      default: 'Choose Tier',
    },
  },
  {
    timestamps: true,
  }
);

const Plan = mongoose.model('Plan', planSchema);
export default Plan;
