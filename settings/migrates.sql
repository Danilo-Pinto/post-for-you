create database `social_media`;

use `social_media`;

CREATE TABLE `login` (
  `id` int(9) NOT NULL auto_increment,
  `email` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `token` varchar(100),
  PRIMARY KEY  (`id`)
);

CREATE TABLE `posts` (
  `id` int(11) NOT NULL auto_increment,
  `photo` varchar(100) NOT NULL,
  `title` varchar(100) NOT NULL,
  `author` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
);
