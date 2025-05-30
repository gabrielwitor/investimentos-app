# Usa uma imagem base do Node.js LTS
FROM node:18-alpine

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./
COPY tsconfig.json ./

# Instala as dependências
RUN npm install

# Copia o código fonte
COPY . .

# Gera o cliente Prisma
RUN npx prisma generate

# Compila o TypeScript
RUN npm run build

# Expõe a porta
EXPOSE 3001

# Comando para iniciar a aplicação
CMD ["npm", "start"]
