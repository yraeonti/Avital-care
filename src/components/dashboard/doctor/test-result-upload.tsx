'use client';

import * as React from 'react';
import { useEdgeStore } from '@/lib/edgestore';
import { Input } from "@/components/ui/input"
import { Label } from '@/components/ui/label';
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons";
import { FileIcon, X } from 'lucide-react';





type Props = {
    value: string | null;
    onchange: (url?: string | null) => void;
}

export default function TestResultUpload({ value, onchange }: Props) {

    const { edgestore } = useEdgeStore();
    const [file, setFile] = React.useState<File>();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const fileType = value?.split(".").pop();

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
    }


    if (value && fileType === 'pdf') {
        return (
            <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
                <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
                <a
                    href={value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline truncate max-w-xs"
                >
                    {value}
                </a>
            </div>
        )
    }

    return <div className='flex justify-center items-center space-x-3'>

        <Label>
            (Upload pdf only)
        </Label>

        <Input type='file' accept="application/pdf" className='my-2' onChange={(e) => {
            setFile(e.target.files?.[0]);
        }} />

        <div className=''>
            <Button
                className='bg-blue-800 hover:bg-blue-900'
                onClick={onFileUpload}
                disabled={isLoading}
            >
                {isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Upload
            </Button>
        </div>
    </div>





}