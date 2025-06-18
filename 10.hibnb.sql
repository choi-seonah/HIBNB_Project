CREATE DATABASE  IF NOT EXISTS `hibnb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `hibnb`;
-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: hibnb
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accom`
--
drop database if exists hibnb;
create database hibnb;
use hibnb;
DROP TABLE IF EXISTS `accom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accom` (
  `accomid` int NOT NULL AUTO_INCREMENT,
  `hostid` varchar(100) NOT NULL,
  `hostname` varchar(10) NOT NULL,
  `address` varchar(255) NOT NULL,
  `detailaddr` varchar(255) NOT NULL,
  `description` tinytext NOT NULL,
  `type` varchar(10) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `max_capacity` int NOT NULL,
  `price_per_night` int NOT NULL,
  `bedrooms` int DEFAULT NULL,
  `beds` int DEFAULT NULL,
  `bathrooms` int DEFAULT NULL,
  `average` double DEFAULT NULL,
  PRIMARY KEY (`accomid`),
  KEY `hostid` (`hostid`),
  CONSTRAINT `accom_ibfk_1` FOREIGN KEY (`hostid`) REFERENCES `users` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
ALTER TABLE `accom`
DROP FOREIGN KEY `accom_ibfk_1`;

ALTER TABLE `accom`
ADD CONSTRAINT `accom_ibfk_1`
FOREIGN KEY (`hostid`) REFERENCES `users` (`username`) ON DELETE CASCADE;
--
-- Dumping data for table `accom`
--

LOCK TABLES `accom` WRITE;
/*!40000 ALTER TABLE `accom` DISABLE KEYS */;
INSERT INTO `accom` VALUES (1,'yoonji98','윤지영','서울특별시 마포구 합정동','101동 1502호','신축|고층|한강뷰|편의점근처','오피스텔','https://example.com/img1.jpg',4,85000,1,2,1,4.75),(2,'seojun05','서준호','부산광역시 해운대구 중동','3층 전체','오션뷰|무료주차|바다근처','펜션','https://example.com/img2.jpg',6,120000,2,3,2,NULL),(3,'harin33','이하린','경기도 성남시 분당구 정자동','502호','신축|조용한동네|엘리베이터','아파트','https://example.com/img3.jpg',3,70000,1,1,1,NULL),(4,'minseo21','김민서','서울특별시 강남구 논현동','논현타워 1101호','역세권|야경좋음|무료WiFi','오피스텔','https://example.com/img4.jpg',2,95000,1,1,1,NULL),(5,'daehyun17','정대현','대구광역시 수성구 범어동','101동 501호','조용함|무료주차|중심가','빌라','https://example.com/img5.jpg',5,80000,2,2,2,3.9),(6,'sujin88','백수진','인천광역시 연수구 송도동','송도더샵 B동 1803호','신축|시티뷰|안전한단지','아파트','https://example.com/img6.jpg',4,95000,2,2,1,4),(7,'taemin76','이태민','광주광역시 동구 지산동','103호','1층|주차편리|조용한주택가','원룸','https://example.com/img7.jpg',2,60000,1,1,1,4.6),(8,'hyesoo12','최혜수','부산광역시 수영구 광안동','605호','광안리뷰|넓은침대|오션뷰','게스트하우스','https://example.com/img8.jpg',3,75000,1,2,1,5),(9,'jungwoo31','정우빈','서울특별시 종로구 청운동','주택 2층 전체','한옥|고즈넉함|북촌근처','게스트하우스','https://example.com/img9.jpg',4,100000,2,2,1,NULL),(10,'arin22','박아린','경기도 고양시 일산서구 주엽동','101동 1902호','신축|호수공원근처|깨끗함','아파트','https://example.com/img10.jpg',4,90000,2,2,1,NULL),(11,'soyeon92','한소연','경상남도 창원시 성산구 상남동','2층 전체','넓은거실|주방 완비|주차 가능','빌라','https://example.com/img11.jpg',6,85000,3,3,2,3.5),(12,'jinhwan64','송진환','강원도 강릉시 송정동','단독주택 전체','바닷가 근처|조용함|강릉역근처','펜션','https://example.com/img12.jpg',5,110000,2,3,2,4.7),(13,'daun09','이다운','서울특별시 동대문구 회기동','104동 502호','역세권|야경뷰|안락한공간','오피스텔','https://example.com/img13.jpg',3,78000,1,1,1,NULL),(14,'nayeon56','정나연','제주특별자치도 제주시 애월읍','101호','제주감성|바다근처|무료주차','리조트','https://example.com/img14.jpg',4,130000,2,2,1,NULL),(15,'hyunjin81','김현진','서울특별시 영등포구 문래동','문래하이빌 1601호','힙지로|고층|야경맛집','오피스텔','https://example.com/img15.jpg',2,87000,1,1,1,NULL),(16,'yebin45','이예빈','충청북도 청주시 흥덕구 복대동','3층 302호','신축|깔끔함|근처상권좋음','빌라','https://example.com/img16.jpg',3,72000,2,2,1,NULL),(17,'sungwoo29','남성우','전라북도 전주시 덕진구 인후동','단독주택','한옥|조용한동네|단독이용','게스트하우스','https://example.com/img17.jpg',5,78000,2,2,1,4.2),(18,'eunji36','서은지','경기도 수원시 영통구 이의동','101동 1003호','신축|학군좋음|조용함','아파트','https://example.com/img18.jpg',4,88000,2,2,1,3.8),(19,'jiyun72','오지윤','대전광역시 유성구 봉명동','202호','온천지근|조용함|주차가능','원룸','https://example.com/img19.jpg',2,65000,1,1,1,NULL),(20,'haeun27','장하은','경기도 남양주시 다산동','203동 1804호','강가근처|뷰좋음|신축','아파트','https://example.com/img20.jpg',3,91000,2,2,1,NULL);
/*!40000 ALTER TABLE `accom` ENABLE KEYS */;
ALTER TABLE accom
ADD COLUMN latitude DOUBLE,
ADD COLUMN longitude DOUBLE;
UNLOCK TABLES;

--
-- Table structure for table `blacklist`
--

DROP TABLE IF EXISTS `blacklist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blacklist` (
  `blackid` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `comment` varchar(45) DEFAULT NULL,
  `addedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `added_at` datetime(6) NOT NULL,
  PRIMARY KEY (`blackid`),
  KEY `username_idx` (`username`),
  CONSTRAINT `username` FOREIGN KEY (`username`) REFERENCES `users` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
ALTER TABLE `blacklist`
DROP FOREIGN KEY `username`;

ALTER TABLE `blacklist`
ADD CONSTRAINT `username`
FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON DELETE CASCADE;
--
-- Dumping data for table `blacklist`
--

LOCK TABLES `blacklist` WRITE;
/*!40000 ALTER TABLE `blacklist` DISABLE KEYS */;
INSERT INTO `blacklist` VALUES (1,'sujin88','벨튀충out','2025-06-16 11:08:55','2025-06-16 11:08:55.278126'),(2,'sujin88','벨튀충out','2025-06-16 11:13:16','2025-06-16 11:13:16.709473'),(3,'sujin88','벨튀충out','2025-06-17 11:35:19','2025-06-17 11:35:19.850367');
/*!40000 ALTER TABLE `blacklist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book`
--

DROP TABLE IF EXISTS `book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book` (
  `bookid` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `accomid` int NOT NULL,
  `checkindate` date NOT NULL,
  `checkoutdate` date NOT NULL,
  `total_price` int DEFAULT NULL,
  `status` varchar(10) DEFAULT NULL,
  `yesorno` tinyint(1) DEFAULT NULL,
  `payment` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`bookid`),
  KEY `username` (`username`),
  KEY `accomid` (`accomid`),
  CONSTRAINT `book_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`username`),
  CONSTRAINT `book_ibfk_2` FOREIGN KEY (`accomid`) REFERENCES `accom` (`accomid`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
ALTER TABLE `book`
DROP FOREIGN KEY `book_ibfk_1`;

ALTER TABLE `book`
ADD CONSTRAINT `book_ibfk_1`
FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON DELETE CASCADE;

ALTER TABLE book DROP FOREIGN KEY book_ibfk_2;
ALTER TABLE book 
ADD CONSTRAINT book_ibfk_2 
FOREIGN KEY (accomid) REFERENCES accom(accomid) ON DELETE CASCADE;

--
-- Dumping data for table `book`
--

LOCK TABLES `book` WRITE;
/*!40000 ALTER TABLE `book` DISABLE KEYS */;
INSERT INTO `book` VALUES (1,'admin1',1,'2025-06-01','2025-06-03',150000,'이용완료',0,'1'),(2,'arin22',1,'2025-06-10','2025-06-13',225000,'예약',0,'1'),(3,'daehyun17',2,'2025-07-01','2025-07-04',360000,'예약',0,'1'),(4,'daun09',3,'2025-07-10','2025-07-12',180000,'예약',0,'1'),(5,'eunji36',4,'2025-08-01','2025-08-03',220000,'예약',0,'1'),(6,'haeun27',5,'2025-06-15','2025-06-17',200000,'예약',0,'0'),(7,'harin33',6,'2025-06-10','2025-06-12',210000,'이용완료',0,'1'),(8,'hyesoo12',7,'2025-06-20','2025-06-22',190000,'예약',0,'1'),(9,'hyunjin81',8,'2025-06-05','2025-06-07',170000,'이용완료',0,'1'),(10,'jiyun72',9,'2025-07-15','2025-07-18',285000,'예약',0,'1'),(11,'jungwoo31',10,'2025-08-05','2025-08-07',260000,'예약',0,'0'),(12,'minseo21',11,'2025-06-08','2025-06-10',160000,'이용완료',0,'1'),(13,'nayeon56',12,'2025-06-12','2025-06-14',200000,'이용완료',0,'1'),(14,'park_jh',13,'2025-06-18','2025-06-21',330000,'예약',0,'1'),(15,'seojun05',14,'2025-07-05','2025-07-07',195000,'예약',0,'1'),(16,'seonah',15,'2025-07-25','2025-07-28',270000,'예약',0,'1'),(17,'soyeon92',16,'2025-06-20','2025-06-22',210000,'예약',0,'0'),(18,'sujin88',17,'2025-06-03','2025-06-05',190000,'이용완료',0,'1'),(19,'sungwoo29',18,'2025-06-10','2025-06-12',215000,'이용완료',0,'1'),(20,'yoonji98',19,'2025-08-10','2025-08-12',230000,'예약',0,'1'),(21,'yebin45',20,'2025-06-15','2025-06-18',270000,'예약',0,'1'),(22,'soyeon92',5,'2025-06-22','2025-06-24',180000,'예약',0,'1'),(23,'jungwoo31',12,'2025-07-01','2025-07-04',300000,'예약',0,'1'),(24,'minseo21',7,'2025-06-25','2025-06-27',190000,'이용완료',0,'1'),(25,'arin22',3,'2025-07-05','2025-07-07',195000,'예약',0,'1'),(26,'haeun27',8,'2025-06-28','2025-06-30',210000,'예약',0,'1'),(27,'jangmi',1,'2025-06-18','2025-06-20',150000,'이용완료',0,'1'),(28,'honggil',6,'2025-07-10','2025-07-12',210000,'예약',0,'1'),(29,'daun09',4,'2025-06-15','2025-06-17',200000,'예약',0,'0'),(30,'eunji36',9,'2025-07-20','2025-07-22',190000,'예약',0,'1');
/*!40000 ALTER TABLE `book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `img`
--

DROP TABLE IF EXISTS `img`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `img` (
  `accomid` int NOT NULL,
  `img1` varchar(255) NOT NULL,
  `img2` varchar(255) DEFAULT NULL,
  `img3` varchar(255) DEFAULT NULL,
  `img4` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`accomid`),
  CONSTRAINT `accomid` FOREIGN KEY (`accomid`) REFERENCES `accom` (`accomid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
ALTER TABLE `img`
DROP FOREIGN KEY `accomid`;
ALTER TABLE `img`
ADD CONSTRAINT accomid
FOREIGN KEY (accomid) REFERENCES accom(accomid) ON DELETE CASCADE;
--
-- Dumping data for table `img`
--

LOCK TABLES `img` WRITE;
/*!40000 ALTER TABLE `img` DISABLE KEYS */;
INSERT INTO `img` VALUES (1,'http://localhost:8080/src/main/resources/static/upload/accom/2e2b7f60-6721-4bd4-a360-97241b7fe8ce_1-34d917b3.jpeg','http://localhost:8080/src/main/resources/static/upload/accom/6ff49a0b-296d-42ee-b860-58b1c55abe5f_2-34d917b3.jpeg','http://localhost:8080/src/main/resources/static/upload/accom/4b74ba01-eb63-4d03-8f08-e84f9c050e8b_3-34d917b3.jpeg','http://localhost:8080/src/main/resources/static/upload/accom/dc2168a8-0342-494f-8e62-b39c6ca3b1ac_4-34d917b3.jpeg'),(2,'http://localhost:8080/src/main/resources/static/upload/accom/da17ac01-55ed-442e-aa2f-b24e8a470e13_1-375ce41c.jpeg','http://localhost:8080/src/main/resources/static/upload/accom/5d742cda-6d46-411a-be61-5e8366e121b3_2-375ce41c.jpeg','http://localhost:8080/src/main/resources/static/upload/accom/b3fc0cc3-fa08-4aad-a2cc-dbf9fe3ce972_3-375ce41c.jpeg','http://localhost:8080/src/main/resources/static/upload/accom/0dc5d922-e9c0-4aaf-9ee5-4ae787294d91_4-375ce41c.jpeg'),(3,'http://localhost:8080/src/main/resources/static/upload/accom/f4915c71-f2a5-4159-bf35-f567132c930c_1-5925ff89.jpeg','http://localhost:8080/src/main/resources/static/upload/accom/d9c4e2ac-785a-4e74-a65c-d52dd4c921f1_2-5925ff89.jpeg','http://localhost:8080/src/main/resources/static/upload/accom/80e06c47-fc64-4626-9f08-2b42705d5c0f_3-5925ff89.jpeg','http://localhost:8080/src/main/resources/static/upload/accom/ee5835f2-f5f3-4262-93e9-0344d9fe2bdd_4-5925ff89.jpeg'),(4,'http://localhost:8080/src/main/resources/static/upload/accom/08617a45-1fb1-4e58-bbdd-048ad1cbf660_1-4ff63e35.jpeg','http://localhost:8080/src/main/resources/static/upload/accom/affa9990-88a5-4f5c-bc85-8a4f7a6b5ac9_2-4ff63e35.jpeg','http://localhost:8080/src/main/resources/static/upload/accom/6002e229-5889-4fb7-ad4f-23ba6db952d6_3-4ff63e35.jpeg','http://localhost:8080/src/main/resources/static/upload/accom/a029312d-5851-49a0-b3f6-89511daa2e32_4-4ff63e35.jpeg'),(5,'http://localhost:8080/src/main/resources/static/upload/accom/f1264177-a8c7-430c-a610-613c3d575cf8_1-81ca93ac.jpeg','http://localhost:8080/src/main/resources/static/upload/accom/9a7fbd99-62a1-49c6-9a3c-23371656a194_2-81ca93ac.jpeg','http://localhost:8080/src/main/resources/static/upload/accom/668d746d-55b3-4f19-a058-6d2596e8578b_3-81ca93ac.jpeg','http://localhost:8080/src/main/resources/static/upload/accom/f266f706-b75e-452b-b05e-5453d563f7a7_4-81ca93ac.jpeg'),(6,'http://localhost:8080/src/main/resources/static/upload/accom/6.webp',NULL,NULL,NULL),(7,'http://localhost:8080/src/main/resources/static/upload/accom/100bbdad-5eb3-4082-8c5c-98c9f1d8f80f_1-a8f8662a.jpeg','http://localhost:8080/src/main/resources/static/upload/accom/1ee63d95-7044-4bf7-bdf5-c4263881ef7e_2-a8f8662a.jpeg','http://localhost:8080/src/main/resources/static/upload/accom/3780f31b-a559-4067-b180-6604af40913b_3-a8f8662a.jpeg','http://localhost:8080/src/main/resources/static/upload/accom/b4946872-b9cf-4358-a8b2-eb4c6bce6bcc_4-a8f8662a.jpeg'),(8,'http://localhost:8080/src/main/resources/static/upload/accom/5069fb14-4c91-487e-ab62-75b2a546c49b_1-bd8a1b9a.jpeg','http://localhost:8080/src/main/resources/static/upload/accom/7670fb5d-7ea1-4403-84ec-89849b69ab61_2-bd8a1b9a.jpeg','http://localhost:8080/src/main/resources/static/upload/accom/ee0276b4-f2aa-454a-9bf5-b9e248ee6227_3-bd8a1b9a.jpeg','http://localhost:8080/src/main/resources/static/upload/accom/cfd14353-76af-4063-9439-6a86b337d6c5_4-bd8a1b9a.jpeg'),(9,'http://localhost:8080/src/main/resources/static/upload/accom/6d983453-ec8d-4373-8727-7c065c3cb65d_1-5091398a.jpeg','http://localhost:8080/src/main/resources/static/upload/accom/cef5efd2-4ad4-48ae-93cb-ef906a1d2f1a_2-5091398a.jpeg','http://localhost:8080/src/main/resources/static/upload/accom/a84c706c-7a9f-4575-ae01-a16965235edd_3-5091398a.jpeg','http://localhost:8080/src/main/resources/static/upload/accom/5c884fc6-1450-464e-9dcf-3dc8add55a3b_4-5091398a.jpeg'),(10,'http://localhost:8080/src/main/resources/static/upload/accom/e11dfcbe-c7e4-4215-81c5-08e46fd1186f_1-4914cbe6.jpeg','http://localhost:8080/src/main/resources/static/upload/accom/a2a6fbd4-2898-441c-a70f-5c7b4c8b5aed_2-4914cbe6.jpeg','http://localhost:8080/src/main/resources/static/upload/accom/fc98c36d-ba13-4add-93e8-aeab42ce1697_3-4914cbe6.jpeg','http://localhost:8080/src/main/resources/static/upload/accom/c9229fe8-d8ea-4592-b71f-10b71dc6d764_4-4914cbe6.jpeg'),(11,'http://localhost:8080/src/main/resources/static/upload/accom/30454b68-456f-40b0-996c-294b58f46860_11-1.png','http://localhost:8080/src/main/resources/static/upload/accom/ebb348f0-1265-4707-ae2f-92278923534e_11-2.png','http://localhost:8080/src/main/resources/static/upload/accom/d9ee044d-9c68-4fa2-871f-a637961b8f21_11-3.png','http://localhost:8080/src/main/resources/static/upload/accom/2584d48d-e928-45ef-8ede-e3e75de4fba2_11-4.png'),(12,'http://localhost:8080/src/main/resources/static/upload/accom/151bb8cc-4e29-40a1-b818-8420b51b4ccf_12-1.png','http://localhost:8080/src/main/resources/static/upload/accom/fdbaeb25-a22b-4f4e-a0cd-1536abde6f04_12-2.png','http://localhost:8080/src/main/resources/static/upload/accom/916c1c4d-9aee-45dd-9dfb-1704c6ecb7bf_12-3.png','http://localhost:8080/src/main/resources/static/upload/accom/34054245-dc09-47e8-85ed-a4549457d327_12-4.png'),(13,'http://localhost:8080/src/main/resources/static/upload/accom/92bf8ab0-e9ac-45fd-bf97-b84cb257d18c_13-1.png','http://localhost:8080/src/main/resources/static/upload/accom/ccf2147e-fc5d-4f20-b741-81cdd93e9a23_13-2.png','http://localhost:8080/src/main/resources/static/upload/accom/dca974a3-29c9-4a18-a791-cf6eecd3a96f_13-3.png','http://localhost:8080/src/main/resources/static/upload/accom/060771ad-7812-41b5-969a-e963532b6acc_13-4.png'),(14,'http://localhost:8080/src/main/resources/static/upload/accom/e5fac84d-71f8-47ef-9a31-2be03260dccc_14-1.png','http://localhost:8080/src/main/resources/static/upload/accom/68f67c86-218f-44fa-bd7b-003a7b010e59_14-2.png','http://localhost:8080/src/main/resources/static/upload/accom/3d18079e-ebd8-48a6-a96c-861123774b32_14-3.png','http://localhost:8080/src/main/resources/static/upload/accom/18ad74da-c209-4745-9ba6-7c3566865d1d_14-4.png'),(15,'http://localhost:8080/src/main/resources/static/upload/accom/5e0aa6ea-6a66-4a4a-bc53-619ced7d43c9_15-1.png','http://localhost:8080/src/main/resources/static/upload/accom/af99dcf2-0b35-446a-9f05-81ae0da57e7f_15-2.png','http://localhost:8080/src/main/resources/static/upload/accom/5b8a29e3-4515-456d-b62e-ee85bd3640d1_15-3.png','http://localhost:8080/src/main/resources/static/upload/accom/b17c24e3-5897-45bc-8dd1-d4826428af61_15-4.png'),(16,'http://localhost:8080/src/main/resources/static/upload/accom/4c673a78-4b70-41f6-8e8b-6223f5d7e976_16-1.png','http://localhost:8080/src/main/resources/static/upload/accom/285bf052-5963-4267-83ee-62dbe2e831af_16-2.png','http://localhost:8080/src/main/resources/static/upload/accom/3f2aeb3d-8217-458c-afff-c6894c4fa982_16-3.png','http://localhost:8080/src/main/resources/static/upload/accom/7070f968-3f1a-491c-994d-e9a5ce213998_16-4.png'),(17,'http://localhost:8080/src/main/resources/static/upload/accom/6fe965a8-b8fb-44e4-a52a-6f256ac99222_17-1.png','http://localhost:8080/src/main/resources/static/upload/accom/d37146a3-d80a-4f96-b16c-e7071377ba83_17-2.png','http://localhost:8080/src/main/resources/static/upload/accom/9133cc9b-78d7-4a0c-8eab-937cb03d1ac4_17-3.png','http://localhost:8080/src/main/resources/static/upload/accom/b925ad95-c1ca-4a31-9e8a-449cfafd7a03_17-4.png'),(18,'http://localhost:8080/src/main/resources/static/upload/accom/80d4279c-4527-459d-90ec-11c18f700d31_18-1.png','http://localhost:8080/src/main/resources/static/upload/accom/db7965c5-56b3-4e34-b299-4b2b622a9168_18-2.png','http://localhost:8080/src/main/resources/static/upload/accom/b39b758c-0131-41da-8e07-40fffa0b3a33_18-3.png','http://localhost:8080/src/main/resources/static/upload/accom/ab46cc7c-a622-4961-8a38-67a5c29cb825_18-4.png'),(19,'http://localhost:8080/src/main/resources/static/upload/accom/58cc5700-833f-4a10-8e9c-9573a6758c44_19-1.png','http://localhost:8080/src/main/resources/static/upload/accom/63a32f42-ff82-4c5a-9ef8-625906d38fd8_19-2.png','http://localhost:8080/src/main/resources/static/upload/accom/7a765401-a198-4da1-9c9b-bd08e1ba2a3f_19-3.png','http://localhost:8080/src/main/resources/static/upload/accom/1a8a7dfb-b424-4497-b0a5-aceafdd1605d_19-4.png'),(20,'http://localhost:8080/src/main/resources/static/upload/accom/b7cb76ac-7ade-4259-a0d8-f40c595073e7_20-1.png','http://localhost:8080/src/main/resources/static/upload/accom/33beeb48-5788-4aeb-aca0-09d7b45e5faf_20-2.png','http://localhost:8080/src/main/resources/static/upload/accom/21594b81-82ab-4072-a137-4eace9bcd95b_20-3.png','http://localhost:8080/src/main/resources/static/upload/accom/814faba7-dff5-45e5-ad89-8561211693ae_20-4.png');
/*!40000 ALTER TABLE `img` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `report`
--

DROP TABLE IF EXISTS `report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `report` (
  `reportid` int NOT NULL AUTO_INCREMENT,
  `accomid` int NOT NULL,
  `bookid` int NOT NULL,
  `username` varchar(100) NOT NULL,
  `comment` tinytext,
  `created_at` datetime NOT NULL,
  `type` varchar(255) NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`reportid`),
  KEY `username` (`username`),
  KEY `accomid` (`accomid`),
  KEY `bookid` (`bookid`),
  CONSTRAINT `report_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`username`),
  CONSTRAINT `report_ibfk_2` FOREIGN KEY (`accomid`) REFERENCES `accom` (`accomid`),
  CONSTRAINT `report_ibfk_3` FOREIGN KEY (`bookid`) REFERENCES `book` (`bookid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
ALTER TABLE `report`
DROP FOREIGN KEY `report_ibfk_1`;

ALTER TABLE `report`
ADD CONSTRAINT `report_ibfk_1`
FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON DELETE CASCADE;
--
-- Dumping data for table `report`
--

LOCK TABLES `report` WRITE;
/*!40000 ALTER TABLE `report` DISABLE KEYS */;
INSERT INTO `report` VALUES (1,6,7,'harin33','벨튀충out','2025-06-13 08:43:53','무단 취소','APPROVED');
/*!40000 ALTER TABLE `report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `reviewid` int NOT NULL AUTO_INCREMENT,
  `accomid` int NOT NULL,
  `bookid` int NOT NULL,
  `username` varchar(100) NOT NULL,
  `rating` double NOT NULL,
  `comment` tinytext,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`reviewid`),
  KEY `username` (`username`),
  KEY `accomid` (`accomid`),
  KEY `bookid` (`bookid`),
  CONSTRAINT `review_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`username`),
  CONSTRAINT `review_ibfk_2` FOREIGN KEY (`accomid`) REFERENCES `accom` (`accomid`),
  CONSTRAINT `review_ibfk_3` FOREIGN KEY (`bookid`) REFERENCES `book` (`bookid`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
ALTER TABLE `review`
DROP FOREIGN KEY `review_ibfk_1`;

ALTER TABLE `review`
ADD CONSTRAINT `review_ibfk_1`
FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON DELETE CASCADE;

ALTER TABLE review
DROP FOREIGN KEY review_ibfk_2;

ALTER TABLE review
ADD CONSTRAINT review_ibfk_2 FOREIGN KEY (accomid)
REFERENCES accom(accomid) ON DELETE CASCADE;

ALTER TABLE review
DROP FOREIGN KEY review_ibfk_3;

ALTER TABLE review
ADD CONSTRAINT review_ibfk_3 FOREIGN KEY (accomid)
REFERENCES accom(accomid) ON DELETE CASCADE;

ALTER TABLE review
ADD CONSTRAINT FK_review_user
FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (1,1,1,'admin1',4.5,'깨끗하고 위치도 좋아요.','2025-06-04 15:20:00'),(2,6,7,'harin33',4,'조용하고 편안했어요.','2025-06-13 12:00:00'),(3,8,9,'hyunjin81',5,'정말 만족스러운 숙소입니다!','2025-06-08 20:30:00'),(4,11,12,'minseo21',3.5,'가성비 좋아요.','2025-06-11 18:15:00'),(5,12,13,'nayeon56',4.7,'친절한 호스트, 다시 방문하고 싶어요.','2025-06-16 09:45:00'),(6,17,18,'sujin88',4.2,'깨끗하고 시설이 잘 되어있네요.','2025-06-06 13:20:00'),(7,18,19,'sungwoo29',3.8,'위치가 조금 애매했지만 숙소는 좋았어요.','2025-06-12 21:00:00'),(8,1,26,'jangmi',5,'최고였어요! 강력 추천합니다.','2025-06-21 11:10:00'),(9,7,28,'minseo21',4.6,'다음에도 또 머무르고 싶네요.','2025-06-28 10:00:00'),(10,5,29,'daun09',3.9,'가성비 괜찮았어요.','2025-06-18 16:35:00');
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(10) NOT NULL,
  `name` varchar(10) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `age` int NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('admin1','$2a$10$BHlIBdbDgPxLHvrjX.ULvO59w7w2gsw5yyrUIn6U3yNluBE2eXaMe','ROLE_ADMIN','관리자','01000000000','admin@example.com',30),('arin22','$2a$10$BHlIBdbDgPxLHvrjX.ULvO59w7w2gsw5yyrUIn6U3yNluBE2eXaMe','ROLE_USER','박아린','01066778899','arin22@example.com',23),('choiho','$2a$10$BHlIBdbDgPxLHvrjX.ULvO59w7w2gsw5yyrUIn6U3yNluBE2eXaMe','ROLE_USER','최호준','01045674567','choiho@example.com',29),('daehyun17','$2a$10$BHlIBdbDgPxLHvrjX.ULvO59w7w2gsw5yyrUIn6U3yNluBE2eXaMe','ROLE_USER','정대현','01077778888','daehyun17@example.com',26),('daun09','$2a$10$BHlIBdbDgPxLHvrjX.ULvO59w7w2gsw5yyrUIn6U3yNluBE2eXaMe','ROLE_USER','이다운','01030303333','daun09@example.com',22),('eunji36','$2a$10$BHlIBdbDgPxLHvrjX.ULvO59w7w2gsw5yyrUIn6U3yNluBE2eXaMe','ROLE_USER','서은지','01080808888','eunji36@example.com',21),('haeun27','$2a$10$BHlIBdbDgPxLHvrjX.ULvO59w7w2gsw5yyrUIn6U3yNluBE2eXaMe','ROLE_USER','장하은','01012121212','haeun27@example.com',22),('harin33','$2a$10$BHlIBdbDgPxLHvrjX.ULvO59w7w2gsw5yyrUIn6U3yNluBE2eXaMe','ROLE_USER','이하린','01011113333','harin33@example.com',22),('honggil','$2a$10$BHlIBdbDgPxLHvrjX.ULvO59w7w2gsw5yyrUIn6U3yNluBE2eXaMe','ROLE_USER','홍길동','01089818981','honggil@example.com',35),('hyesoo12','$2a$10$BHlIBdbDgPxLHvrjX.ULvO59w7w2gsw5yyrUIn6U3yNluBE2eXaMe','ROLE_USER','최혜수','01099887766','hyesoo12@example.com',24),('hyunjin81','$2a$10$BHlIBdbDgPxLHvrjX.ULvO59w7w2gsw5yyrUIn6U3yNluBE2eXaMe','ROLE_USER','김현진','01050505555','hyunjin81@example.com',23),('jangmi','$2a$10$BHlIBdbDgPxLHvrjX.ULvO59w7w2gsw5yyrUIn6U3yNluBE2eXaMe','ROLE_USER','장미영','01011221122','jangmi77@example.com',26),('jinhwan64','$2a$10$BHlIBdbDgPxLHvrjX.ULvO59w7w2gsw5yyrUIn6U3yNluBE2eXaMe','ROLE_USER','송진환','01020202222','jinhwan64@example.com',29),('jiyun72','$2a$10$BHlIBdbDgPxLHvrjX.ULvO59w7w2gsw5yyrUIn6U3yNluBE2eXaMe','ROLE_USER','오지윤','01090909999','jiyun72@example.com',24),('jungwoo31','$2a$10$BHlIBdbDgPxLHvrjX.ULvO59w7w2gsw5yyrUIn6U3yNluBE2eXaMe','ROLE_USER','정우빈','01033445566','jungwoo31@example.com',28),('kimseok','$2a$10$BHlIBdbDgPxLHvrjX.ULvO59w7w2gsw5yyrUIn6U3yNluBE2eXaMe','ROLE_USER','김석진','01090929092','seokjin.kim@example.com',32),('leechan','$2a$10$BHlIBdbDgPxLHvrjX.ULvO59w7w2gsw5yyrUIn6U3yNluBE2eXaMe','ROLE_USER','이찬우','01078907890','chanwoo.lee@example.com',28),('minji12','$2a$10$BHlIBdbDgPxLHvrjX.ULvO59w7w2gsw5yyrUIn6U3yNluBE2eXaMe','ROLE_USER','김민지','01023451234','minji12@example.com',27),('minseo21','$2a$10$BHlIBdbDgPxLHvrjX.ULvO59w7w2gsw5yyrUIn6U3yNluBE2eXaMe','ROLE_USER','김민서','01044445555','minseo21@example.com',24),('nayeon56','$2a$10$BHlIBdbDgPxLHvrjX.ULvO59w7w2gsw5yyrUIn6U3yNluBE2eXaMe','ROLE_USER','정나연','01040404444','nayeon56@example.com',25),('park_jh','$2a$10$BHlIBdbDgPxLHvrjX.ULvO59w7w2gsw5yyrUIn6U3yNluBE2eXaMe','ROLE_USER','박지현','01034563456','jhpark@example.com',22),('seojun05','$2a$10$BHlIBdbDgPxLHvrjX.ULvO59w7w2gsw5yyrUIn6U3yNluBE2eXaMe','ROLE_USER','서준호','01087654321','seojun05@example.com',25),('seonah','$2a$10$BHlIBdbDgPxLHvrjX.ULvO59w7w2gsw5yyrUIn6U3yNluBE2eXaMe','ROLE_USER','최선아','01011112222','dondo0412@gmail.com',24),('soyeon92','$2a$10$BHlIBdbDgPxLHvrjX.ULvO59w7w2gsw5yyrUIn6U3yNluBE2eXaMe','ROLE_USER','한소연','01010101111','soyeon92@example.com',26),('sujin03','$2a$10$BHlIBdbDgPxLHvrjX.ULvO59w7w2gsw5yyrUIn6U3yNluBE2eXaMe','ROLE_USER','이수진','01067896789','sujin03@example.com',21),('sujin88','$2a$10$BHlIBdbDgPxLHvrjX.ULvO59w7w2gsw5yyrUIn6U3yNluBE2eXaMe','ROLE_USER','백수진','01011223344','sujin88@example.com',21),('sungwoo29','$2a$10$BHlIBdbDgPxLHvrjX.ULvO59w7w2gsw5yyrUIn6U3yNluBE2eXaMe','ROLE_USER','남성우','01070707777','sungwoo29@example.com',30),('taemin76','$2a$10$BHlIBdbDgPxLHvrjX.ULvO59w7w2gsw5yyrUIn6U3yNluBE2eXaMe','ROLE_USER','이태민','01022334455','taemin76@example.com',27),('yebin45','$2a$10$BHlIBdbDgPxLHvrjX.ULvO59w7w2gsw5yyrUIn6U3yNluBE2eXaMe','ROLE_USER','이예빈','01060606666','yebin45@example.com',20),('yoonji98','$2a$10$BHlIBdbDgPxLHvrjX.ULvO59w7w2gsw5yyrUIn6U3yNluBE2eXaMe','ROLE_USER','윤지영','01012345678','yoonji98@example.com',23),('yuna_k','$2a$10$BHlIBdbDgPxLHvrjX.ULvO59w7w2gsw5yyrUIn6U3yNluBE2eXaMe$2a$10$BHlIBdbDgPxLHvrjX.ULvO59w7w2gsw5yyrUIn6U3yNluBE2eXaMe','ROLE_USER','강유나','01056785678','yuna.kang@example.com',25);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `verificationcode`
--

DROP TABLE IF EXISTS `verificationcode`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `verificationcode` (
  `codeid` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL,
  `code` varchar(6) DEFAULT NULL,
  `createdat` datetime DEFAULT NULL,
  `expiresat` datetime DEFAULT NULL,
  `isverified` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`codeid`),
  KEY `username` (`username`),
  CONSTRAINT `verificationcode_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
ALTER TABLE `verificationcode`
DROP FOREIGN KEY `verificationcode_ibfk_1`;

ALTER TABLE `verificationcode`
ADD CONSTRAINT `verificationcode_ibfk_1`
FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON DELETE CASCADE;
--
-- Dumping data for table `verificationcode`
--

LOCK TABLES `verificationcode` WRITE;
/*!40000 ALTER TABLE `verificationcode` DISABLE KEYS */;
/*!40000 ALTER TABLE `verificationcode` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-17 11:49:17
