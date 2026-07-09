import prisma from "../../../lib/prisma";
import { getApiErrorMessage } from "../../../lib/apiError";
import { validateNotice } from "../../../lib/validateNotice";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const notices = await prisma.notice.findMany({
        // Priority enum order is Normal, Urgent, so desc returns Urgent first.
        orderBy: [
          { priority: "desc" },
          { publishDate: "desc" },
          { createdAt: "desc" },
        ],
      });

      return res.status(200).json({ notices });
    }

    if (req.method === "POST") {
      const result = validateNotice(req.body);

      if (!result.isValid) {
        return res.status(400).json({
          message: "Please fix the notice form errors.",
          errors: result.errors,
        });
      }

      const notice = await prisma.notice.create({
        data: result.values,
      });

      return res.status(201).json({ notice });
    }

    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).json({ message: `Method ${req.method} is not allowed.` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: getApiErrorMessage(error) });
  }
}
