-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           10.1.33-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win32
-- HeidiSQL Versão:              9.5.0.5196
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Copiando estrutura do banco de dados para sparqbd
CREATE DATABASE IF NOT EXISTS `sparqbd` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `sparqbd`;

-- Copiando estrutura para tabela sparqbd.indice
CREATE TABLE IF NOT EXISTS `indice` (
  `id_indice` int(11) NOT NULL AUTO_INCREMENT,
  `nome_indice` varchar(100) NOT NULL,
  PRIMARY KEY (`id_indice`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Copiando dados para a tabela sparqbd.indice: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `indice` DISABLE KEYS */;
/*!40000 ALTER TABLE `indice` ENABLE KEYS */;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Copiando dados para a tabela sparqbd.leitura: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `leitura` DISABLE KEYS */;
/*!40000 ALTER TABLE `leitura` ENABLE KEYS */;

-- Copiando estrutura para tabela sparqbd.parque
CREATE TABLE IF NOT EXISTS `parque` (
  `id_parque` int(11) NOT NULL AUTO_INCREMENT,
  `nome_parque` varchar(100) NOT NULL,
  `localizacao` varchar(100) NOT NULL,
  PRIMARY KEY (`id_parque`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Copiando dados para a tabela sparqbd.parque: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `parque` DISABLE KEYS */;
/*!40000 ALTER TABLE `parque` ENABLE KEYS */;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Copiando dados para a tabela sparqbd.registro: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `registro` DISABLE KEYS */;
/*!40000 ALTER TABLE `registro` ENABLE KEYS */;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Copiando dados para a tabela sparqbd.sensores: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `sensores` DISABLE KEYS */;
/*!40000 ALTER TABLE `sensores` ENABLE KEYS */;

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
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ativo` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `cpf` (`cpf`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4;

-- Copiando dados para a tabela sparqbd.usuario: ~13 rows (aproximadamente)
-- Copiando dados para a tabela sparqbd.usuario: ~14 rows (aproximadamente)
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` (`id_usuario`, `nome`, `email`, `cpf`, `sexo`, `parque`, `senha`, `cargo`, `avatar`, `created_at`, `ativo`) VALUES
	(22, 'João Silva', 'joao.silva@example.com', '123.456.789-00', 'masculino', 1, '123456', 1, 'avatar.png', '2025-08-22 17:04:24', 1),
	(23, 'Maria Oliveira', 'maria.oliveira@example.com', '987.654.321-00', 'feminino', 1, '123456', 2, 'avatar.png', '2025-08-22 17:04:24', 1),
	(24, 'Carlos Souza', 'carlos.souza@example.com', '111.222.333-44', 'outro', 1, '123456', 3, 'avatar.png', '2025-08-22 17:04:24', 0),
	(25, 'Alice Santos', 'alice.santos@email.com', '123.456.789-01', 'feminino', 1, '123456', 2, 'avatar.png', '2025-08-22 17:23:34', 1),
	(26, 'Bruno Lima', 'bruno.lima@email.com', '123.456.789-02', 'masculino', 1, 'senha123', 3, 'avatar.png', '2025-08-22 17:23:34', 0),
	(27, 'Carla Souza', 'carla.souza@email.com', '123.456.789-03', 'feminino', 2, 'senha123', 2, 'avatar.png', '2025-08-22 17:23:34', 1),
	(28, 'Daniel Rocha', 'daniel.rocha@email.com', '123.456.789-04', 'masculino', 2, 'senha123', 3, 'avatar.png', '2025-08-22 17:23:34', 1),
	(29, 'Eduarda Melo', 'eduarda.melo@email.com', '123.456.789-05', 'feminino', 1, 'senha123', 2, 'avatar.png', '2025-08-22 17:23:34', 0),
	(30, 'Felipe Costa', 'felipe.costa@email.com', '123.456.789-06', 'masculino', 2, 'senha123', 3, 'avatar.png', '2025-08-22 17:23:34', 1),
	(31, 'Gabriela Pinto', 'gabriela.pinto@email.com', '123.456.789-07', 'feminino', 1, 'senha123', 2, 'avatar.png', '2025-08-22 17:23:34', 1),
	(32, 'Hugo Martins', 'hugo.martins@email.com', '123.456.789-08', 'masculino', 2, 'senha123', 3, 'avatar.png', '2025-08-22 17:23:34', 0),
	(33, 'Isabela Dias', 'isabela.dias@email.com', '123.456.789-09', 'feminino', 1, 'senha123', 2, 'avatar.png', '2025-08-22 17:23:34', 1),
	(34, 'João Fernandes', 'joao.fernandes@email.com', '123.456.789-10', 'masculino', 2, 'senha123', 3, 'avatar.png', '2025-08-22 17:23:34', 0),
	(35, 'Karina Alves', 'karina.alves@email.com', '123.456.789-11', 'feminino', 1, 'senha123', 2, 'avatar.png', '2025-08-22 17:23:34', 1),
	(36, 'Lucas Nascimento', 'lucas.nascimento@email.com', '123.456.789-12', 'masculino', 2, 'senha123', 3, 'avatar.png', '2025-08-22 17:23:34', 1),
	(37, 'Alex Martins', 'alex.martins@exemplo.com', '124.153.647-64', 'masculino', 1, '123456', 2, 'avatar.png', '2025-08-22 17:32:10', 1);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;