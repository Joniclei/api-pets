import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { pets } from './pets.js';
import { randomUUID } from 'crypto';
import { validaPetsMid } from './midlewares.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());


// Definir rotas

// Listar todos pets

// GET/pets
app.get ('/pets', (req, res) => {
  try {
    res.status(200).json({
      ok : true,
      message : "Pets listados com sucesso",
      data : pets
    })
  } catch (error) {
    res.status(500).json({
      ok : false,
      message: error.toString()
    })
  }
});

// Criar um novo pet

// POST/pets

app.post('/pets', [validaPetsMid], (req, res) => {
  try {
    const bodyPet = req.body;

    const newPet = {
      id: crypto.randomUUID(),
      ...bodyPet
    }

    pets.push(newPet);

    res.status(201).json({
      ok : true,
      message : "Pet criado com sucesso",
      data : pets
    })

  } catch (error) {
    res.status(500).json({
      ok : false,
      message: error.toString()
    })

  }
});

// Listar um pet específico

// GET/pets/:id

app.get('/pets/:id', (req, res) => {
  try {
    const id = req.params.id;

    const petId = pets.find((pets) => pets.id === id);

    if (!petId) {
      return res.status(404).json({
        ok : false,
        message : "Pet não encontrado"
      })
    }

    res.status(200).json({
      ok : true,
      message : "Pet listado com sucesso",
      data : petId
    })

  } catch (error) {
    res.status(500).json({
      ok : false,
      message: error.toString()
    })

  }
});

// Atualizar um pet específico

// PUT/pets/:id

app.put('/pets/:id', [validaPetsMid], (req, res) => {
    try {
      const idPet = req.params.id;
      const bodyPet = req.body;
      const petId = pets.find((pets) => pets.id === idPet);

      petId.name = bodyPet.name;
      petId.breed = bodyPet.breed;
      petId.age = bodyPet.age;
      petId.type = bodyPet.type;

      res.status(200).json({
        ok : true,
        message : "Pet atualizado com sucesso",
        data : petId
      })
  } catch (error) {
    res.status(500).json({
      ok : false,
      message: error.toString()
    })

  }
});

// Deletar um pet específico

// DELETE/pets/:id

app.delete('/pets/:id', (req, res) => {
  try {
    const idPet = req.params.id;

    const petId = pets.find((pets) => pets.id === idPet);

    if (!petId) {
      return res.status(404).json({
        ok : false,
        message : "Pet não encontrado"
      })
    }

    const indexPet = pets.indexOf(petId);
    pets.splice(indexPet, 1);

    res.status(200).json({
      ok : true,
      message : "Pet deletado com sucesso",
      data : pets
    })

  } catch (error) {
    res.status(500).json({
      ok : false,
      message: error.toString()
    })

  }
});
const porta = process.env.PORT;
app.listen(porta, ()=>{
  console.log(`rodando ${porta}`)
});
