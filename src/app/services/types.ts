import { Session } from "next-auth";

export enum Role {
    PATIENT = "PATIENT",
    DOCTOR = "DOCTOR"
}

export type SessionWithExtraData = Session & {
    role?: string,
}