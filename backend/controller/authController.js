require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const cadastroDB = require('../database/cadastro');

app.use(bodyParser.json());

exports.cadastro = async (req, res)=>{
    const {name, email, password} = req.body;
    try{
        const userExists = await cadastroDB.searchUser(email);

        if(userExists.recordset.length > 0){
            return res.status(400).json({message: 'Usuário já existe!'});
        }

        await cadastroDB.insertUser(name, email, password);

        return res.status(200).json({message: 'Usuário criado com sucesso!'});
    }catch(error){
        console.error('Ocorreu um erro no cadastro: ', error);
        return res.status(500).json({message: 'Erro ao cadastrar usuário!'});
    }
}

exports.token = async (req, res)=>{
    const { email, password } = req.body;

    try{
        const userExists = await cadastroDB.generateToken(email, password);
        
        if(userExists.recordset.length === 0){
            return res.status(401).json({message: 'Usuário não encontrado!'});
        }else{
            const token = jwt.sign({ user: [userExists.recordset[0].cadastro_id, userExists.recordset[0].nome]}, process.env.SECRET );
            res.status(200).json({message: 'Token gerado com sucesso!', token});
        }
    }
    catch(error){
        console.error('Erro ao gerar token: ', error);
        return res.status(500).json({message: 'Erro ao gerar token!'});
    }
}