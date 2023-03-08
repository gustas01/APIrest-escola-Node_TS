# API_REST_CURSOJS

<h2>Tecnologias usadas</h2>
NodeJS, ExpressJS, PostgreSQL, SequelizeORM, bcryptjs, jsonwebtoken.
<hr>

<h2>Sobre o projeto</h2>
Uma API Rest onde se manipula dados de alunos de uma escola.  <br>

![student](https://user-images.githubusercontent.com/50846424/223618953-500b720e-7db4-4738-a97d-dfc44e45095c.png)


E para manipular esses dados, é necessário estar logado no sistema com algum usuário, cujos dados são: <br>
![user](https://user-images.githubusercontent.com/50846424/223619033-07616521-ef83-400d-af15-1f7bdfdc10c3.png)


O procedimento de autenticação de usuários é feito usando um JWT gerado quando o usuário é criado usando a biblioteca `jsonwebtoken`. <br>
Todos os passwords sofrem um hash para serem salvos no banco de dados, por motivos de segunraça, usando a biblioteca `bcryptjs`.

# Instruções para a execução do projeto. 
OBS: O NodeJS e o PostgresSQL devem estar instalados no ambiente onde será executado o projeto.

1º passo - Com o PostgresSQL em execução, crie um banco onde serão salvas as informações referentes aos usuários e alunos.

2º passo - Preencha o arquivo .env que está dentro da pasta raiz  do proejeto com todas as informações que pedem lá, colocando o valor logo após o sinal de igualdade, sem aspas. Que são:<br> 

```bash
# o nome do banco que usará para salvar os dados (criado no passo anterior)
DATABASE=

# a porta onde seu banco está ounvido as requisições
DATABASE_PORT=

# o nome do usuário do banco de dados
DATABASE_USERNAME=

# a senha do banco de dados
DATABASE_PASSWORD=

# vários caracteres aleatórios para que o bcryptjs possa gerar o hash a partir da senha do usuário.
TOKEN_SECRET=

# tempo de expiração do token do usuário gerado (exemplos: 7d, 5d; para 7 dias e 5 dias respectivamente).
TOKEN_EXPIRATION=

# o URL onde a aplicação ficará disponível
APP_URL=

# a porta onde a aplicação está executando
APP_PORT= 
```

3º passo - Instale as dependências do projeto, com o comando `npm i` em um terminal aberto na pasta raiz do projeto.

4º passo - Por fim, em um terminal aberto na parta raiz do projeto, execute o comando `npm run dev` para que a API comece a escutar as requisições.


# Documetação da API

<h2>Rotas para alunos</h2>
OBS: Usarei a APP_URL `http://localhost:3001/` para explicar as rotas do projeto. <br><br>

```bash
GET - Listagem de todos os alunos salvos no banco.
http://localhost:3001/students/

# Os dados do aluno a ser criado devem ser passados como JSON no corpo da requisição.
POST - Salvar aluno no banco - USUÁRIO DEVE ESTAR LOGADO
http://localhost:3001/students/

# Em que o :id é o id do aluno salvo na base de dados.
GET - Exibir um aluno em específico
http://localhost:3001/students/:id

# Em que o :id é o id do aluno salvo na base de dados.
PUT - Atualizar um aluno em específico - USUÁRIO DEVE ESTAR LOGADO
http://localhost:3001/students/:id

# Em que o :id é o id do aluno salvo na base de dados. 
DEL - Apagar um aluno em específico - USUÁRIO DEVE ESTAR LOGADO
http://localhost:3001/students/:id

```

<h2>Rotas para usuário</h2>
OBS: Para as rotas de usuário não é necessário enviar o ID, pois o usuário só poderá executar ações em seus próprios dados.

A rota para todos os métodos de `users` é a mesma: `http://localhost:3001/users/`, porém mudará apenas o método http a ser usado. Nos métodos de `UPDATE` e `CREATE`é necessário passar um corpo para a requisição. Que serão os seguintes: <br> <br>

Para o método `CREATE`
```
{
	"name": string,
	"email": string,
	"password": string
}
```

E para o método `UPDATE` basta passar apenas os campos que se quer alterar, ou todos como no `CREATE` caso queira alterar todos.
