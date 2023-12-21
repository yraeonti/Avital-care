"use client"
import { useEffect, useState, lazy } from "react";

const DoctorAccountSettings = lazy(() => import("../modals/doctor-account-settings"))
const DoctorDelAccount = lazy(() => import("../modals/doctor-del-account"))
const DoctorViewAccount = lazy(() => import("../modals/doctor-view-account"))
const ViewDoctor = lazy(() => import("../modals/view-doctor-account"))
const ViewSession = lazy(() => import("../modals/admin-view-sessions"))
const DeleteSession = lazy(() => import("../modals/admin-del-session"))
const ViewPatientAccount = lazy(() => import("../modals/view-patient-account"))
const DelAppointment = lazy(() => import("../modals/del-appointment"))
const UpdateAppointment = lazy(() => import("../modals/update-appointment-status"))
const Diagnosis = lazy(() => import("../modals/diagnosis"))
const History = lazy(() => import("../modals/patient-history"))
const LabResultUpload = lazy(() => import("../modals/upload-lab-result"))
const RequestApproval = lazy(() => import("../modals/request-approval"))
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
            <DoctorAccountSettings />
            <DoctorDelAccount />
            <DoctorViewAccount />
            <ViewSession />
            <ViewDoctor />
            <ViewPatientAccount />
            <Diagnosis />
            <History />
            <LabResultUpload />
            <RequestApproval />
            <DeleteSession account="doctor" />
            <DelAppointment account="doctor" />
            <UpdateAppointment account="doctor" />
        </>
    )
}