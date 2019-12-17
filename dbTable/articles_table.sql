-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 17, 2019 at 10:40 AM
-- Server version: 10.4.10-MariaDB
-- PHP Version: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `articles_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `articles_table`
--

CREATE TABLE `articles_table` (
  `article_id` int(11) NOT NULL,
  `article_title` varchar(60) NOT NULL,
  `article_published` date NOT NULL,
  `article_site` varchar(50) NOT NULL,
  `article_ad_group` varchar(50) NOT NULL,
  `article_bids` int(11) NOT NULL,
  `article_spending` int(11) NOT NULL,
  `article_win_rate` int(11) NOT NULL,
  `article_impressions` int(11) NOT NULL,
  `article_clicks` int(11) NOT NULL,
  `article_ctr` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `articles_table`
--

INSERT INTO `articles_table` (`article_id`, `article_title`, `article_published`, `article_site`, `article_ad_group`, `article_bids`, `article_spending`, `article_win_rate`, `article_impressions`, `article_clicks`, `article_ctr`) VALUES
(111, 'Aliquam mi tellus, feugiat at interdum', '2019-12-03', 'ABC Nyheter', 'Proin malesuada', 45, 7, 12, 457, 5, 0),
(112, 'Suspendisse risus nisi, mattis eget finibus ', '2020-02-14', 'Aftenposten', 'Nulla at nunc vel nisl ', -1, 1, 78, 0, 89, 26),
(113, 'Quisque eu nunc ac turpis egestas pulvinar', '2019-11-07', 'ABC Nyheter', 'Proin malesuada', 6, 96, 0, 19, 895, 99),
(114, 'Mauris pretium neque sed ante mattis vestibulum', '2020-04-18', 'BBC World News', 'Donec sed imperdiet', 1, 7, 89, 9, 88, 10),
(115, 'Sed in ornare lacus, vel congue felis', '2019-11-29', 'Aftenposten', 'Lorem ipsum dolor ', 18, 89, 1, -10, 78, 1),
(116, 'Praesent maximus, neque cursus cursus tempor', '2019-12-02', 'DinSide', 'Nulla at nunc vel nisl ', 1, -1, 6, 1, 1, 1),
(117, 'Aenean at nunc a risus pulvinar euismod', '2020-01-21', 'ABC Nyheter', 'Nulla at nunc vel nisl ', 1, 1, 1, -1, 1, 1),
(118, 'Fusce eu lobortis odio', '2020-01-09', 'VG', 'Proin malesuada', -1, 456, 78, 8, 45, 0),
(119, 'Groin eu justo sed purus convallis', '2019-10-03', 'BBC World News', 'Donec sed imperdiet', 98, 3, 5, 6, 56, 56),
(120, 'Benean molestie auctor nisl, id feugiat sapien', '2020-01-16', 'VG', 'Proin malesuada', 1, -1, 1, 1, -1, 1),
(121, 'Maecenas id erat ac nisi mattis', '2019-12-26', 'Aftenposten', 'Proin malesuada', 89, 45, 21, 6, 8, 63),
(122, 'Sed et justo ac dui congue mattis', '2019-12-05', 'BBC World News', 'Nulla at nunc vel nisl ', 1, 78, 9, 87, 87, 8),
(123, 'Vivamus commodo egestas sapien vel', '2019-12-27', 'DinSide', 'Proin malesuada', 8, 78, 7, 8, 7, 7),
(124, 'Cursus cursus tempor, metus purus', '2020-01-19', 'DinSide', 'Donec sed imperdiet', 8, 787, 6, 89, 5, 78),
(125, 'There is no one who loves pain itself', '2020-01-11', 'DinSide', 'Proin malesuada', 9, 2, 4, 78, 7, 0),
(126, 'Quisque eu nunc ac turpis egestas', '2019-11-20', 'ABC Nyheter', 'Donec sed imperdiet', 1, 1, 4, -9, 1, 54),
(127, 'Onec tempus neque eget augue mollis', '2019-12-07', 'DinSide', 'Donec sed imperdiet', -1, 1, 4, 5, -1, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `articles_table`
--
ALTER TABLE `articles_table`
  ADD PRIMARY KEY (`article_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `articles_table`
--
ALTER TABLE `articles_table`
  MODIFY `article_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=131;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
