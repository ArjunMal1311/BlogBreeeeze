import prisma from '../lib/prismadb'

export default async function getBlogsById(params) {
    try {
        const { blogId } = params;
        const blog = await prisma.blog.findUnique({
            where: {
                id: blogId,
            },
            include: {
                user: true
            }
        });

        if (!blog) {
            return null;
        }

        return {
            ...blog,
            createdAt: blog.createdAt.toString(),
            user: {
                ...blog.user,
                createdAt: blog.user.createdAt.toString(),
                updatedAt: blog.user.updatedAt.toString(),
                emailVerified:
                    blog.user.emailVerified?.toString() || null,
            }
        };
    } catch (error) {
        throw new Error(error);
    }
}