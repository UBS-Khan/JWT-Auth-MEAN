import mongoose, {Schema} from 'mongoose';

const UserSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            unique: true
        },
        profilePicture: {
            type: String,
            required: false,
            default: 'https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg'
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        role: {
            type: [Schema.Types.ObjectId],
            required: true,
            ref: 'Role'
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model('User', UserSchema);