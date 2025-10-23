import CryptoJS from "crypto-js";

const SECRET_KEY = "neon-chat-super-secret-key-2025";

export const encryptMessage = (message) => {
  try {
    return CryptoJS.AES.encrypt(message, SECRET_KEY).toString();
  } catch (error) {
    console.error("Encryption error:", error);
    return message;
  }
};

export const decryptMessage = (encryptedMessage) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedMessage, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error("Decryption error:", error);
    return encryptedMessage;
  }
};

export default { encryptMessage, decryptMessage };
