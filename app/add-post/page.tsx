'use client'

import styles from '@/app/page.module.css';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import Image from 'next/image';

export default function AddPost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const router = useRouter();

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const result = await fetch('/api/add-post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, content }),
            });

            console.log(result);

            router.refresh();
            router.push('/');
        } catch (error) {
            console.error(error);
        }

        setTitle('');
        setContent('');
    };

    return (
        <main className={styles.main}>
            <Link  className={styles.viewFeed} href="/">View Feed</Link>
            <div className={styles.addForm}>
            <h1>Add Post</h1>            
            <form onSubmit={handleSubmit}>
                <div className={styles.inputRow}>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={handleTitleChange}
                        required
                    />
                </div>
                <div className={styles.inputRow}>
                    <label htmlFor="content">Content:</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={handleContentChange}
                        required
                    />
                </div>
                <button className={styles.addButton} type="submit">Add new post</button>
            </form>
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
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>
        </main>
    );
}
