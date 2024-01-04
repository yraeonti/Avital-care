import { Icons } from "@/components/icons"
export default function PageLoader() {
    return (
        <div className="h-full fixed bg-white/70 inset-0  flex items-center justify-center">

            <Icons.spinner className="h-8 w-8 animate-spin" />

        </div>
    )
}