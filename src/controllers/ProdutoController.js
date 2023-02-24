import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

import Repository from "../repositories/ProdutoRepository.js";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

class ProdutoController{
    static async listar(req, res){
        try {
            let produtos = await Repository.listar();

            return res.status(200).json(produtos);
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static async buscarPorId(req, res){
        try {
            let {id} = req.params;

            let produto = await Repository.buscarPorId(id);

            return res.status(200).json(produto);
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static async criar(req, res){
        try {
            if(req.file){
                req.body.foto = req.file.filename;
            }else{
                req.body.foto = " ";
            }
            
            let novoProduto = await Repository.criar(req.body);

            return res.status(201).json(novoProduto);
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static async atualizar(req, res){
        try {
            let {id} = req.params;

            let produtoCadastrado = await Repository.buscarPorId(id);

            if(req.file){
                if(produtoCadastrado.foto != " "){
                    ProdutoController.excluirImagem(produtoCadastrado.foto)
                }
                req.body.foto = req.file.filename;
            }

            await Repository.atualizar(id, req.body);

            return res.status(204).json();
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static async excluir(req, res){
        try {
            let {id} = req.params;

            let produtoCadastrado = await Repository.buscarPorId(id);

            if(produtoCadastrado.foto != " "){
                ProdutoController.excluirImagem(produtoCadastrado.foto)
            }            

            await Repository.excluir(id);

            return res.status(204).json();
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    static excluirImagem(foto){
        try {
            let pastaRaiz = path.join(__dirname, "../..")
            let pathName = `${pastaRaiz}/public/img/${foto}`;
            fs.unlinkSync(pathName);
        } catch (error) {
            console.log(error);
        }        
    }
}

export default ProdutoController;