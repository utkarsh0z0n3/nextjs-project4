import mongoose from "mongoose";
import { connectionstr } from "@/app/lib/db";
import {NextResponse} from "next/server";
import { foodSchema } from "@/app/lib/foodsModel";

export async function POST(request)
{
    let payload =await  request.json();
    let success=false;
    await mongoose.connect(connectionstr, {useNewUrlParser:true})
    const food = new foodSchema(payload);
    const result = await food.save();
    if(result){
        success=true
    }
    return NextResponse.json({result,success})
}