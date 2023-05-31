import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'
import prisma from '@/config/Prisma'

export default withIronSessionApiRoute(
  async function handler(req: any, res: NextApiResponse) {
    const { email, password } = req.body
  
    const foundUser = await prisma.user.findUnique({
      where: {
        email: email
      },
      select: {
        id: true,
        account_type: true,
        email: true,
        password: true
      }
    })

    if (!foundUser) {
      return res.status(401).json({
        message: 'Account not found, create account first.'
      })
    }

    const userId = foundUser.id
    const accountType = foundUser.account_type
    const userHashPassword = foundUser.password

    const matchedPassword = await bcrypt.compare(password, userHashPassword)

    if (!matchedPassword) {
      return res.status(401).json({
        message: 'Password is incorrect!'
      })
    }

    if (accountType !== 'ADMIN') {
      return res.status(401).json({
        message: 'Only administrator is allowed!'
      })
    }

    req.session.user = { id: userId, account_type: accountType }

    await req.session.save();
    
    res.status(200).json({
      message: 'Logged in successfully.'
    })
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