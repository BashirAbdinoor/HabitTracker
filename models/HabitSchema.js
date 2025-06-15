import mongoose from 'mongoose';
const {Schema} = mongoose;

	// const CompletedDaysSchema = new Schema({
	// 	id: {type: String, required: false},
	// 	date: {type: String, required: true}
	// })

const HabitSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String, // Assuming IconProp is a string representing the icon name or URL
    required: true,
  },
  frequency: {
    type: [{
      id: Number,
      name: String,
      isSelected: Boolean,
    }],
    required: true,
  },
  completedDays: {
    type: [{
      _id: Number,
      date: String,
    }],
    required: true,
  },
  activeDropDown: {
    type: Boolean,
    required: true,
  },
  // notification: {
  //   type: String,
  //   required: false, // Assuming notification is optional
  // },
}, { timestamps: true });

const HabitsCollection = mongoose.models.HabitsCollection || mongoose.model('HabitsCollection', HabitSchema);

export default HabitsCollection;