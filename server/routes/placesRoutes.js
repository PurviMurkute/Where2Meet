import express from 'express';
import verifyJwt from '../middlewares/jwt.js';
import getPlaces from '../controllers/Places.js';

const placesRoutes = express.Router();

placesRoutes.post('/places/:groupCode', verifyJwt, getPlaces);

export default placesRoutes;