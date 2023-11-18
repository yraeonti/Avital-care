
import {
    HomeIcon,
    DoctorIcon,
    BookingIcon,
    SettingIcon,
    ScheduleIcon,
    AppointmentIcon,
    DashboardIcon,
    PatientsIcon,
    SessionIcon
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
        link: '/patient/dashboard/doctors'
    },
    {
        icon: ScheduleIcon,
        name: 'Scheduled Sessions',
        link: '/patient/dashboard/sessions'
    },
    {
        icon: BookingIcon,
        name: 'My Bookings',
        link: '/patient/dashboard/bookings'
    },
    {
        icon: SettingIcon,
        name: 'Settings',
        link: '/patient/dashboard/settings'
    },
]
export const DoctorNavRoutes: NavItems = [
    {
        icon: DashboardIcon,
        name: 'Dashboard',
        link: '/doctor/dashboard'
    },
    {
        icon: AppointmentIcon,
        name: 'My Appointments',
        link: '/doctor/dashboard/appointments'
    },
    {
        icon: ScheduleIcon,
        name: 'My Sessions',
        link: '/doctor/dashboard/sessions'
    },
    {
        icon: PatientsIcon,
        name: 'My Patients',
        link: '#'
    },
    {
        icon: SettingIcon,
        name: 'Settings',
        link: '/doctor/dashboard/settings'
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
        icon: SessionIcon,
        name: 'Sessions',
        link: '/admin/dashboard/sessions'
    },
    {
        icon: AppointmentIcon,
        name: 'Appointments',
        link: '/admin/dashboard/appointments'
    },
    {
        icon: PatientsIcon,
        name: 'Patients',
        link: '/admin/dashboard/patients'
    },
]