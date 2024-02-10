import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
    const admin = await prisma.user.upsert({
        where: {
            email: 'admin@gmail.com',
        },
        update: {},
        create: {
            id: '9e5116e4-6eb2-4649-8183-f0b57266982d',
            email: 'admin@gmail.com',
            password: '',
            role: 'ADMIN'
        }
    })
    const specialties = await prisma.specialties.createMany({
        data: [
            { name: 'Obstetrics and gynecology', updatedAt: new Date() },
            { name: 'Occupational medicine', updatedAt: new Date() },
            { name: 'Laboratory', updatedAt: new Date() },
            { name: 'Ophthalmology', updatedAt: new Date() },
            { name: 'Orthopaedics', updatedAt: new Date() },
            { name: 'Otorhinolaryngology', updatedAt: new Date() },
            { name: 'Paediatric surgery', updatedAt: new Date() },
            { name: 'Paediatrics', updatedAt: new Date() },
            { name: 'Pathology', updatedAt: new Date() },
            { name: 'Pharmacology', updatedAt: new Date() },
            { name: 'Physical medicine and rehabilitation', updatedAt: new Date() },
            { name: 'Plastic surgery', updatedAt: new Date() },
            { name: 'Podiatric Medicine', updatedAt: new Date() },
            { name: 'Urology', updatedAt: new Date() },
            { name: 'Radiotherapy', updatedAt: new Date() },
            { name: 'Psychiatry', updatedAt: new Date() },
            { name: 'Neurosurgery', updatedAt: new Date() },
            { name: 'Nephrology', updatedAt: new Date() },
            { name: 'Immunology', updatedAt: new Date() },
            { name: 'Dermatology', updatedAt: new Date() },
            { name: 'Laboratory medicine', updatedAt: new Date() },
            { name: 'General Practice', updatedAt: new Date() },
            { name: 'Anaesthetics', updatedAt: new Date() },
            { name: 'Public health and Preventive Medicine', updatedAt: new Date() },
        ]
    })
    console.log({ admin, specialties })
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })