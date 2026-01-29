import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StartPage.css";

const StartPage = () =>{
    const [accepted, setAccepted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
  const checkAuth = async () => {
    const res = await fetch("http://localhost:3000/check", {
        method : "POST",
      credentials: "include"
    });

    if (res.ok) {
      navigate("/home"); 
    }
  };

    checkAuth();
    }, []);

    const registerUser = async () => {
  try {
    const res = await fetch("http://localhost:3000/register", {
      method: "POST",
      credentials: "include"
    });

    if (!res.ok) {
      console.error("Erreur register");
      return;
    }

    navigate("/home")
    } catch (err) {
        console.error(err);
    }
    };

    return(
        <div className="StartPage-container">
          <div className="StatPage-wrapper">
            <h1>POLTERGEIST</h1>
            <p>Welcome to our website</p>
            <div className="conditions-container">
                <h2>Terms and Conditions</h2>
                <div className="conditions-text">
                  <h3>1. Purpose</h3>
                  <p>
                    These Terms and Conditions of Use govern access to and use of the platform, an
                    online service allowing users to publish and view community content. The
                    platform mainly enables anonymous publication of messages, images, and
                    videos.
                  </p>

                  <h3>2. Acceptance of the Terms</h3>
                  <p>
                    Accessing and using the platform implies full and unconditional acceptance of
                    these Terms. If you do not agree with any part of the Terms, you must not use
                    the platform.
                  </p>

                  <h3>3. Access to the Service</h3>
                  <p>
                    The platform is accessible free of charge, except in cases of maintenance,
                    updates, or force majeure. The publisher reserves the right to suspend,
                    restrict, or terminate access at any time, without notice, particularly in
                    cases of abuse or violation of these Terms.
                  </p>

                  <h3>4. Content Publication</h3>
                  <p>
                    Users are solely responsible for the content they publish (texts, images,
                    videos, links). It is strictly forbidden to publish content that is illegal,
                    hateful, violent, discriminatory, sexually explicit involving minors,
                    incites violence or criminal activity, violates human dignity, infringes
                    intellectual property or privacy rights, or includes harassment, threats, or
                    doxxing.
                  </p>

                  <h3>5. Anonymity and Responsibility</h3>
                  <p>
                    The platform allows content publication without creating a personal account.
                    However, anonymity does not exempt users from legal responsibility. Upon
                    request by competent authorities, certain technical data (such as IP
                    addresses and timestamps) may be disclosed in accordance with applicable law.
                  </p>

                  <h3>6. Moderation and Use of Artificial Intelligence</h3>
                  <p>
                    The platform uses automated artificial intelligence systems to analyze posted
                    content, including images and videos, in order to detect illegal or
                    inappropriate material, limit the spread of prohibited content, and ensure
                    user safety. This may result in automatic blocking, removal of content, or
                    restriction of access. Automated decisions may be reviewed or supplemented by
                    human moderation.
                  </p>

                  <h3>7. Limitation of Liability</h3>
                  <p>
                    The publisher cannot be held responsible for content posted by users, for any
                    direct or indirect damage resulting from use of the platform, or for misuse
                    of the service. The platform is provided “as is” without any guarantee of
                    continuous availability or error-free operation.
                  </p>

                  <h3>8. Intellectual Property</h3>
                  <p>
                    All elements of the platform (interface, design, logo, structure) are
                    protected by intellectual property laws. User-generated content remains the
                    property of its authors, who grant the platform a non-exclusive license to
                    display, reproduce, and distribute the content as part of the service.
                  </p>

                  <h3>9. Personal Data</h3>
                  <p>
                    The platform collects a minimal amount of technical data necessary for its
                    operation and security. Data is processed in accordance with applicable data
                    protection regulations.
                  </p>

                  <h3>10. Modification of the Terms</h3>
                  <p>
                    These Terms may be modified at any time. The version in force at the time of
                    use of the platform shall apply.
                  </p>

                  <h3>11. Governing Law</h3>
                  <p>
                    These Terms are governed by the laws applicable in the country where the
                    platform operates. Any dispute shall fall under the jurisdiction of the
                    competent courts.
                  </p>
                </div>

                <div className="accept-conditions">
                  <input type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} className="Check-conditions"/>
                  <p>
                    I have read and accept the Terms and Conditions of Use. I understand that the
                    platform uses artificial intelligence to moderate content and that I am
                    responsible for my publications.
                  </p>

                </div>
                <button onClick={registerUser} disabled={!accepted}>Log in</button>
            </div>
          </div>
        </div>
    );
}

export default StartPage;