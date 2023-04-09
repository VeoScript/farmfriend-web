import { withIronSessionApiRoute } from "iron-session/next";
import prisma from "@/config/Prisma";

export default withIronSessionApiRoute(
  async function handler(req: any, res) {
    const rates = await prisma.rates.findMany({
      select: {
        id: true,
        feedback: true,
        rate: true,
        user: {
          select: {
            id: true,
            image: true,
            account_type: true,
            first_name: true,
            last_name: true
          }
        },
        created_at: true,
        updated_at: true
      }
    })

    res.status(200).json(rates)
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