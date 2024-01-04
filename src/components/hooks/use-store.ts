// import { Channel, ChannelType, Server } from "@prisma/client";
import { create } from "zustand";
import { createModalStore, ModalStore } from './modal-store'
import { createPatientStore, PatientStore } from "./patient-store";
import { createRequestStore, RequestStore } from "./request-history-store";


export const useStore = create<ModalStore & PatientStore & RequestStore>((...a) => ({
    ...createModalStore(...a),
    ...createPatientStore(...a),
    ...createRequestStore(...a)
}));