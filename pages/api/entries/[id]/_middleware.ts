import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const id = req.page.params?.id || ''
  // console.log(req.page.params)
  const checkMongoIDRegExp = new RegExp('^[0-9a-fA-F]{24}$')

  if (!checkMongoIDRegExp.test(id)) {
    // return res.status(400).json({ message: 'Invalid ID ' + id })
    return new Response(JSON.stringify({ message: 'Invalid ID ' + id }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
  // return NextResponse.next()
}
