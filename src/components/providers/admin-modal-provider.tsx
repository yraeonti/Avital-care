"use client"
import { useEffect, useState, lazy } from "react";

const AddDoctor = lazy(() => import("../modals/admin-add-doctors"))
const EditDoctor = lazy(() => import("../modals/admin-edit-doctors"))
const DeleteDoctor = lazy(() => import("../modals/admin-del-doctors"))
const ViewPatientAccount = lazy(() => import("../modals/view-patient-account"))
const AddSession = lazy(() => import("../modals/admin-add-session"))
const ViewSession = lazy(() => import("../modals/admin-view-sessions"))
const DeleteSession = lazy(() => import("../modals/admin-del-session"))
export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <AddDoctor />
            <EditDoctor />
            <DeleteDoctor />
            <ViewPatientAccount />
            <AddSession />
            <ViewSession />
            <DeleteSession />
        </>
    )
}