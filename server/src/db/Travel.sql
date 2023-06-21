CREATE DATABASE Travel

-- User Table
CREATE TABLE Users (
  UserID INT IDENTITY (1,1) PRIMARY KEY,
  Name VARCHAR(50),
  Email VARCHAR(100),
  Password VARCHAR(100),
  ContactNumber VARCHAR(20)
)

-- Destination Table
CREATE TABLE Destinations (
  DestinationID INT PRIMARY KEY,
  Name VARCHAR(100),
  Description TEXT,
  Location VARCHAR(100),
  Attractions TEXT
);

-- Package Table
CREATE TABLE Packages (
  PackageID INT PRIMARY KEY,
  Name VARCHAR(100),
  Description TEXT,
  Duration INT,
  Price DECIMAL(10, 2),
  Inclusions TEXT,
  Exclusions TEXT
);

-- Booking Table
CREATE TABLE Bookings (
  BookingID INT PRIMARY KEY,
  UserID INT,
  PackageID INT,
  BookingDate DATE,
  NumTravelers INT,
  PaymentDetails VARCHAR(100),
  FOREIGN KEY (UserID) REFERENCES Users(UserID),
  FOREIGN KEY (PackageID) REFERENCES Packages(PackageID)
);

-- Review Table
CREATE TABLE Reviews (
  ReviewID INT PRIMARY KEY,
  UserID INT,
  DestinationID INT,
  PackageID INT,
  ReviewText TEXT,
  Rating DECIMAL(2, 1),
  ReviewDate DATE,
  FOREIGN KEY (UserID) REFERENCES Users(UserID),
  FOREIGN KEY (DestinationID) REFERENCES Destinations(DestinationID),
  FOREIGN KEY (PackageID) REFERENCES Packages(PackageID)
);

-- Blog Table
CREATE TABLE Blogs (
  BlogID INT PRIMARY KEY,
  Title VARCHAR(200),
  Content TEXT,
  Author VARCHAR(50),
  PublishDate DATE
);

-- Image Gallery Table
CREATE TABLE ImageGallery (
  ImageID INT PRIMARY KEY,
  DestinationID INT,
  PackageID INT,
  ImageURL VARCHAR(200),
  Caption VARCHAR(200),
  FOREIGN KEY (DestinationID) REFERENCES Destinations(DestinationID),
  FOREIGN KEY (PackageID) REFERENCES Packages(PackageID)
);
