CREATE TABLE IF NOT EXISTS `events` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `title` varchar(255) NOT NULL,
    `date` date NOT NULL,
    `place` varchar(255) NOT NULL,
    `conductor` varchar(255) NULL,
    `description` text NULL,
    `local_folder` varchar(255) NULL,
    `cover_image` varchar(255) NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `music` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `author` varchar(255) DEFAULT NULL,
    `title` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `music_to_events` (
  `music` int(11) NOT NULL,
  `event` int(11) NOT NULL,
  PRIMARY KEY (music, event)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;