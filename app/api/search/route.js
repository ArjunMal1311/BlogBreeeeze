import { NextResponse } from 'next/server';
import prisma from '../../lib/prismadb'

export async function GET(req, res) {
    try {
        const { searchParams } = new URL(req.url);
        const tagsParam = searchParams.get('tags');
        const tags = tagsParam ? tagsParam.split(',') : []; // Split tags into an array

        const blogs = await prisma.blog.findMany({
            where: {
                tags: {
                    hasSome: tags
                }
            }
        });

        const safeBlogs = blogs.map((blog) => ({
            ...blog,
            createdAt: blog.createdAt.toISOString(),
        }));

        return NextResponse.json(safeBlogs)
    } catch (error) {
        throw new Error(error);
    }

};
