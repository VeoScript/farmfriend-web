import { withIronSessionApiRoute } from "iron-session/next";
import prisma from "@/config/Prisma";

export default withIronSessionApiRoute(
  async function handler(req: any, res) {
    const count = await prisma.user.count({
      where: {
        account_type: 'FARMERS'
      }
    })

    res.status(200).json(count)
  },
  {
    cookieName: "farmfriend_web",
    password: "complex_password_at_least_32_characters_long",
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  },
);