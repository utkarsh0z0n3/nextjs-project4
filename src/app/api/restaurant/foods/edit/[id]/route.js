import { connectionstr } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/foodsModel";
import mongoose from "mongoose";
import {NextResponse} from "next/server";

export async function GET(request,content)
{
    const id = content.params.id;
    let success =false;
    await mongoose.connect(connectionstr,{useNewUrlParser:true});
    const result = await foodSchema.findById(id);
    if(result)
    {
        success =true
    }
    return NextResponse.json({result,success})
}

export async function PUT(request,content)
{
    const id = content.params.id;
    const payload = await request.json();
    let success = false;
    await mongoose.connect(connectionstr,{useNewUrlParser:true});
    const result = await foodSchema.findByIdAndUpdate(id,payload);
   
    if(result)
    {
        success =true
    }
    return NextResponse.json({result,success})
}