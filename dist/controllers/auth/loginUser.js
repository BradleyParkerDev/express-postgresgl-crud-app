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
const Users_1 = __importDefault(require("../../database/schemas/Users"));
const UserSessions_1 = __importDefault(require("../../database/schemas/UserSessions"));
const drizzle_orm_1 = require("drizzle-orm");
const auth_1 = require("../../lib/auth");
const localDb_1 = require("../../database/localDb");
const neonDb_1 = require("../../database/neonDb");
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables
dotenv_1.default.config();
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Explicit boolean conversion with fallback to false
    const useNeon = process.env.USE_NEON === 'true' || false;
    // Dynamically assign the database 
    const db = useNeon ? neonDb_1.neonDb : localDb_1.localDb;
    const userLoginData = {
        emailAddress: req.body.emailAddress,
        password: req.body.password
    };
    // Finding user in database
    const foundUserArr = yield db.select().from(Users_1.default).where((0, drizzle_orm_1.eq)(Users_1.default.emailAddress, userLoginData.emailAddress));
    console.log(foundUserArr);
    // If user not found
    if (foundUserArr.length === 0) {
        res.status(404).json({ success: false, message: 'Could not find user.' });
        return;
    }
    const foundUser = foundUserArr[0];
    // Validate password
    const passwordValid = yield auth_1.auth.validatePassword(userLoginData.password, foundUser.password);
    // If password not valid
    if (!passwordValid) {
        res.status(401).json({ success: false, message: 'Password was incorrect.' });
        return;
    }
    // Create session tokens and cookies
    if (passwordValid) {
        // Clean up guest session
        yield cleanUpGuestSession(req, res, db);
        // Create authenticated user session
        const authenticatedUserSession = yield auth_1.auth.createUserSession(foundUser.userId);
        // Create access and refresh tokens
        const accessToken = yield auth_1.auth.generateToken(authenticatedUserSession, "access");
        const refreshToken = yield auth_1.auth.generateToken(authenticatedUserSession, "refresh");
        console.log(`accessToken: \n${accessToken}`);
        console.log(`refreshToken: \n ${refreshToken}`);
        // Calculate maxAge for refreshToken
        const refreshTokenMaxAge = authenticatedUserSession.expirationTime.getTime() - Date.now();
        // Set tokens in cookies
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            // maxAge: 2 * 60 * 1000, // 2 minutes
            maxAge: 30 * 1000, // 30 seconds
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: refreshTokenMaxAge, // Time remaining in milliseconds
        });
        res.status(200).json({ success: true, message: "User has successfully logged in!" });
        return;
    }
});
exports.default = loginUser;
// Delete guest session and remove guestToken cookie
const cleanUpGuestSession = (req, res, db) => __awaiter(void 0, void 0, void 0, function* () {
    // Handle guest session cleanup
    if (req.cookies['guestToken']) {
        const guestToken = req.cookies['guestToken'];
        try {
            const decodedGuestToken = yield auth_1.auth.verifyToken(guestToken);
            if (decodedGuestToken === null || decodedGuestToken === void 0 ? void 0 : decodedGuestToken.sessionId) {
                res.clearCookie("guestToken");
                const sessionId = String(decodedGuestToken === null || decodedGuestToken === void 0 ? void 0 : decodedGuestToken.sessionId);
                // Attempt to delete session
                const sessionResponse = yield db.delete(UserSessions_1.default).where((0, drizzle_orm_1.eq)(UserSessions_1.default.sessionId, sessionId)).returning();
                if (sessionResponse.length === 0) {
                    console.warn("No guest session was deleted. Proceeding with login.");
                }
            }
            else {
                console.error("Invalid or missing sessionId in decoded guest token.");
            }
        }
        catch (error) {
            console.error('Error verifying or deleting guest session:', error);
            // Proceed with login even if session cleanup fails
        }
    }
});
