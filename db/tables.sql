--USE database
DROP DATABASE BTL;

CREATE DATABASE BTL;

USE BTL;

CREATE TABLE "User" (
    UserId bigint IDENTITY(1,1) PRIMARY KEY,
    Username varchar(16) NOT NULL UNIQUE CHECK (LEN(Username) >= 8),
    Password varchar(16) NOT NULL CHECK (LEN(Password) >= 8),
    IsAdmin bit NOT NULL,
    Link varchar(255),
    Money int,
);

CREATE TABLE Questions (
    QuestionId bigint IDENTITY(1,1) PRIMARY KEY,
    Quest nvarchar(255) NOT NULL,
);

CREATE TABLE Answers (
    AnswerId bigint IDENTITY(1,1) PRIMARY KEY,
    QuestionId bigint NOT NULL FOREIGN KEY REFERENCES Questions(QuestionId),
    Answer nvarchar(255) NOT NULL,
    IsCorrect bit NOT NULL,
);

