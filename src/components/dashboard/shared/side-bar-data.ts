
import { HomeIcon, DoctorIcon, BookingIcon, SettingIcon, ScheduleIcon } from "./nav-icons";

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
        link: '#'
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