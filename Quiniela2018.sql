-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 30-05-2018 a las 08:25:28
-- Versión del servidor: 10.1.28-MariaDB
-- Versión de PHP: 5.6.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `Quiniela2018`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ADMINISTRADORES`
--

DROP TABLE IF EXISTS `ADMINISTRADORES`;
CREATE TABLE `ADMINISTRADORES` (
  `ID` int(11) NOT NULL,
  `NOMBRE` varchar(120) DEFAULT NULL,
  `CORREO` varchar(100) DEFAULT NULL,
  `PASSWORD` varchar(180) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `ADMINISTRADORES`
--

INSERT INTO `ADMINISTRADORES` (`ID`, `NOMBRE`, `CORREO`, `PASSWORD`) VALUES
(1, 'prensa', 'csalazar@prensalibre.com.gt', 'demo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ADMINISTRADORES_TOKENS`
--

DROP TABLE IF EXISTS `ADMINISTRADORES_TOKENS`;
CREATE TABLE `ADMINISTRADORES_TOKENS` (
  `ID` int(11) NOT NULL,
  `ADMINISTRADOR` int(11) DEFAULT NULL,
  `TOKEN` varchar(180) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `CONFIGURACION`
--

DROP TABLE IF EXISTS `CONFIGURACION`;
CREATE TABLE `CONFIGURACION` (
  `ID` int(11) NOT NULL,
  `NOMBRE` varchar(180) DEFAULT NULL,
  `VALOR` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `CONFIGURACION`
--

INSERT INTO `CONFIGURACION` (`ID`, `NOMBRE`, `VALOR`) VALUES
(1, 'SUPER_QUINIELA', '0');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ESTRUCTURAS`
--

DROP TABLE IF EXISTS `ESTRUCTURAS`;
CREATE TABLE `ESTRUCTURAS` (
  `ID` int(11) NOT NULL,
  `NOMBRE` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `ESTRUCTURAS`
--

INSERT INTO `ESTRUCTURAS` (`ID`, `NOMBRE`) VALUES
(1, 'grupos'),
(2, 'octavos'),
(3, 'cuartos'),
(4, 'semifinales'),
(5, 'tercer puesto'),
(6, 'final');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `GRUPOS`
--

DROP TABLE IF EXISTS `GRUPOS`;
CREATE TABLE `GRUPOS` (
  `ID` int(11) NOT NULL,
  `CODIGO` varchar(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `GRUPOS`
--

INSERT INTO `GRUPOS` (`ID`, `CODIGO`) VALUES
(1, 'A'),
(2, 'B'),
(3, 'C'),
(4, 'D'),
(5, 'E'),
(6, 'F'),
(7, 'G'),
(8, 'H');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `JUEGOS`
--

DROP TABLE IF EXISTS `JUEGOS`;
CREATE TABLE `JUEGOS` (
  `ID` int(11) NOT NULL,
  `ESTRUCTURA` int(11) NOT NULL,
  `FECHA` datetime NOT NULL,
  `UBICACION` int(11) NOT NULL,
  `JUGADOR_1` int(11) DEFAULT '99',
  `JUGADOR_2` int(11) DEFAULT '99',
  `GOLES_1` int(11) DEFAULT NULL,
  `GOLES_2` int(11) DEFAULT NULL,
  `OPCIONES_DE_SELECCION` varchar(30) DEFAULT NULL,
  `SELECCION_1` varchar(50) DEFAULT NULL,
  `SELECCION_2` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `JUEGOS`
--

INSERT INTO `JUEGOS` (`ID`, `ESTRUCTURA`, `FECHA`, `UBICACION`, `JUGADOR_1`, `JUGADOR_2`, `GOLES_1`, `GOLES_2`, `OPCIONES_DE_SELECCION`, `SELECCION_1`, `SELECCION_2`) VALUES
(1, 1, '2018-06-25 01:08:52', 6, 1, 3, NULL, NULL, 'A', '', ''),
(2, 1, '2018-06-15 01:14:15', 1, 2, 4, NULL, NULL, 'A', '', ''),
(3, 1, '2018-06-15 01:14:22', 3, 1, 2, NULL, NULL, 'A', '', ''),
(4, 1, '2018-06-20 01:14:29', 4, 4, 3, NULL, NULL, 'A', '', ''),
(5, 1, '2018-06-20 01:14:36', 10, 3, 2, NULL, NULL, 'A', '', ''),
(6, 1, '2018-06-25 01:14:55', 2, 4, 1, NULL, NULL, 'A', '', ''),
(7, 1, '2018-06-25 01:15:06', 12, 6, 8, NULL, NULL, 'B', '', ''),
(8, 1, '2018-06-16 01:30:52', 3, 5, 7, NULL, NULL, 'B', '', ''),
(9, 1, '2018-06-16 00:00:00', 8, 5, 6, NULL, NULL, 'B', '', ''),
(10, 1, '2018-06-21 01:32:28', 5, 8, 7, NULL, NULL, 'B', '', ''),
(11, 1, '2018-06-22 01:32:34', 2, 8, 5, NULL, NULL, 'B', '', ''),
(12, 1, '2018-06-26 01:32:38', 3, 7, 6, NULL, NULL, 'B', '', ''),
(13, 1, '2018-06-26 01:36:09', 4, 9, 11, NULL, NULL, 'C', '', ''),
(14, 1, '2018-06-17 01:36:29', 4, 10, 12, NULL, NULL, 'C', '', ''),
(15, 1, '2018-06-17 01:36:34', 10, 12, 11, NULL, NULL, 'C', '', ''),
(16, 1, '2018-06-22 01:36:40', 3, 9, 10, NULL, NULL, 'C', '', ''),
(17, 1, '2018-06-22 01:36:57', 8, 11, 10, NULL, NULL, 'C', '', ''),
(18, 1, '2018-06-27 01:37:10', 9, 12, 9, NULL, NULL, 'C', '', ''),
(19, 1, '2018-06-27 00:00:00', 5, 13, 15, NULL, NULL, 'D', '', ''),
(20, 1, '2018-06-17 03:25:02', 4, 14, 16, NULL, NULL, 'D', '', ''),
(21, 1, '2018-06-17 03:25:13', 10, 16, 15, NULL, NULL, 'D', '', ''),
(22, 1, '2018-06-22 03:25:30', 3, 13, 14, NULL, NULL, 'D', '', ''),
(23, 1, '2018-06-22 03:25:42', 8, 15, 14, NULL, NULL, 'D', '', ''),
(24, 1, '2018-06-27 03:26:20', 9, 16, 13, NULL, NULL, 'D', '', ''),
(25, 1, '2018-06-27 03:26:33', 5, 18, 20, NULL, NULL, 'E', '', ''),
(26, 1, '2018-06-17 04:11:28', 6, 17, 19, NULL, NULL, 'E', '', ''),
(27, 1, '2018-06-18 04:11:36', 5, 17, 18, NULL, NULL, 'E', '', ''),
(28, 1, '2018-06-23 04:11:49', 12, 20, 19, NULL, NULL, 'E', '', ''),
(29, 1, '2018-06-23 04:11:55', 4, 20, 17, NULL, NULL, 'E', '', ''),
(30, 1, '2018-06-27 04:13:47', 7, 19, 18, NULL, NULL, 'E', '', ''),
(31, 1, '2018-06-27 04:13:53', 1, 22, 24, NULL, NULL, 'F', '', ''),
(32, 1, '2018-06-18 04:41:43', 12, 21, 23, NULL, NULL, 'F', '', ''),
(33, 1, '2018-06-18 04:41:53', 2, 24, 23, NULL, NULL, 'F', '', ''),
(34, 1, '2018-06-23 04:42:00', 6, 21, 22, NULL, NULL, 'F', '', ''),
(35, 1, '2018-06-24 04:42:22', 5, 24, 21, NULL, NULL, 'F', '', ''),
(36, 1, '2018-06-28 04:42:32', 8, 23, 22, NULL, NULL, 'F', '', ''),
(37, 1, '2018-06-28 04:42:37', 11, 25, 28, NULL, NULL, 'G', '', ''),
(38, 1, '2018-06-19 05:00:53', 9, 26, 27, NULL, NULL, 'G', '', ''),
(39, 1, '2018-06-19 05:01:01', 11, 25, 26, NULL, NULL, 'G', '', ''),
(40, 1, '2018-06-24 05:01:09', 7, 27, 28, NULL, NULL, 'G', '', ''),
(41, 1, '2018-06-24 05:01:18', 1, 27, 25, NULL, NULL, 'G', '', ''),
(42, 1, '2018-06-28 03:43:31', 11, 28, 26, NULL, NULL, 'G', '', ''),
(43, 1, '2018-06-28 05:01:35', 10, 30, 32, NULL, NULL, 'H', '', ''),
(44, 1, '2018-06-30 05:09:09', 12, 29, 31, NULL, NULL, 'H', '', ''),
(45, 1, '2018-06-30 05:09:14', 7, 32, 31, NULL, NULL, 'H', '', ''),
(46, 1, '2018-07-01 05:09:22', 9, 29, 30, NULL, NULL, 'H', '', ''),
(47, 1, '2018-07-01 05:09:32', 5, 32, 29, NULL, NULL, 'H', '', ''),
(48, 1, '2018-07-02 05:09:48', 10, 31, 30, NULL, NULL, 'H', '', ''),
(49, 2, '2018-07-02 05:10:02', 12, 99, 99, NULL, NULL, 'a8', 'A', 'B'),
(50, 2, '2018-07-03 05:10:19', 7, 99, 99, NULL, NULL, 'b8', 'C', 'D'),
(51, 2, '2018-07-03 05:10:30', 3, 99, 99, NULL, NULL, 'c8', 'E', 'F'),
(52, 2, '2018-07-06 05:11:13', 6, 99, 99, NULL, NULL, 'd8', 'G', 'H'),
(53, 2, '2018-07-06 05:11:19', 7, 99, 99, NULL, NULL, 'e8', 'B', 'A'),
(54, 2, '2018-07-07 05:11:28', 12, 99, 99, NULL, NULL, 'f8', 'D', 'C'),
(55, 2, '2018-07-07 05:11:34', 10, 99, 99, NULL, NULL, 'g8', 'F', 'E'),
(56, 2, '2018-07-10 05:25:03', 3, 99, 99, NULL, NULL, 'h8', 'H', 'G'),
(57, 3, '2018-07-11 05:25:09', 6, 99, 99, NULL, NULL, 'a4', 'A,B', 'C,D'),
(58, 3, '2018-07-14 05:25:14', 5, 99, 99, NULL, NULL, 'b4', 'E,F', 'G,H'),
(59, 3, '2018-07-15 05:25:19', 10, 99, 99, NULL, NULL, 'c4', 'A,B', 'C,D'),
(60, 3, '2018-07-11 00:54:48', 3, 99, 99, NULL, NULL, 'd4', 'E,F', 'G,H'),
(61, 4, '2018-07-11 00:54:42', 6, 99, 99, NULL, NULL, 'a2', 'A,B,C,D', 'E,F,G,H'),
(62, 4, '2018-07-14 00:54:18', 3, 99, 99, NULL, NULL, 'b2', 'A,B,C,D', 'E,F,G,H'),
(63, 5, '2018-07-15 00:54:09', 6, 99, 99, NULL, NULL, 'ter', 'A,B,C,D,E,F,G,H', 'A,B,C,D,E,F,G,H'),
(64, 6, '2018-05-07 01:06:45', 6, 99, 99, NULL, NULL, 'fin', 'A,B,C,D,E,F,G,H', 'A,B,C,D,E,F,G,H');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `PAISES`
--

DROP TABLE IF EXISTS `PAISES`;
CREATE TABLE `PAISES` (
  `ID` int(11) NOT NULL,
  `NOMBRE` varchar(40) DEFAULT NULL,
  `ISO` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `PAISES`
--

INSERT INTO `PAISES` (`ID`, `NOMBRE`, `ISO`) VALUES
(1, 'Rusia', 'RUS'),
(2, 'Egipto', 'EGY'),
(3, 'Arabia Saudita', 'SAU'),
(4, 'Uruguay', 'URY'),
(5, 'Portugal', 'PRT'),
(6, 'Marruecos', 'MAR'),
(7, 'España', 'ESP'),
(8, 'Irán', 'IRN'),
(9, 'Francia', 'FRA'),
(10, 'Perú', 'PER'),
(11, 'Australia', 'AUS'),
(12, 'Dinamarca', 'DNK'),
(13, 'Argentina', 'ARG'),
(14, 'Croacia', 'HRV'),
(15, 'Islandia', 'ISL'),
(16, 'Nigeria', 'NGA'),
(17, 'Brasil', 'BRA'),
(18, 'Costa Rica', 'CRI'),
(19, 'Suiza', 'CHE'),
(20, 'Serbia', 'SRB'),
(21, 'Alemania', 'DEU'),
(22, 'Suecia', 'SWE'),
(23, 'México', 'MEX'),
(24, 'Corea del Sur', 'KOR'),
(25, 'Bélgica', 'BEL'),
(26, 'Túnez', 'TUN'),
(27, 'Inglaterra', 'GBR'),
(28, 'Panamá', 'PAN'),
(29, 'Polonia', 'POL'),
(30, 'Colombia', 'COL'),
(31, 'Senegal', 'SEN'),
(32, 'Japón', 'JPN'),
(99, 'null', 'null');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `PAISES_GRUPOS`
--

DROP TABLE IF EXISTS `PAISES_GRUPOS`;
CREATE TABLE `PAISES_GRUPOS` (
  `ID` int(11) NOT NULL,
  `PAIS` int(11) NOT NULL,
  `GRUPO` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `PAISES_GRUPOS`
--

INSERT INTO `PAISES_GRUPOS` (`ID`, `PAIS`, `GRUPO`) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 3, 1),
(4, 4, 1),
(5, 5, 2),
(6, 6, 2),
(7, 7, 2),
(8, 8, 2),
(9, 9, 3),
(10, 10, 3),
(11, 11, 3),
(12, 12, 3),
(13, 13, 4),
(14, 14, 4),
(15, 15, 4),
(16, 16, 4),
(17, 17, 5),
(18, 18, 5),
(19, 19, 5),
(20, 20, 5),
(21, 21, 6),
(22, 22, 6),
(23, 23, 6),
(24, 24, 6),
(25, 25, 7),
(26, 26, 7),
(27, 27, 7),
(28, 28, 7),
(29, 29, 8),
(30, 30, 8),
(31, 31, 8),
(32, 32, 8);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `QUINIELAS`
--

DROP TABLE IF EXISTS `QUINIELAS`;
CREATE TABLE `QUINIELAS` (
  `ID` int(11) NOT NULL,
  `NOMBRE` varchar(60) DEFAULT NULL,
  `TIPO_DE_QUINIELA` int(11) DEFAULT NULL,
  `DESCRIPCION` varchar(180) DEFAULT NULL,
  `CREADO_POR` int(11) NOT NULL,
  `FECHA_DE_CREACION` date DEFAULT NULL,
  `CODIGO_COMPARTIR` varchar(12) NOT NULL,
  `GANADOR` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `QUINIELA_INVITACIONES`
--

DROP TABLE IF EXISTS `QUINIELA_INVITACIONES`;
CREATE TABLE `QUINIELA_INVITACIONES` (
  `ID` int(11) NOT NULL,
  `USUARIO` int(11) NOT NULL,
  `QUINIELA` int(11) NOT NULL,
  `FECHA_DE_CREACION` date DEFAULT NULL,
  `ESTATUS` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `QUINIELA_PREDICCIONES`
--

DROP TABLE IF EXISTS `QUINIELA_PREDICCIONES`;
CREATE TABLE `QUINIELA_PREDICCIONES` (
  `ID` int(11) NOT NULL,
  `JUEGO` int(11) NOT NULL,
  `QUINIELA` int(11) NOT NULL,
  `USUARIO` int(11) DEFAULT NULL,
  `GOL_1` int(11) DEFAULT NULL,
  `GOL_2` int(11) DEFAULT NULL,
  `JUEGO_1` int(11) DEFAULT '99',
  `JUEGO_2` int(11) DEFAULT '99'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `QUINIELA_PREMIOS`
--

DROP TABLE IF EXISTS `QUINIELA_PREMIOS`;
CREATE TABLE `QUINIELA_PREMIOS` (
  `ID` int(11) NOT NULL,
  `QUINIELA` int(11) DEFAULT NULL,
  `PUESTO` int(11) DEFAULT NULL,
  `PREMIO` varchar(120) DEFAULT NULL,
  `DESCRIPCION` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `QUINIELA_TIPOS`
--

DROP TABLE IF EXISTS `QUINIELA_TIPOS`;
CREATE TABLE `QUINIELA_TIPOS` (
  `ID` int(11) NOT NULL,
  `NOMBRE` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `QUINIELA_TIPOS`
--

INSERT INTO `QUINIELA_TIPOS` (`ID`, `NOMBRE`) VALUES
(1, 'normal'),
(2, 'super');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `QUINIELA_USUARIOS`
--

DROP TABLE IF EXISTS `QUINIELA_USUARIOS`;
CREATE TABLE `QUINIELA_USUARIOS` (
  `ID` int(11) NOT NULL,
  `QUINIELA` int(11) DEFAULT NULL,
  `USUARIO` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `UBICACIONES`
--

DROP TABLE IF EXISTS `UBICACIONES`;
CREATE TABLE `UBICACIONES` (
  `ID` int(11) NOT NULL,
  `NOMBRE` varchar(60) NOT NULL,
  `CIUIDAD` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `UBICACIONES`
--

INSERT INTO `UBICACIONES` (`ID`, `NOMBRE`, `CIUIDAD`) VALUES
(1, 'EKATERIMBURGO', 'Yekaterimburgo'),
(2, 'VOLGOGRADO', 'Volgogrado'),
(3, 'SAN PETERSBURGO', 'San Petersburgo'),
(4, 'ROSTOV', 'Rostov del Don'),
(5, 'NIZHNY NOVGOROD', 'Nizhny Novgorod'),
(6, 'LUZHNIKI', 'Moscú'),
(7, 'KAZÁN', 'Kazán'),
(8, 'KALININGRADO', 'Kaliningrado'),
(9, 'SPARTAK', 'Moscú'),
(10, 'SAMARA', 'Samara'),
(11, 'MORDOVIA', 'Saransk'),
(12, 'FISHT', 'Sochi');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `USUARIOS`
--

DROP TABLE IF EXISTS `USUARIOS`;
CREATE TABLE `USUARIOS` (
  `ID` int(11) NOT NULL,
  `NOMBRE` varchar(80) DEFAULT NULL,
  `CORREO` varchar(80) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `USUARIOS_TOKENS`
--

DROP TABLE IF EXISTS `USUARIOS_TOKENS`;
CREATE TABLE `USUARIOS_TOKENS` (
  `ID` int(11) NOT NULL,
  `USER` int(11) DEFAULT NULL,
  `TOKEN` varchar(120) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `ADMINISTRADORES`
--
ALTER TABLE `ADMINISTRADORES`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `ADMINISTRADOR_ID_uindex` (`ID`);

--
-- Indices de la tabla `ADMINISTRADORES_TOKENS`
--
ALTER TABLE `ADMINISTRADORES_TOKENS`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `table_name_ID_uindex` (`ID`),
  ADD KEY `table_name_ADMINISTRADOR_ID_fk` (`ADMINISTRADOR`);

--
-- Indices de la tabla `CONFIGURACION`
--
ALTER TABLE `CONFIGURACION`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `CONFIGURACION_ID_uindex` (`ID`);

--
-- Indices de la tabla `ESTRUCTURAS`
--
ALTER TABLE `ESTRUCTURAS`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `structure_id_uindex` (`ID`);

--
-- Indices de la tabla `GRUPOS`
--
ALTER TABLE `GRUPOS`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `groups_id_uindex` (`ID`);

--
-- Indices de la tabla `JUEGOS`
--
ALTER TABLE `JUEGOS`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `game_id_uindex` (`ID`),
  ADD KEY `game_structure_id_fk` (`ESTRUCTURA`),
  ADD KEY `game_locations_id_fk` (`UBICACION`),
  ADD KEY `game_countries_id_fk` (`JUGADOR_1`),
  ADD KEY `game_countries2_id_fk` (`JUGADOR_2`);

--
-- Indices de la tabla `PAISES`
--
ALTER TABLE `PAISES`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `countries_id_uindex` (`ID`);

--
-- Indices de la tabla `PAISES_GRUPOS`
--
ALTER TABLE `PAISES_GRUPOS`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `countries_groups_id_uindex` (`ID`),
  ADD KEY `countries_groups_countries_id_fk` (`PAIS`),
  ADD KEY `countries_groups_groups_id_fk` (`GRUPO`);

--
-- Indices de la tabla `QUINIELAS`
--
ALTER TABLE `QUINIELAS`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `quinela_id_uindex` (`ID`),
  ADD UNIQUE KEY `quinela_share_code_uindex` (`CODIGO_COMPARTIR`),
  ADD KEY `quinela_quinela_type_id_fk` (`TIPO_DE_QUINIELA`),
  ADD KEY `quinela_users_id_fk` (`CREADO_POR`),
  ADD KEY `quinela_users2__fk` (`GANADOR`);

--
-- Indices de la tabla `QUINIELA_INVITACIONES`
--
ALTER TABLE `QUINIELA_INVITACIONES`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `quinela_invitations_id_uindex` (`ID`),
  ADD KEY `quinela_invitations_quinela_id_fk` (`QUINIELA`),
  ADD KEY `quinela_invitations_users_id_fk` (`USUARIO`);

--
-- Indices de la tabla `QUINIELA_PREDICCIONES`
--
ALTER TABLE `QUINIELA_PREDICCIONES`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `quinela_predictions_id_uindex` (`ID`),
  ADD KEY `quinela_predictions_game_id_fk` (`JUEGO`),
  ADD KEY `quinela_predictions_quinela_id_fk` (`QUINIELA`),
  ADD KEY `quinela_predictions_users_id_fk` (`USUARIO`),
  ADD KEY `quinela_predictions_countries_id_fk` (`JUEGO_1`),
  ADD KEY `quinela_predictions_countries2__fk` (`JUEGO_2`);

--
-- Indices de la tabla `QUINIELA_PREMIOS`
--
ALTER TABLE `QUINIELA_PREMIOS`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `quinela_award_id_uindex` (`ID`),
  ADD KEY `quinela_award_quinela_id_fk` (`QUINIELA`);

--
-- Indices de la tabla `QUINIELA_TIPOS`
--
ALTER TABLE `QUINIELA_TIPOS`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `quinela_type_id_uindex` (`ID`);

--
-- Indices de la tabla `QUINIELA_USUARIOS`
--
ALTER TABLE `QUINIELA_USUARIOS`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `quinela_users_id_uindex` (`ID`),
  ADD KEY `quinela_users_quinela_id_fk` (`QUINIELA`),
  ADD KEY `quinela_users_users_id_fk` (`USUARIO`);

--
-- Indices de la tabla `UBICACIONES`
--
ALTER TABLE `UBICACIONES`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `locations_id_uindex` (`ID`);

--
-- Indices de la tabla `USUARIOS`
--
ALTER TABLE `USUARIOS`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `users_id_uindex` (`ID`);

--
-- Indices de la tabla `USUARIOS_TOKENS`
--
ALTER TABLE `USUARIOS_TOKENS`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `USUARIOS_TOKENS_ID_uindex` (`ID`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ADMINISTRADORES`
--
ALTER TABLE `ADMINISTRADORES`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `ADMINISTRADORES_TOKENS`
--
ALTER TABLE `ADMINISTRADORES_TOKENS`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `CONFIGURACION`
--
ALTER TABLE `CONFIGURACION`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `ESTRUCTURAS`
--
ALTER TABLE `ESTRUCTURAS`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `GRUPOS`
--
ALTER TABLE `GRUPOS`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `JUEGOS`
--
ALTER TABLE `JUEGOS`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT de la tabla `PAISES`
--
ALTER TABLE `PAISES`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100;

--
-- AUTO_INCREMENT de la tabla `PAISES_GRUPOS`
--
ALTER TABLE `PAISES_GRUPOS`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT de la tabla `QUINIELAS`
--
ALTER TABLE `QUINIELAS`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `QUINIELA_INVITACIONES`
--
ALTER TABLE `QUINIELA_INVITACIONES`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `QUINIELA_PREDICCIONES`
--
ALTER TABLE `QUINIELA_PREDICCIONES`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT de la tabla `QUINIELA_PREMIOS`
--
ALTER TABLE `QUINIELA_PREMIOS`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `QUINIELA_TIPOS`
--
ALTER TABLE `QUINIELA_TIPOS`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `QUINIELA_USUARIOS`
--
ALTER TABLE `QUINIELA_USUARIOS`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `UBICACIONES`
--
ALTER TABLE `UBICACIONES`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `USUARIOS`
--
ALTER TABLE `USUARIOS`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `USUARIOS_TOKENS`
--
ALTER TABLE `USUARIOS_TOKENS`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `JUEGOS`
--
ALTER TABLE `JUEGOS`
  ADD CONSTRAINT `game_countries2_id_fk` FOREIGN KEY (`JUGADOR_2`) REFERENCES `paises` (`ID`),
  ADD CONSTRAINT `game_countries_id_fk` FOREIGN KEY (`JUGADOR_1`) REFERENCES `paises` (`ID`),
  ADD CONSTRAINT `game_locations_id_fk` FOREIGN KEY (`UBICACION`) REFERENCES `ubicaciones` (`ID`),
  ADD CONSTRAINT `game_structure_id_fk` FOREIGN KEY (`ESTRUCTURA`) REFERENCES `estructuras` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
