// import { Channel, ChannelType, Server } from "@prisma/client";
import { create } from "zustand";
import { AxiosResponse } from "axios";
import { createModalStore, ModalStore } from './modal-store'


export const useStore = create<ModalStore>((...a) => ({
    ...createModalStore(...a)
}));