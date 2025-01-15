import { AvatarFallback, Avatar} from "@radix-ui/react-avatar";
import Image from "next/image";
import { User } from 'lucide-react';
import { useSession } from "next-auth/react";

export default function UserAvatar() {

  const {data: session} = useSession()
  const user = session?.user

    return <Avatar>
    {user?.image ? 
           (
            <div className="aspect-square">
              <Image src={user?.image} alt="profileImage" width={45} height={45} className="object-cover rounded-full" referrerPolicy="no-referrer"/>
            </div>
        ) : (
                <AvatarFallback>
                     <div className="flex-center size-12 rounded-full bg-gradient-to-b from-blue-400 to-blue-700">
                       <User className="size-7" />
                  </div>
                </AvatarFallback>
        )
    }
        </Avatar>
}
