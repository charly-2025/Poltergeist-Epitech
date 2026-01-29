const AVATARS = [
  "1ghostfrance.png",
  "2ghostbretagne.png",
  "3ghostdemon.png",
  "4ghostgarfield.png",
  "5ghostimpostor.png",
  "6ghostupsidedown.png",
  "7ghosthomer.png",
  "8ghosteyes.png",
  "9ghostninja.png",
  "10ghostkitty.png",
];



export function getAvatar(userId, threadId) {
  const index = (userId * threadId) % AVATARS.length;
  return `/avatars/${AVATARS[index]}`;
}