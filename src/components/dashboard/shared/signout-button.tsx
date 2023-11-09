"use client"

import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"

export default function SignOutButton() {
    return (
        <Button className="my-8 w-4/5" onClick={() => signOut()}>Log out</Button>
    )
}