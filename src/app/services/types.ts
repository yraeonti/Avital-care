import { AxiosResponse } from "axios";
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

export enum Role {
    PATIENT = "PATIENT",
    DOCTOR = "DOCTOR"
}

export type SessionWithExtraData = Session & {
    role?: string,
}

export interface JWTWithExtraData extends JWT {
    id: string,
    role: string
}

export type AxiosResponseMod<T> = AxiosResponse<{ status: boolean, data: T }>


export type AxiosResponseModDoctors<T> = AxiosResponse<{ status: boolean, data: T, totalcount: number }>