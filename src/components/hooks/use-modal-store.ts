// import { Channel, ChannelType, Server } from "@prisma/client";
import { create } from "zustand";

export enum ModalType {
    VIEWSCHEDULE = 'VIEWSCHEDULE'
}

interface ModalData<T> {
    data: T
}

interface ModalStore<T> {
    type: ModalType | null;
    data: T;
    isOpen: boolean;
    onOpen: (type: ModalType, data?: T) => void;
    onClose: () => void;
}

export const useModal = create<ModalStore<{}>>((set) => ({
    type: null,
    data: {},
    isOpen: false,
    onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
    onClose: () => set({ type: null, isOpen: false })
}));