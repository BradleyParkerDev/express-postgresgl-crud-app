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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const verifyToken_1 = __importDefault(require("../token/verifyToken"));
const __1 = require("..");
const handleSessionCookies = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Authorization Middleware!!!");
    // Get the tokens from the cookies
    let accessToken = req.cookies['accessToken'];
    let refreshToken = req.cookies['refreshToken'];
    let guestToken = req.cookies['guestToken'];
    if (accessToken) {
        // verifyToken
        const decoded = (0, verifyToken_1.default)(accessToken);
        // if decoded token valid
        // add decoded token to req body
        // else
        // set access token to null, remove decoded from request body
    }
    if (!accessToken) {
        // try refreshing access token
        if (refreshToken) {
            // verifyToken
            // if token valid 
            // rotate refresh token
            // return
            // else 
            // logoutUser
        }
        // if no refreshToken 
        if (!refreshToken) {
            if (guestToken) {
                // verify guestToken
                const decoded = (0, verifyToken_1.default)(guestToken);
            }
            else {
                // create guest session
                const guestUserSession = yield __1.auth.createUserSession();
                // create guest token
                const guestToken = yield __1.auth.generateToken(guestUserSession, "guest");
                console.log(`guestToken: \n${guestToken}`);
                // set cookies
                // Calculate maxAge for guestToken
                const guestTokenMaxAge = guestUserSession.expirationTime.getTime() - Date.now();
                res.cookie("guestToken", guestToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                    maxAge: guestTokenMaxAge, // Time remaining in milliseconds
                });
            }
        }
    }
    next();
});
exports.default = handleSessionCookies;
//   console.log(`accessToken before setting: ${accessToken}`);
//   // If token is undefined, set a new cookie
//   if (!accessToken) {
//     res.cookie("accessToken", "bye", {
//       httpOnly: true,  // Secure, inaccessible to client-side scripts
//       secure: process.env.NODE_ENV === "production", // Use HTTPS in production
//       maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
//       sameSite: "strict", // Helps prevent CSRF
//     });
//     console.log(`New cookie set: bye`);
//   } else {
//     console.log(`accessToken already exists: ${accessToken}`);
//   }
// //   Send a response back to the client
//   res.status(200).send("Cookie checked/set!");
