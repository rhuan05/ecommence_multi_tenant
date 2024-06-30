require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const userDB = require('../database/user');

app.use(bodyParser.json());

exports.home = (req, res) => {
    try{
        return res.status(200).json({ message: 'Logado com sucesso', user: req.infoUser });
    }catch(error){
        console.error('Erro carregar informações: ', error);
        return res.status(500).json({message: 'Erro carregar informações.'});
    }

}