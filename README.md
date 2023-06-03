# teste-fidelizi

## Objetivo
Realizar clone da página de ofertas da FideliZi (https://ofertas.fidelizii.com.br/demonstracao-fidelizi/901).

## Tecnologias
- ReactJS
- Laravel API

## Requisitos
- No banco de dados que for criado, deverá ser criado uma estrutura onde será gerenciado várias ofertas
- Cada oferta deverá ser possível ser acessada usando um link único
- No banco de dados, deverá ser criado uma tabela de premios separada das ofertas, cada premio pode ser vinculado em 1 ou mais ofertas
- Na página da oferta, clientes poderão ativar qualquer oferta em questão, caso o cliente não esteja cadastrado, será cadastrado previamente
- Deverá ser registrado o registro de ativação de cada oferta vinculada a todo o cliente no banco de dados
- No banco deverá ter uma tabela de relatórios, no qual de 1 em 1 hora, vamos atualizar ela usando uma mecânica de Cronjob, para ver dados da oferta em questão
- Usando a mecânica de Jobs do Laravel, deverá ser enviado um email para o cliente, assim que ativar sua oferta.

## Intruções para testar projeto
- Backend
  - Criar um banco de dados
  - Gerar e configurar arquivo de variaveis de ambiente
  - Instalar dependencias (`composer install`)
  - Gerar chave (`php artisan key:generate`)
  - Executar migrations e popular o banco de dados (`php artisan migrate --seed`)
  - Iniciar servidor (`php artisan serve`)
- Frontend
  - Gerar e configurar arquivo de variaveis de ambiente
  - Instalar dependencias (`npm install`)
  - Iniciar servidor (`npm start`)
- Observarções
  - Foi criado uma oferta para o teste, pode ser acessada atraves do endpoint `/ofertas/demonstracao-fidelizi/1`
  - Caso esteja rodando a aplicações como `local` no .env, o schedule irá realizar reports de minuto em minuto para fins de teste.
    - Use o comando `php artisan schedule:work` para iniciar o cronjob
  - Caso não queira iniciar o cronjob, o job de report pode ser executado através do comando `php artisan report`
  - O envio de emails e os reports são executados através de files, então para isso é necessário configurar a fila do laravel (https://laravel.com/docs/10.x/queues#introduction)
  - Para executar a fila, use o comando `php artisan queue:listen` para testes, ou `php artisan queue:work` para produção.

## :)
