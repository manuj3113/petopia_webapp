'use server'

import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

export const addCookie = async (cookieName, cookieValue) => {
  cookies().set(cookieName, cookieValue);
};
export const getCookies = async (cookieName) => {
 let cookie= cookies().get(cookieName);
 return cookie
};

export async function deleteCookie(cookieName) {
  'use server'
  try {
    cookies().delete(cookieName);
    return true;
  } catch (error) {
    console.log(error.message)
    return false;
  }
}

export const serverRedirect = async(path )=>{
  redirect(path ?? '/', RedirectType.push)
}