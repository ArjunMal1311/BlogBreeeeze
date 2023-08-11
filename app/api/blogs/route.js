import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from '../../lib/prismadb'
import { NextResponse } from "next/server";

export async function POST(request) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return console.log('No user');
    }

    const body = await request.json();
    const { name, description, imageSrc, tags } = body;
    const blog = await prisma.Blog.create({
        data: {
            name,
            imageSrc,
            description,
            tags,
            userId: currentUser.id
        }
    })

    await prisma.User.update({
        where: { id: currentUser.id },
        data: { numOfBlogs: currentUser.numOfBlogs + 1 },
    })

    return NextResponse.json(blog);

}