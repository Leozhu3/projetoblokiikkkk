import express from "express";
const app = express();

// indicar pro express ler o body com json
app.use(express.json());

// mok

const tarefas = [
  { id: 1, titulo: "teste", descrição: "teste", dataDeVencimento: "teste" },
];

// retorna o objeto por id

function buscarTarefaPorId(id) {
  return tarefas.filter((tarefa) => tarefa.id == id);
}

//pega posição do index do array pelo id

function buscarIndexTarefa(id) {
  return tarefas.findIndex((tarefa) => tarefa.id == id);
}

// listagem das tarefas
app.get("/tarefas", (req, res) => {
  res.status(200).send(tarefas);
});

// buscar tarefa por id

app.get("/tarefas/:id", (req, res) => {
  res.json(buscarTarefaPorId(req.params.id));
});

// criar nova tarefa

app.post("/tarefas", (req, res) => {
  tarefas.push(req.body);
  res.status(201).send("Tarefa adicionada com sucesso!");
});

// apagar uma tarefa

app.delete("/tarefas/:id", (req, res) => {
  let index = buscarIndexTarefa(req.params.id);
  tarefas.splice(index, 1);
  res.send(`Tarefa com id ${req.params.id} excluida com sucesso!`);
});

// atualizar tarefa
app.put("/tarefas/:id", (req, res) => {
  let index = buscarIndexTarefa(req.params.id);
  tarefas[index].titulo = req.body.titulo;
  tarefas[index].descrição = req.body.descrição;
  tarefas[index].dataDeVencimento = req.body.dataDeVencimento;
  res.json(tarefas);
});

export default app;
