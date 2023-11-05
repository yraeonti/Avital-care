import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth"
import { authOptions } from "@/app/services/config";





const handler = async (req: NextApiRequest, res: NextApiResponse) => {

        return await NextAuth(req, res, authOptions)
        
}

export { handler as GET, handler as POST }