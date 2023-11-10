"use client"
import { useEffect, useState, lazy } from "react";

const DoctorAccountSettings = lazy(() => import("../modals/doctor-account-settings"))
const DoctorDelAccount = lazy(() => import("../modals/doctor-del-account"))
const DoctorViewAccount = lazy(() => import("../modals/doctor-view-account"))
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
        </>
    )
}