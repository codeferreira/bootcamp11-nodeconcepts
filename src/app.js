const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body;

  const repository = {id: uuid(), title, url, techs, likes: 0}

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(item => item.id === id);

  if(repositoryIndex < 0) {
    return response.status(400).json({message: "Repository not found"})
  }

  const {title, url, techs} = request.body;

  const updatedRepository = {
    ...repositories[repositoryIndex],
    id,
    title, 
    url, 
    techs
  }

  repositories[repositoryIndex] = updatedRepository;

  return response.json(updatedRepository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(item => item.id === id);

  if(repositoryIndex < 0) {
    return response.status(400).json({message: "Repository not found"})
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).json(repositories[repositoryIndex]);
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(item => item.id === id);

  if(repositoryIndex < 0) {
    return response.status(400).json({message: "Repository not found"})
  }

  repositories[repositoryIndex].likes ++

  const { likes } = repositories[repositoryIndex];

  return response.json({likes})
});

module.exports = app;
