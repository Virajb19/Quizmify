import { Loader } from 'lucide-react';

export default function Loading() {
    return <main className="w-full min-h-screen flex-center bg-black">
            <Loader className='size-20 text-green-700 animate-spin' />
        </main> 
}