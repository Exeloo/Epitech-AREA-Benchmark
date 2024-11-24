FROM golang:1.23.3-alpine

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download
COPY . .

RUN go build -o main main.go

EXPOSE 8080
ENV GIN_MODE=release

CMD ["/bin/sh", "-c", "go build -o main main.go && ./main"]
