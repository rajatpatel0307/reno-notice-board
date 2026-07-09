import prisma from "../../../lib/prisma";
import { getApiErrorMessage } from "../../../lib/apiError";
import { validateNotice } from "../../../lib/validateNotice";

export default async function handler(req, res) {
  const id = Number(req.query.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({ message: "Invalid notice id." });
  }

  try {
    if (req.method === "GET") {
      const notice = await prisma.notice.findUnique({ where: { id } });

      if (!notice) {
        return res.status(404).json({ message: "Notice not found." });
      }

      return res.status(200).json({ notice });
    }

    if (req.method === "PUT") {
      const result = validateNotice(req.body);

      if (!result.isValid) {
        return res.status(400).json({
          message: "Please fix the notice form errors.",
          errors: result.errors,
        });
      }

      const notice = await prisma.notice.update({
        where: { id },
        data: result.values,
      });

      return res.status(200).json({ notice });
    }

    if (req.method === "DELETE") {
      await prisma.notice.delete({ where: { id } });
      return res.status(204).end();
    }

    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    return res.status(405).json({ message: `Method ${req.method} is not allowed.` });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Notice not found." });
    }

    console.error(error);
    return res.status(500).json({ message: getApiErrorMessage(error) });
  }
}
