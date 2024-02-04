-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 04, 2024 at 05:01 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ministerstvodopravy`
--
CREATE DATABASE IF NOT EXISTS `ministerstvodopravy` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `ministerstvodopravy`;

-- --------------------------------------------------------


GRANT ALL PRIVILEGES ON *.* TO `node`@`localhost` IDENTIFIED BY PASSWORD '*8CA47DCCB364A6B97DA920BCC5AE5131A14CC00A' WITH GRANT OPTION;


--
-- Table structure for table `ministerstvo`
--

DROP TABLE IF EXISTS `ministerstvo`;
CREATE TABLE `ministerstvo` (
  `id_m` int(11) NOT NULL,
  `jmeno_ministra` varchar(255) NOT NULL,
  `prijmeni_ministra` varchar(255) NOT NULL,
  `adresa` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ministerstvo`
--

INSERT INTO `ministerstvo` (`id_m`, `jmeno_ministra`, `prijmeni_ministra`, `adresa`) VALUES
(1, 'Martin', 'Kupka', 'nábřeží Ludvíka Svobody 1222, 110 00 Nové Město');

-- --------------------------------------------------------

--
-- Table structure for table `ridic`
--

DROP TABLE IF EXISTS `ridic`;
CREATE TABLE `ridic` (
  `id_r` int(11) NOT NULL,
  `jmeno` varchar(255) NOT NULL,
  `prijmeni` varchar(255) NOT NULL,
  `rod_cis` varchar(255) NOT NULL,
  `ztp` tinyint(1) DEFAULT NULL,
  `adresa` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ridic`
--

INSERT INTO `ridic` (`id_r`, `jmeno`, `prijmeni`, `rod_cis`, `ztp`, `adresa`) VALUES
(23, 'Anna', 'Novakova', '987654/3210', 0, 'Hlavni 45, Brno 602 00'),
(24, 'Petr', 'Svoboda', '456789/0123', 1, 'Ulice 8, Ostrava 700 01'),
(28, 'Karel', 'Pavel', '123456/1234', 0, 'Prdel 123');

-- --------------------------------------------------------

--
-- Table structure for table `ridicskeopravneni`
--

DROP TABLE IF EXISTS `ridicskeopravneni`;
CREATE TABLE `ridicskeopravneni` (
  `id_ro` int(11) NOT NULL,
  `oznaceni` varchar(255) NOT NULL,
  `kategorie` varchar(255) NOT NULL,
  `max_hmotnost_kg` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ridicskeopravneni`
--

INSERT INTO `ridicskeopravneni` (`id_ro`, `oznaceni`, `kategorie`, `max_hmotnost_kg`) VALUES
(1, 'B', 'automobil', 2500),
(2, 'A1', 'malé motorky', 400),
(3, 'A2', 'motorky', 600);

-- --------------------------------------------------------

--
-- Table structure for table `ridicskyprukaz`
--

DROP TABLE IF EXISTS `ridicskyprukaz`;
CREATE TABLE `ridicskyprukaz` (
  `id_rp` int(11) NOT NULL,
  `id_r` int(11) DEFAULT NULL,
  `id_u` int(11) DEFAULT NULL,
  `id_ro` int(11) DEFAULT NULL,
  `dat_zacatku` date NOT NULL,
  `dat_konce` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ridicskyprukaz`
--

INSERT INTO `ridicskyprukaz` (`id_rp`, `id_r`, `id_u`, `id_ro`, `dat_zacatku`, `dat_konce`) VALUES
(13, 23, 2, 1, '2015-01-01', '2021-12-31'),
(14, 28, 2, 2, '2023-09-04', '2024-07-25');

-- --------------------------------------------------------

--
-- Table structure for table `technickyprukaz`
--

DROP TABLE IF EXISTS `technickyprukaz`;
CREATE TABLE `technickyprukaz` (
  `id_tp` int(11) NOT NULL,
  `id_v` int(11) DEFAULT NULL,
  `id_u` int(11) NOT NULL,
  `provozovatel` varchar(255) NOT NULL,
  `znacka` varchar(255) NOT NULL,
  `model` varchar(255) NOT NULL,
  `barva` varchar(255) NOT NULL,
  `spz` varchar(20) NOT NULL,
  `vin` varchar(17) NOT NULL,
  `vykon_kw` int(11) NOT NULL,
  `objem` int(11) NOT NULL,
  `nej_rychlost` int(11) NOT NULL,
  `rozmery_kol` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `technickyprukaz`
--

INSERT INTO `technickyprukaz` (`id_tp`, `id_v`, `id_u`, `provozovatel`, `znacka`, `model`, `barva`, `spz`, `vin`, `vykon_kw`, `objem`, `nej_rychlost`, `rozmery_kol`) VALUES
(5, 4, 1, 'Petr Pavel', 'USARMY', 'M1A2', 'Kamuflážová zelená', '000 0000', '00000000000000000', 5000, 9800, 75, '100/50R50'),
(7, 5, 3, 'Babiš Hrabiš Smrdí', 'Volkswagen', 'Polo', 'Hovnová', '000 0001', '00000000000000002', 10, 12, 25, '008/10R10');

-- --------------------------------------------------------

--
-- Table structure for table `urad`
--

DROP TABLE IF EXISTS `urad`;
CREATE TABLE `urad` (
  `id_u` int(11) NOT NULL,
  `id_m` int(11) DEFAULT NULL,
  `nazev` varchar(255) NOT NULL,
  `adresa` varchar(255) NOT NULL,
  `typ` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `urad`
--

INSERT INTO `urad` (`id_u`, `id_m`, `nazev`, `adresa`, `typ`) VALUES
(1, 1, 'Magistrát hl.m. Prahy', 'Jungmannova 35/29, 110 00 Nové Město, Praha', 'Magistrát'),
(2, 1, 'Radnice Kostelec', 'Kostelec 1, 257 01 Kostelec', 'Obecní úřad'),
(3, 1, 'Krajský úřad Jihlava', 'Pavlova 158, 50 368 Jihlava', 'Krajský úřad');

-- --------------------------------------------------------

--
-- Table structure for table `vozidlo`
--

DROP TABLE IF EXISTS `vozidlo`;
CREATE TABLE `vozidlo` (
  `id_v` int(11) NOT NULL,
  `id_tp` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vozidlo`
--

INSERT INTO `vozidlo` (`id_v`, `id_tp`) VALUES
(4, 5),
(5, 7);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ministerstvo`
--
ALTER TABLE `ministerstvo`
  ADD PRIMARY KEY (`id_m`);

--
-- Indexes for table `ridic`
--
ALTER TABLE `ridic`
  ADD PRIMARY KEY (`id_r`),
  ADD UNIQUE KEY `rod_cis` (`rod_cis`);

--
-- Indexes for table `ridicskeopravneni`
--
ALTER TABLE `ridicskeopravneni`
  ADD PRIMARY KEY (`id_ro`);

--
-- Indexes for table `ridicskyprukaz`
--
ALTER TABLE `ridicskyprukaz`
  ADD PRIMARY KEY (`id_rp`),
  ADD KEY `id_o` (`id_r`),
  ADD KEY `id_u` (`id_u`),
  ADD KEY `id_ro` (`id_ro`);

--
-- Indexes for table `technickyprukaz`
--
ALTER TABLE `technickyprukaz`
  ADD PRIMARY KEY (`id_tp`),
  ADD KEY `id_v` (`id_v`),
  ADD KEY `id_u` (`id_u`);

--
-- Indexes for table `urad`
--
ALTER TABLE `urad`
  ADD PRIMARY KEY (`id_u`),
  ADD KEY `id_m` (`id_m`);

--
-- Indexes for table `vozidlo`
--
ALTER TABLE `vozidlo`
  ADD PRIMARY KEY (`id_v`),
  ADD KEY `id_tp` (`id_tp`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ministerstvo`
--
ALTER TABLE `ministerstvo`
  MODIFY `id_m` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `ridic`
--
ALTER TABLE `ridic`
  MODIFY `id_r` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `ridicskeopravneni`
--
ALTER TABLE `ridicskeopravneni`
  MODIFY `id_ro` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `ridicskyprukaz`
--
ALTER TABLE `ridicskyprukaz`
  MODIFY `id_rp` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `technickyprukaz`
--
ALTER TABLE `technickyprukaz`
  MODIFY `id_tp` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `urad`
--
ALTER TABLE `urad`
  MODIFY `id_u` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `vozidlo`
--
ALTER TABLE `vozidlo`
  MODIFY `id_v` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ridicskyprukaz`
--
ALTER TABLE `ridicskyprukaz`
  ADD CONSTRAINT `ridicskyprukaz_ibfk_1` FOREIGN KEY (`id_r`) REFERENCES `ridic` (`id_r`),
  ADD CONSTRAINT `ridicskyprukaz_ibfk_2` FOREIGN KEY (`id_u`) REFERENCES `urad` (`id_u`),
  ADD CONSTRAINT `ridicskyprukaz_ibfk_3` FOREIGN KEY (`id_ro`) REFERENCES `ridicskeopravneni` (`id_ro`);

--
-- Constraints for table `technickyprukaz`
--
ALTER TABLE `technickyprukaz`
  ADD CONSTRAINT `technickyprukaz_ibfk_1` FOREIGN KEY (`id_v`) REFERENCES `vozidlo` (`id_v`),
  ADD CONSTRAINT `technickyprukaz_ibfk_2` FOREIGN KEY (`id_u`) REFERENCES `urad` (`id_u`);

--
-- Constraints for table `urad`
--
ALTER TABLE `urad`
  ADD CONSTRAINT `urad_ibfk_1` FOREIGN KEY (`id_m`) REFERENCES `ministerstvo` (`id_m`);

--
-- Constraints for table `vozidlo`
--
ALTER TABLE `vozidlo`
  ADD CONSTRAINT `vozidlo_ibfk_1` FOREIGN KEY (`id_tp`) REFERENCES `technickyprukaz` (`id_tp`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
