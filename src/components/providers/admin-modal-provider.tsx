"use client"
import { useEffect, useState, lazy } from "react";

const AddDoctor = lazy(() => import("../modals/admin-add-doctors"))
const EditDoctor = lazy(() => import("../modals/admin-edit-doctors"))
const ViewDoctor = lazy(() => import("../modals/view-doctor-account"))
const DeleteDoctor = lazy(() => import("../modals/admin-del-doctors"))
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
            <ViewDoctor />
            <DeleteDoctor />

        </>
    )
}