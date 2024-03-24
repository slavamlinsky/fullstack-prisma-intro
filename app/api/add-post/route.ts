// import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
const prisma = new PrismaClient();

export async function POST(request: { json: () => any }) {
  const res = await request.json();
  const { title, content } = res;

  const result = await prisma.post.create({
    data: {
      title,
      content,
      published: true,
      author: {
        create: {
          name: "ryan",
        },
      },
    },
  });

  return NextResponse.json({ result });
}
