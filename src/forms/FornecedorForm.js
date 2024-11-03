import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import axios from 'axios';

function FornecedorForm() {
  const [formData, setFormData] = useState({
    nome: '',
    preco: '',
    qualidade: '',
    prazoEntrega: '',
    reputacao: '',
    capacidadeAtendimento: ''
  });

  const [fornecedores, setFornecedores] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/avaliar', formData);
      const novoFornecedor = response.data;
      setFornecedores((prevFornecedores) => {
        const listaAtualizada = [...prevFornecedores, novoFornecedor];
        return listaAtualizada.sort((a, b) => b.pontuacao - a.pontuacao); // Ordena pela pontuação
      });
      setFormData({
        nome: '',
        preco: '',
        qualidade: '',
        prazoEntrega: '',
        reputacao: '',
        capacidadeAtendimento: ''
      });
    } catch (error) {
      console.error('Erro ao cadastrar fornecedor:', error);
    }
  };

  return (
    <div style={{display: 'flex'}} >
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4}}>
        <Typography variant="h5" align="center" gutterBottom>
          Cadastro de Fornecedores
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Preço"
            name="preco"
            type="number"
            value={formData.preco}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Qualidade"
            name="qualidade"
            type="number"
            value={formData.qualidade}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Prazo de Entrega"
            name="prazoEntrega"
            type="number"
            value={formData.prazoEntrega}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Reputação"
            name="reputacao"
            type="number"
            value={formData.reputacao}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Capacidade de Atendimento"
            name="capacidadeAtendimento"
            type="number"
            value={formData.capacidadeAtendimento}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <Box textAlign="center" mt={2}>
            <Button type="submit" variant="contained" color="primary">
              Calcular Pontuação
            </Button>
          </Box>
        </form>
      </Paper>

      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h6" align="center" gutterBottom>
          Lista de Fornecedores
        </Typography>
        <List>
          {fornecedores.map((fornecedor, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`${fornecedor.nome} - Pontuação: ${fornecedor.pontuacao}`}
                secondary={`Preço: ${fornecedor.preco}, Qualidade: ${fornecedor.qualidade}, Prazo: ${fornecedor.prazoEntrega}, Reputação: ${fornecedor.reputacao}, Capacidade: ${fornecedor.capacidadeAtendimento}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
    </div>
  );
}

export default FornecedorForm;
