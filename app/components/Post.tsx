import DeletePostButton from "./DeletePostButton";
import styles from './Post.module.css'

interface PostProps {
    id: string;
    title: string;
    content: string | null;
    authorName?: string | null;
}

const Post: React.FC<PostProps> = ({ id, title, content, authorName }) => {
    return (
        <div className={styles.post}>
            <h3>{authorName}</h3>
            <h4>{title}</h4>
            <p>{content}</p>
            <DeletePostButton postId={id} />
        </div>
    );
};

export default Post;
