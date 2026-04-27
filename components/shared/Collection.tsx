import { IEvent } from '@/lib/mongodb/database/models/event.model'
import React from 'react'


type CollectionProps = {
    data: IEvent[],
    emptyTitle: string,
    emptyStateSubtext: string,
    limit: number,
    page: number | string,
    totalPages?: number,
    urlParamName?: string,
    collectionType?: 'Events_organized' | 'My_Tickets' | 'All_Events'
}

const Collection = ({ data,
    emptyTitle,
    emptyStateSubtext,
    page,
    totalPages,
    collectionType,
    urlParamName,
    limit }: CollectionProps) => {
    return (
        <>
        {data.length > 10 ? (
            <div>

            </div>
        ): (
            <div className='flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center'>
                <h3 className='p-bold-20 md:h5-bold'>{emptyTitle}</h3>
                <p>{emptyStateSubtext}</p>
            </div>
        )}
        </>
    )
}

export default Collection
