import { withIronSessionApiRoute } from "iron-session/next";
import prisma from "@/config/Prisma";

export default withIronSessionApiRoute(
  async function handler(req: any, res) {
    const reports = await prisma.report.findMany({
      select: {
        id: true,
        type: true,
        description: true,
        created_at: true,
        updated_at: true
      }
    })

    res.status(200).json(reports)
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