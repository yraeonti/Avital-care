"use client";

import { useEffect, useState } from "react";

import ViewScheduler from "../modals/view-schedule";

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
        </>
    )
}