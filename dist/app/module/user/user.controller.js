"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const svix_1 = require("svix");
const config_1 = __importDefault(require("../../config"));
const catchAsyncError_1 = __importDefault(require("../../utils/catchAsyncError"));
const user_services_1 = require("./user.services");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const cloudinary_1 = require("cloudinary");
const resizeImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file) {
        return next();
    }
    try {
        const result = yield cloudinary_1.v2.uploader.upload(req.file.path, {
            transformation: [
                { width: 600, height: 600, crop: "limit" }
            ],
            public_id: req.file.filename,
            overwrite: true,
        });
        req.file.path = result.secure_url;
        req.file.filename = result.public_id;
        //  console.log(req.file,'file from resizeimage')
        next();
    }
    catch (error) {
        // console.log(error,'error from resize image function')
        next(error);
    }
});
const createController = (0, catchAsyncError_1.default)(function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const WEBHOOK_SECRET = config_1.default.CLERK_WEBHOOK_SECRET_KEY;
        if (!WEBHOOK_SECRET) {
            throw new Error("You need a WEBHOOK_SECRET in your .env");
        }
        const headers = req.headers;
        const payload = req.body;
        const svix_id = headers["svix-id"];
        const svix_timestamp = headers["svix-timestamp"];
        const svix_signature = headers["svix-signature"];
        if (!svix_id || !svix_timestamp || !svix_signature) {
            return res.status(400).json({
                success: false,
                message: "Error occurred -- missing svix headers",
            });
        }
        const svixHeaders = {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        };
        const wh = new svix_1.Webhook(WEBHOOK_SECRET);
        let evt;
        try {
            evt = wh.verify(payload, svixHeaders);
        }
        catch (err) {
            console.log("Webhook failed to verify. Error:", err.message);
            return res.status(400).json({
                success: false,
                message: err.message,
            });
        }
        const attr = __rest(evt.data, []);
        const eventType = evt.type;
        if (eventType === "user.created") {
            if (attr) {
                const userId = attr.id;
                const userName = attr.username;
                const fullName = `${attr.first_name} ${attr.last_name}`;
                const email = attr.email_addresses[0].email_address;
                const imageURL = attr.image_url;
                const user = {
                    userId,
                    userName,
                    fullName,
                    email,
                    imageURL,
                };
                yield user_services_1.UserServices.createUserInDatabaseFromClerk(user);
            }
        }
        return res.status(200).json({
            success: true,
            message: "Webhook received",
        });
    });
});
const image = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.body);
    // console.log(req.file);
    var _a;
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "ok",
        result: (_a = req.file) === null || _a === void 0 ? void 0 : _a.path,
        statusCode: http_status_1.default.OK
    });
}));
exports.UserController = {
    createController,
    image,
    resizeImage
};
