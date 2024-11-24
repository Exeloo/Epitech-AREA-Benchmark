FROM ubuntu:20.04

ENV ANDROID_SDK_ROOT=/sdk
ENV PATH="$ANDROID_SDK_ROOT/cmdline-tools/latest/bin:$ANDROID_SDK_ROOT/platform-tools:$PATH"
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y \
    openjdk-11-jdk wget unzip git gradle && \
    apt-get clean

RUN mkdir -p /sdk/cmdline-tools && \
    wget -q https://dl.google.com/android/repository/commandlinetools-linux-9477386_latest.zip -O cmdline-tools.zip && \
    unzip cmdline-tools.zip -d /sdk/cmdline-tools && \
    mv /sdk/cmdline-tools/cmdline-tools /sdk/cmdline-tools/latest && \
    rm cmdline-tools.zip

RUN yes | sdkmanager --licenses && \
    sdkmanager "platform-tools" "platforms;android-33" "build-tools;33.0.2"

WORKDIR /app
COPY . /app

CMD ["./gradlew", "assembleDebug"]
