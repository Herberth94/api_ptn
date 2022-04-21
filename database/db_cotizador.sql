-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-04-2022 a las 19:31:17
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_cotizador`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `am`
--

CREATE TABLE `am` (
  `am_id` bigint(20) NOT NULL,
  `am_id_partida` bigint(20) DEFAULT NULL,
  `am_desc_cliente` float DEFAULT 0,
  `am_margen_ganancia` float DEFAULT 32,
  `am_cantidad` int(10) DEFAULT 1,
  `am_descuento_fabrica` float DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `am`
--

INSERT INTO `am` (`am_id`, `am_id_partida`, `am_desc_cliente`, `am_margen_ganancia`, `am_cantidad`, `am_descuento_fabrica`) VALUES
(17, 25, 10, 10, 10, 10),
(18, 27, 0, 32, 1, 0),
(19, 29, 0, 32, 1, 0),
(20, 30, 0, 32, 1, 0),
(21, 31, 0, 32, 1, 0),
(22, 46, 0, 32, 1, 0),
(23, 47, 0, 32, 1, 0),
(24, 48, 0, 32, 1, 0),
(25, 49, 0, 32, 1, 0),
(26, 50, 0, 32, 1, 0),
(27, 51, 0, 32, 1, 0),
(28, 52, 0, 32, 1, 0),
(29, 53, 0, 32, 1, 0),
(30, 54, 0, 32, 1, 0),
(31, 55, 0, 32, 1, 0),
(32, 56, 0, 32, 1, 0),
(33, 57, 0, 32, 1, 0),
(34, 58, 0, 32, 1, 0),
(35, 59, 0, 32, 1, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `am_cats`
--

CREATE TABLE `am_cats` (
  `amc_id` int(11) NOT NULL,
  `amc_id_proyecto` bigint(20) NOT NULL,
  `amc_id_cats` bigint(20) NOT NULL,
  `amc_desc_cliente` float NOT NULL DEFAULT 0,
  `amc_margen_ganancia` float NOT NULL DEFAULT 32,
  `amc_cantidad` int(3) NOT NULL DEFAULT 1,
  `amc_desc_fabrica` float NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `am_cats`
--

INSERT INTO `am_cats` (`amc_id`, `amc_id_proyecto`, `amc_id_cats`, `amc_desc_cliente`, `amc_margen_ganancia`, `amc_cantidad`, `amc_desc_fabrica`) VALUES
(2, 81, 1, 0, 32, 1, 0),
(3, 81, 2, 0, 32, 1, 0),
(4, 81, 3, 6, 6, 6, 6),
(5, 81, 4, 0, 32, 1, 0),
(6, 71, 1, 0, 32, 1, 0),
(7, 71, 2, 0, 32, 1, 0),
(8, 71, 3, 0, 32, 1, 0),
(9, 71, 4, 0, 32, 1, 0),
(14, 89, 1, 0, 32, 1, 0),
(15, 89, 2, 0, 32, 1, 0),
(16, 89, 3, 0, 32, 1, 0),
(17, 89, 4, 0, 32, 1, 0),
(18, 101, 1, 0, 32, 1, 0),
(19, 101, 2, 0, 32, 1, 0),
(20, 101, 3, 0, 32, 1, 0),
(21, 101, 4, 0, 32, 1, 0),
(22, 104, 1, 0, 32, 1, 0),
(23, 104, 2, 0, 32, 1, 0),
(24, 104, 3, 0, 32, 1, 0),
(25, 104, 4, 0, 32, 1, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `categoria_id` int(10) NOT NULL,
  `categoria_nombre` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`categoria_id`, `categoria_nombre`) VALUES
(1, 'Tecnologia principal '),
(2, 'Subtecnolgia'),
(3, 'Equipamiento'),
(4, 'Licencia'),
(5, 'Soporte'),
(6, 'Implementacion');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias_ci`
--

