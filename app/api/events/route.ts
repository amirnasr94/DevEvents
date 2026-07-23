import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import connectDB from "@/lib/mongodb";
import Event from "@/database/event.model";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const formData = await req.formData();
    let event;
    try {
      event = Object.fromEntries(formData.entries());
    } catch (e) {
      return NextResponse.json(
        {
          message: "Invalid Form Data",
        },
        { status: 400 },
      );
    }
    const image = formData.get("image") as File;
    const arrauBufer = await image.arrayBuffer();
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

    const createdEvent = await Event.create(event);
    return NextResponse.json(
      { message: "Event Created Successfully", event: createdEvent },
      { status: 201 },
    );
  } catch (e) {
    return NextResponse.json(
      {
        message: "Events Creation Failed!",
        error: e instanceof Error ? e.message : "Unknown",
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const events = await Event.find().sort({ createAt: -1 });
    return NextResponse.json(
      { message: "Event Fetching Successfully.", events },
      { status: 200 },
    );
  } catch (error) {
    NextResponse.json(
      { message: "Event fetching Failed", error },
      { status: 500 },
    );
  }
}
