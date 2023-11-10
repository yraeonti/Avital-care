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

export const fetcherPost = ({ url, data }: { url: string, data: { [key: string]: string } }) => fetch(url, {
  method: 'POST',
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(data)
}).then((res) => res.json());


export async function Token(req: NextRequest) {
  return await getToken({ req }) as JWTWithExtraData
}