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


-- Copiando estrutura do banco de dados para sparcqbd
CREATE DATABASE IF NOT EXISTS `sparcqbd` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `sparcqbd`;

-- Copiando estrutura para tabela sparcqbd.indice
CREATE TABLE IF NOT EXISTS `indice` (
  `id_indice` int(11) NOT NULL AUTO_INCREMENT,
  `nome_indice` varchar(100) NOT NULL,
  PRIMARY KEY (`id_indice`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Copiando dados para a tabela sparcqbd.indice: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `indice` DISABLE KEYS */;
/*!40000 ALTER TABLE `indice` ENABLE KEYS */;

-- Copiando estrutura para tabela sparcqbd.leitura
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

-- Copiando dados para a tabela sparcqbd.leitura: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `leitura` DISABLE KEYS */;
/*!40000 ALTER TABLE `leitura` ENABLE KEYS */;

-- Copiando estrutura para tabela sparcqbd.parque
CREATE TABLE IF NOT EXISTS `parque` (
  `id_parque` int(11) NOT NULL AUTO_INCREMENT,
  `nome_parque` varchar(100) NOT NULL,
  `localizacao` varchar(100) NOT NULL,
  PRIMARY KEY (`id_parque`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Copiando dados para a tabela sparcqbd.parque: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `parque` DISABLE KEYS */;
/*!40000 ALTER TABLE `parque` ENABLE KEYS */;

-- Copiando estrutura para tabela sparcqbd.registro
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

-- Copiando dados para a tabela sparcqbd.registro: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `registro` DISABLE KEYS */;
/*!40000 ALTER TABLE `registro` ENABLE KEYS */;

-- Copiando estrutura para tabela sparcqbd.sensores
CREATE TABLE IF NOT EXISTS `sensores` (
  `id_sensor` int(11) NOT NULL AUTO_INCREMENT,
  `localizacao` varchar(100) NOT NULL,
  `tipo_sensor` varchar(100) NOT NULL,
  `id_parque` int(11) NOT NULL,
  PRIMARY KEY (`id_sensor`),
  KEY `fk_sensores_parque` (`id_parque`),
  CONSTRAINT `fk_sensores_parque` FOREIGN KEY (`id_parque`) REFERENCES `parque` (`id_parque`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Copiando dados para a tabela sparcqbd.sensores: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `sensores` DISABLE KEYS */;
/*!40000 ALTER TABLE `sensores` ENABLE KEYS */;
-- Copiando estrutura para tabela sparcqbd.usuario
CREATE TABLE IF NOT EXISTS `usuario` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `cpf` varchar(11) DEFAULT NULL,
  `sexo` ENUM('masculino', 'feminino', 'outro') DEFAULT NULL,
  `parque` varchar(100) DEFAULT NULL,
  `senha` varchar(50) DEFAULT NULL,
  `cargo` int(1) DEFAULT NULL,
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- Copiando dados para a tabela sparcqbd.usuario: ~1 rows (aproximadamente)
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` (`id_usuario`, `nome`, `email`, `cpf`, `sexo`, `parque`, `senha`, `cargo`) VALUES
	(1, 'Ana Silva', 'ana.silva@example.com', '12345678901', 'feminino', 'Parque das Águas', 'senhaAna123', 1);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