CREATE TABLE `categorias_ci` (
  `cci_id` bigint(20) NOT NULL,
  `cci_nombre` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categorias_ci`
--

INSERT INTO `categorias_ci` (`cci_id`, `cci_nombre`) VALUES
(1, 'Comisiones'),
(2, 'Riesgo'),
(3, 'Fianza'),
(4, 'seguros y fletes'),
(5, 'Costos administrativos');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias_c_a_sptn_ma`
--

CREATE TABLE `categorias_c_a_sptn_ma` (
  `cat_id` bigint(20) NOT NULL,
  `cat_nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categorias_c_a_sptn_ma`
--

INSERT INTO `categorias_c_a_sptn_ma` (`cat_id`, `cat_nombre`) VALUES
(1, 'Capacitacion'),
(2, 'Accesorios '),
(3, 'Servicios PTN'),
(4, 'Mesa de ayuda');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias_datos`
--

CREATE TABLE `categorias_datos` (
  `cd_id` bigint(20) NOT NULL,
  `cd_id_cats` bigint(20) DEFAULT NULL,
  `cd_no_parte` text DEFAULT NULL,
  `cd_descripcion` text DEFAULT NULL,
  `cd_meses` int(3) DEFAULT NULL,
  `cd_semanas` int(3) DEFAULT NULL,
  `cd_cantidad` int(3) DEFAULT NULL,
  `cd_id_precio` bigint(20) DEFAULT NULL,
  `cd_comentarios` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categorias_datos`
--

INSERT INTO `categorias_datos` (`cd_id`, `cd_id_cats`, `cd_no_parte`, `cd_descripcion`, `cd_meses`, `cd_semanas`, `cd_cantidad`, `cd_id_precio`, `cd_comentarios`) VALUES
(115, 1, 'jdn', 'Capacitacion de fabricante para dos peronas', 5, 5, 2, 199, 'hnb'),
(116, 2, 'nknkjnkds', 'Herramienta y accesorios de montaje', 5, 6, 1, 200, 'd'),
(117, 3, '', 'Instalacion y Configuracion', 0, 0, 1, 201, 'd'),
(118, 4, '', 'Mesa de ayuda por 1 año', 0, 0, 1, 202, ''),
(121, 1, '', '', 0, 0, 1, 206, ''),
(122, 1, 'CP10', '', 0, 0, 1000, 208, '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `cliente_id` int(11) NOT NULL,
  `nombre_cliente` varchar(50) NOT NULL,
  `razon_social` varchar(50) NOT NULL,
  `telefono` text DEFAULT NULL,
  `cliente_direccion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`cliente_id`, `nombre_cliente`, `razon_social`, `telefono`, `cliente_direccion`) VALUES
(13, 'Delfos369', 'S.A. de C.V.', '5555', 'Santa fe'),
(14, 'IPN', 'Software', '5555', 'Lomas estrellasssss'),
(15, 'ESIME', 'Software', '555555', 'Lomas estre');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `colaboradores`
--

CREATE TABLE `colaboradores` (
  `colab_id` bigint(20) NOT NULL,
  `colab_id_usuario` bigint(20) NOT NULL,
  `colab_id_proyecto` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `colaboradores`
--

INSERT INTO `colaboradores` (`colab_id`, `colab_id_usuario`, `colab_id_proyecto`) VALUES
(2, 13, 81),
(5, 13, 86),
(7, 1, 89);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `costos_indirectos`
--

CREATE TABLE `costos_indirectos` (
  `ci_id` bigint(20) NOT NULL,
  `ci_id_cci` bigint(20) NOT NULL,
  `ci_porcentaje` float DEFAULT NULL,
  `ci_id_proyecto` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `costos_indirectos`
--

INSERT INTO `costos_indirectos` (`ci_id`, `ci_id_cci`, `ci_porcentaje`, `ci_id_proyecto`) VALUES
(13, 1, 2, 71),
(14, 2, 1, 71),
(15, 3, 5, 71),
(16, 4, 1, 71),
(17, 5, 4, 71),
(18, 1, 2, 81),
(19, 2, 1, 81),
(20, 3, 5, 81),
(21, 4, 1, 81),
(22, 5, 4, 81),
(23, 1, 2, 89),
(24, 2, 1, 89),
(25, 3, 5, 89),
(26, 4, 1, 89),
(27, 5, 4, 89),
(28, 1, 2, 101),
(29, 2, 1, 101),
(30, 3, 5, 101),
(31, 4, 1, 101),
(32, 5, 4, 101),
(33, 1, 2, 104),
(34, 2, 1, 104),
(35, 3, 5, 104),
(36, 4, 1, 104),
(37, 5, 4, 104);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `marca`
--

CREATE TABLE `marca` (
  `marca_id` bigint(20) NOT NULL,
  `marca_nombre` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `marca`
--

INSERT INTO `marca` (`marca_id`, `marca_nombre`) VALUES
(25, 'PTN'),
(26, 'AXIS'),
(27, 'CAMBIUM NETWORKS'),
(28, 'SYSCOM VIDEO'),
(29, 'EPCOM POWERLINE'),
(30, 'PANDUIT'),
(31, 'SIEMON'),
(32, 'NUTANIX'),
(33, 'CISCO'),
(34, 'GENERICO'),
(35, 'NUTANIX'),
(36, 'GENERICO'),
(37, 'MICROSOFT'),
(38, 'HUAWEI'),
(39, 'LENEL ONGUARD'),
(40, 'NUTANIX'),
(41, 'LENOVO'),
(42, 'HUAWEI'),
(43, 'PA NDUIT'),
(44, 'EPCOM POWERLINE'),
(45, 'PruebaMarca'),
(46, 'PruebaMarca2'),
(47, 'pruebamarca3'),
(48, 'pruebamarca4'),
(49, 'marcaprueba526526');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `moneda`
--

CREATE TABLE `moneda` (
  `moneda_id` int(10) NOT NULL,
  `moneda_nombre` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `moneda`
--

INSERT INTO `moneda` (`moneda_id`, `moneda_nombre`) VALUES
(1, 'MXN'),
(2, 'USD');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `partida`
--

CREATE TABLE `partida` (
  `partida_id` bigint(20) NOT NULL,
  `partida_nombre` varchar(255) DEFAULT NULL,
  `partida_descripcion` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `partida`
--

INSERT INTO `partida` (`partida_id`, `partida_nombre`, `partida_descripcion`) VALUES
(25, 'Camaras IP', 'Camaras IP'),
(27, 'Servidores VMS', 'Servidores VMS'),
(29, 'Servidores Control de Acceso', 'Servidores Control de Acceso'),
(30, 'Equipo de Cómputo y comunicación', 'Equipo de Cómputo y comunicación'),
(31, 'Mantenimiento preventivo', 'Mantenimiento preventivo'),
(41, 'xx', 'xx'),
(42, 'uu', 'uiu'),
(43, 'uuy', 'tgd'),
(44, 'rrrr', 'rrr'),
(45, 'qqqw', 'qqqw'),
(46, 'Switches', 'Switches'),
(47, 'Routers', 'Routers'),
(48, 'Servidores', 'Servidores'),
(49, 'Consultoria', 'Consultoria'),
(50, 'pp1', 'pp1'),
(51, 'PP1', 'PP'),
(52, 'p1p10', 'p1p10'),
(53, 'pp', 'pp'),
(54, 'pp1', 'pp1'),
(55, 'p1p10_2', 'p1p10_2'),
(56, 'partida100', 'partida100'),
(57, 'ppp3', 'ppp3'),
(58, 'pp1', 'pp1'),
(59, 'pp2', 'pp2');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pp`
--

CREATE TABLE `pp` (
  `pp_id` bigint(20) NOT NULL,
  `pp_id_proyecto` bigint(20) DEFAULT NULL,
  `pp_id_partida` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `pp`
--

INSERT INTO `pp` (`pp_id`, `pp_id_proyecto`, `pp_id_partida`) VALUES
(28, 71, 25),
(45, 70, 42),
(46, 75, 43),
(47, 76, 44),
(48, 80, 45),
(49, 81, 46),
(50, 81, 47),
(51, 81, 48),
(52, 81, 49),
(53, 88, 50),
(54, 100, 51),
(55, 101, 52),
(56, 101, 53),
(57, 101, 54),
(58, 101, 55),
(59, 101, 56),
(60, 102, 57),
(61, 104, 58),
(62, 81, 59);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `precio`
--

CREATE TABLE `precio` (
  `precio_id` bigint(20) NOT NULL,
  `precio_lista` decimal(20,3) DEFAULT NULL,
  `precio_unitario` decimal(20,3) DEFAULT NULL,
  `precio_descuento` float DEFAULT NULL,
  `precio_total` decimal(20,3) DEFAULT NULL,
  `precio_id_moneda` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `precio`
--

INSERT INTO `precio` (`precio_id`, `precio_lista`, `precio_unitario`, `precio_descuento`, `precio_total`, `precio_id_moneda`) VALUES
(70, '3409.000', '3409.000', 0, '180677.000', 2),
(71, '4949.000', '4949.000', 0, '9898.000', 2),
(72, '3299.000', '3299.000', 0, '32990.000', 2),
(73, '1429.000', '1429.000', 0, '82882.000', 2),
(74, '1153.000', '1153.000', 0, '8071.000', 2),
(75, '1077.000', '1077.000', 0, '23694.000', 2),
(76, '714.000', '714.000', 0, '3570.000', 2),
(77, '736.000', '736.000', 0, '1472.000', 2),
(78, '6599.000', '6599.000', 0, '131980.000', 2),
(79, '14299.000', '14299.000', 0, '100093.000', 2),
(80, '109.000', '109.000', 0, '5777.000', 2),
(81, '439.000', '439.000', 0, '878.000', 2),
(82, '153.000', '153.000', 0, '306.000', 2),
(83, '439.000', '439.000', 0, '878.000', 2),
(84, '109.000', '109.000', 0, '1090.000', 2),
(85, '94.000', '94.000', 0, '5452.000', 2),
(86, '94.000', '94.000', 0, '1880.000', 2),
(87, '219.000', '219.000', 0, '1533.000', 2),
(88, '219.000', '219.000', 0, '1533.000', 2),
(89, '329.000', '329.000', 0, '2303.000', 2),
(90, '339.000', '339.000', 0, '19662.000', 2),
(91, '65.000', '65.000', 0, '3640.000', 2),
(92, '32.000', '32.000', 0, '4800.000', 2),
(93, '12889.680', '12889.680', 0, '51558.720', 1),
(94, '88022.380', '88022.380', 0, '176044.760', 1),
(95, '4642.140', '4642.140', 0, '46421.400', 1),
(96, '10057.870', '10057.870', 0, '804629.600', 1),
(97, '35277.890', '35277.890', 0, '2822231.200', 1),
(98, '193.600', '193.600', 0, '4840.000', 1),
(99, '215.280', '215.280', 0, '40042.080', 1),
(100, '10676.660', '10676.660', 0, '693982.900', 1),
(101, '22308.970', '22308.970', 0, '66926.910', 2),
(102, '19.570', '19.570', 0, '117.420', 2),
(103, '19.710', '19.710', 0, '78.840', 2),
(104, '22308.970', '22308.970', 0, '66926.910', 2),
(105, '19.570', '22308.970', 0, '133853.820', 2),
(106, '171.930', '171.930', 0, '31978.980', 1),
(107, '19.710', '17.710', 10.1471, '106.260', 2),
(108, '40.570', '40.570', 0, '243.420', 2),
(109, '0.010', '0.010', 0, '0.060', 2),
(110, '0.010', '0.010', 0, '0.480', 2),
(111, '0.010', '0.010', 0, '0.180', 2),
(112, '0.010', '0.010', 0, '0.060', 2),
(113, '0.010', '0.010', 0, '0.030', 2),
(114, '31.730', '31.730', 0, '190.380', 2),
(115, '14881.390', '14881.390', 0, '44644.170', 2),
(116, '5669.100', '5669.100', 0, '17007.300', 2),
(117, '341.120', '341.120', 0, '1023.360', 2),
(118, '0.010', '0.010', 0, '0.030', 2),
(119, '0.010', '0.010', 0, '0.030', 2),
(120, '0.010', '0.010', 0, '0.030', 2),
(121, '0.010', '0.010', 0, '0.010', 2),
(122, '5050.890', '5050.890', 0, '5050.890', 2),
(123, '152.430', '152.430', 0, '39631.800', 2),
(124, '56.930', '56.930', 0, '3757.380', 2),
(125, '27831.720', '27831.720', 0, '55663.440', 2),
(126, '103605.440', '103605.440', 0, '103605.440', 2),
(127, '10785.360', '10785.360', 0, '10785.360', 2),
(128, '3501.440', '3501.440', 0, '7002.880', 2),
(129, '7714.100', '7714.100', 0, '7714.100', 2),
(130, '667.000', '667.000', 0, '1334.000', 2),
(131, '8620.000', '8620.000', 0, '17240.000', 2),
(132, '250.000', '250.000', 0, '46500.000', 2),
(133, '250.000', '250.000', 0, '15000.000', 2),
(134, '667.000', '667.000', 0, '667.000', 2),
(135, '1150.000', '1150.000', 0, '10350.000', 2),
(136, '22308.970', '22308.970', 0, '44617.940', 2),
(137, '19.570', '19.570', 0, '78.280', 2),
(138, '19.710', '19.710', 0, '78.840', 2),
(139, '40.570', '40.570', 0, '162.280', 2),
(140, '0.010', '0.010', 0, '0.040', 2),
(141, '0.010', '0.010', 0, '0.320', 2),
(142, '0.010', '0.010', 0, '0.120', 2),
(143, '0.010', '0.010', 0, '0.040', 2),
(144, '0.010', '0.010', 0, '0.020', 2),
(145, '31.730', '31.730', 0, '126.920', 2),
(146, '14881.390', '14881.390', 0, '29762.780', 2),
(147, '5669.100', '5669.100', 0, '11338.200', 2),
(148, '341.120', '341.120', 0, '682.240', 2),
(149, '0.010', '0.010', 0, '0.020', 2),
(150, '0.010', '0.010', 0, '0.020', 2),
(151, '0.010', '0.010', 0, '0.020', 2),
(152, '0.010', '0.010', 0, '0.010', 2),
(153, '5050.890', '5050.890', 0, '5050.890', 2),
(154, '59412.140', '59412.140', 0, '534709.260', 1),
(155, '12899.000', '12899.000', 0, '116091.000', 1),
(156, '360.490', '360.490', 0, '3244.410', 1),
(157, '5557.410', '5557.410', 0, '50016.690', 1),
(158, '10514.200', '10514.200', 0, '283883.400', 1),
(159, '4109.600', '4109.600', 0, '110959.200', 1),
(160, '551.650', '551.650', 0, '4964.850', 1),
(161, '7600.000', '7600.000', 0, '38000.000', 2),
(162, '1000.000', '1000.000', 0, '5000.000', 2),
(163, '600.000', '600.000', 0, '3000.000', 2),
(164, '224.000', '224.000', 0, '2240.000', 2),
(165, '338.000', '338.000', 0, '1690.000', 2),
(166, '1368.000', '1368.000', 0, '6840.000', 2),
(167, '53900.120', '53900.120', 0, '53900.120', 1),
(168, '2611.370', '2611.370', 0, '5222.740', 1),
(169, '4253.490', '4253.490', 0, '8506.980', 1),
(170, '2467.920', '2467.920', 0, '2467.920', 1),
(171, '7141.030', '7141.030', 0, '7141.030', 1),
(172, '933.130', '933.130', 0, '9331.300', 1),
(173, '6136.890', '6136.890', 0, '6136.890', 1),
(174, '2724.480', '2724.480', 0, '13622.400', 1),
(175, '25627.270', '25627.270', 0, '25627.270', 1),
(176, '27000.000', '27000.000', 0, '27000.000', 1),
(177, '22000.000', '22000.000', 0, '88000.000', 1),
(178, '16000.000', '16000.000', 0, '48000.000', 1),
(179, '200.000', '200.000', 0, '90000.000', 1),
(180, '76300.000', '76300.000', 0, '2136400.000', 1),
(181, '763600.000', '763600.000', 0, '763600.000', 1),
(182, '3623.840', '3623.840', 0, '3623.840', 1),
(183, '1140.150', '1140.150', 0, '1140.150', 1),
(184, '769.000', '769.000', 0, '769.000', 2),
(185, '11505.990', '11505.990', 0, '11505.990', 1),
(186, '3600.000', '3600.000', 0, '7200.000', 1),
(187, '31711.960', '31711.960', 0, '31711.960', 1),
(188, '1600.000', '1600.000', 0, '12800.000', 1),
(189, '100.000', '100.000', 0, '100.000', 1),
(190, '500.000', '500.000', 0, '500.000', 2),
(191, '200.000', '200.000', 0, '200.000', 2),
(192, '600.000', '600.000', 0, '600.000', 1),
(193, '700.000', '700.000', 0, '700.000', 2),
(194, '300.000', '300.000', 0, '300.000', 2),
(195, '600.000', '600.000', 0, '600.000', 1),
(196, '850.000', '850.000', 0, '850.000', 2),
(197, '200.000', '200.000', 0, '200.000', 2),
(198, '250.000', '250.000', 0, '250.000', 2),
(199, '2000.000', '2000.000', 0, '4000.000', 2),
(200, '550.000', '550.000', 0, '550.000', 2),
(201, '5000.000', '5000.000', 0, '5000.000', 1),
(202, '1500.000', '1500.000', 0, '1500.000', 2),
(203, '1000.000', '980.000', 2, '4900.000', 1),
(204, '2000.000', '1940.000', 3, '15520.000', 2),
(205, '2000.000', '1960.000', 2, '196000.000', 1),
(206, '1000.000', '980.000', 2, '980.000', 1),
(207, '500.000', '490.000', 2, '4900.000', 1),
(208, '50.000', '49.000', 2, '49000.000', 1),
(209, '2355.000', '2307.900', 2, '23079.000', 1),
(210, '3409.000', '3409.000', 0, '180677.000', 2),
(211, '4949.000', '4949.000', 0, '9898.000', 2),
(212, '4949.000', '4949.000', 0, '9898.000', 2),
(213, '4949.000', '4949.000', 0, '9898.000', 2),
(214, '4949.000', '4949.000', 0, '9898.000', 2),
(215, '4949.000', '4949.000', 0, '9898.000', 2),
(216, '4949.000', '4949.000', 0, '9898.000', 2),
(217, '4949.000', '4949.000', 0, '9898.000', 2),
(218, '4949.000', '4949.000', 0, '9898.000', 2),
(219, '4949.000', '4949.000', 0, '9898.000', 2),
(220, '4949.000', '4949.000', 0, '9898.000', 2),
(221, '4949.000', '4949.000', 0, '9898.000', 2),
(222, '4949.000', '4949.000', 0, '9898.000', 2),
(223, '4949.000', '4949.000', 0, '9898.000', 2),
(226, '4949.000', '4949.000', 0, '9898.000', 2),
(227, '4949.000', '4949.000', 0, '9898.000', 2),
(228, '4949.000', '4949.000', 0, '9898.000', 2),
(229, '4949.000', '9000.000', -81.855, '18000.000', 2),
(230, '4949.000', '8000.000', -61.649, '16000.000', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proporcionalidad`
--

CREATE TABLE `proporcionalidad` (
  `pd_id` bigint(20) NOT NULL,
  `pd_id_proyecto` bigint(20) NOT NULL,
  `pd_tasa_interes` float NOT NULL,
  `pd_anio_financiamiento` int(2) NOT NULL,
  `pd_pagos_anuales` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `proporcionalidad`
--

INSERT INTO `proporcionalidad` (`pd_id`, `pd_id_proyecto`, `pd_tasa_interes`, `pd_anio_financiamiento`, `pd_pagos_anuales`) VALUES
(2, 71, 5, 5, 5),
(3, 70, 17, 17, 17);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedor`
--

CREATE TABLE `proveedor` (
  `proveedor_id` bigint(20) NOT NULL,
  `proveedor_nombre` varchar(100) DEFAULT NULL,
  `proveedor_telefono` text DEFAULT NULL,
  `proveedor_email` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `proveedor`
--

INSERT INTO `proveedor` (`proveedor_id`, `proveedor_nombre`, `proveedor_telefono`, `proveedor_email`) VALUES
(26, 'INCOMEX ', '55', 'compuS@gmail.com'),
(27, 'SYSCOM', '0', 'sys@gmail.com'),
(28, 'TECH DATA', '0', ''),
(29, 'SYNNEX', '0', ''),
(30, 'FS', '0', ''),
(31, 'COMPUSOLUCIONES', '7', 'compu@gamil.com'),
(32, 'XWEB', '0', ''),
(33, 'Cruatech', '0', ''),
(34, 'PTN', '6666', 'ptn@palotinto'),
(35, 'ESIME', '7', 'VH'),
(36, 'PruebaProv', '', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedor_marca`
--

CREATE TABLE `proveedor_marca` (
  `pm_id` bigint(20) NOT NULL,
  `pm_id_proveedor` bigint(20) DEFAULT NULL,
  `pm_id_marca` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `proveedor_marca`
--

INSERT INTO `proveedor_marca` (`pm_id`, `pm_id_proveedor`, `pm_id_marca`) VALUES
(8, 34, 25),
(9, 26, 26),
(10, 27, 27),
(11, 27, 28),
(12, 27, 29),
(13, 27, 30),
(14, 27, 31),
(15, 28, 32),
(16, 29, 33),
(17, 30, 34),
(18, 28, 35),
(19, 30, 36),
(20, 31, 37),
(21, 31, 38),
(22, 33, 39),
(23, 28, 40),
(24, 31, 41),
(25, 32, 42),
(26, 27, 43),
(27, 27, 29),
(28, 36, 46),
(29, 36, 47),
(30, 36, 48),
(31, 36, 49);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyecto`
--

CREATE TABLE `proyecto` (
  `proyecto_id` bigint(20) NOT NULL,
  `proyecto_clave` varchar(255) DEFAULT NULL,
  `proyecto_descripcion` text DEFAULT NULL,
  `proyecto_id_cliente` int(11) DEFAULT NULL,
  `proyecto_fecha_creacion` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `proyecto_fecha_modificacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `proyecto_estatus` varchar(50) DEFAULT NULL,
  `proyecto_plazo_meses` int(3) DEFAULT NULL,
  `proyecto_valor_dolar` decimal(20,3) NOT NULL DEFAULT 1.000
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `proyecto`
--

INSERT INTO `proyecto` (`proyecto_id`, `proyecto_clave`, `proyecto_descripcion`, `proyecto_id_cliente`, `proyecto_fecha_creacion`, `proyecto_fecha_modificacion`, `proyecto_estatus`, `proyecto_plazo_meses`, `proyecto_valor_dolar`) VALUES
(70, 'pp1', 'prueba', 13, '2022-04-11 22:15:54', '2022-03-29 20:08:04', NULL, NULL, '1.000'),
(71, 'FO-ING-01', '1658-BOM12', 13, '2022-04-19 11:47:51', '2022-03-29 20:27:12', 'Aceptado', NULL, '1.000'),
(75, 'rtr', 'rrr', 13, '2022-04-01 21:08:11', '2022-04-02 03:08:11', NULL, 11, '1.000'),
(76, 'eee', 'eee', 13, '2022-04-01 21:13:33', '2022-04-02 03:13:33', NULL, 1, '1.000'),
(78, 'qw', 'qwqw', 13, '2022-04-01 21:17:52', '2022-04-02 03:17:52', NULL, 10, '1.000'),
(80, 'qqq', 'qq', 13, '2022-04-01 21:25:12', '2022-04-02 03:25:12', NULL, 1, '1.000'),
(81, 'FO-ING-01-BOM- PRUEBA', '1658-BOM', 13, '2022-04-18 22:19:26', '2022-04-02 09:11:46', NULL, 12, '20.000'),
(82, 'Prueba UM', 'PUM', 13, '2022-04-04 14:42:40', '2022-04-04 19:42:40', NULL, 12, '1.000'),
(83, 'Prueba 1', 'jnfjksndjkfns', 13, '2022-04-05 18:33:32', '2022-04-05 23:33:32', NULL, 12, '1.000'),
(84, 'Prueba 5', 'jnjnkjnn', 13, '2022-04-05 23:58:39', '2022-04-06 04:58:39', NULL, 12, '1.000'),
(85, 'pp', 'jdfjkdbfb', 13, '2022-04-06 00:55:05', '2022-04-06 05:55:05', NULL, 12, '1.000'),
(86, 'pp1', 'pp1', 13, '2022-04-06 11:48:22', '2022-04-06 16:48:22', NULL, 4, '1.000'),
(87, 'pp2', 'pp2', 13, '2022-04-06 11:48:39', '2022-04-06 16:48:39', NULL, 5, '1.000'),
(88, 'pp3', 'pp3', 13, '2022-04-06 11:48:49', '2022-04-06 16:48:49', NULL, 2, '1.000'),
(89, 'pp', 'pp', 13, '2022-04-12 00:14:21', '2022-04-06 17:18:41', 'En revision', 12, '1.000'),
(100, 'Proyecto prueba 5', 'pp5', 13, '2022-04-08 17:09:33', '2022-04-08 22:09:33', NULL, 45, '1.000'),
(101, 'Proyecto 10', 'pp10', 13, '2022-04-12 10:38:15', '2022-04-08 22:48:23', 'En revision', 25, '1.000'),
(102, 'Proyecto prueba 2', 'pp2', 13, '2022-04-13 09:29:43', '2022-04-13 14:29:43', NULL, NULL, '1.000'),
(103, 'ppppp', 'ppppppp', 13, '2022-04-13 09:30:28', '2022-04-13 14:30:28', NULL, NULL, '1.000'),
(104, 'Proyecto1', 'proyecto1', 13, '2022-04-19 12:17:49', '2022-04-19 17:13:56', 'En revision', 12, '1.000');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyectos_cat_d`
--

CREATE TABLE `proyectos_cat_d` (
  `pc_id` bigint(20) NOT NULL,
  `pc_id_proyecto` bigint(20) DEFAULT NULL,
  `pc_id_cat_d` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `proyectos_cat_d`
--

INSERT INTO `proyectos_cat_d` (`pc_id`, `pc_id_proyecto`, `pc_id_cat_d`) VALUES
(107, 81, 115),
(108, 81, 116),
(109, 81, 117),
(110, 81, 118),
(113, 101, 121),
(114, 101, 122);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `psp`
--

CREATE TABLE `psp` (
  `psp_id` bigint(20) NOT NULL,
  `psp_id_partida` bigint(20) DEFAULT NULL,
  `psp_id_sp` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `psp`
--

INSERT INTO `psp` (`psp_id`, `psp_id_partida`, `psp_id_sp`) VALUES
(39, 25, 1048),
(40, 25, 1049),
(173, 49, 1182),
(174, 25, 1183),
(175, 57, 1184),
(176, 57, 1185),
(177, 57, 1186),
(178, 57, 1187),
(179, 57, 1188),
(180, 25, 1189),
(181, 25, 1190),
(182, 25, 1191),
(185, 57, 1194),
(186, 57, 1195),
(187, 58, 1196),
(188, 58, 1197),
(189, 46, 1198);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `rol_id` int(3) NOT NULL,
  `rol_nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`rol_id`, `rol_nombre`) VALUES
(1, 'administrador'),
(2, 'preventa'),
(3, 'venta'),
(4, '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicio_producto`
--

CREATE TABLE `servicio_producto` (
  `sp_id` bigint(20) NOT NULL,
  `sp_id_spnp` bigint(20) NOT NULL,
  `sp_id_spd` bigint(20) NOT NULL,
  `sp_meses` int(3) DEFAULT NULL,
  `sp_semanas` int(3) DEFAULT NULL,
  `sp_cantidad` int(3) DEFAULT NULL,
  `sp_id_precio` bigint(20) NOT NULL,
  `sp_id_categoria` int(10) NOT NULL,
  `sp_comentarios` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `servicio_producto`
--

INSERT INTO `servicio_producto` (`sp_id`, `sp_id_spnp`, `sp_id_spd`, `sp_meses`, `sp_semanas`, `sp_cantidad`, `sp_id_precio`, `sp_id_categoria`, `sp_comentarios`) VALUES
(1048, 3, 2, 0, 0, NULL, 70, 3, 'hvguyg'),
(1049, 3, 2, 0, 0, 2, 71, 3, NULL),
(1182, 2, 1, 0, 0, 53, 210, 3, NULL),
(1183, 9, 4, 0, 0, 2, 214, 3, NULL),
(1184, 9, 4, 0, 0, 2, 215, 3, NULL),
(1185, 10, 5, 0, 0, 2, 216, 3, NULL),
(1186, 11, 6, 0, 0, 2, 217, 3, NULL),
(1187, 12, 7, 0, 0, 2, 218, 3, NULL),
(1188, 13, 8, 0, 0, 2, 219, 3, NULL),
(1189, 22, 17, 0, 0, 2, 220, 3, NULL),
(1190, 23, 18, 0, 0, 2, 221, 3, NULL),
(1191, 24, 19, 0, 0, 2, 222, 3, NULL),
(1194, 27, 22, 0, 0, 2, 226, 3, NULL),
(1195, 27, 22, 0, 0, 2, 227, 3, NULL),
(1196, 27, 22, 0, 0, 2, 228, 3, NULL),
(1197, 27, 22, 0, 0, 2, 229, 3, NULL),
(1198, 27, 22, 0, 0, 2, 230, 3, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sp_descripcion`
--

CREATE TABLE `sp_descripcion` (
  `spd_id` bigint(20) NOT NULL,
  `spd_des` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `sp_descripcion`
--

INSERT INTO `sp_descripcion` (`spd_id`, `spd_des`) VALUES
(1, 'Q6075-E Axis PTZ Camera'),
(2, 'Q6075-SE Axis PTZ Camera'),
(3, 'Q6315-LE Axis PTZ Camera'),
(4, 'Q6075-SE Axis PTZ Camera copia'),
(5, 'Q6075-SE Axis PTZ Camera copia1'),
(6, 'Q6075-SE Axis PTZ Camera copia 2'),
(7, 'Q6075-SE Axis PTZ Camera copia 3'),
(8, 'Q6075-SE Axis PTZ Camera copia 4'),
(9, 'Q6075-SE Axis PTZ Camera copia 5'),
(10, 'Q6075-SE Axis PTZ Camera copia 5'),
(11, 'Q6075-SE Axis PTZ Camera copia 5'),
(12, 'Q6075-SE Axis PTZ Camera copia 5'),
(13, 'Q6075-SE Axis PTZ Camera copia 5'),
(14, 'Q6075-SE Axis PTZ Camera copia 5'),
(15, 'Q6075-SE Axis PTZ Camera copia 5'),
(16, 'Q6075-SE Axis PTZ Camera copia 5'),
(17, 'Q6075-SE Axis PTZ Camera copia 5'),
(18, 'Q6075-SE Axis PTZ Camera copia 6'),
(19, 'Q6075-SE Axis PTZ Camera copia 6'),
(20, 'Q6075-SE Axis PTZ Camera copia 7'),
(21, 'Q6075-SE Axis PTZ Camera copia 8'),
(22, 'Q6075-SE Axis PTZ Camera copia 9');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sp_no_parte`
--

CREATE TABLE `sp_no_parte` (
  `spnp_id` bigint(20) NOT NULL,
  `spnp_np` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `sp_no_parte`
--

INSERT INTO `sp_no_parte` (`spnp_id`, `spnp_np`) VALUES
(2, 'Q6075-E'),
(3, 'Q6075-SE'),
(4, 'Q6315-LE'),
(5, 'Q1615-LE Mk III'),
(6, 'P1378'),
(9, 'Q6075-SE copia'),
(10, 'Q6075-SE copia1'),
(11, 'Q6075-SE copia2'),
(12, 'Q6075-SE copia3'),
(13, 'Q6075-SE copia4'),
(14, 'Q6075-SE copia5'),
(15, 'Q6075-SE copia5'),
(16, 'Q6075-SE copia5'),
(17, 'Q6075-SE copia5'),
(18, 'Q6075-SE copia5'),
(19, 'Q6075-SE copia5'),
(20, 'Q6075-SE copia5'),
(21, 'Q6075-SE copia5'),
(22, 'Q6075-SE copia5'),
(23, 'Q6075-SE copia6'),
(24, 'Q6075-SE copia6'),
(25, 'Q6075-SE copia7'),
(26, 'Q6075-SE copia 8'),
(27, 'Q6075-SE copia 9');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sp_proveedor_marca`
--

CREATE TABLE `sp_proveedor_marca` (
  `sppm_id` int(10) NOT NULL,
  `sppm_id_sp` bigint(20) DEFAULT NULL,
  `sppm_id_proveedor` bigint(20) DEFAULT NULL,
  `sppm_id_marca` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `sp_proveedor_marca`
--

INSERT INTO `sp_proveedor_marca` (`sppm_id`, `sppm_id_sp`, `sppm_id_proveedor`, `sppm_id_marca`) VALUES
(43, 1048, 28, 40),
(44, 1049, 26, 26),
(167, 1182, 26, 26),
(168, 1183, 26, 26),
(169, 1184, 26, 26),
(170, 1185, 26, 26),
(171, 1186, 26, 26),
(172, 1187, 26, 26),
(173, 1188, 26, 26),
(174, 1189, 26, 26),
(175, 1190, 26, 26),
(176, 1191, 26, 26),
(179, 1194, 26, 26),
(180, 1195, 26, 26),
(181, 1196, 26, 26),
(182, 1197, 26, 26),
(183, 1198, 26, 26);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` bigint(20) NOT NULL,
  `usuario_id_rol` int(3) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `estado_login` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `usuario_id_rol`, `email`, `password`, `estado_login`) VALUES
(1, 1, 'carlos@delfos369.com', '$2a$12$DJLSb7WYH0wWipmkyvaThO7izgIZd5ycnEI5f6mhLeL5yKG0UawxK', 0),
(11, 2, 'oscar@delfos369.com', '$2a$12$01AiKJWTCOyfNVywcZfTFuGXkF3NgRcDrjkyxp003oN7jbLoiAqD2', 1),
(12, 3, 'brenda@delfos369.com', '$2a$10$1cjZbWujzFUOmaux3GFXA.3iEaECUrV9bnC5liq9YWSfG0Gqxdwve', 0),
(13, 3, 'malaika@delfos369.com', '$2a$10$9IAONZc8Z7evCK5Va7fkJ.Z3wSR9V0HmdKvJ5/QKHuqdpPpVP5/c6', 0),
(14, 3, 'preventa@palotinto.com', '$2a$10$UcWc1Py9vMlukLQsaxAuy.UxYaLVo3wJpwnc3f/XiQHxTjd2bVpz6', 0),
(19, 2, 'preventa2@palotinto.com', '$2a$10$i349BdkHYp0S4c3eBcJ6NOykiCWYXvUREzKtmKA8NrlpGs/7k4Npa', 0),
(20, 2, 'palotinto@gmail.com', '$2a$10$oIXcCw5jnirl6bHerilV6OgWPCvTMTxyBUBaZxf7GA0lcEzeF0cFW', 0),
(21, 2, 'preventa@gmail.com', '$2a$10$gDA7AJHTJY29DA1DOV7KS.2CES9E6esSSf/7f2tKcL3Vk7WoLuw0O', 0),
(22, 4, 'useradmin@gmail', '$2a$10$XAuh.72XbH1U2JTgJlNLgeDFLkYKdZwYKUPssY7Sn6pLxtUza5M4.', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios_proyectos`
--

CREATE TABLE `usuarios_proyectos` (
  `up_id` bigint(20) NOT NULL,
  `up_id_usuario` bigint(20) NOT NULL,
  `up_id_proyecto` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios_proyectos`
--

INSERT INTO `usuarios_proyectos` (`up_id`, `up_id_usuario`, `up_id_proyecto`) VALUES
(59, 1, 70),
(60, 11, 71),
(61, 1, 75),
(62, 1, 76),
(63, 1, 78),
(64, 1, 80),
(65, 14, 81),
(66, 13, 82),
(68, 1, 84),
(69, 1, 85),
(70, 11, 86),
(71, 11, 87),
(72, 11, 88),
(73, 11, 89),
(74, 1, 100),
(75, 1, 101),
(76, 12, 86),
(78, 1, 102),
(79, 1, 103),
(80, 12, 71),
(81, 1, 104);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `am`
--
ALTER TABLE `am`
  ADD PRIMARY KEY (`am_id`),
  ADD KEY `fk_am_id_partida` (`am_id_partida`);

--
-- Indices de la tabla `am_cats`
--
ALTER TABLE `am_cats`
  ADD PRIMARY KEY (`amc_id`),
  ADD KEY `fk_amc_id_proyecto` (`amc_id_proyecto`),
  ADD KEY `fk_amc_id_cats` (`amc_id_cats`);

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`categoria_id`);

--
-- Indices de la tabla `categorias_ci`
--
ALTER TABLE `categorias_ci`
  ADD PRIMARY KEY (`cci_id`);

--
-- Indices de la tabla `categorias_c_a_sptn_ma`
--
ALTER TABLE `categorias_c_a_sptn_ma`
  ADD PRIMARY KEY (`cat_id`);

--
-- Indices de la tabla `categorias_datos`
--
ALTER TABLE `categorias_datos`
  ADD PRIMARY KEY (`cd_id`),
  ADD KEY `fk_cd_id_categorias` (`cd_id_cats`),
  ADD KEY `fk_cd_id_precios` (`cd_id_precio`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`cliente_id`);

--
-- Indices de la tabla `colaboradores`
--
ALTER TABLE `colaboradores`
  ADD PRIMARY KEY (`colab_id`),
  ADD KEY `fk_colab_id_usuario` (`colab_id_usuario`),
  ADD KEY `fk_colab_id_proyecto` (`colab_id_proyecto`);

--
-- Indices de la tabla `costos_indirectos`
--
ALTER TABLE `costos_indirectos`
  ADD PRIMARY KEY (`ci_id`),
  ADD KEY `fk_ci_id_cii` (`ci_id_cci`),
  ADD KEY `fk_ci_id_proyecto` (`ci_id_proyecto`);

--
-- Indices de la tabla `marca`
--
ALTER TABLE `marca`
  ADD PRIMARY KEY (`marca_id`);

--
-- Indices de la tabla `moneda`
--
ALTER TABLE `moneda`
  ADD PRIMARY KEY (`moneda_id`);

--
-- Indices de la tabla `partida`
--
ALTER TABLE `partida`
  ADD PRIMARY KEY (`partida_id`);

--
-- Indices de la tabla `pp`
--
ALTER TABLE `pp`
  ADD PRIMARY KEY (`pp_id`),
  ADD KEY `fk_pp_id_partida` (`pp_id_partida`),
  ADD KEY `fk_pp_id_proyecto` (`pp_id_proyecto`);

--
-- Indices de la tabla `precio`
--
ALTER TABLE `precio`
  ADD PRIMARY KEY (`precio_id`),
  ADD KEY `fk_precio_id_moneda` (`precio_id_moneda`);

--
-- Indices de la tabla `proporcionalidad`
--
ALTER TABLE `proporcionalidad`
  ADD PRIMARY KEY (`pd_id`),
  ADD KEY `fk_pd_id_proyecto` (`pd_id_proyecto`);

--
-- Indices de la tabla `proveedor`
--
ALTER TABLE `proveedor`
  ADD PRIMARY KEY (`proveedor_id`);

--
-- Indices de la tabla `proveedor_marca`
--
ALTER TABLE `proveedor_marca`
  ADD PRIMARY KEY (`pm_id`),
  ADD KEY `fk_pm_id_proveedor` (`pm_id_proveedor`),
  ADD KEY `fk_pm_id_marca` (`pm_id_marca`);

--
-- Indices de la tabla `proyecto`
--
ALTER TABLE `proyecto`
  ADD PRIMARY KEY (`proyecto_id`),
  ADD KEY `fk_proyecto_id_cliente` (`proyecto_id_cliente`);

--
-- Indices de la tabla `proyectos_cat_d`
--
ALTER TABLE `proyectos_cat_d`
  ADD PRIMARY KEY (`pc_id`),
  ADD KEY `fk_pc_id_proyecto` (`pc_id_proyecto`),
  ADD KEY `fk_pc_id_cat_d` (`pc_id_cat_d`);

--
-- Indices de la tabla `psp`
--
ALTER TABLE `psp`
  ADD PRIMARY KEY (`psp_id`),
  ADD KEY `fk_psp_id_sp` (`psp_id_sp`),
  ADD KEY `fk_psp_id_partida` (`psp_id_partida`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`rol_id`);

--
-- Indices de la tabla `servicio_producto`
--
ALTER TABLE `servicio_producto`
  ADD PRIMARY KEY (`sp_id`),
  ADD KEY `fk_sp_id_precio` (`sp_id_precio`),
  ADD KEY `fk_sp_id_categoria` (`sp_id_categoria`),
  ADD KEY `fk_sp_id_spnp` (`sp_id_spnp`),
  ADD KEY `fk_sp_id_spd` (`sp_id_spd`);

--
-- Indices de la tabla `sp_descripcion`
--
ALTER TABLE `sp_descripcion`
  ADD PRIMARY KEY (`spd_id`);

--
-- Indices de la tabla `sp_no_parte`
--
ALTER TABLE `sp_no_parte`
  ADD PRIMARY KEY (`spnp_id`);

--
-- Indices de la tabla `sp_proveedor_marca`
--
ALTER TABLE `sp_proveedor_marca`
  ADD PRIMARY KEY (`sppm_id`),
  ADD KEY `fk_sppm_id_sp` (`sppm_id_sp`),
  ADD KEY `fk_sppm_id_proveedor` (`sppm_id_proveedor`),
  ADD KEY `fk_sppm_id_marca` (`sppm_id_marca`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD KEY `fk_usuario_id_rol` (`usuario_id_rol`);

--
-- Indices de la tabla `usuarios_proyectos`
--
ALTER TABLE `usuarios_proyectos`
  ADD PRIMARY KEY (`up_id`),
  ADD KEY `fk_up_id_usuario` (`up_id_usuario`),
  ADD KEY `fk_up_id_proyecto` (`up_id_proyecto`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `am`
--
ALTER TABLE `am`
  MODIFY `am_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT de la tabla `am_cats`
--
ALTER TABLE `am_cats`
  MODIFY `amc_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `categoria_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `categorias_ci`
--
ALTER TABLE `categorias_ci`
  MODIFY `cci_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `categorias_c_a_sptn_ma`
--
ALTER TABLE `categorias_c_a_sptn_ma`
  MODIFY `cat_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `categorias_datos`
--
ALTER TABLE `categorias_datos`
  MODIFY `cd_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=123;

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `cliente_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `colaboradores`
--
ALTER TABLE `colaboradores`
  MODIFY `colab_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `costos_indirectos`
--
ALTER TABLE `costos_indirectos`
  MODIFY `ci_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT de la tabla `marca`
--
ALTER TABLE `marca`
  MODIFY `marca_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT de la tabla `moneda`
--
ALTER TABLE `moneda`
  MODIFY `moneda_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `partida`
--
ALTER TABLE `partida`
  MODIFY `partida_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT de la tabla `pp`
--
ALTER TABLE `pp`
  MODIFY `pp_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT de la tabla `precio`
--
ALTER TABLE `precio`
  MODIFY `precio_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=231;

--
-- AUTO_INCREMENT de la tabla `proporcionalidad`
--
ALTER TABLE `proporcionalidad`
  MODIFY `pd_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `proveedor`
--
ALTER TABLE `proveedor`
  MODIFY `proveedor_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT de la tabla `proveedor_marca`
--
ALTER TABLE `proveedor_marca`
  MODIFY `pm_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de la tabla `proyecto`
--
ALTER TABLE `proyecto`
  MODIFY `proyecto_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=105;

--
-- AUTO_INCREMENT de la tabla `proyectos_cat_d`
--
ALTER TABLE `proyectos_cat_d`
  MODIFY `pc_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=115;

--
-- AUTO_INCREMENT de la tabla `psp`
--
ALTER TABLE `psp`
  MODIFY `psp_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=190;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `rol_id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `servicio_producto`
--
ALTER TABLE `servicio_producto`
  MODIFY `sp_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1199;

--
-- AUTO_INCREMENT de la tabla `sp_descripcion`
--
ALTER TABLE `sp_descripcion`
  MODIFY `spd_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `sp_no_parte`
--
ALTER TABLE `sp_no_parte`
  MODIFY `spnp_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `sp_proveedor_marca`
--
ALTER TABLE `sp_proveedor_marca`
  MODIFY `sppm_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=184;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `usuarios_proyectos`
--
ALTER TABLE `usuarios_proyectos`
  MODIFY `up_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `am`
--
ALTER TABLE `am`
  ADD CONSTRAINT `fk_am_id_partida` FOREIGN KEY (`am_id_partida`) REFERENCES `partida` (`partida_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `am_cats`
--
ALTER TABLE `am_cats`
  ADD CONSTRAINT `fk_amc_id_cats` FOREIGN KEY (`amc_id_cats`) REFERENCES `categorias_c_a_sptn_ma` (`cat_id`),
  ADD CONSTRAINT `fk_amc_id_proyecto` FOREIGN KEY (`amc_id_proyecto`) REFERENCES `proyecto` (`proyecto_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `categorias_datos`
--
ALTER TABLE `categorias_datos`
  ADD CONSTRAINT `fk_cd_id_categorias` FOREIGN KEY (`cd_id_cats`) REFERENCES `categorias_c_a_sptn_ma` (`cat_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_cd_id_precios` FOREIGN KEY (`cd_id_precio`) REFERENCES `precio` (`precio_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `colaboradores`
--
ALTER TABLE `colaboradores`
  ADD CONSTRAINT `fk_colab_id_proyecto` FOREIGN KEY (`colab_id_proyecto`) REFERENCES `proyecto` (`proyecto_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_colab_id_usuario` FOREIGN KEY (`colab_id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `costos_indirectos`
--
ALTER TABLE `costos_indirectos`
  ADD CONSTRAINT `fk_ci_id_cii` FOREIGN KEY (`ci_id_cci`) REFERENCES `categorias_ci` (`cci_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_ci_id_proyecto` FOREIGN KEY (`ci_id_proyecto`) REFERENCES `proyecto` (`proyecto_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `pp`
--
ALTER TABLE `pp`
  ADD CONSTRAINT `fk_pp_id_partida` FOREIGN KEY (`pp_id_partida`) REFERENCES `partida` (`partida_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_pp_id_proyecto` FOREIGN KEY (`pp_id_proyecto`) REFERENCES `proyecto` (`proyecto_id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `precio`
--
ALTER TABLE `precio`
  ADD CONSTRAINT `fk_precio_id_moneda` FOREIGN KEY (`precio_id_moneda`) REFERENCES `moneda` (`moneda_id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `proporcionalidad`
--
ALTER TABLE `proporcionalidad`
  ADD CONSTRAINT `fk_pd_id_proyecto` FOREIGN KEY (`pd_id_proyecto`) REFERENCES `proyecto` (`proyecto_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `proveedor_marca`
--
ALTER TABLE `proveedor_marca`
  ADD CONSTRAINT `fk_pm_id_marca` FOREIGN KEY (`pm_id_marca`) REFERENCES `marca` (`marca_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_pm_id_proveedor` FOREIGN KEY (`pm_id_proveedor`) REFERENCES `proveedor` (`proveedor_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `proyecto`
--
ALTER TABLE `proyecto`
  ADD CONSTRAINT `fk_proyecto_id_cliente` FOREIGN KEY (`proyecto_id_cliente`) REFERENCES `clientes` (`cliente_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `proyectos_cat_d`
--
ALTER TABLE `proyectos_cat_d`
  ADD CONSTRAINT `fk_pc_id_cat_d` FOREIGN KEY (`pc_id_cat_d`) REFERENCES `categorias_datos` (`cd_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_pc_id_proyecto` FOREIGN KEY (`pc_id_proyecto`) REFERENCES `proyecto` (`proyecto_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `psp`
--
ALTER TABLE `psp`
  ADD CONSTRAINT `fk_psp_id_partida` FOREIGN KEY (`psp_id_partida`) REFERENCES `partida` (`partida_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_psp_id_sp` FOREIGN KEY (`psp_id_sp`) REFERENCES `servicio_producto` (`sp_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `servicio_producto`
--
ALTER TABLE `servicio_producto`
  ADD CONSTRAINT `fk_sp_id_categoria` FOREIGN KEY (`sp_id_categoria`) REFERENCES `categoria` (`categoria_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_sp_id_precio` FOREIGN KEY (`sp_id_precio`) REFERENCES `precio` (`precio_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_sp_id_spd` FOREIGN KEY (`sp_id_spd`) REFERENCES `sp_descripcion` (`spd_id`),
  ADD CONSTRAINT `fk_sp_id_spnp` FOREIGN KEY (`sp_id_spnp`) REFERENCES `sp_no_parte` (`spnp_id`);

--
-- Filtros para la tabla `sp_proveedor_marca`
--
ALTER TABLE `sp_proveedor_marca`
  ADD CONSTRAINT `fk_sppm_id_marca` FOREIGN KEY (`sppm_id_marca`) REFERENCES `marca` (`marca_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_sppm_id_proveedor` FOREIGN KEY (`sppm_id_proveedor`) REFERENCES `proveedor` (`proveedor_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_sppm_id_sp` FOREIGN KEY (`sppm_id_sp`) REFERENCES `servicio_producto` (`sp_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `fk_usuario_id_rol` FOREIGN KEY (`usuario_id_rol`) REFERENCES `roles` (`rol_id`);

--
-- Filtros para la tabla `usuarios_proyectos`
--
ALTER TABLE `usuarios_proyectos`
  ADD CONSTRAINT `fk_up_id_proyecto` FOREIGN KEY (`up_id_proyecto`) REFERENCES `proyecto` (`proyecto_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_up_id_usuario` FOREIGN KEY (`up_id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
