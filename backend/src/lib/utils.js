import jwt from "jsonwebtoken"

// JWT (JSON Web Token) is a compact, secure way to transmit information between parties as a JSON object. It's commonly used for authentication.

// create a jwt and send it in cookies back to user
export const generateToken = (userId, res) => {

    // jwt.sign() creates a token. it takes in (payload, secretkey, options)
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });

    // cookify the token
    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // Milliseconds
        httpOnly: true, // prevents XSS attacks cross-site scripting attacks
        sameSite: "strict", // CSRF attacks cross-site request forgery attacks
        secure: process.env.NODE_ENV === "production"
    });

    return token;
}