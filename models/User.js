import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	},
	{timestamps: true}
)

// export default userSchema
const User = mongoose.model.User || mongoose.model('User', userSchema)

 export default User