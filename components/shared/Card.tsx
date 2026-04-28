import { IEvent } from '@/lib/mongodb/database/models/event.model'
import React from 'react'
import Link from 'next/link'
import { formatDateTime } from '@/lib/utils'

type CardProps = {
  event: IEvent,
  hasOrderLinked?: boolean,
  hidePrice?: boolean
}



const Card = ({ event, hasOrderLinked, hidePrice }: CardProps) => {

  console.log(event);


  return (
    <div className="group relative flex flex-col
    min-h-[380px] md:min-h-[438px] w-full max-w-[400px]
    overflow-hidden rounded-xl bg-white shadow-md transition-all 
    hover:shadow-lg">

      <Link href={`/events/${event._id}`} style={{ backgroundImage: `url(${event.imageUrl})` }} className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-gray-500" />

      <Link href={`/events/${event._id}`} className="flex flex-col min-h-[230px] gap-3 p-5 md:gap-4">
      
      {!hidePrice && <div className="flex gap-2">

        <span className="p-semibold-14 w-min rounded-full bg-green-100 px-4 py-1 text-green-60">
          {event.isFree ? 'FREE' : `$${event.price}`}
        </span>

        <p className="p-semibold-14 w-min rounded-full bg-grey-500/10 px-4 py-1 text-grey-500">
          {event?.category?.name ? event.category.name : 'Uncategorized'}
        </p>
      </div>
      }


      <p>
        {formatDateTime(event.startDateTime).dateTime}
      </p>

      </Link>




    </div>
  )
}

export default Card
