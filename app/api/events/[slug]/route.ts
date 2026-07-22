import Evens, { IEvent } from "@/database/event.model";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

type RouteParams = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(_req: NextRequest, { params }: RouteParams) {
  try {
    await connectDB();
    const { slug } = await params;

    if (!slug || typeof slug !== "string" || slug.trim() === "") {
      return NextResponse.json(
        {
          message: "Invalide or Missing slug Parameter",
        },
        { status: 400 },
      );
    }

    const event: IEvent | null = Evens.findOne({
      slug: slug.trim().toLowerCase(),
    }).lean();

    if (!event) {
      return NextResponse.json(
        {
          message: `Event with Slug ${slug} not Found!`,
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Esvent Fetched Successfully!", event },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes("MONGODB_URI")) {
        return NextResponse.json(
          {
            message: "Database configuration Error",
          },
          { status: 500 },
        );
      }

      return NextResponse.json(
        { message: "Cannot fetched Event" },
        { status: 500 },
      );
    }
    return NextResponse.json(
      { message: "Accured an unexpected Error, Try Later!" },
      { status: 500 },
    );
  }
}
