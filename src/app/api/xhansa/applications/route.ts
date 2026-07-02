import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminAuth } from '@/lib/auth'

// GET /api/xhansa/applications — List all xHansa applications (admin only)
export async function GET(request: NextRequest) {
  try {
    const isValid = await verifyAdminAuth(request)
    if (!isValid) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const cohort = searchParams.get('cohort')
    const status = searchParams.get('status')
    const limit = Math.min(parseInt(searchParams.get('limit') || '100', 10), 500)

    const where: Record<string, unknown> = {}
    if (cohort) where.cohort = cohort
    if (status) where.status = status

    const applications = await db.xHansaApplication.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit,
      select: {
        id: true,
        cohort: true,
        fullName: true,
        email: true,
        location: true,
        fieldPreferences: true,
        archetypeSelf: true,
        commitment24mo: true,
        stipendAcceptance: true,
        supremacyClause: true,
        gateSystem: true,
        cliffAcceptance: true,
        cruciblePreparedness: true,
        status: true,
        createdAt: true,
      },
    })

    const total = await db.xHansaApplication.count({ where })

    // Cohort breakdown
    const byCohort = await db.xHansaApplication.groupBy({
      by: ['cohort'],
      _count: { cohort: true },
    })

    // Status breakdown
    const byStatus = await db.xHansaApplication.groupBy({
      by: ['status'],
      _count: { status: true },
    })

    return NextResponse.json({
      applications,
      total,
      byCohort,
      byStatus,
    })
  } catch (error) {
    console.error('Error fetching xHansa applications:', error)
    return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 })
  }
}
