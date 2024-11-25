package main

import (
	"database/sql"
	"fmt"
	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
	"log"
	"net/http"
	"os"
)

var db *sql.DB

func main() {
	initConfig()
	db = connectDB()
	defer db.Close()
	initRouter()
}

func initConfig() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatalf("Error loading .env file: %s", err)
	}
}

func connectDB() *sql.DB {
	username := os.Getenv("DATABASE_USERNAME")
	password := os.Getenv("DATABASE_PASSWORD")
	port := os.Getenv("DATABASE_PORT")
	dbname := os.Getenv("DATABASE_DB")
	connectionString := fmt.Sprintf("%s:%s@tcp(localhost:%s)/%s", username, password, port, dbname)
	db, err := sql.Open("mysql", connectionString)
	if err != nil {
		log.Fatal(err)
	}
	return db
}

func initRouter() {
	router := gin.Default()
	router.POST("/login", postLogin)
	router.POST("/register", postRegister)
	router.Run("localhost:8080")
}

func postLogin(c *gin.Context) {
	var loginData struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	if err := c.ShouldBindJSON(&loginData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	var storedPassword string
	err := db.QueryRow("SELECT password FROM user WHERE email = ?", loginData.Email).Scan(&storedPassword)
	if err != nil || storedPassword != loginData.Password {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"message": "Login successful !",
		"token":   "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTczMjM4ODc5OCwiaWF0IjoxNzMyMzg4Nzk4fQ.mLDskKU5MfLlLG7yTP5YC4BE51E2MGLX9nxyyCNFX-k",
	})
}

func postRegister(c *gin.Context) {
	var registerData struct {
		Email    string `json:"email"`
		Password string `json:"password"`
		Name     string `json:"name"`
	}

	if err := c.ShouldBindJSON(&registerData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	var existingEmail string
	err := db.QueryRow("SELECT email FROM user WHERE email = ?", registerData.Email).Scan(&existingEmail)
	if err == nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	_, err = db.Exec("INSERT INTO user (email, password, name) VALUES (?, ?, ?)", registerData.Email, registerData.Password, registerData.Name)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "User registered successfully",
		"user":    fmt.Sprintf("{\"name\": %s, \"email\": %s}", registerData.Name, registerData.Email),
	})
}
