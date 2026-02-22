import mongoose from "mongoose";
import { GenderEnum, ProviderEnum, RoleEnum } from "../../common/index.js";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 20
    },
    lastName: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
    },
    DOB: {
        type: Date,
    },
    gender: {
        type: String,
        enum: Object.values(GenderEnum), //convert the values object to an array
        default: GenderEnum.Male
    },
    provider: {
        type: String,
        enum: Object.values(ProviderEnum),
        default: ProviderEnum.System
    },
    role: {
        type: String,
        enum: Object.values(RoleEnum),
        default: RoleEnum.User
    }
});


userSchema.virtual('userName').set(function (value) {
    const [firstName, lastName] = value.split(' ');
    this.firstName = firstName;
    this.lastName = lastName;
}).get(function () {
    return `${this.firstName} ${this.lastName}`;
});

export const UserModel = mongoose.model('User', userSchema);

