import { generateSecret, verify, generateURI, VerifyResult } from "otplib";
import QRCode from 'qrcode';

// Generate a secret for a user
export const generateTwoFactorSecret = () => {
    return generateSecret();
};

export const generateTwoFactorURL = (email: string, secret: string) => {
    const serviceName = 'Irrenanstalt Web Platform';
    return generateURI({
        issuer: serviceName,
        label: email,
        secret,
    });
};

// Generate QR code as data URL
export const generateQRCode = async (otpAuthUrl: string) => {
    try {
        const qrCodeDataUrl = await QRCode.toDataURL(otpAuthUrl);
        return qrCodeDataUrl;
    } catch (error) {
        console.error('Error generating QR code:', error);
        throw error;
    }
};

// Verify OTP code
export const verifyToken = async (token: string, secret: string) => {
    try {
        const { valid } = await verify({ token, secret });
        return valid;
    } catch (error) {
        console.error('Error verifying token:', error);
        return false;
    }
};