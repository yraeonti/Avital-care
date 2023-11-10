
import AnalyticsCard from "../shared/analytics-card"
import { Stethoscope, User2, Bookmark, CalendarCheck } from "lucide-react"



export default function Overview() {
    return (
        <section className="px-6">

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <AnalyticsCard title="All Doctors" figure={2} bg="bg-[#f7e1d7]" icon={<Stethoscope className="stroke-[#a9491d]" />} />
                <AnalyticsCard title="All Patients" figure={2} bg="bg-[#d0f4de]" icon={<User2 className="stroke-[#1ea351]" />} />
                <AnalyticsCard title="New Bookings" figure={0} bg="bg-[#a9d6e5] opacity-80" icon={<Bookmark className="stroke-[#157494]" />} />
                <AnalyticsCard title="Today Sessions" figure={0} bg="bg-[#babbec]" icon={<CalendarCheck className="stroke-[#3537b7]" />} />
            </div>

        </section>
    )
}