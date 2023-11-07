import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

export enum Role {
    PATIENT = "PATIENT",
    DOCTOR = "DOCTOR"
}

export type SessionWithExtraData = Session & {
    role?: string,
}

// namespace JWT {
//     interface JWT extends JWTINITIAL {
//         id?: string,
//         role?: string
//     }
// }

export interface JWTWithExtraData extends JWT {
    id: string,
    role: string
}