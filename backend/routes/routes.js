require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const router = express.Router();

const homeController = require('../controller/homeController');
const authController = require('../controller/authController');

router.use(bodyParser.json());

const verifyToken = (req, res, next)=>{
    const token = req.headers['authorization'];
    if(!token) return res.status(401).json({message: 'Acesso negado!'});
    
    try{
        const decoded = jwt.verify(token, process.env.SECRET);
        req.infoUser = decoded;
    }catch(error){
        return res.status(401).json({message: 'Token inválido!'});
    }
    next();
}

router.get('/home', verifyToken, homeController.home);

router.post('/create_user', authController.cadastro);
router.get('/token', authController.token);

module.exports = router;