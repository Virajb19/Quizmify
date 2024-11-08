import { AvatarFallback, Avatar} from "@radix-ui/react-avatar";
import { User } from "next-auth";
import Image from "next/image";
import { User as UserIcon } from 'lucide-react';

export default function UserAvatar({user} : {user: User}) {

  console.log('in userAvatar.tsx',user)

    return <Avatar>
    {user.image ? 
           (
            <div className="aspect-square">
              <Image src={user?.image} alt="profileImage" width={40} height={40} className="object-cover rounded-full" referrerPolicy="no-referrer"/>
            </div>
        ) : (
                <AvatarFallback>
                     <div className="flex-center size-10 rounded-full bg-green-900">
                       <UserIcon className="size-5" />
                  </div>
                </AvatarFallback>
        )
    }
        </Avatar>
}
