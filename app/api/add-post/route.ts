// import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
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

  revalidatePath("/");

  return NextResponse.json({ result });
}
