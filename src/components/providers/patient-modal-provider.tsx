"use client";

import { useEffect, useState, lazy } from "react";

const ViewScheduler = lazy(() => import("../modals/view-schedule"))
const PatientAccountSettings = lazy(() => import("../modals/patient-account-settings"))
const PatientDelAccount = lazy(() => import("../modals/patient-del-account"))
const PatientViewAccount = lazy(() => import("../modals/patient-view-account"))
const PatientChangePassword = lazy(() => import("../modals/change-password"))
const ViewDoctor = lazy(() => import("../modals/view-doctor-account"))
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
            <ViewScheduler />
            <PatientAccountSettings />
            <PatientDelAccount />
            <PatientViewAccount />
            <PatientChangePassword />
            <ViewDoctor />
        </>
    )
}