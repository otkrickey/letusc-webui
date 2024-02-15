import crypto from 'crypto';

export class LetuscAuthUtils {
    static getPublicKey(): Buffer {
        const publicKeyBase64 = process.env.PUBLIC_KEY_BASE64;
        if (!publicKeyBase64) {
            throw new Error("Public key not found in environment variables");
        }
        return Buffer.from(publicKeyBase64, 'base64');
    }

    static getPrivateKey(): Buffer {
        const privateKeyBase64 = process.env.PRIVATE_KEY_BASE64;
        if (!privateKeyBase64) {
            throw new Error("Private key not found in environment variables");
        }
        return Buffer.from(privateKeyBase64, 'base64');
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
