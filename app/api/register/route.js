import { NextResponse } from "next/server";
import bcrypt from "bcrypt"

import prisma from "../../lib/prismadb"

export async function POST(request) {
    const body = await request.json();
    const { email, name, password } = body;
    
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.User.create({
        data: { name, email, hashedPassword }
    });

    return NextResponse.json(user);

}