"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinaryUpload = void 0;
const cloudinary_1 = require("cloudinary");
const _1 = __importDefault(require("."));
cloudinary_1.v2.config({
    cloud_name: _1.default.CLOUDINARY_CLOUD_NAME,
    api_key: _1.default.CLOUDINARY_API_KEY,
    api_secret: _1.default.CLOUDINARY_API_SECRET,
});
exports.cloudinaryUpload = cloudinary_1.v2;
