import CryptoJS from 'crypto-js';

export const decryptData = function(dataEncrypt) {
    const decrypt = CryptoJS.AES.decrypt(dataEncrypt, import.meta.env.VITE_SECRET_KEY);
    return JSON.parse(decrypt.toString(CryptoJS.enc.Utf8));
};
