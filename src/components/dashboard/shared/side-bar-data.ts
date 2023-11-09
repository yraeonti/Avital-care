
import {
    HomeIcon,
    DoctorIcon,
    BookingIcon,
    SettingIcon,
    ScheduleIcon,
    AppointmentIcon,
    DashboardIcon,
    PatientsIcon
} from "./nav-icons";

export type NavItems = {
    icon: string | (() => JSX.Element);
    name: string;
    link: string
}[]


export const PatientNavRoutes: NavItems = [
    {
        icon: HomeIcon,
        name: 'Home',
        link: '/patient/dashboard'
    },
    {
        icon: DoctorIcon,
        name: 'All Doctors',
        link: '#'
    },
    {
        icon: ScheduleIcon,
        name: 'Scheduled Sessions',
        link: '#'
    },
    {
        icon: BookingIcon,
        name: 'My Bookings',
        link: '#'
    },
    {
        icon: SettingIcon,
        name: 'Settings',
        link: '/patient/dashboard/settings'
    },
]
export const DoctorNavRoutes: NavItems = [
    {
        icon: '',
        name: 'Home',
        link: '/patient/dashboard'
    },
    {
        icon: '',
        name: 'All Doctors',
        link: '#'
    },
    {
        icon: '',
        name: 'Scheduled Sessions',
        link: '#'
    },
    {
        icon: '',
        name: 'My Bookings',
        link: '#'
    },
    {
        icon: '',
        name: 'Settings',
        link: '#'
    },
]

export const AdminNavRoutes: NavItems = [
    {
        icon: DashboardIcon,
        name: 'Dashboard',
        link: '/admin/dashboard'
    },
    {
        icon: DoctorIcon,
        name: 'Doctors',
        link: '/admin/dashboard/doctors'
    },
    {
        icon: ScheduleIcon,
        name: 'Schedule',
        link: '#'
    },
    {
        icon: AppointmentIcon,
        name: 'Appointments',
        link: '#'
    },
    {
        icon: PatientsIcon,
        name: 'Patients',
        link: '#'
    },
]