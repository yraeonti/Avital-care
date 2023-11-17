"use client"
import { useEffect, useState, lazy } from "react";

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
            <ViewDoctor />
        </>
    )
}