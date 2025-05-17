-- --------------------------------------------------------
-- Hôte:                         127.0.0.1
-- Version du serveur:           11.3.2-MariaDB - mariadb.org binary distribution
-- SE du serveur:                Win64
-- HeidiSQL Version:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Listage de la structure de la base pour budbud
DROP DATABASE IF EXISTS `budbud`;
CREATE DATABASE IF NOT EXISTS `budbud` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci */;
USE `budbud`;

-- Listage de la structure de la table budbud. actifs
DROP TABLE IF EXISTS `actifs`;
CREATE TABLE IF NOT EXISTS `actifs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `montant` float DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `actifs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Listage des données de la table budbud.actifs : ~6 rows (environ)
DELETE FROM `actifs`;
INSERT INTO `actifs` (`id`, `user_id`, `type`, `nom`, `montant`) VALUES
	(1, 1, 'Divers', 'Comptant', 170),
	(2, 1, 'Credit', 'VISA Desjardins', -215.3),
	(3, 1, 'Bancaire', 'Scotiabank', 503.21),
	(5, 1, 'Bancaire', 'BNC', 23.95),
	(6, 1, 'Epargnes', 'CELI', 303.5),
	(7, 1, 'Prets', 'Le Gros Gino', -200);

-- Listage de la structure de la table budbud. budget
DROP TABLE IF EXISTS `budget`;
CREATE TABLE IF NOT EXISTS `budget` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `categorie` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `date` varchar(255) DEFAULT NULL,
  `montant` float DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `budget_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Listage des données de la table budbud.budget : ~13 rows (environ)
DELETE FROM `budget`;
INSERT INTO `budget` (`id`, `user_id`, `categorie`, `type`, `date`, `montant`) VALUES
	(1, 1, 'Non catégorisé', 'Autres', '2025-04-01', 0),
	(2, 1, 'Épicerie', 'Quotidien', '2025-04-01', 500),
	(3, 1, 'Restaurant', 'Quotidien', '2025-04-01', 100),
	(4, 1, 'Loyer / Hypothèque', 'Factures', '2025-04-01', 1200),
	(5, 1, 'SQDC', 'Loisirs', '2025-04-01', 500),
	(7, 1, 'Imprévus', 'Autres', '2025-04-01', 100),
	(9, 1, 'Café', 'Quotidien', '2025-04-01', 50),
	(10, 1, 'Transport / Essence', 'Quotidien', '2025-04-01', 200),
	(11, 1, 'Électricité', 'Factures', '2025-04-01', 200),
	(12, 1, 'Internet', 'Factures', '2025-04-01', 100),
	(13, 1, 'Téléphone', 'Factures', '2025-04-01', 50),
	(16, 1, 'Cartes de crédit', 'Factures', '2025-04-01', 50),
	(43, 1, 'Dettes', 'Factures', '2025-04-01', 0);

-- Listage de la structure de la table budbud. transactions
DROP TABLE IF EXISTS `transactions`;
CREATE TABLE IF NOT EXISTS `transactions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `budget_id` int(11) DEFAULT NULL,
  `detail` varchar(255) DEFAULT NULL,
  `date` varchar(255) DEFAULT NULL,
  `montant` float DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `budget_id` (`budget_id`),
  CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`budget_id`) REFERENCES `budget` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Listage des données de la table budbud.transactions : ~12 rows (environ)
DELETE FROM `transactions`;
INSERT INTO `transactions` (`id`, `budget_id`, `detail`, `date`, `montant`) VALUES
	(1, 3, 'McDo', '2025-02-01', 34.87),
	(2, 11, 'Hydro', '2025-02-23', 197.11),
	(3, 2, 'IGA', '2025-02-26', 24.65),
	(4, 13, 'Fizz', '2025-02-28', 35),
	(5, 4, 'Loyer', '2025-02-10', 1178),
	(6, 5, '420', '2025-02-23', 287.54),
	(8, 10, 'Esso', '2025-02-01', 45),
	(9, 2, 'Costco', '2025-02-23', 228.67),
	(10, 16, 'VISA', '2025-02-26', 24.65),
	(20, 12, 'Vidéotron', '2025-03-05', 96.61),
	(25, 9, 'McDo', '2025-03-10', 2.3),
	(26, 7, 'Vétérinaire', '2025-03-28', 49.65);

-- Listage de la structure de la table budbud. users
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `prenom` varchar(255) DEFAULT NULL,
  `courriel` varchar(255) DEFAULT NULL,
  `mdp` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Listage des données de la table budbud.users : ~2 rows (environ)
DELETE FROM `users`;
INSERT INTO `users` (`id`, `username`, `nom`, `prenom`, `courriel`, `mdp`) VALUES
	(1, 'default_user', 'Blow', 'Joe', 'joe.blow@toto.com', 'asdhouiaygdsau7ygd76q23'),
	(2, 'user2', 'Bloe', 'Jane', 'jane.bloe@tata.com', 'SAF9YJAW78F$%0QWHDOYUI@FASD!HOCIAS');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
