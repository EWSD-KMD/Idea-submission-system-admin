import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Cookie from "js-cookie";
import CryptoJS from "crypto-js";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function encrypt(data?: string) {
  if (!data) return "";
  const cipherText = CryptoJS.AES.encrypt(
    data,
    process.env.NEXT_PUBLIC_ENCRYPT_KEY as string
  );
  return cipherText.toString();
}

export function decrypt(data?: string) {
  try {
    if (!data) return "";
    const bytes = CryptoJS.AES.decrypt(
      data,
      process.env.NEXT_PUBLIC_ENCRYPT_KEY as string
    );
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch {
    return "";
  }
}

export function getCookie(name: string) {
  const raw = Cookie.get(name);
  if (!raw) return null;
  return decrypt(raw);
}

export function setCookie(name: string, value: object | string) {
  const raw = typeof value === "object" ? JSON.stringify(value) : value;
  if (!raw) return null;
  const encryptedValue = encrypt(raw);
  return Cookie.set(name, encryptedValue);
}

export function removeCookie(name: string) {
  Cookie.remove(name);
}

export const getAuthSession = () => {
  return getCookie(process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME as string);
};

export const setAuthSession = (data: object) => {
  return setCookie(process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME as string, data);
};

export const removeAuthSession = () => {
  return removeCookie(process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME as string);
};
