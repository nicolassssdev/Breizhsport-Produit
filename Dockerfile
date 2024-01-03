# Utilisez une image Node.js légère
FROM node:14-alpine

# Définissez le répertoire de travail dans le conteneur
WORKDIR /app

# Copiez le package.json et le package-lock.json pour installer les dépendances
COPY package*.json ./

# Installez les dépendances
RUN npm install

# Copiez le reste des fichiers dans le répertoire de travail
COPY . .

# Exposez le port 3000
EXPOSE 3000

# Commande par défaut pour démarrer l'application
CMD ["node", "src/index.js"]
