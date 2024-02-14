import crypto from 'crypto';
import { readFileSync } from "fs";

export class LetuscAuthUtils {
    static getPublicKey(): Buffer {
        return readFileSync('auth/public-key.pem');
    }

    static getPrivateKey(): Buffer {
        return readFileSync('auth/private-key.pem');
    }

    static encrypt(data: string): string {
        const publicKey = this.getPublicKey();
        const buffer = Buffer.from(data, 'utf8');
        const encrypted = crypto.publicEncrypt(
            {
                key: publicKey,
                padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                oaepHash: "sha256",
            },
            buffer
        );
        return encrypted.toString('base64');
    }

    static decrypt(data: string): string {
        const privateKey = this.getPrivateKey();
        const buffer = Buffer.from(data, 'base64');
        const decrypted = crypto.privateDecrypt(
            {
                key: privateKey,
                padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                oaepHash: "sha256",
            },
            buffer
        );
        return decrypted.toString('utf8');
    }
}
