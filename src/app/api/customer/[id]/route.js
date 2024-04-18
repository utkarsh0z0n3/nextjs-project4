import { connectionstr } from "@/app/lib/db"
import { foodSchema } from "@/app/lib/foodsModel"
import { restaurantSchema } from "@/app/lib/restaurantsModel"
import mongoose from "mongoose"
import { NextResponse } from "next/server"



export async function GET(request,content){
    const id = content.params.id
    await mongoose.connect(connectionstr,{useNewUrlParser:true})
    const result = await restaurantSchema.findById(id);
    const foodItems = await foodSchema.find({resto_id:id})

    return NextResponse.json({success:true, result,foodItems})
}