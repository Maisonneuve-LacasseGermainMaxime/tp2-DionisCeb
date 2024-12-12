-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 12, 2024 at 02:12 PM
-- Server version: 5.7.24
-- PHP Version: 8.3.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fitness-app`
--

-- --------------------------------------------------------

--
-- Table structure for table `exercices`
--

CREATE TABLE `exercices` (
  `id` int(11) NOT NULL,
  `type` varchar(50) NOT NULL,
  `duree` int(11) NOT NULL,
  `description` varchar(200) NOT NULL,
  `date` datetime NOT NULL,
  `difficulte` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `exercices`
--

INSERT INTO `exercices` (`id`, `type`, `duree`, `description`, `date`, `difficulte`) VALUES
(1, 'course', 60, 'Course autour du stade olympique', '2024-07-12 14:08:10', 1),
(2, 'natation', 120, 'Nage à la piscine Marquette.', '2024-07-03 10:08:42', 1),
(3, 'Randonnée', 240, 'Randonnée au mont St-Hilaire. Très difficile!', '2024-05-01 07:00:00', 5),
(4, 'yoga', 90, 'Séance de yoga pour débutants.', '2024-06-15 08:30:00', 2),
(5, 'vélo', 180, 'Tour à vélo sur la piste cyclable du canal Lachine.', '2024-07-21 09:15:25', 3),
(6, 'musculation', 60, 'Entraînement de musculation au gym local.', '2024-08-05 18:45:10', 4),
(7, 'escalade', 120, 'Session d\'escalade en salle.', '2024-07-18 16:30:00', 4),
(8, 'football', 90, 'Match de football amical.', '2024-06-10 19:00:00', 3),
(9, 'tennis', 120, 'Match de tennis en double.', '2024-08-09 17:00:00', 2),
(10, 'basketball', 60, 'Entraînement de basketball.', '2024-07-26 14:45:00', 3),
(11, 'marche', 120, 'Promenade dans le parc Lafontaine.', '2024-05-23 11:00:00', 1),
(12, 'ski', 180, 'Ski alpin à Mont-Tremblant.', '2024-02-14 08:00:00', 5),
(13, 'boxe', 90, 'Entraînement de boxe au centre sportif.', '2024-08-12 20:30:00', 4);



--
-- Indexes for dumped tables
--

--
-- Indexes for table `exercices`
--
ALTER TABLE `exercices`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `exercices`
--
ALTER TABLE `exercices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
