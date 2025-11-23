const mongoose = require('mongoose');

const technicianSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    skills: {
      type: [String],
      required: true,
    },
    hourlyRate: {
      type: Number,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    certifications: [String],
    rating: {
      type: Number,
      default: 0,
    },
    totalJobs: {
      type: Number,
      default: 0,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    availability: {
      type: Boolean,
      default: true,
    },
    badges: [String],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Technician', technicianSchema);
