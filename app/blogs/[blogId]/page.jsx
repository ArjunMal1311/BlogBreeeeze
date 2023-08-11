import BlogId from "@/app/BlogId";
import getBlogUser from "@/app/actions/getBlogUser";
import getBlogsById from "@/app/actions/getBlogsById";
import getCurrentUser from "@/app/actions/getCurrentUser";

export const metadata = {
  title: "Blog | BlogBreeeeze",
};

export default async function page({ params }) {
  const blog = await getBlogsById(params);
  const user = await getCurrentUser();

  const timestamp = blog.createdAt; // Replace with your actual timestamp
  const date = new Date(timestamp);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const formattedDate = date.toLocaleString("en-US", options);

  return (
    <div>
      <div className="">
        <BlogId
          name={blog.name}
          tags={blog.tags}
          description={blog.description}
          imageSrc={blog.imageSrc}
          date={formattedDate}
          author={getBlogUser(blog.userId)}
          blogId={blog.id}
          blogUserId={blog.userId}
          currentUser={user}
        />
      </div>
    </div>
  );
}
