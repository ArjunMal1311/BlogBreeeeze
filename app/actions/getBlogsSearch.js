
export default async (params) => {
    tags = ["asd", "sdf"]

    try {
        const blogs = await prisma.blog.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            where: {
                tags: {
                    some: {
                        name: {
                            in: tags.split(','), // Convert comma-separated tags to array
                        },
                    },
                },
            },
        });

        const safeBlogs = blogs.map((blog) => ({
            ...blog,
            createdAt: blog.createdAt.toISOString(),
        }));

        return safeBlogs;
    } catch (error) {
        throw new Error(error);
    }

};
