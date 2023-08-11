import prisma from "../lib/prismadb"

export default async function getBlogUser( userId ) {
    try {
        const blogUser = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        return blogUser.name;
    } catch (error) {
        throw new Error(error);
    }
}