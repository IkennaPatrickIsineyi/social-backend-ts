import { checkAuthController } from "../controllers/authControllers/check.controller";
import { loginController } from "../controllers/authControllers/login.controller";
import { Router } from 'express';
import { registerController } from "../controllers/authControllers/register.controller";
import { otpController } from "../controllers/authControllers/otp.controller";
import { changePasswordController } from "../controllers/authControllers/changePassword.controller";
import { verifyOtpController } from "../controllers/authControllers/verifyOtp.controller";

const authRouter = Router();

authRouter.get("/", checkAuthController);
authRouter.post("/login", loginController);
authRouter.post("/register", registerController);
authRouter.post("/otp", otpController);
authRouter.post("/change-password", changePasswordController);
authRouter.post("/verify-otp", verifyOtpController)

export { authRouter }