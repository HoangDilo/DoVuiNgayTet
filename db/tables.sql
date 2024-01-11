--USE database
DROP DATABASE BTL;

CREATE DATABASE BTL;

USE BTL;

CREATE TABLE "User" (
    UserId bigint IDENTITY(1,1) PRIMARY KEY,
    Username varchar(16) NOT NULL UNIQUE CHECK (LEN(Username) >= 8),
    Password varchar(16) NOT NULL CHECK (LEN(Password) >= 8),
    IsAdmin bit NOT NULL,
    AvatarUrl nvarchar(300) NOT NULL,
    Link varchar(255),
);
