'use client'
import styles from './Post.module.css'
 
import { useRouter } from 'next/navigation';
interface DeletePostButtonProps {
    postId: string;
}

const DeletePostButton: React.FC<DeletePostButtonProps> = ({ postId }) => {
    const router = useRouter();

    async function handleClick() {
        try {
            await fetch(`/api/post/${postId}`, {
                method: 'DELETE',
            });
            router.refresh();
        } catch (e) {
            console.error(e);
        }
    }

    return <button className={styles.deleteButton} onClick={handleClick}>&times;</button>;
};

export default DeletePostButton;
