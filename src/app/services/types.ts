import { AxiosResponse } from "axios";
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

export enum Role {
    PATIENT = "PATIENT",
    DOCTOR = "DOCTOR"
}

export enum APPOINTMENTSTATUS {
    PENDING = 'PENDING',
    CANCELLED = 'CANCELLED',
    DONE = 'DONE'
}

export type SessionWithExtraData = Session & {
    role?: string,
    specialty?: string
}

export interface JWTWithExtraData extends JWT {
    id: string,
    role: string
}

export type AxiosResponseMod<T> = AxiosResponse<{ status: boolean, data: T }>


export type AxiosResponseModCount<T> = AxiosResponse<{ status: boolean, data: T, totalcount: number }>


