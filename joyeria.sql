-- phpMyAdmin SQL Dump
-- version 5.2.1deb3
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 09-05-2025 a las 01:03:08
-- Versión del servidor: 8.0.42-0ubuntu0.24.04.1
-- Versión de PHP: 8.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `joyeria`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrito`
--

CREATE TABLE `carrito` (
  `idCliente` int NOT NULL,
  `idProducto` bigint NOT NULL,
  `cantidad` int NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `carrito`
--

INSERT INTO `carrito` (`idCliente`, `idProducto`, `cantidad`) VALUES
(0, 0, 0),
(39, 1344, 1),
(45, 1222, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `idCategoria` int NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `name` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`idCategoria`, `nombre`, `name`) VALUES
(1, 'Anillos', 'Rings'),
(2, 'Aretes', 'Earrings'),
(3, 'Arracadas', 'hoop earrings'),
(4, 'Esclavas', 'Bangles'),
(5, 'Dijes', 'Pendants'),
(8, 'Collares', 'Necklaces');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compra`
--

CREATE TABLE `compra` (
  `idCompra` int NOT NULL,
  `fecha` date NOT NULL,
  `monto` double NOT NULL,
  `idEdo` int NOT NULL,
  `idCliente` int NOT NULL,
  `idDomicilio` int NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `compra`
--

INSERT INTO `compra` (`idCompra`, `fecha`, `monto`, `idEdo`, `idCliente`, `idDomicilio`) VALUES
(90, '2024-04-07', 493.60000735521317, 1, 18, 10),
(91, '2024-04-15', 1246.8000036776066, 1, 18, 10),
(92, '2024-04-18', 100, 1, 18, 10),
(93, '2024-04-19', 60.25, 1, 18, 10),
(94, '2024-04-19', 246.80000367760658, 1, 18, 10),
(95, '2024-04-21', 367.3000036776066, 1, 18, 10),
(97, '2024-04-22', 5100, 1, 18, 10),
(98, '2025-05-07', 60.25, 1, 18, 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `domicilio`
--

CREATE TABLE `domicilio` (
  `idDomicilio` int NOT NULL,
  `calle` varchar(50) NOT NULL,
  `colonia` varchar(50) NOT NULL,
  `ciudad` varchar(50) NOT NULL,
  `estado` varchar(50) NOT NULL,
  `cp` int NOT NULL,
  `idCliente` int NOT NULL,
  `numero` int NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `domicilio`
--

INSERT INTO `domicilio` (`idDomicilio`, `calle`, `colonia`, `ciudad`, `estado`, `cp`, `idCliente`, `numero`) VALUES
(1, 'Melchor Ocampo', 'Centro', 'Juxtlahuaca', 'Oaxaca', 69700, 1, 0),
(2, 'Nuyoo', 'Centro', 'Huajuapan', 'Oaxaca', 69000, 2, 0),
(6, 'Limones 302', 'El Mirador', 'Oaxaca de Juarez', 'Oaxaca', 69854, 2, 0),
(13, 'prueba', 'acatlima', 'Huajuapan', 'Oax', 69700, 39, 55),
(10, 'Bugambilias', 'Acatlima', 'Huajuapan', 'Oaxaca', 69000, 18, 304);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estadocompra`
--

CREATE TABLE `estadocompra` (
  `idEstado` int NOT NULL,
  `nombre` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Name` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `estadocompra`
--

INSERT INTO `estadocompra` (`idEstado`, `nombre`, `Name`) VALUES
(1, 'Compra finalizada', 'Purchase completed'),
(2, 'En proceso de envio', 'In shipping process'),
(3, 'Envio demorado', 'Delayed shipping'),
(4, 'En embarque', 'On boarding');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `marca`
--

CREATE TABLE `marca` (
  `idMarca` int NOT NULL,
  `nombre` varchar(20) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `marca`
--

INSERT INTO `marca` (`idMarca`, `nombre`) VALUES
(1, 'Swarovski'),
(2, 'Pandora'),
(3, 'Lotus'),
(4, 'Aristocrazy');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `material`
--

CREATE TABLE `material` (
  `idMaterial` int NOT NULL,
  `nombre` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `name` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `material`
--

INSERT INTO `material` (`idMaterial`, `nombre`, `name`) VALUES
(1, 'Plata 925', '925 Silver'),
(2, 'Oro 24k', '24k Gold'),
(3, 'Acero inoxidable', 'Stainless steel'),
(5, 'Cobre', 'Copper'),
(6, 'Platino', 'Platinum');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

CREATE TABLE `pedido` (
  `idPedido` int NOT NULL,
  `cantidadProducto` int NOT NULL,
  `subtotal` float NOT NULL,
  `idCompra` int NOT NULL,
  `idProducto` int NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `pedido`
--

INSERT INTO `pedido` (`idPedido`, `cantidadProducto`, `subtotal`, `idCompra`, `idProducto`) VALUES
(37, 1, 100, 50, 300),
(38, 1, 500, 50, 200),
(39, 1, 1000, 50, 100),
(40, 1, 100, 51, 300),
(41, 1, 500, 51, 200),
(42, 2, 200, 52, 123),
(43, 2, 240.5, 53, 1222),
(44, 1, 100, 54, 123),
(45, 1, 120.25, 55, 1222),
(47, 1, 120.25, 57, 1222),
(49, 1, 100, 58, 123),
(50, 2, 200, 59, 123),
(51, 3, 3702, 59, 1344),
(52, 2, 240.5, 59, 1222),
(53, 1, 1234, 60, 1344),
(54, 1, 1234, 61, 1344),
(56, 1, 120.25, 62, 1222),
(57, 9, 11106, 63, 1344),
(58, 1, 100, 64, 123),
(59, 1, 1234, 64, 1344),
(60, 1, 100, 65, 123),
(61, 1, 1234, 66, 1344),
(62, 1, 1234, 67, 1344),
(63, 1, 120.25, 67, 1222),
(64, 2, 200, 67, 123),
(68, 1, 1234, 70, 1344),
(69, 2, 240.5, 71, 1222),
(70, 1, 1234, 72, 1344),
(71, 1, 1234, 73, 1344),
(72, 2, 2468, 74, 1344),
(73, 2, 240.5, 75, 1222),
(74, 10, 1000, 76, 123),
(75, 1, 120.25, 76, 1222),
(76, 10, 1202.5, 77, 1222),
(77, 10, 1000, 78, 123),
(78, 10, 1000, 79, 123),
(79, 2, 240.5, 80, 1222),
(80, 3, 360.75, 81, 1222),
(81, 3, 360.75, 82, 1222),
(82, 2, 2468, 83, 1344),
(83, 2, 2468, 84, 1344),
(84, 2, 120.25, 89, 1222),
(85, 2, 493.6, 90, 1344),
(86, 10, 1000, 91, 123),
(87, 1, 246.8, 91, 1344),
(88, 1, 100, 92, 123),
(89, 1, 60.25, 93, 1222),
(90, 1, 246.8, 94, 1344),
(93, 1, 246.8, 95, 1344),
(94, 2, 120.5, 95, 1222),
(96, 1, 100, 97, 12222790),
(97, 1, 5000, 97, 1),
(99, 1, 60.25, 98, 1222);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `idProducto` bigint NOT NULL,
  `nombre` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `name` text NOT NULL,
  `descripcion` varchar(40) NOT NULL,
  `description` text NOT NULL,
  `stock` bigint NOT NULL,
  `precio` float NOT NULL,
  `descuento` float NOT NULL,
  `inicio_descuento` date NOT NULL,
  `fin_descuento` date NOT NULL,
  `idMaterial` int NOT NULL,
  `idCategoria` int NOT NULL,
  `idMarca` int NOT NULL,
  `foto` int NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`idProducto`, `nombre`, `name`, `descripcion`, `description`, `stock`, `precio`, `descuento`, `inicio_descuento`, `fin_descuento`, `idMaterial`, `idCategoria`, `idMarca`, `foto`) VALUES
(1222, 'Dije luna', 'Pendant moon', '', '', 6, 120.5, 0.5, '2024-04-04', '2024-04-26', 1, 5, 3, 1),
(123, 'Dije cruz', 'Pendant cross', '', '', 0, 1000, 1, '2024-03-27', '2024-03-30', 2, 5, 2, 1),
(1344, 'Aretes', 'Earrings', '', '', 0, 1234, 0.2, '2024-03-20', '2024-03-28', 6, 2, 1, 1),
(1, 'Anillo', 'Ring', '', '', 46, 5000, 1, '2024-04-18', '2024-04-26', 2, 1, 4, 1),
(12222790, 'Esclava de oro', 'Gold Bangle', '', '', 20, 100, 1, '0000-00-00', '0000-00-00', 1, 1, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `resena`
--

CREATE TABLE `resena` (
  `idResena` int NOT NULL,
  `calificacion` int NOT NULL,
  `comentario` text NOT NULL,
  `idUsuario` int NOT NULL,
  `idProducto` bigint NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `resena`
--

INSERT INTO `resena` (`idResena`, `calificacion`, `comentario`, `idUsuario`, `idProducto`) VALUES
(1, 10, 'Good', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `idRol` int NOT NULL,
  `nombreRol` varchar(20) NOT NULL,
  `nameRol` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`idRol`, `nombreRol`, `nameRol`) VALUES
(2, 'Cliente', 'Customer'),
(1, 'Administrador', 'Manager');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `idUsuario` int NOT NULL,
  `nombre` varchar(40) NOT NULL,
  `correo` varchar(30) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `idRol` int NOT NULL,
  `foto` int NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idUsuario`, `nombre`, `correo`, `username`, `password`, `idRol`, `foto`) VALUES
(18, 'Admin', 'admin@gmail.com', 'admin', '$2a$10$MtIWlisw/gC8/SJPJ/FVOefR.1aL8vaiiSs4TZT5Wojog6IIwl9xi', 1, 1),
(45, 'usuario', 'usuario@gmail.com', 'user123', '$2a$10$LX28vreuaEVLTzwVovPxguLeW5JRvw6FpnxSM/Q7AUeg/.oeBCVWe', 2, 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`idCategoria`);

--
-- Indices de la tabla `compra`
--
ALTER TABLE `compra`
  ADD PRIMARY KEY (`idCompra`);

--
-- Indices de la tabla `domicilio`
--
ALTER TABLE `domicilio`
  ADD PRIMARY KEY (`idDomicilio`);

--
-- Indices de la tabla `estadocompra`
--
ALTER TABLE `estadocompra`
  ADD PRIMARY KEY (`idEstado`);

--
-- Indices de la tabla `marca`
--
ALTER TABLE `marca`
  ADD PRIMARY KEY (`idMarca`);

--
-- Indices de la tabla `material`
--
ALTER TABLE `material`
  ADD PRIMARY KEY (`idMaterial`);

--
-- Indices de la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD PRIMARY KEY (`idPedido`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`idProducto`);

--
-- Indices de la tabla `resena`
--
ALTER TABLE `resena`
  ADD PRIMARY KEY (`idResena`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`idRol`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idUsuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `idCategoria` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `compra`
--
ALTER TABLE `compra`
  MODIFY `idCompra` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=99;

--
-- AUTO_INCREMENT de la tabla `domicilio`
--
ALTER TABLE `domicilio`
  MODIFY `idDomicilio` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `estadocompra`
--
ALTER TABLE `estadocompra`
  MODIFY `idEstado` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `marca`
--
ALTER TABLE `marca`
  MODIFY `idMarca` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `material`
--
ALTER TABLE `material`
  MODIFY `idMaterial` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `pedido`
--
ALTER TABLE `pedido`
  MODIFY `idPedido` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100;

--
-- AUTO_INCREMENT de la tabla `resena`
--
ALTER TABLE `resena`
  MODIFY `idResena` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `idRol` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idUsuario` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
