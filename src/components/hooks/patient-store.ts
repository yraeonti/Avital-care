import { AxiosResponse } from "axios";
import { StateCreator } from 'zustand'
import { AxiosResponseModCount } from "@/app/services/types";
import { SessionCardProps } from "../dashboard/patient/sessions-cards";

type SessionData = AxiosResponseModCount<SessionCardProps[]> | undefined
type BookingData = AxiosResponseModCount<any> | undefined


export interface PatientStore {
    sessionData: SessionData
    sessionSearch: string;
    setSessionSearch: (search: string) => void
    setSessionData: (search: SessionData) => void
}

export const createPatientStore: StateCreator<
    PatientStore,
    [],
    [],
    PatientStore
> = (set) => ({
    sessionData: undefined,
    sessionSearch: '',
    setSessionSearch: (search: string,) => set({ sessionSearch: search }),
    setSessionData: (data: SessionData) => set({ sessionData: data }),
})

