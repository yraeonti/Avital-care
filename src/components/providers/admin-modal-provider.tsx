"use client"
import { useEffect, useState, lazy } from "react";

const AddDoctor = lazy(() => import("../modals/admin-add-doctors"))
const EditDoctor = lazy(() => import("../modals/admin-edit-doctors"))
const DeleteDoctor = lazy(() => import("../modals/admin-del-doctors"))
const ViewPatientAccount = lazy(() => import("../modals/view-patient-account"))
const AddSession = lazy(() => import("../modals/admin-add-session"))
const DeleteSession = lazy(() => import("../modals/admin-del-session"))
const ViewDoctor = lazy(() => import("../modals/view-doctor-account"))
const ViewSession = lazy(() => import("../modals/admin-view-sessions"))
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
            <DeleteSession />
            <ViewDoctor />
            <ViewSession />
        </>
    )
}