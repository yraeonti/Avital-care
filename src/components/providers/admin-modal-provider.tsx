"use client"
import { useEffect, useState, lazy } from "react";

const AddDoctor = lazy(() => import("../modals/admin-add-doctors"))
const AddLaboratory = lazy(() => import("../modals/admin-add-lab"))
const EditDoctor = lazy(() => import("../modals/admin-edit-doctors"))
const DeleteDoctor = lazy(() => import("../modals/admin-del-doctors"))
const ViewPatientAccount = lazy(() => import("../modals/view-patient-account"))
const AddSession = lazy(() => import("../modals/admin-add-session"))
const DeleteSession = lazy(() => import("../modals/admin-del-session"))
const ViewDoctor = lazy(() => import("../modals/view-doctor-account"))
const ViewSession = lazy(() => import("../modals/admin-view-sessions"))
const DelAppointment = lazy(() => import("../modals/del-appointment"))
const UpdateAppointment = lazy(() => import("../modals/update-appointment-status"))
const History = lazy(() => import("../modals/patient-history"))
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
            <AddLaboratory />
            <EditDoctor />
            <DeleteDoctor />
            <ViewPatientAccount />
            <AddSession />
            <DeleteSession account="admin" />
            <ViewDoctor />
            <ViewSession />
            <History />
            <DelAppointment account="admin" />
            <UpdateAppointment account="admin" />
        </>
    )
}