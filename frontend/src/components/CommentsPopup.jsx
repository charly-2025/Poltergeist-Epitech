
import "./CommentsPopup.css";
import { useEffect, useState } from "react";
import { Avatar } from "@heroui/react";

const CommentsPopup = ({ postId, open, onClose }) => {
    const [listComments, setListComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [internalOpen, setInternalOpen] = useState(false);
    const isControlled = typeof open === 'boolean';
    const isOpen = isControlled ? open : internalOpen;

    function timeAgo(dateString) {
        const now = new Date();
        const past = new Date(dateString);
        const diffMs = now - past;

        const seconds = Math.floor(diffMs / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30);
        const years = Math.floor(days / 365);

        if (seconds < 60) return "just";
        if (minutes < 60) return `${minutes} min `;
        if (hours < 24) return `${hours} h `;
        if (days < 30) return `${days} days `;
        if (months < 12) return `${months} months `;
        return `${years} years `;
    }

    useEffect(() => {
        if (!isOpen) return;
        const fetchComments = async () => {
            try {
                const response = await fetch(`http://localhost:3000/thread/${postId}/replies`, {
                    method: 'GET',
                    credentials: 'include'
                });
                if (!response.ok) return;
                const data = await response.json();
                setListComments(data);
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };

        fetchComments();
    }, [postId, isOpen]);

    const handleAddComment = async () => {
        if (!newComment.trim()) return;
        try {
            const response = await fetch(`http://localhost:3000/thread/${postId}/replies`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ rep_content: newComment }),
            });
            if (response.ok) {
                const data = await response.json();
                setListComments(prev => [...prev, data]);
                setNewComment("");
            }
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    }

    const openPopup = () => {
        if (isControlled) return;
        setInternalOpen(true);
    };
    const closePopup = () => {
        if (isControlled) return onClose && onClose();
        setInternalOpen(false);
    };

    return (
        <>
            {!isControlled && (
                <button className="CommentsPopup-open-btn" onClick={openPopup} aria-expanded={isOpen}>
                    Voir les commentaires
                </button>
            )}

            {isOpen && (
                <div className="CommentsPopup-overlay" onClick={closePopup}>
                    <div className="CommentsPopup-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
                        <button className="CommentsPopup-close" onClick={closePopup} aria-label="Close">×</button>
                        <h3 className="CommentsPopup-title">Commentaires</h3>

                        <div className="CommentsPopup-list">
                            {listComments.length === 0 ? (
                                <div className="CommentsPopup-empty">Aucun commentaire</div>
                            ) : (
                                listComments.map((comment) => (
                                    <div key={comment.rep_id} className="CommentsPopup-comment">
                                        <div className="CommentsPopup-comment-header">
                                            <Avatar  name="Anonymous" size="sm" className="CommentsPopup-avatar"/>
                                            <div className="CommentsPopup-comment-info">
                                                <span className="CommentsPopup-username">Anonymous</span>
                                                <span className="CommentsPopup-timestamp">- {timeAgo(comment.createdAt)} ago</span>
                                            </div>
                                        </div>
                                        <p className="CommentsPopup-comment-text">{comment.rep_content}</p>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="CommentsPopup-add">
                            <textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Ajouter un commentaire..."
                            />
                            <button onClick={handleAddComment} className="CommentsPopup-submit">Envoyer</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default CommentsPopup;

