import { StateCreator } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'


export enum REQUESTHISTORY {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED'
}

export interface RequestStore {
    requestPatientId: string | null;
    requestId: string | null;
    requestStatus: REQUESTHISTORY;
    requestTimestamp: string;
    setRequestPatientId: (id: string | null) => void;
    setRequestId: (id: string | null) => void;
    setRequestStatus: (status: REQUESTHISTORY) => void;
    setRequestStamp: (createdAt: string) => void
}

export const createRequestStore: StateCreator<
    RequestStore,
    [], [["zustand/persist", unknown]]
> = persist(
    (set) => ({
        requestPatientId: null,
        requestId: null,
        requestStatus: REQUESTHISTORY.PENDING,
        requestTimestamp: '',
        setRequestPatientId: (id: string | null) => set({ requestPatientId: id }),
        setRequestId: (id: string | null) => set({ requestId: id }),
        setRequestStatus: (status: REQUESTHISTORY) => set({ requestStatus: status }),
        setRequestStamp: (createdAt: string) => set({ requestTimestamp: createdAt })
    }),
    {
        name: 'history-request-storage',
        storage: createJSONStorage(() => sessionStorage),
        partialize: (state) => ({
            requestTimestamp: state.requestTimestamp,
            requestId: state.requestId,
            requestStatus: state.requestStatus,
            requestPatientId: state.requestPatientId
        })
    }
)