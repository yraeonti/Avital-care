'use client';

import * as React from 'react';
import { useEdgeStore } from '@/lib/edgestore';
import Image from 'next/image';
import { UserCircleIcon } from 'lucide-react';
import { Input } from "@/components/ui/input"
import { Label } from '@/components/ui/label';
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"





type Props = {
    value: string;
    onchange: (url?: string) => void;
}

export default function FileUpload({ value, onchange }: Props) {

    const { edgestore } = useEdgeStore();
    const [file, setFile] = React.useState<File>();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const onFileUpload = async () => {
        if (file) {
            const res = await edgestore.publicFiles.upload({
                file,
                onProgressChange: (progress) => {
                    // you can use this to show a progress bar
                    console.log(progress);
                    setIsLoading(true)
                },
            });
            // you can run some server action or api here
            // to add the necessary data to your database
            console.log(res);

            setIsLoading(false)
            onchange(res.url)
        }

        console.log('file upload wayyy', value);
    }

    const onFileChange = async () => {
        if (file) {
            const res = await edgestore.publicFiles.upload({
                file,
                options: {
                    replaceTargetUrl: value,
                },
                onProgressChange: (progress) => {
                    // you can use this to show a progress bar
                    console.log(progress);
                    setIsLoading(true)
                },
            });

            console.log('File change ooooo', res);

            setIsLoading(false)
            onchange(res.url)
        }

    }

    return <div className=''>
        <Label>{value ? 'Change Profile Picture' : 'Upload Profile Picture'}</Label>
        <div className='flex items-center space-x-3 my-2'>




            {value ? (
                <Avatar className='w-[60px] h-[60px]'>
                    <AvatarImage src={value} />
                    <AvatarFallback></AvatarFallback>
                </Avatar>
            ) : (
                <div className='bg-stone-300 p-2 rounded-full'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                    </svg>
                </div>
            )}




            <Input type='file' className='my-2' onChange={(e) => {
                setFile(e.target.files?.[0]);
            }} />

            <div className=''>
                <Button
                    className='bg-blue-600 hover:bg-blue-800'
                    onClick={value ? onFileChange : onFileUpload}
                    disabled={isLoading}
                >
                    {isLoading && (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {
                        value ? 'Change Image' : 'Upload Image'
                    }
                </Button>
            </div>



        </div>



    </div>

}