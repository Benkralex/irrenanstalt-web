import { generateSecret, verify, generateURI } from "otplib";
import QRCode from 'qrcode';

export const generateOTPSecret = () => {
    return generateSecret();
};

export const generateOTPURL = (email: string, secret: string) => {
    const serviceName = 'Irrenanstalt Web Platform';
    return generateURI({
        issuer: serviceName,
        label: email,
        secret,
    });
};

export const generateOPTQRCode = async (otpAuthUrl: string) => {
    try {
        const qrCodeDataUrl = await QRCode.toDataURL(otpAuthUrl);
        return qrCodeDataUrl;
    } catch (error) {
        console.error('Error generating QR code:', error);
        throw error;
    }
};

export const verifyOPTToken = async (token: string, secret: string) => {
    try {
        const { valid } = await verify({ token, secret });
        return valid;
    } catch (error) {
        console.error('Error verifying token:', error);
        return false;
    }
};