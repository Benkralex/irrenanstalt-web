import { getExistingOTPSecret, isOTPVerified } from "@/app/lib/database/users";
import { generateOPTQRCode, generateOTPURL } from "@/app/lib/otp";
import { auth } from "@/auth";
import { SetupOtp } from "./setup-otp";
import OTPForm from "./otp-form";

export default async function OtpQr() {
    const session = await auth();
    const secret = await getExistingOTPSecret(session?.user?.id || "");
    const otpQRCode = secret ? await generateOPTQRCode(generateOTPURL(session?.user?.email || "", secret)) : null;
    const otpVerified = await isOTPVerified(session?.user?.id || "");

    return (
        <>
            {!otpVerified && otpQRCode && (
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold mb-4">OTP QR Code</h2>
                    <img src={otpQRCode} alt="OTP QR Code" className="w-64 h-64" />
                    <OTPForm callbackUrl="/profil" className={`mt-4`} />
                </div>
            )}
            {otpVerified && (
                <p className="mt-4 text-green-500">OTP ist aktiv.</p>
            )}
            {!otpQRCode && (
                <SetupOtp />
            )}
        </>
    );
}