'use client'

import { LogOut } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { User } from 'next-auth'
import { signOut } from 'next-auth/react';
import { toast } from 'sonner';
import UserAvatar from './UserAvatar';

export default function UserAccountNav({user} : {user: User}) {

    return <main className="mr-3 mb:mt-1 mb:text-xs">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <UserAvatar user={user}/>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='flex flex-col px-2 py-2 bg-[#171717] gap-1 border border-gray-700 rounded-md' align='end'> 
                        <div className='flex flex-col p-2'>
                            {user.name && <p className='text-sm'>{user.name}</p>}
                            {user.email && <p className='text-xs text-zinc-500 truncate'>{user.email}</p>}
                        </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <button onClick={async () => {
                        try {
                          await signOut({callbackUrl: '/'})
                           toast.success('Logged out successfully')
                        } catch(err) {
                            toast.error('Something went wrong !!!')
                        }
                        }} className='flex gap-2 p-2 rounded-md outline-none hover:text-red-600 hover:bg-gray-900 duration-200 border-none items-center w-full text-xs'>Log out <LogOut className='size-3'/></button>
                       </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
        </main>
}