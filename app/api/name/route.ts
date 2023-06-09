import { NextResponse } from 'next/server'

type Data = {
  name: string
}

const GET = () => {
  return NextResponse.json<Data>({ name: 'John Doe' }, { status: 200 })
}

export { GET }
