import "./CreatePopUp.css";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
} from "@heroui/react";
import { useEffect, useState } from "react";

export default function CreatePopUp({
  isOpen,
  onOpenChange,
  onPostCreated,
  localization
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

 

      const handlePublish = async () => {
        if (!title.trim() || !content.trim()) {
          setError("Le titre et le contenu sont obligatoires");
          return;
        }

        setError("");
        setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/thread", {
        method: "POST",
        credentials:"include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          thread_title: title,
          thread_content: content,
          thread_country: localization.country,
          thread_city: localization.city,
        }),
      });

      if (!res.ok) throw new Error();

      const data = await res.json();

      onPostCreated(data);

      setTitle("");
      setContent("");

      onOpenChange(false);

    } catch (err) {
      console.error(err);
      setError("Impossible de publier le thread");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      size="xl"
      backdrop="blur"
      portalContainer={document.body}
      hideCloseButton
      classNames={{
        wrapper: "thread-wrapper",
        base: "thread-modal",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="thread-header">
              <span className="back-btn" onClick={onClose}>
                ← Back
              </span>
              <h2>New Thread</h2>
            </ModalHeader>

            <ModalBody className="thread-body scrollable">

              {error && <div className="thread-error">⚠ {error}</div>}

              <div className="thread-block">
                <h3>Title</h3>
                <Input
                  className="thread-textarea"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title of the thread"
                />
              </div>

              <div className="thread-block">
                <h3>Content</h3>
                <Textarea
                  className="thread-textarea"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your message..."
                />
              </div>
              <div className="thread-warning">
                📌 <strong>Important reminder</strong>
                <p>
                   Your post will be anonymous. Please follow the community guidelines.
                </p>
              <Button
                className="publish-btn"
                onPress={handlePublish}
                isDisabled={loading}
              >
                {loading ? "Publishing..." : "Publish thread"}
              </Button>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}