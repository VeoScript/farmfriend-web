import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiResponse } from 'next'
import prisma from '@/config/Prisma'

export default withIronSessionApiRoute(
  async function handler(req: any, res: NextApiResponse) {
    const { userId } = req.body
  
    const verifyAccount = await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        verified: true,
      }
    })
    
    res.status(200).json(verifyAccount)
  },
  {
    cookieName: "farmfriend_web",
    password: "complex_password_at_least_32_characters_long",
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  },
)