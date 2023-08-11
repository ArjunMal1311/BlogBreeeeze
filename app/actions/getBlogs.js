import prisma from '../lib/prismadb'


export default async function getBlogs(currentUser) {
    try {
        if (currentUser) {
            const blog = await prisma.blog.findMany({
                where: {
                    userId: currentUser.id,
                },
            })

            const safeblog = blog.map((blogs) => ({
                ...blogs,
                createdAt: blogs.createdAt.toISOString(),
            }));

            return safeblog;
        }

        const blog = await prisma.blog.findMany({
            orderBy: {
                createdAt: 'desc'
            },
        });

        const safeblog = blog.map((blogs) => ({
            ...blogs,
            createdAt: blogs.createdAt.toISOString(),
        }));

        return safeblog;
    } catch (error) {
        throw new Error(error);
    }
}