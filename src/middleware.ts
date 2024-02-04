import { NextResponse, NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    // retrieve the current response
    const res = NextResponse.next()


    // if the incoming is for the desired API endpoint
    if (req.nextUrl.pathname === '/api/publicdoctors') {
        res.headers.append('Access-Control-Allow-Credentials', "true")
        res.headers.append('Access-Control-Allow-Origin', '*')
        res.headers.append('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT')
        res.headers.append('Access-Control-Allow-Headers', 'Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, apiKey')
    }

    return res
}

// specify the path regex to apply the middleware to
export const config = {
    matcher: '/api/:path*',
}