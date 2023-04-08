import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'
import prisma from '@/config/Prisma'

export default withIronSessionApiRoute(
  async function handler(req: any, res: NextApiResponse) {
    const { old_password, new_password } = req.body
  
      const foundUser = await prisma.user.findMany({
        where: {
          id: String(req.session.user.id)
        },
        select: {
          id: true,
          password: true
        }
      })
  
      if (!foundUser[0]) {
        return res.status(400).json({
          message: 'You are not logged in!'
        })
      }
      const userHashPassword = foundUser[0].password

      const matchedPassword = await bcrypt.compare(old_password, userHashPassword)

      if (!matchedPassword) {
        return res.status(400).json({
          message: 'Old password did not match.'
        })
      }

      const salt = await bcrypt.genSalt()
      const hashPassword = await bcrypt.hash(new_password, salt)
      
      const updatePassword = await prisma.user.update({
        where: {
          id: String(req.session.user.id)
        },
        data: {
          password: hashPassword
        }
      })

      res.status(200).json(updatePassword)
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