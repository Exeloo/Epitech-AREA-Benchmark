# Étape 1 : Utiliser une image de base
FROM ubuntu:20.04

# Étape 2 : Variables d'environnement pour le SDK et le JDK
ENV ANDROID_SDK_ROOT=/sdk
ENV PATH="$ANDROID_SDK_ROOT/cmdline-tools/latest/bin:$ANDROID_SDK_ROOT/platform-tools:$PATH"
ENV DEBIAN_FRONTEND=noninteractive

# Étape 3 : Installer les dépendances requises
RUN apt-get update && apt-get install -y \
    openjdk-17-jdk wget unzip git gradle && \
    apt-get clean

# Étape 4 : Télécharger et installer le SDK Android
RUN mkdir -p /sdk/cmdline-tools && \
    wget -q https://dl.google.com/android/repository/commandlinetools-linux-9477386_latest.zip -O cmdline-tools.zip && \
    unzip cmdline-tools.zip -d /sdk/cmdline-tools && \
    mv /sdk/cmdline-tools/cmdline-tools /sdk/cmdline-tools/latest && \
    rm cmdline-tools.zip

# Étape 5 : Accepter les licences Android et installer les composants nécessaires
RUN yes | sdkmanager --licenses && \
    sdkmanager "platform-tools" "platforms;android-33" "build-tools;33.0.2"

# Étape 6 : Copier le projet Android dans le conteneur
WORKDIR /app
COPY . /app

# Assurer que gradlew est exécutable
RUN chmod +x ./gradlew

# Étape 7 : Commande par défaut pour construire l'application
CMD ["./gradlew", "assembleDebug"]
