import { useEffect, useState, lazy } from "react";

const ViewScheduler = lazy(() => import("../modals/view-schedule"))
const PatientDelAccount = lazy(() => import("../modals/patient-del-account"))
const PatientChangePassword = lazy(() => import("../modals/change-password"))
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
            <PatientDelAccount />
            <PatientChangePassword />
        </>
    )
}