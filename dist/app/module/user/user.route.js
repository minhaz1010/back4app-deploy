"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const mutler_config_1 = require("../../config/mutler.config");
const router = express_1.default.Router();
router.post("/", mutler_config_1.mutlerUpload.single("image"), user_controller_1.UserController.resizeImage, user_controller_1.UserController.image);
exports.default = router;
