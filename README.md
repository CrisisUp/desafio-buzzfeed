# 🧬 Laboratório de Arquétipos - Desafio Buzzfeed Angular

Este projeto é uma evolução do desafio de quizz do curso da DIO, transformado em um sistema modular de análise de perfis. Ele utiliza Angular 18 com Signals e é totalmente conteinerizado via Docker.

## 🚀 Funcionalidades Principais

* **Dual-Quiz System:** Alternância entre os módulos "Herói ou Vilão" e "Entusiasta/Cético de IA".

* **Cenários Dinâmicos:** O CSS e as fontes mudam automaticamente com base no tema escolhido.

* **Arquitetura Moderna:** Uso de Standalone Components e Angular Signals para alta performance.

* **Infraestrutura Imutável:** Ambiente padronizado via Docker e Nginx.

## 🛠️ Requisitos

* Docker & Docker Compose.

* Node.js (opcional, para desenvolvimento local fora do container).

## 📂 Estrutura do Projeto

* **src/assets/data/:** Contém os arquivos JSON com os roteiros dos quizzes.

* **src/app/components/quizz/:** Lógica principal e renderização dinâmica.

* **src/app/pages/home/:** Dashboard de seleção de módulos.

## 💻 Comandos de Operação

### 1. Preparação do Ambiente

Antes de subir o sistema, garanta que o script de automação de limpeza tenha permissão de execução:

```Bash
chmod +x reset-project.sh
```

### 2. Ciclo de Vida do Docker (Workflow Principal)

Para subir o projeto garantindo que nenhuma "sujeira" de cache interfira no build (especialmente útil após alterar JSONs ou CSS global):

```Bash
./reset-project.sh
```

### 3. Comandos Manuais (Troubleshooting)

Se precisar gerenciar o ambiente manualmente:

* Derrubar os serviços:

```Bash
docker-compose down
```

* Verificar imagens ativas:

```Bash
docker images
```

* Remover a imagem específica do projeto:

```Bash
docker rmi -f desafio-buzzfeed
```

* Subir logs em tempo real:

```Bash
docker-compose up
```

### 4. Desenvolvimento Local (Fora do Docker)

* Caso queira testar alterações rápidas sem fazer o build da imagem:

```Bash
npm install
ng serve
```

* Acesse em: <http://localhost:4200>

## 🎨 Tematização e Customização

O sistema detecta a classe no body para aplicar os temas:

* **heroes-theme:** Estética dark com tons de azul e vermelho neon.

* **ia-theme:** Estética tecnológica com fontes monospace e verde neon.

## 📝 Notas de Versão

* **v1.0:** Setup inicial e injeção de dependência básica.

* **v2.0:** Implementação de Signals e remoção de Zone.js.

* **v3.0:** Adição do módulo de IA, rotas dinâmicas e script de reset de cache.

## Autor

Cristiano - Técnico de Redes (SENAI São Caetano)
