import { auth } from "@/auth";
import { BG_CODE, TEXT_CODE } from "../constants";
import { generateQRCode, generateTwoFactorSecret, generateTwoFactorURL, verifyToken } from "@/app/lib/2fa";
import OTPForm from "./otp-form";
import { get2FASecret } from "@/app/lib/database/users";

export async function Test2FA() {
    const session = await auth()
    const user = session?.user;
    const secret = await get2FASecret(user?.id || '');
    const otpAuthUrl = await generateTwoFactorURL(user?.email || '', secret);
    const qrCodeDataUrl = await generateQRCode(otpAuthUrl);

    return (
        <div className="flex flex-col justify-start items-center">
            <h3 className="text-lg mt-4 mb-2">2FA Url</h3>
            <pre className={`p-2 rounded ${BG_CODE} ${TEXT_CODE} overflow-x-auto`}>
                {otpAuthUrl}
            </pre>
            <h3 className="text-lg mt-4 mb-2">QR Code</h3>
            <img src={qrCodeDataUrl} alt="2FA QR Code" className="w-64 h-64" />
            <h3 className="text-lg mt-4 mb-2">Test</h3>
            <OTPForm/>
        </div>
    );
}