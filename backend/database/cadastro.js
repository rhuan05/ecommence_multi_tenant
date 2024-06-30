require('dotenv').config();
const sql = require('mssql');

const config = {
    server: process.env.SERVER,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    options: {
        trustedConnection: false,
        encrypt: false,
        trustServerCertificate: true
    },
};

exports.searchUser = async (user) => {
    try{
        let pool = await sql.connect(config);

        const userExists = await pool.request()
            .input('email', sql.VarChar, user)
            .query(`SELECT * FROM CADASTRO WHERE email = @email`);
    
        return userExists;
    }catch(error){
        console.error('Erro ao buscar usuário: ', error);
        throw error;
    }finally{
        sql.close();
    }
};

exports.insertUser = async (name, email, password) => {
    try{
        let pool = await sql.connect(config);

        await pool.request()
        .input('name', sql.VarChar, name)
        .input('email', sql.VarChar, email)
        .input('password', sql.VarChar, password)
        .query(`INSERT INTO CADASTRO (nome, email, senha) VALUES (@name, @email, @password)`)
    }catch(error){
        console.error('Erro ao inserir usuário: ', error);
        throw error;
    }finally{
        sql.close();
    }
};

exports.generateToken = async (email, password) => {
    try{
        let pool = await sql.connect(config);

        const userExists = await pool.request()
            .input('email', sql.VarChar, email)
            .input('senha', sql.VarChar, password)
            .query(`SELECT * FROM CADASTRO WHERE email = @email AND senha = @senha`);

        return userExists;
    }catch(error){
        console.error('Erro ao gerar token: ', error);
        throw error;
    }finally{
        sql.close();
    }
};