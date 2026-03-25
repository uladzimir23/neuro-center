import { pb } from './client'
import type { Booking } from '@/shared/types'

export async function createBooking(data: Booking): Promise<void> {
  await pb.collection('bookings').create({
    name: data.name,
    phone: data.phone,
    service: data.service ?? '',
    message: data.message ?? '',
    status: 'new',
  })
}
