import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import userSchemaModal from '../models/userSchemaModal.js';
import '../components/passport.js';

const router = express.Router();
const CLIENT_URI = "http://localhost:3000/";

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
}));

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    async (req, res) => {
        try {
            const payload = {
                user: {
                    id: req.user.id,
                },
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
            console.log('Generated token:', token);

            const user = {
                id: req.user.id,
                name: req.user.name,
                email: req.user.email,
                avatar: req.user.avatar,
            };
console.log(",user",user)
            const query = new URLSearchParams({
                token: token,
                id: user.id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                authType: "google"
            }).toString();

            console.log("query", query);

            res.redirect(`http://localhost:3000/?${query}`);
        } catch (error) {
            console.error('Error during Google callback:', error);
            res.status(500).send({ message: 'Server Error' });
        }
    }
);

export default router;
