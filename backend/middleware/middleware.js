import jwt from "jsonwebtoken"

const middleware = (req, res, next) => {

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      message: 'Unauthorized. No token.'
    });
  }
  try {
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.anonyme_id = decoded;   

    next();
  } catch (error) {
    return res.status(403).json({
     message: "Invalid or expired token",
    });
  }
};

export default middleware;