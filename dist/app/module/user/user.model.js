"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    userName: {
        type: String,
        unique: true,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    imageURL: {
        type: String,
    },
    posts: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "POST",
        },
    ],
    followers: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "USER",
        },
    ],
    followings: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "USER",
        },
    ],
    membership: {
        type: String,
        enum: ["REGULAR", "PREMIUM"],
        default: "REGULAR",
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER",
    },
});
exports.User = (0, mongoose_1.model)("USER", userSchema);
