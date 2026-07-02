import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { isValidInput, checkRateLimit, getClientIp } from '@/lib/auth'

// POST /api/xhansa/apply — Submit an xHansa Fellowship application
export async function POST(request: NextRequest) {
  try {
    // Rate limit: 3 applications per IP per hour (deters spam/bots)
    const rl = checkRateLimit(getClientIp(request), 3, 60 * 60 * 1000)
    if (!rl.allowed) {
      return NextResponse.json(
        { error: 'Too many applications from this IP. Please try again later.' },
        { status: 429, headers: { 'Retry-After': String(Math.ceil((rl.retryAfterMs || 0) / 1000)) } }
      )
    }

    const body = await request.json()

    // Section 1: Required fields
    const { fullName, email, cohort } = body
    if (!fullName || !email || !cohort) {
      return NextResponse.json(
        { error: 'Missing required fields: fullName, email, cohort' },
        { status: 400 }
      )
    }

    // Input validation
    if (!isValidInput(fullName, 200)) {
      return NextResponse.json({ error: 'Name must be 1-200 characters' }, { status: 400 })
    }
    if (!isValidInput(email, 320) || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }
    if (!isValidInput(cohort, 50)) {
      return NextResponse.json({ error: 'Invalid cohort' }, { status: 400 })
    }

    // Commitment fields (Section 3) — must all be answered
    const commitmentFields = [
      'commitment24mo', 'stipendAcceptance', 'supremacyClause',
      'gateSystem', 'cliffAcceptance', 'cruciblePreparedness'
    ]
    for (const field of commitmentFields) {
      if (!body[field]) {
        return NextResponse.json({ error: `Commitment field missing: ${field}` }, { status: 400 })
      }
      if (!isValidInput(body[field], 20)) {
        return NextResponse.json({ error: `Invalid value for ${field}` }, { status: 400 })
      }
    }

    // Optional text fields — validate length if provided
    const textFields = [
      'mostSignificantBuild', 'currentOperations', 'whyFields', 'whatWouldYouBuild',
      'archetypeStory', 'hardestThing', 'cognitiveExhaustion', 'disagreementBelief',
      'whyXHansa', 'ifRejected', 'additionalInfo'
    ]
    for (const field of textFields) {
      if (body[field] && !isValidInput(body[field], 10000)) {
        return NextResponse.json({ error: `${field} is too long (max 10,000 characters)` }, { status: 400 })
      }
    }

    // Optional short fields
    const shortFields = [
      'phone', 'location', 'dateOfBirth', 'links', 'buildLink',
      'fieldPreferences', 'archetypeSelf', 'weakestArchetype', 'referrer', 'voucher'
    ]
    for (const field of shortFields) {
      if (body[field] && !isValidInput(body[field], 2000)) {
        return NextResponse.json({ error: `${field} is too long` }, { status: 400 })
      }
    }

    // Check for duplicate email within the same cohort
    const existing = await db.xHansaApplication.findFirst({
      where: { email: { equals: email }, cohort: { equals: cohort } },
    })
    if (existing) {
      return NextResponse.json(
        { error: 'An application with this email already exists for this cohort.' },
        { status: 409 }
      )
    }

    // Create the application
    const application = await db.xHansaApplication.create({
      data: {
        cohort,
        fullName,
        email,
        phone: body.phone || null,
        location: body.location || null,
        dateOfBirth: body.dateOfBirth || null,
        links: body.links || null,
        mostSignificantBuild: body.mostSignificantBuild || null,
        buildLink: body.buildLink || null,
        currentOperations: body.currentOperations || null,
        commitment24mo: body.commitment24mo,
        stipendAcceptance: body.stipendAcceptance,
        supremacyClause: body.supremacyClause,
        gateSystem: body.gateSystem,
        cliffAcceptance: body.cliffAcceptance,
        cruciblePreparedness: body.cruciblePreparedness,
        fieldPreferences: body.fieldPreferences || null,
        whyFields: body.whyFields || null,
        whatWouldYouBuild: body.whatWouldYouBuild || null,
        archetypeSelf: body.archetypeSelf || null,
        archetypeStory: body.archetypeStory || null,
        weakestArchetype: body.weakestArchetype || null,
        hardestThing: body.hardestThing || null,
        cognitiveExhaustion: body.cognitiveExhaustion || null,
        disagreementBelief: body.disagreementBelief || null,
        whyXHansa: body.whyXHansa || null,
        ifRejected: body.ifRejected || null,
        referrer: body.referrer || null,
        voucher: body.voucher || null,
        additionalInfo: body.additionalInfo || null,
      },
    })

    return NextResponse.json(
      {
        id: application.id,
        message: 'Application submitted successfully.',
        cohort: application.cohort,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('xHansa application error:', error)
    return NextResponse.json(
      { error: 'Failed to submit application. Please try again.' },
      { status: 500 }
    )
  }
}
