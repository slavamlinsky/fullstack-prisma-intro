import Image from "next/image";
import styles from "./page.module.css";
import Post from "./components/Post";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";
const prisma = new PrismaClient();

async function getPosts() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return posts;
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className={styles.main}>
      <div className={styles.feed}>
        <h1>My Social Feed</h1>
        <Link className={styles.addPost} href="/add-post">
          Add new post
        </Link>
        {posts.map((post) => {
          return (
            <Post key={post.id} id={post.id} title={post.title} content={post.content} authorName={post.author?.name} />
          );
        })}
      </div>
      <div className={styles.description}>
        <p>
          Geeeet started by editing&nbsp;
          <code className={styles.code}>app/page.tsx</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image src="/vercel.svg" alt="Vercel Logo" className={styles.vercelLogo} width={100} height={24} priority />
          </a>
        </div>
      </div>
    </main>
  );
}
