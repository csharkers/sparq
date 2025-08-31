-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           10.4.32-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.10.0.7000
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para sparqbd
CREATE DATABASE IF NOT EXISTS `sparqbd` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `sparqbd`;

-- Copiando estrutura para tabela sparqbd.indice
CREATE TABLE IF NOT EXISTS `indice` (
  `id_indice` int(11) NOT NULL AUTO_INCREMENT,
  `nome_indice` varchar(100) NOT NULL,
  PRIMARY KEY (`id_indice`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela sparqbd.indice: ~0 rows (aproximadamente)

-- Copiando estrutura para tabela sparqbd.leitura
CREATE TABLE IF NOT EXISTS `leitura` (
  `id_leitura` int(11) NOT NULL AUTO_INCREMENT,
  `qualidade_ar` varchar(50) DEFAULT NULL,
  `temperatura` decimal(5,2) DEFAULT NULL,
  `umidade` decimal(5,2) DEFAULT NULL,
  `data_hora` datetime NOT NULL,
  `id_sensor` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  PRIMARY KEY (`id_leitura`),
  KEY `fk_leitura_sensores` (`id_sensor`),
  KEY `fk_leitura_usuario` (`id_usuario`),
  CONSTRAINT `fk_leitura_sensores` FOREIGN KEY (`id_sensor`) REFERENCES `sensores` (`id_sensor`),
  CONSTRAINT `fk_leitura_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela sparqbd.leitura: ~0 rows (aproximadamente)

-- Copiando estrutura para tabela sparqbd.parque
CREATE TABLE IF NOT EXISTS `parque` (
  `id_parque` int(11) NOT NULL AUTO_INCREMENT,
  `nome_parque` varchar(100) NOT NULL,
  `localizacao` varchar(100) NOT NULL,
  PRIMARY KEY (`id_parque`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela sparqbd.parque: ~0 rows (aproximadamente)

-- Copiando estrutura para tabela sparqbd.registro
CREATE TABLE IF NOT EXISTS `registro` (
  `id_registro` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(255) DEFAULT NULL,
  `data_registro` datetime NOT NULL,
  `id_leitura` int(11) NOT NULL,
  `id_indice` int(11) NOT NULL,
  PRIMARY KEY (`id_registro`),
  KEY `fk_registro_leitura` (`id_leitura`),
  KEY `fk_registro_indice` (`id_indice`),
  CONSTRAINT `fk_registro_indice` FOREIGN KEY (`id_indice`) REFERENCES `indice` (`id_indice`),
  CONSTRAINT `fk_registro_leitura` FOREIGN KEY (`id_leitura`) REFERENCES `leitura` (`id_leitura`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela sparqbd.registro: ~0 rows (aproximadamente)

-- Copiando estrutura para tabela sparqbd.sensores
CREATE TABLE IF NOT EXISTS `sensores` (
  `id_sensor` INT(11) NOT NULL AUTO_INCREMENT,
  `nome_sensor` VARCHAR(100) NOT NULL,
  `tipo_sensor` VARCHAR(100) NOT NULL,
  `latitude` DECIMAL(10,8) NOT NULL,
  `longitude` DECIMAL(11,8) NOT NULL,
  `id_parque` INT(11) NOT NULL,
  PRIMARY KEY (`id_sensor`),
  KEY `fk_sensores_parque` (`id_parque`),
  CONSTRAINT `fk_sensores_parque` FOREIGN KEY (`id_parque`) REFERENCES `parque` (`id_parque`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela sparqbd.sensores: ~0 rows (aproximadamente)

-- Copiando estrutura para tabela sparqbd.usuario
CREATE TABLE IF NOT EXISTS `usuario` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `cpf` char(14) NOT NULL,
  `sexo` enum('masculino','feminino','outro') NOT NULL,
  `parque` int(11) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `cargo` int(11) NOT NULL,
  `avatar` varchar(200) NOT NULL DEFAULT 'avatar.png',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `ativo` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `cpf` (`cpf`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela sparqbd.usuario: ~3 rows (aproximadamente)
INSERT INTO `usuario` (`id_usuario`, `nome`, `email`, `cpf`, `sexo`, `parque`, `senha`, `cargo`, `avatar`, `created_at`, `ativo`) VALUES
	(1, 'Ana Maria', 'ana@email.com', '123.456.789-01', 'feminino', 1, '123', 3, 'ana.png', '2025-06-16 14:34:49', 1),
	(2, 'Daniel Silva', 'daniel.silva@email.com', '123.456.789-03', 'masculino', 1, 'scrypt:32768:8:1$ctrRLNF1pewjjX4f$f7c3a9480d6d4466ff0d8e2c8ef2a1b3e0553d6552e1527f1d52c3db4eea6ad515f4782bbc20c5ae085b8bc52b58668d3a950a9c0a674e23449f270fe80a025f', 1, 'daniel.png', '2025-06-16 17:55:24', 1),
	(3, 'João Dolores', 'joao@email.com', '123.456.786-54', 'masculino', 2, 'scrypt:32768:8:1$ufordggGoqCwaBWA$57dd124a867eec0d4083f6ca5f9bf6b0ffb21b40d95149d2a68d0380dba2c01a99662e4f813a301ac8f3ab38eb8cf93fe70b24944c3157261e2bd60eecc3f16a', 2, 'joao.png', '2025-06-16 18:07:21', 1);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
