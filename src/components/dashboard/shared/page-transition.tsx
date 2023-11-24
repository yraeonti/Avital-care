'use client'
import { motion } from 'framer-motion'
import { ReactNode, useState, useEffect } from 'react'

export default function PageTransition({ children }: { children: ReactNode }) {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <motion.div
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            exit={{ opacity: 0.7, x: -20 }}
        >
            {children}
        </motion.div>
    )

}