import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prismadb';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')
  const period = searchParams.get('period')

  if (!type || !period) {
    return NextResponse.json({ error: 'Missing type or period parameter' }, { status: 400 })
  }

  let startDate: Date | null = null
  const now = new Date()

  switch (period) {
    case 'today':
      startDate = new Date(now.setHours(0, 0, 0, 0))
      break
    case '7days':
      startDate = new Date(now.setDate(now.getDate() - 7))
      break
    case '30days':
      startDate = new Date(now.setDate(now.getDate() - 30))
      break
    case 'alltime':
      startDate = null
      break
    default:
      return NextResponse.json({ error: 'Invalid period parameter' }, { status: 400 })
  }

  try {
    let result

    if (type === 'paid') {
      result = await prisma.order.aggregate({
        _sum: {
          amountPaid: true
        },
        where: startDate ? {
          createdAt: {
            gte: startDate
          }
        } : {}
      })
      return NextResponse.json({ total: result._sum.amountPaid || 0 })
    } else if (type === 'charged') {
      result = await prisma.order.aggregate({
        _sum: {
          price: true
        },
        where: startDate ? {
          createdAt: {
            gte: startDate
          }
        } : {}
      })
      return NextResponse.json({ total: result._sum.price || 0 })
    } else {
      return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 })
    }
  } catch (error) {
    console.error('Error fetching order analytics:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}