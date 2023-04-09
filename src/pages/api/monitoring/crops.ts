import { withIronSessionApiRoute } from "iron-session/next";
import prisma from "@/config/Prisma";

export default withIronSessionApiRoute(
  async function handler(req: any, res) {
    const crops = await prisma.crops.findMany({
      select: {
        id: true,
        image: true,
        name: true,
        description: true,
        temperature: true,
        created_at: true,
        updated_at: true
      }
    })

    res.status(200).json(crops)
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