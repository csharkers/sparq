-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           10.4.32-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.11.0.7065
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
  `id_sensor` int(11) NOT NULL AUTO_INCREMENT,
  `localizacao` varchar(100) NOT NULL,
  `tipo_sensor` varchar(100) NOT NULL,
  `id_parque` int(11) NOT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela sparqbd.usuario: ~13 rows (aproximadamente)
INSERT INTO `usuario` (`id_usuario`, `nome`, `email`, `cpf`, `sexo`, `parque`, `senha`, `cargo`, `avatar`, `created_at`, `ativo`) VALUES
	(1, 'Ana Maria', 'ana@email.com', '123.456.789-01', 'feminino', 1, 'scrypt:32768:8:1$sxTNcfb85Ukj8Lnj$bad062c8a4f235bc4ac7afa832551cc357659707128eee461bf83b518d178223fd6c81cb83de033533ae1eb629ef8dc025ab3e0737e45738d88041d5fce86e66', 3, 'avatar.png', '2025-06-16 11:34:49', 1),
	(2, 'Daniel Silva', 'daniel.silva@email.com', '123.456.789-03', 'masculino', 1, 'scrypt:32768:8:1$ctrRLNF1pewjjX4f$f7c3a9480d6d4466ff0d8e2c8ef2a1b3e0553d6552e1527f1d52c3db4eea6ad515f4782bbc20c5ae085b8bc52b58668d3a950a9c0a674e23449f270fe80a025f', 1, 'avatar.png', '2025-06-16 14:55:24', 1),
	(3, 'João Dolores', 'joao@email.com', '123.456.786-54', 'masculino', 2, 'scrypt:32768:8:1$ufordggGoqCwaBWA$57dd124a867eec0d4083f6ca5f9bf6b0ffb21b40d95149d2a68d0380dba2c01a99662e4f813a301ac8f3ab38eb8cf93fe70b24944c3157261e2bd60eecc3f16a', 2, 'avatar.png', '2025-06-16 15:07:21', 1),
	(7, 'Maria Silva', 'maria.silva@exemplo.com', '529.982.310-68', 'feminino', 1, '$2y$10$abc123def456ghi789jkl', 2, 'avatar.png', '2025-06-17 14:12:44', 1),
	(8, 'Carlos Oliveira', 'carlos.oliveira@exemplo.com', '714.635.820-49', 'masculino', 2, '$2y$10$xyz987uvw654rst321opq', 3, 'avatar.png', '2025-06-17 14:12:44', 1),
	(9, 'Ana Souza', 'ana.souza@exemplo.com', '203.857.460-31', 'outro', 1, '$2y$10$mno456pqr123stu789vwx', 1, 'avatar.png', '2025-06-17 14:12:44', 1),
	(10, 'João Pereira', 'joao.pereira@exemplo.com', '396.104.285-72', 'masculino', 2, '$2y$10$hijk123lmn456opq789rst', 2, 'avatar.png', '2025-06-17 14:12:44', 1),
	(11, 'Fernanda Costa', 'fernanda.costa@exemplo.com', '481.593.720-63', 'feminino', 1, '$2y$10$uvwx456yzab789cde012fg', 3, 'avatar.png', '2025-06-17 14:12:44', 1),
	(12, 'Ricardo Santos', 'ricardo.santos@exemplo.com', '625.309.148-57', 'masculino', 1, '$2y$10$ghij789klmn012opq345rs', 1, 'avatar.png', '2025-06-17 14:12:44', 0),
	(13, 'Patrícia Lima', 'patricia.lima@exemplo.com', '790.451.236-84', 'feminino', 2, '$2y$10$tuvw567xyza890bcd123ef', 2, 'avatar.png', '2025-06-17 14:12:44', 1),
	(14, 'Alex Martins', 'alex.martins@exemplo.com', '154.826.903-25', 'outro', 2, '$2y$10$mnop901qrst234uvw567xy', 3, 'avatar.png', '2025-06-17 14:12:44', 1),
	(15, 'Juliana Rocha', 'juliana.rocha@exemplo.com', '937.562.014-38', 'feminino', 1, '$2y$10$bcde234fghi567jkl890mn', 1, 'avatar.png', '2025-06-17 14:12:44', 1),
	(16, 'Marcos Oliveira', 'marcos.oliveira@exemplo.com', '468.015.327-90', 'masculino', 2, '$2y$10$pqrs678tuvw901xyz234ab', 2, 'avatar.png', '2025-06-17 14:12:44', 0);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
