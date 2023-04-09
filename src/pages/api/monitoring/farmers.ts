import { withIronSessionApiRoute } from "iron-session/next";
import prisma from "@/config/Prisma";

export default withIronSessionApiRoute(
  async function handler(req: any, res) {
    const farmers = await prisma.user.findMany({
      where: {
        account_type: 'FARMERS'
      },
      select: {
        id: true,
        account_type: true,
        image: true,
        first_name: true,
        last_name: true,
        address: true,
        contact_num: true,
        email: true,
        created_at: true,
        updated_at: true
      }
    })

    res.status(200).json(farmers)
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