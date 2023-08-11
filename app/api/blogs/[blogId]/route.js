import { NextResponse } from "next/server";
import prisma from "../../../lib/prismadb"
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function DELETE(request, { params }) {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return NextResponse.error()
    }

    const { blogId } = params
    if (!blogId || typeof blogId !== 'string') {
        throw new Error('Invalid Id')
    }

    const blog = await prisma.blog.deleteMany({
        where: {
            id: blogId,
            userId: currentUser.id
        }
    });

    await prisma.User.update({
        where: { id: currentUser.id },
        data: { numOfBlogs: currentUser.numOfBlogs - 1 },
    })

    return NextResponse.json(blog)
}

export async function PUT(request, { params }) {
    console.log(params)
    const { blogId } = params
    const json = await request.json()
    const currentUser = await getCurrentUser()
    console.log(json)
    console.log(blogId)
    if (!currentUser) {
        return NextResponse.error()
    }

    if (!blogId || typeof blogId !== 'string') {
        throw new Error('Invalid Id')
    }

    const updated = await prisma.blog.update({
        where: {
            id: blogId,
        },
        data: json
    })

    return NextResponse.json(updated)
}