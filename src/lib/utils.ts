import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import axios from "axios";
import { NextRequest } from "next/server";
import { JWTWithExtraData } from "@/app/services/types";
import { getToken } from "next-auth/jwt";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function fetcher<T>(url: string) {
  return await axios.get<T>(url);
}

export const fetcherPost = (url: string, slug: { [key: string]: any }) => axios.post(url, { ...slug }, {
  headers: {
    'Content-Type': 'application/json'
  }
})


export async function Token(req: NextRequest) {
  return await getToken({ req }) as JWTWithExtraData
}

export function Authorize<T>(roles: T[], role: T) {
  return roles.includes(role)
}