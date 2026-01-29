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
import { useState } from "react";

export default function CreatePopUp({
  isOpen,
  onOpenChange,
  placement = "center",
  size = "lg",
  backdrop = "blur",
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [location, setLocation] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [tags, setTags] = useState([]);
  const [error, setError] = useState("");

  const addTag = () => {
    if (!hashtags || tags.length >= 5) return;
    setTags([...tags, hashtags]);
    setHashtags("");
  };
  const handlePublish = () => {
  //ici plus tard POST API
    if (!title.trim() || !content.trim()) {
    setError("Le titre et le contenu sont obligatoires");
    return;
  }

  setError("");
  setTitle("");
  setContent("");
  setLocation("");
  setTags([]);
  setHashtags("");

  onOpenChange(false);
};

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      size="xl"
      backdrop="blur"
      portalContainer={document.body}
      classNames={{
        wrapper: "thread-wrapper",
        base: "thread-modal",
      }}
      hideCloseButton={true}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="thread-header">
              <span className="back-btn" onClick={onClose}>
                ← Retour
              </span>
              <h2>Nouveau Thread</h2>
            </ModalHeader>

            <ModalBody className="thread-body scrollable">
              {error && (
                <div className="thread-error">
                  ⚠ {error}
                </div>
              )}
              
              <div className="thread-block">
                <div className="thread-label">
                  <span className="icon green">T</span>
                  <h3>Titre du thread</h3>
                </div>

                <Input
                  className="thread-textarea"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Donnez un titre accrocheur à votre thread..."
                />

                <span className="counter">{title.length}/100</span>
              </div>

           
              <div className="thread-block">
                <div className="thread-label">
                  <span className="icon green">≡</span>
                  <h3>Contenu</h3>
                </div>

                <Textarea
                  className="thread-textarea"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Partagez votre histoire..."
                />


                <span className="counter">{content.length}/1000</span>
              </div>

             
              <div className="thread-block">
                <div className="thread-label">
                  <span className="icon green"></span>
                  <h3>Localisation</h3>
                </div>

                <Input
                  className="thread-textarea"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Sélectionnez ou tapez votre ville..."
                />
              </div>

              
              <div className="thread-block">
                <div className="thread-label">
                  <span className="icon green">#</span>
                  <h3>Hashtags</h3>
                </div>

                <div className="tag-row">
                  <Input
                    className="thread-textarea"
                    value={hashtags}
                    onChange={(e) => setHashtags(e.target.value)}
                    placeholder="Ajoutez un hashtag..."
                  />
                  <Button onPress={addTag} className="tag-add">
                    Ajouter
                  </Button>
                </div>

                <div className="tags">
                  {tags.map((t, i) => (
                    <span key={i} className="tag">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

             
              <div className="thread-warning">
                📌 <strong>Rappel important</strong>
                <p>
                  Votre publication sera anonyme. Respectez les règles de la
                  communauté.
                </p>
                 <Button className="publish-btn" onPress={handlePublish}>
                    ✈ Publier le thread
                </Button>

              </div>

            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
