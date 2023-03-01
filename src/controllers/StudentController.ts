/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { IErrorDB } from '../interfaces/IErrorDB';
import Photo from '../models/Photo';
import Student from '../models/Student';

class StudentController {
  async index(req: Request, res: Response) {
    try{
      const alunos = await Student.findAll({
        attributes: ['id', 'first_name', 'last_name', 'email', 'age', 'weight', 'height'],
        order: [['id', 'DESC'], [Photo, 'id', 'DESC']],
        include: {
          model: Photo,
          attributes: ['filename'],
        },
      });
      res.json(alunos);
    }catch(e: any){
      res.status(400).json({errors: e.errors.map((err: IErrorDB) => err.message)});
    }
  }

  async create(req: Request, res: Response) {
    try {
      const aluno = await Student.create(req.body);

      return res.json(aluno);
    } catch(e: any){
      res.status(400).json({errors: e.errors.map((err: IErrorDB) => err.message)});
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['Faltando ID'],
        });
      }

      const aluno = await Student.findByPk(id);

      if (!aluno) {
        return res.status(400).json({
          errors: ['Aluno não existe'],
        });
      }

      const alunoAtualizado = await aluno.update(req.body);

      return res.json(alunoAtualizado);
    } catch(e: any){
      res.status(400).json({errors: e.errors.map((err: IErrorDB) => err.message)});
    }
  }

  async read(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['Faltando ID'],
        });
      }

      const aluno = await Student.findByPk(id, {
        attributes: ['id', 'first_name', 'last_name', 'email', 'age', 'weight', 'height'],
        order: [['id', 'DESC'], [Photo, 'id', 'DESC']],
        include: {
          model: Photo,
          attributes: ['filename'],
        },
      });

      if (!aluno) {
        return res.status(400).json({
          errors: ['Aluno não existe'],
        });
      }

      return res.json(aluno);

    } catch(e: any){
      res.status(400).json({errors: e.errors.map((err: IErrorDB) => err.message)});
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['Faltando ID'],
        });
      }

      const aluno = await Student.findByPk(id);

      if (!aluno) {
        return res.status(400).json({
          errors: ['Aluno não existe'],
        });
      }

      await aluno.destroy();
      return res.json({
        apagado: true,
      });
    } catch(e: any){
      res.status(400).json({errors: e.errors.map((err: IErrorDB) => err.message)});
    }
  }
}

export default new StudentController();
