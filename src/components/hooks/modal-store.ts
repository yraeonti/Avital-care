
import { AxiosResponse } from "axios";
import { StateCreator } from 'zustand'
import { DoctorData } from "../dashboard/admin/doctors";
import { PatientData } from "../dashboard/admin/patients";
import { AxiosResponseMod } from "@/app/services/types";
import { SessionData } from "../dashboard/admin/sessions";

export enum ModalType {
    VIEWSCHEDULE = 'VIEWSCHEDULE',
    PATIENTACCOUNTSETTINGS = 'PATIENTACCOUNTSETTINGS',
    PATIENTVIEWACCOUNT = 'PATIENTVIEWACCOUNT',
    PATIENTDELACCOUNT = 'PATIENTDELACCOUNT',
    PATIENTCHANGEPASSWORD = 'PATIENTCHANGEPASSWORD',
    ADMINADDDOCTOR = 'ADMINADDDOCTOR',
    ADMINEDITDOCTOR = 'ADMINEDITDOCTOR',
    VIEWDOCTORACCOUNT = 'VIEWDOCTORACCOUNT',
    ADMINDELDOCTOR = 'ADMINDELDOCTOR',
    VIEWPATIENTACCOUNT = 'VIEWPATIENTACCOUNT',
    DOCTORVIEWACCOUNT = 'DOCTORVIEWACCOUNT',
    DOCTORDELACCOUNT = 'DOCTORDELACCOUNT',
    DOCTORACCOUNTSETTINGS = 'DOCTORACCOUNTSETTINGS',
    ADMINADDSESSION = 'ADMINADDSESSION',
    ADMINVIEWSESSION = 'ADMINVIEWSESSION',
    ADMINDELSESSION = 'ADMINDELSESSION',
}


export interface ModalData {
    networkData?: AxiosResponse<{ status: boolean, data: any }, any> | undefined
    specialtiesData?: AxiosResponse<{ status: boolean, data: any }, any> | undefined
    doctorData?: DoctorData
    patientData?: PatientData
    sessionData?: SessionData
}

export interface ModalStore {
    type: ModalType | null;
    data: ModalData;
    isOpen: boolean;
    isLoading: boolean;
    onOpen: (type: ModalType, data?: ModalData) => void;
    onClose: () => void;
}

export const createModalStore: StateCreator<
    ModalStore,
    [],
    [],
    ModalStore
> = (set) => ({
    type: null,
    data: {},
    isOpen: false,
    isLoading: false,
    onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
    onClose: () => set({ type: null, isOpen: false })

})