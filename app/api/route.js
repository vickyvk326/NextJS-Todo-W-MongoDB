import { ConnectDB } from "@/lib/config/db";
import TodoModel from "@/models/todomodel";
import { NextResponse } from "next/server";

const LoadDB = async () => {
  await ConnectDB();
};

LoadDB();

export const GET = async () => {
  const todos = await TodoModel.find({});
  return NextResponse.json({ todos });
};

export const POST = async (req) => {
  const { title, description } = await req.json();

  await TodoModel.create({ title, description });

  return NextResponse.json({ message: "Todo created succesfully!" });
};

export const DELETE = async (req) => {
  const mongoId = await req.nextUrl.searchParams.get("mongoId");

  await TodoModel.findByIdAndDelete(mongoId);

  return NextResponse.json({ message: "Todo deleted succesfully!" });
};

export const PUT = async (req) => {
  const mongoId = await req.nextUrl.searchParams.get("mongoId");

  const todo = await TodoModel.findById(mongoId);

  await TodoModel.findByIdAndUpdate(mongoId, {
    $set: {
      isCompleted: !todo.isCompleted,
    },
  });

  return NextResponse.json({
    message: `Todo ${todo.isCompleted ? "undone" : "done"} succesfully!`,
  });
};
