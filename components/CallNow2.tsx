import React, { FC } from 'react'
import { Button } from './ui/button'
import { siteConfig } from '@/lib/config'
import { PhoneCall } from 'lucide-react'


interface CallNowProps {
    withNumber?: string
}

const CallNow2: FC<CallNowProps> = ({ withNumber = false }) => {
    return (
        <a href={`tel:${siteConfig.brand.phoneLink}`}>
            <Button className="bg-orange-700 hover:bg-blue-600 cursor-pointer text-xl px-24"><PhoneCall className='text-xl' /> {withNumber ? siteConfig.brand.phone : "Call Now"}</Button>
        </a>
    )
}

export default CallNow2;