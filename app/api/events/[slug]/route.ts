import Evens, { IEvent } from "@/database/event.model";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

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

    const event: IEvent | null = await Evens.findOne({
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

export async function DELETE(_req: NextRequest, { params }: RouteParams) {
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
    const res = await Evens.deleteOne({
      slug: slug.trim().toLowerCase(),
    });

    if (res.deletedCount === 0) {
      return NextResponse.json(
        { message: "Failed to delete event." },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { message: "Event deleted successfully." },
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
        { message: "Cannot delete Event" },
        { status: 500 },
      );
    }
    return NextResponse.json(
      { message: "Accured an unexpected Error, Try Later!" },
      { status: 500 },
    );
  }
}

export async function PUT(req: NextRequest, { params }: RouteParams) {
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

    const formData = await req.formData();
    let event;
    try {
      event = Object.fromEntries(formData.entries());
    } catch (error) {
      return NextResponse.json(
        { message: "Invalid Form Data!" },
        { status: 400 },
      );
    }

    const imageFile = formData.get("image") as File;
    if (!imageFile)
      return NextResponse.json(
        { message: "Image File is Required!" },
        { status: 400 },
      );

    const arrauBufer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrauBufer);

    const uploadImageResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ resource_type: "image" }, (error, result) => {
          if (error) return reject(error);
          resolve(result);
        })
        .end(buffer);
    });
    event.image = (uploadImageResult as { secure_url: string }).secure_url;

    console.log({ slug });

    const response = await Evens.updateOne(
      { slug: { $eq: slug } },
      {
        $set: { description: "amir nasr3" },
      },
    );
    console.log(response);

    if (response.modifiedCount === 0) {
      return NextResponse.json({ message: "Update Failed." }, { status: 400 });
    }

    return NextResponse.json(
      { message: "Update Seccessfully." },
      { status: 201 },
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
        { message: "Cannot delete Event" },
        { status: 500 },
      );
    }
    return NextResponse.json(
      { message: "Accured an unexpected Error, Try Later!" },
      { status: 500 },
    );
  }
}
