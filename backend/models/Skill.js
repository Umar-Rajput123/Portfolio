import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Skill name is required'],
      trim: true,
    },
    category: {
      type: String,
      enum: ['Frontend', 'Backend', 'Database', 'Tools & DevOps', 'Languages', 'Other'],
      default: 'Frontend',
      required: true,
    },
    proficiency: {
      type: Number,
      min: [1, 'Proficiency must be at least 1%'],
      max: [100, 'Proficiency cannot exceed 100%'],
      default: 80,
    },
    icon: {
      type: String,
      default: 'Code',
      trim: true,
    },
    featured: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Skill = mongoose.model('Skill', skillSchema);

export default Skill;
