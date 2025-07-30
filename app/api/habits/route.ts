import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import HabitsCollection from "@/models/HabitSchema"
import { useEffect } from "react";
import { useGlobalContextProvider } from "@/app/types/contextAPI";

export async function POST(req: Request) {
    try {
        const { name, icon, frequency, completedDays, activeDropDown, startDate, endDate } = await req.json();

        await dbConnect();
        
        const habit = new HabitsCollection({
            name,
            icon,
            frequency,
            completedDays,
            activeDropDown,
            startDate, 
            endDate
        });
        
        const savedHabit = await habit.save();
        return NextResponse.json({ 
            habit: savedHabit // Changed to lowercase 'habit'
        });
    } catch (error: any) {
        console.log(error);
        return NextResponse.json(
            { error: error.message || "Server error" }, // Send only message
            { status: 400 }
        );
    }
}

export async function GET(req: any) {
    try {
        await dbConnect()
        const habits = await HabitsCollection.find({})
        // console.log(habits)
        return NextResponse.json({habits: habits})
    } catch (error) {
        return NextResponse.json({error: error}, {status: 400})
    }
}


export async function DELETE(req: any) {
    try {
        const {habitId} = await req.json()

        const habitToDelete = await HabitsCollection.findOneAndDelete({
            _id: habitId
        })
        if (!habitToDelete) {
            return NextResponse.json({message: "Habit not found"}, { status: 404})
        }
        return NextResponse.json({message: "Habit deleted successfully"});
    } catch(error) {
        return NextResponse.json({message: error})
    }
}

export async function PUT(req: any) {
    try {
        const habitId = req.nextUrl.searchParams.get("habitId")
        const { name, icon, frequency, completedDays, activeDropDown, endDate, startDate } = await req.json();

        if (!habitId) {
            return NextResponse.json({message: "Habit ID is required"}, {status: 400})
        }
        await dbConnect()

        const updatedHabit = await HabitsCollection.findOneAndUpdate(
            {_id: habitId},
            {
                $set: {
                    name, icon, frequency, completedDays, activeDropDown, endDate, startDate
                },
            },
            { new: true }  // Corrected to 'new: true'
        )

        // console.log(updatedHabit)

        return NextResponse.json({
            message: "Habit has been updated successfully",
            habit: updatedHabit,  // Updated habit object after update operation
        });
    } catch (error) {
        console.error("Error updating habit:", error)
        return NextResponse.json(
            {message: "An error occurred while updating the habit"},
            {status: 500}
        )
    }
}