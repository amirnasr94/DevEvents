"use server";

import Evens from "@/database/event.model";
import connectDB from "../mongodb";

export async function getSimilarEventsBySlug(slug: string) {
  try {
    await connectDB();
    const event = await Evens.findOne({ slug });
    const similarEvents = await Evens.find({
      _id: { $ne: event._id },
      tags: { $in: event.tags },
    }).lean();
    return similarEvents;
  } catch (error) {
    return [];
  }
}
