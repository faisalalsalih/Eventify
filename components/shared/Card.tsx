import { IEvent } from '@/lib/mongodb/database/models/event.model'
import React from 'react'
import Link from 'next/link'
import { formatDateTime } from '@/lib/utils'
import Image from 'next/image'
import { auth } from '@clerk/nextjs'
import { DeleteConfirmation } from './DeleteConfirmation'


type CardProps = {
  event: IEvent,
  hasOrderLinked?: boolean,
  hidePrice?: boolean
}



const Card = ({ event, hasOrderLinked, hidePrice }: CardProps) => {

  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;

  const isEventCreator = userId === event.organizer._id.toString();




  return (
    <div className="group relative flex flex-col
    min-h-[380px] md:min-h-[438px] w-full max-w-[400px]
    overflow-hidden rounded-xl bg-white shadow-md transition-all 
    hover:shadow-lg">

      <Link href={`/events/${event._id}`}
        style={{ backgroundImage: `url(${event.imageUrl})` }}
        className="flex-center flex-grow bg-gray-50 bg-cover
      bg-center text-gray-500" />


      {/* Show Edit & Delete Icon To The Creator of the Post */}
      {
        isEventCreator && !hidePrice && (
          <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
            
            <Link href={`/events/${event._id}/update`}>
            <Image src="/assets/icons/edit.svg" alt="edit" width={20} height={20}/>
            </Link>

            <DeleteConfirmation eventId={event._id} />


          </div>
        )
      }


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


        <p className="p-medium-16 p-medium-18 text-grey-500">
          {formatDateTime(event.startDateTime).dateTime}
        </p>

        <p className="p-medium-16 md:p-medium-20 line-clamp-2">
          {event.title}
        </p>


        <div className='flex-between w-full'>

          <p className="p-medium-14 md:p-medium-16 text-grey-600">
            {event.organizer.firstName} {event.organizer.lastName}
          </p>


          {
            hasOrderLinked && (

              <Link href={`/orders?eventId=${event._id}`} className='flex gap-2'>
                <p className='text-primary-500'>Order Details</p>
                <Image src="/assets/icons/arrow.svg" alt="Arrow" width={10} height={10} />
              </Link>


            )
          }

        </div>

      </Link>




    </div>
  )
}

export default Card
