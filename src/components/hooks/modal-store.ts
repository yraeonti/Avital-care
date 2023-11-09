
import { AxiosResponse } from "axios";
import { StateCreator } from 'zustand'
import { DoctorData } from "../dashboard/admin/doctors";

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
}


export interface ModalData {
    networkData?: AxiosResponse<{ status: boolean, data: any }, any> | undefined
    doctorData?: DoctorData
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