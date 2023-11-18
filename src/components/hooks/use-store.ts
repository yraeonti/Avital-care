// import { Channel, ChannelType, Server } from "@prisma/client";
import { create } from "zustand";
import { AxiosResponse } from "axios";
import { createModalStore, ModalStore } from './modal-store'
import { createPatientStore, PatientStore } from "./patient-store";


export const useStore = create<ModalStore & PatientStore>((...a) => ({
    ...createModalStore(...a),
    ...createPatientStore(...a)
}));