import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiResponse } from 'next'
import prisma from '@/config/Prisma'

export default withIronSessionApiRoute(
  async function handler(req: any, res: NextApiResponse) {
    const updateAccount = await prisma.user.update({
      where: {
        id: String(req.session.user.id)
      },
      data: {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        address: req.body.address,
        contact_num: req.body.contact_num,
        email: req.body.email,
      }
    })

    res.status(200).json(updateAccount)
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