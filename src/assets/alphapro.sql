-- phpMyAdmin SQL Dump
-- version 4.8.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 18-Fev-2020 às 18:59
-- Versão do servidor: 10.1.32-MariaDB
-- PHP Version: 5.6.36

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `alphapro`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `arq_aerobio`
--

CREATE TABLE `arq_aerobio` (
  `codigo` int(11) NOT NULL,
  `data` datetime NOT NULL,
  `protocolo` varchar(1) NOT NULL,
  `fcini` int(11) NOT NULL,
  `fcmax` int(11) NOT NULL,
  `fcmedia` int(11) NOT NULL,
  `fcfinal` int(11) NOT NULL,
  `distancia` int(11) NOT NULL,
  `duracao` int(11) NOT NULL,
  `carga` int(11) NOT NULL,
  `spm` int(11) NOT NULL,
  `programa` int(11) NOT NULL,
  `calorias` int(11) NOT NULL,
  `fcr1` int(11) NOT NULL,
  `fcr2` int(11) NOT NULL,
  `iraf` varchar(20) NOT NULL,
  `it` varchar(20) NOT NULL,
  `ipe` int(11) NOT NULL,
  `fc5` int(11) NOT NULL,
  `fc10` int(11) NOT NULL,
  `fc15` int(11) NOT NULL,
  `fc20` int(11) NOT NULL,
  `fc25` int(11) NOT NULL,
  `fc30` int(11) NOT NULL,
  `fc35` int(11) NOT NULL,
  `fc40` int(11) NOT NULL,
  `fc45` int(11) NOT NULL,
  `fc50` int(11) NOT NULL,
  `fc55` int(11) NOT NULL,
  `fc60` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `arq_avalia`
--

CREATE TABLE `arq_avalia` (
  `codigo` int(11) NOT NULL,
  `data` datetime NOT NULL,
  `cardio` int(11) NOT NULL,
  `cardion` decimal(8,4) NOT NULL,
  `flex` int(11) NOT NULL,
  `flexn` decimal(8,4) NOT NULL,
  `minf` int(11) NOT NULL,
  `minfn` int(11) NOT NULL,
  `abdo` int(11) NOT NULL,
  `abdom` int(11) NOT NULL,
  `ms` int(11) NOT NULL,
  `msn` int(11) NOT NULL,
  `corpo` int(11) NOT NULL,
  `corpon` decimal(8,4) NOT NULL,
  `resist` int(11) NOT NULL,
  `final` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `arq_coluna`
--

CREATE TABLE `arq_coluna` (
  `codigo` int(11) NOT NULL,
  `peso` int(11) DEFAULT NULL,
  `alonga` int(11) DEFAULT NULL,
  `dor` varchar(1) DEFAULT NULL,
  `objetos` int(11) DEFAULT NULL,
  `pontos` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `arq_corporal`
--

CREATE TABLE `arq_corporal` (
  `codigo` int(11) NOT NULL,
  `data` datetime NOT NULL,
  `torax` decimal(8,4) DEFAULT NULL,
  `cintura` decimal(8,4) DEFAULT NULL,
  `abdomen` decimal(8,4) DEFAULT NULL,
  `quadril` decimal(8,4) DEFAULT NULL,
  `bracod` decimal(8,4) DEFAULT NULL,
  `bracoe` decimal(8,4) DEFAULT NULL,
  `antebracod` decimal(8,4) DEFAULT NULL,
  `antebracoe` decimal(8,4) DEFAULT NULL,
  `coxasd` decimal(8,4) DEFAULT NULL,
  `coxase` decimal(8,4) DEFAULT NULL,
  `coxamd` decimal(8,4) DEFAULT NULL,
  `coxame` decimal(8,4) DEFAULT NULL,
  `coxaid` decimal(8,4) DEFAULT NULL,
  `coxaie` decimal(8,4) DEFAULT NULL,
  `pernad` decimal(8,4) DEFAULT NULL,
  `pernae` decimal(8,4) DEFAULT NULL,
  `punho` decimal(8,4) DEFAULT NULL,
  `cotovelo` decimal(8,4) DEFAULT NULL,
  `pescoco` decimal(8,4) DEFAULT NULL,
  `joelho` decimal(8,4) DEFAULT NULL,
  `bracoc` decimal(8,4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `arq_dataf`
--

CREATE TABLE `arq_dataf` (
  `CODIGO` int(11) NOT NULL,
  `DATA` date NOT NULL,
  `EXE1` varchar(20) DEFAULT NULL,
  `SERIE1` varchar(10) DEFAULT NULL,
  `REP1` varchar(10) DEFAULT NULL,
  `PESO1` decimal(8,4) DEFAULT NULL,
  `PAUSA1` varchar(10) DEFAULT NULL,
  `TESTE1` decimal(8,4) DEFAULT NULL,
  `REPT1` int(11) DEFAULT NULL,
  `PESOT1` decimal(8,4) DEFAULT NULL,
  `EXE2` varchar(20) DEFAULT NULL,
  `SERIE2` varchar(10) DEFAULT NULL,
  `REP2` varchar(10) DEFAULT NULL,
  `PESO2` decimal(8,4) DEFAULT NULL,
  `PAUSA2` varchar(10) DEFAULT NULL,
  `TESTE2` decimal(8,4) DEFAULT NULL,
  `REPT2` int(11) DEFAULT NULL,
  `PESOT2` decimal(8,4) DEFAULT NULL,
  `EXE3` varchar(20) DEFAULT NULL,
  `SERIE3` varchar(10) DEFAULT NULL,
  `REP3` varchar(10) DEFAULT NULL,
  `PESO3` decimal(8,4) DEFAULT NULL,
  `PAUSA3` varchar(10) DEFAULT NULL,
  `TESTE3` decimal(8,4) DEFAULT NULL,
  `REPT3` int(11) DEFAULT NULL,
  `PESOT3` decimal(8,4) DEFAULT NULL,
  `EXE4` varchar(20) DEFAULT NULL,
  `SERIE4` varchar(10) DEFAULT NULL,
  `REP4` varchar(10) DEFAULT NULL,
  `PESO4` decimal(8,4) DEFAULT NULL,
  `PAUSA4` varchar(10) DEFAULT NULL,
  `TESTE4` decimal(8,4) DEFAULT NULL,
  `REPT4` int(11) DEFAULT NULL,
  `PESOT4` decimal(8,4) DEFAULT NULL,
  `EXE5` varchar(20) DEFAULT NULL,
  `SERIE5` varchar(10) DEFAULT NULL,
  `REP5` varchar(10) DEFAULT NULL,
  `PESO5` decimal(8,4) DEFAULT NULL,
  `PAUSA5` varchar(10) DEFAULT NULL,
  `TESTE5` decimal(8,4) DEFAULT NULL,
  `REPT5` int(11) DEFAULT NULL,
  `PESOT5` decimal(8,4) DEFAULT NULL,
  `EXE6` varchar(20) DEFAULT NULL,
  `SERIE6` varchar(10) DEFAULT NULL,
  `REP6` varchar(10) DEFAULT NULL,
  `PESO6` decimal(8,4) DEFAULT NULL,
  `PAUSA6` varchar(10) DEFAULT NULL,
  `TESTE6` decimal(8,4) DEFAULT NULL,
  `REPT6` int(11) DEFAULT NULL,
  `PESOT6` decimal(8,4) DEFAULT NULL,
  `EXE7` varchar(20) DEFAULT NULL,
  `SERIE7` varchar(10) DEFAULT NULL,
  `REP7` varchar(10) DEFAULT NULL,
  `PESO7` decimal(8,4) DEFAULT NULL,
  `PAUSA7` varchar(10) DEFAULT NULL,
  `TESTE7` decimal(8,4) DEFAULT NULL,
  `REPT7` int(11) DEFAULT NULL,
  `PESOT7` decimal(8,4) DEFAULT NULL,
  `EXE8` varchar(20) DEFAULT NULL,
  `SERIE8` varchar(10) DEFAULT NULL,
  `REP8` varchar(10) DEFAULT NULL,
  `PESO8` decimal(8,4) DEFAULT NULL,
  `PAUSA8` varchar(10) DEFAULT NULL,
  `TESTE8` decimal(8,4) DEFAULT NULL,
  `REPT8` int(11) DEFAULT NULL,
  `PESOT8` decimal(8,4) DEFAULT NULL,
  `EXE9` varchar(20) DEFAULT NULL,
  `SERIE9` varchar(10) DEFAULT NULL,
  `REP9` varchar(10) DEFAULT NULL,
  `PESO9` decimal(8,4) DEFAULT NULL,
  `PAUSA9` varchar(10) DEFAULT NULL,
  `TESTE9` decimal(8,4) DEFAULT NULL,
  `REPT9` int(11) DEFAULT NULL,
  `PESOT9` decimal(8,4) DEFAULT NULL,
  `EXE10` varchar(20) DEFAULT NULL,
  `SERIE10` varchar(10) DEFAULT NULL,
  `REP10` varchar(10) DEFAULT NULL,
  `PESO10` decimal(8,4) DEFAULT NULL,
  `PAUSA10` varchar(10) DEFAULT NULL,
  `TESTE10` decimal(8,4) DEFAULT NULL,
  `REPT10` int(11) DEFAULT NULL,
  `PESOT10` decimal(8,4) DEFAULT NULL,
  `EXE11` varchar(20) DEFAULT NULL,
  `SERIE11` varchar(10) DEFAULT NULL,
  `REP11` varchar(10) DEFAULT NULL,
  `PESO11` decimal(8,4) DEFAULT NULL,
  `PAUSA11` varchar(10) DEFAULT NULL,
  `TESTE11` decimal(8,4) DEFAULT NULL,
  `REPT11` int(11) DEFAULT NULL,
  `PESOT11` decimal(8,4) DEFAULT NULL,
  `EXE12` varchar(20) DEFAULT NULL,
  `SERIE12` varchar(10) DEFAULT NULL,
  `REP12` varchar(10) DEFAULT NULL,
  `PESO12` decimal(8,4) DEFAULT NULL,
  `PAUSA12` varchar(10) DEFAULT NULL,
  `TESTE12` decimal(8,4) DEFAULT NULL,
  `REPT12` int(11) DEFAULT NULL,
  `PESOT12` decimal(8,4) DEFAULT NULL,
  `EXE13` varchar(20) DEFAULT NULL,
  `SERIE13` varchar(10) DEFAULT NULL,
  `REP13` varchar(10) DEFAULT NULL,
  `PESO13` decimal(8,4) DEFAULT NULL,
  `PAUSA13` varchar(10) DEFAULT NULL,
  `TESTE13` decimal(8,4) DEFAULT NULL,
  `REPT13` int(11) DEFAULT NULL,
  `PESOT13` decimal(8,4) DEFAULT NULL,
  `EXE14` varchar(20) DEFAULT NULL,
  `SERIE14` varchar(10) DEFAULT NULL,
  `REP14` varchar(10) DEFAULT NULL,
  `PESO14` decimal(8,4) DEFAULT NULL,
  `PAUSA14` varchar(10) DEFAULT NULL,
  `TESTE14` decimal(8,4) DEFAULT NULL,
  `REPT14` int(11) DEFAULT NULL,
  `PESOT14` decimal(8,4) DEFAULT NULL,
  `EXE15` varchar(20) DEFAULT NULL,
  `SERIE15` varchar(10) DEFAULT NULL,
  `REP15` varchar(10) DEFAULT NULL,
  `PESO15` decimal(8,4) DEFAULT NULL,
  `PAUSA15` varchar(10) DEFAULT NULL,
  `TESTE15` decimal(8,4) DEFAULT NULL,
  `REPT15` int(11) DEFAULT NULL,
  `PESOT15` decimal(8,4) DEFAULT NULL,
  `EXE16` varchar(20) DEFAULT NULL,
  `SERIE16` varchar(10) DEFAULT NULL,
  `REP16` varchar(10) DEFAULT NULL,
  `PESO16` decimal(8,4) DEFAULT NULL,
  `PAUSA16` varchar(10) DEFAULT NULL,
  `TESTE16` decimal(8,4) DEFAULT NULL,
  `REPT16` int(11) DEFAULT NULL,
  `PESOT16` decimal(8,4) DEFAULT NULL,
  `EXE17` varchar(20) DEFAULT NULL,
  `SERIE17` varchar(10) DEFAULT NULL,
  `REP17` varchar(10) DEFAULT NULL,
  `PESO17` decimal(8,4) DEFAULT NULL,
  `PAUSA17` varchar(10) DEFAULT NULL,
  `TESTE17` decimal(8,4) DEFAULT NULL,
  `REPT17` int(11) DEFAULT NULL,
  `PESOT17` decimal(8,4) DEFAULT NULL,
  `EXE18` varchar(20) DEFAULT NULL,
  `SERIE18` varchar(10) DEFAULT NULL,
  `REP18` varchar(10) DEFAULT NULL,
  `PESO18` decimal(8,4) DEFAULT NULL,
  `PAUSA18` varchar(10) DEFAULT NULL,
  `TESTE18` decimal(8,4) DEFAULT NULL,
  `REPT18` int(11) DEFAULT NULL,
  `PESOT18` decimal(8,4) DEFAULT NULL,
  `EXE19` varchar(20) DEFAULT NULL,
  `SERIE19` varchar(10) DEFAULT NULL,
  `REP19` varchar(10) DEFAULT NULL,
  `PESO19` decimal(8,4) DEFAULT NULL,
  `PAUSA19` varchar(10) DEFAULT NULL,
  `TESTE19` decimal(8,4) DEFAULT NULL,
  `REPT19` int(11) DEFAULT NULL,
  `PESOT19` decimal(8,4) DEFAULT NULL,
  `EXE20` varchar(20) DEFAULT NULL,
  `SERIE20` varchar(10) DEFAULT NULL,
  `REP20` varchar(10) DEFAULT NULL,
  `PESO20` decimal(8,4) DEFAULT NULL,
  `PAUSA20` varchar(10) DEFAULT NULL,
  `TESTE20` decimal(8,4) DEFAULT NULL,
  `REPT20` int(11) DEFAULT NULL,
  `PESOT20` decimal(8,4) DEFAULT NULL,
  `TIPO` char(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `arq_flex`
--

CREATE TABLE `arq_flex` (
  `CODIGO` int(11) NOT NULL,
  `DATA` date NOT NULL,
  `PROTOCOLO` int(11) NOT NULL,
  `FLEX` decimal(8,4) DEFAULT NULL,
  `OMBROF` int(11) DEFAULT NULL,
  `OMBROE` int(11) DEFAULT NULL,
  `OMBROAD` int(11) DEFAULT NULL,
  `OMBROADE` int(11) DEFAULT NULL,
  `OMBROAB` int(11) DEFAULT NULL,
  `OMBROMEDIAL` int(11) DEFAULT NULL,
  `OMBROLATERAL` int(11) DEFAULT NULL,
  `COTOVELOF` int(11) DEFAULT NULL,
  `COTOVELOFE` int(11) DEFAULT NULL,
  `COTOVELOE` int(11) DEFAULT NULL,
  `COTOVELOEE` int(11) DEFAULT NULL,
  `RADIOULNARP` int(11) DEFAULT NULL,
  `RADIOULNARS` int(11) DEFAULT NULL,
  `PUNHOF` int(11) DEFAULT NULL,
  `PUNHOFE` int(11) DEFAULT NULL,
  `PUNHOE` int(11) DEFAULT NULL,
  `PUNHOEE` int(11) DEFAULT NULL,
  `PUNHOAD` int(11) DEFAULT NULL,
  `PUNHOAB` int(11) DEFAULT NULL,
  `ANTEBSP` int(11) DEFAULT NULL,
  `QUADRILF` int(11) DEFAULT NULL,
  `QUADRILFE` int(11) DEFAULT NULL,
  `QUADRILE` int(11) DEFAULT NULL,
  `QUADRILEE` int(11) DEFAULT NULL,
  `QUADRILAD` int(11) DEFAULT NULL,
  `QUADRILADE` int(11) DEFAULT NULL,
  `QUADRILAB` int(11) DEFAULT NULL,
  `QUADRILABE` int(11) DEFAULT NULL,
  `QUADRILMEDIAL` int(11) DEFAULT NULL,
  `QUADRILLATERAL` int(11) DEFAULT NULL,
  `JOELHOF` int(11) DEFAULT NULL,
  `JOELHOFE` int(11) DEFAULT NULL,
  `JOELHOE` int(11) DEFAULT NULL,
  `JOELHOEE` int(11) DEFAULT NULL,
  `TORNOZELOD` int(11) DEFAULT NULL,
  `TORNOZELOP` int(11) DEFAULT NULL,
  `TORNOZELOAD` int(11) DEFAULT NULL,
  `TORNOZELOAB` int(11) DEFAULT NULL,
  `CERVICALF` int(11) DEFAULT NULL,
  `CERVICALE` int(11) DEFAULT NULL,
  `CERVICALL` int(11) DEFAULT NULL,
  `CERVICALR` int(11) DEFAULT NULL,
  `LOMBARF` int(11) DEFAULT NULL,
  `LOMBARE` int(11) DEFAULT NULL,
  `LOMBARL` int(11) DEFAULT NULL,
  `LOMBARR` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `arq_grafa`
--

CREATE TABLE `arq_grafa` (
  `CODIGO` int(11) NOT NULL,
  `DATA` datetime NOT NULL,
  `PROTOCOLO` char(1) NOT NULL,
  `TEMPO` int(11) NOT NULL,
  `FC` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `arq_grafvo2`
--

CREATE TABLE `arq_grafvo2` (
  `codigo` int(11) NOT NULL,
  `data` datetime NOT NULL,
  `protocolo` int(11) NOT NULL,
  `tempo` int(11) NOT NULL,
  `fc` int(11) NOT NULL,
  `segundo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `arq_licenses`
--

CREATE TABLE `arq_licenses` (
  `id` int(11) NOT NULL,
  `designation` varchar(50) NOT NULL,
  `description` varchar(255) NOT NULL,
  `initials` varchar(5) NOT NULL,
  `maxstudents` int(11) NOT NULL,
  `duration` int(11) NOT NULL,
  `price` decimal(8,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `arq_licenses`
--

INSERT INTO `arq_licenses` (`id`, `designation`, `description`, `initials`, `maxstudents`, `duration`, `price`) VALUES
(1, 'Free PT', 'Licença para PT gratuita. Limitada a 3 alunos.', 'PTFre', 3, 12, '0.00'),
(2, 'Free GYM', 'Licença para Ginasios gratuita. Limitada a 1 PT e 3 alunos.', 'PTFre', 3, 12, '0.00'),
(3, 'Gisnasio 5 PT10', 'Licença anual para Ginasios. Limitada a 5 PT e 10 alunos.', 'PTFre', 3, 12, '50.00');

-- --------------------------------------------------------

--
-- Estrutura da tabela `arq_morfo`
--

CREATE TABLE `arq_morfo` (
  `CODIGO` int(11) NOT NULL,
  `DATA` date NOT NULL,
  `TANITA` decimal(8,4) DEFAULT NULL,
  `PROTOCOLO` int(11) NOT NULL,
  `TRICIPTAL` decimal(8,4) DEFAULT NULL,
  `BICIPITAL` decimal(8,4) DEFAULT NULL,
  `SUBESCAPULAR` decimal(8,4) DEFAULT NULL,
  `PEITORAL` decimal(8,4) DEFAULT NULL,
  `AXILAR` decimal(8,4) DEFAULT NULL,
  `SUPRAILIACA` decimal(8,4) DEFAULT NULL,
  `ABDOMINAL` decimal(8,4) DEFAULT NULL,
  `CRURAL` decimal(8,4) DEFAULT NULL,
  `GEMINAL` decimal(8,4) DEFAULT NULL,
  `C_XTOT` decimal(8,4) DEFAULT NULL,
  `C_XTRI` decimal(8,4) DEFAULT NULL,
  `C_XBI` decimal(8,4) DEFAULT NULL,
  `C_XSUB` decimal(8,4) DEFAULT NULL,
  `C_XPEITO` decimal(8,4) DEFAULT NULL,
  `C_XAXILA` decimal(8,4) DEFAULT NULL,
  `C_XSUPRA` decimal(8,4) DEFAULT NULL,
  `C_XABDOMEN` decimal(8,4) DEFAULT NULL,
  `C_XGEMINAL` decimal(8,4) DEFAULT NULL,
  `C_XCRU` decimal(8,4) DEFAULT NULL,
  `C_XGORDA` decimal(8,4) DEFAULT NULL,
  `C_XMAGRA` decimal(8,4) DEFAULT NULL,
  `C_XIDADE` decimal(8,4) DEFAULT NULL,
  `C_XPESO` decimal(8,4) DEFAULT NULL,
  `C_XLIVREGORDURA` decimal(8,4) DEFAULT NULL,
  `C_XPESOGORDO` decimal(8,4) DEFAULT NULL,
  `C_XPESORESID` decimal(8,4) DEFAULT NULL,
  `C_XPESOOSSEO` decimal(8,4) DEFAULT NULL,
  `C_XPESOMUSCULAR` decimal(8,4) DEFAULT NULL,
  `C_XMEDIA` decimal(8,4) DEFAULT NULL,
  `C_XCLASSE` varchar(15) DEFAULT NULL,
  `C_PERCG` decimal(8,4) DEFAULT NULL,
  `PANTURRILHA_MEDIAL` decimal(8,4) DEFAULT NULL,
  `TAXA_METABOLICA_BASAL` int(11) DEFAULT NULL,
  `RESISTENCIA` int(11) DEFAULT NULL,
  `REACTANCIA` int(11) DEFAULT NULL,
  `ESTRUTURA_OSSEA` decimal(8,4) DEFAULT NULL,
  `PESO_DESEJADO` decimal(8,4) DEFAULT NULL,
  `NIVEL_ATIVIDADE_FISICA` int(11) DEFAULT NULL,
  `AGUA_CORPORAL_TOTAL` decimal(8,4) DEFAULT NULL,
  `IMPEDANCIA` decimal(8,4) DEFAULT NULL,
  `GORDURA_VISCERAL` decimal(8,4) DEFAULT NULL,
  `MASSA_GORDA` decimal(8,4) DEFAULT NULL,
  `MASSA_MAGRA` decimal(8,4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `arq_parq`
--

CREATE TABLE `arq_parq` (
  `codigo` int(11) NOT NULL,
  `parq1` char(1) NOT NULL,
  `parq2` char(1) NOT NULL,
  `parq3` char(1) NOT NULL,
  `parq4` char(1) NOT NULL,
  `parq5` char(1) NOT NULL,
  `parq6` char(1) NOT NULL,
  `parq7` char(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `arq_postural`
--

CREATE TABLE `arq_postural` (
  `CODIGO` int(11) NOT NULL,
  `DATA` date NOT NULL,
  `VACABI` char(1) DEFAULT NULL,
  `VACABR` char(1) DEFAULT NULL,
  `VAOMBRO` char(1) DEFAULT NULL,
  `VAOMBRODESN` char(1) DEFAULT NULL,
  `VAQUADRIL` char(1) DEFAULT NULL,
  `VAJOELHO` char(1) DEFAULT NULL,
  `VAPE` char(1) DEFAULT NULL,
  `VLCAB` char(1) DEFAULT NULL,
  `VLCERVICAL` char(1) DEFAULT NULL,
  `VLOMBRO` char(1) DEFAULT NULL,
  `VLDORSAL` char(1) DEFAULT NULL,
  `VLLOMBAR` char(1) DEFAULT NULL,
  `VLQUADRIL` char(1) DEFAULT NULL,
  `VLJOELHO` char(1) DEFAULT NULL,
  `VLPE` char(1) DEFAULT NULL,
  `VPCAB` char(1) DEFAULT NULL,
  `VPESC` char(1) DEFAULT NULL,
  `VPOMBRO` char(1) DEFAULT NULL,
  `VPOMBRODESN` char(1) DEFAULT NULL,
  `VPDORSAL` char(1) DEFAULT NULL,
  `VPLOMBAR` char(1) DEFAULT NULL,
  `VPQUADRIL` char(1) DEFAULT NULL,
  `VPJOELHO` char(1) DEFAULT NULL,
  `VPPE` char(1) DEFAULT NULL,
  `VLCPLANO` char(1) DEFAULT NULL,
  `VLPROTUSAO` char(1) DEFAULT NULL,
  `VPTHALESD` char(1) DEFAULT NULL,
  `VPTHALESE` char(1) DEFAULT NULL,
  `VPESCAD` char(1) DEFAULT NULL,
  `VPESCAL` char(1) DEFAULT NULL,
  `SERIEF` varchar(10) DEFAULT NULL,
  `REPF` varchar(10) DEFAULT NULL,
  `TECF` varchar(20) DEFAULT NULL,
  `GEMEOSF` char(3) DEFAULT NULL,
  `TIBIAF` char(3) DEFAULT NULL,
  `ISQUIOF` char(3) DEFAULT NULL,
  `QUADRILF` char(3) DEFAULT NULL,
  `ADUF` char(3) DEFAULT NULL,
  `ABDUF` char(3) DEFAULT NULL,
  `FLEXQF` char(3) DEFAULT NULL,
  `GLUTEOF` char(3) DEFAULT NULL,
  `LOMBARF` char(3) DEFAULT NULL,
  `COLF` char(3) DEFAULT NULL,
  `DORSALF` char(3) DEFAULT NULL,
  `OMOF` char(3) DEFAULT NULL,
  `CERVICALF` char(3) DEFAULT NULL,
  `ABDOF` char(3) DEFAULT NULL,
  `PEITOF` char(3) DEFAULT NULL,
  `OMBROF` char(3) DEFAULT NULL,
  `BIF` char(3) DEFAULT NULL,
  `TRIF` char(3) DEFAULT NULL,
  `ROTAF` char(3) DEFAULT NULL,
  `SERRAF` char(3) DEFAULT NULL,
  `SERIEA` varchar(10) DEFAULT NULL,
  `DURAA` varchar(10) DEFAULT NULL,
  `TECA` varchar(20) DEFAULT NULL,
  `TENDAOA` char(3) DEFAULT NULL,
  `GEMEOSA` char(3) DEFAULT NULL,
  `ISQUIOA` char(3) DEFAULT NULL,
  `ADUA` char(3) DEFAULT NULL,
  `ABDUA` char(3) DEFAULT NULL,
  `ROTAA` char(3) DEFAULT NULL,
  `QUADRILA` char(3) DEFAULT NULL,
  `FLEXQA` char(3) DEFAULT NULL,
  `GLUTEOA` char(3) DEFAULT NULL,
  `LOMBARA` char(3) DEFAULT NULL,
  `DORSALA` char(3) DEFAULT NULL,
  `CERVICALA` char(3) DEFAULT NULL,
  `OMBROA` char(3) DEFAULT NULL,
  `PEITOA` char(3) DEFAULT NULL,
  `BIA` char(3) DEFAULT NULL,
  `TRIA` char(3) DEFAULT NULL,
  `REPC` varchar(10) DEFAULT NULL,
  `TEMPOC` varchar(10) DEFAULT NULL,
  `CERVICALC` char(3) DEFAULT NULL,
  `BRACOC` char(3) DEFAULT NULL,
  `QUADRILC` char(3) DEFAULT NULL,
  `DEITADOC` char(3) DEFAULT NULL,
  `SENTADOC` char(3) DEFAULT NULL,
  `CERVICALM` char(3) DEFAULT NULL,
  `OMBROM` char(3) DEFAULT NULL,
  `QUADRILM` char(3) DEFAULT NULL,
  `FOTOA` varchar(255) DEFAULT NULL,
  `FOTOL` varchar(255) DEFAULT NULL,
  `FOTOP` varchar(255) DEFAULT NULL,
  `OBS` varchar(2000) DEFAULT NULL,
  `MEMBRO_SUPERIOR_DIREITO` varchar(1) DEFAULT NULL,
  `MEMBRO_SUPERIOR_ESQUERDO` varchar(1) DEFAULT NULL,
  `ROTACAO_TRONCO` varchar(1) DEFAULT NULL,
  `QUADRIL` varchar(1) DEFAULT NULL,
  `LATERALIDADE` varchar(1) DEFAULT NULL,
  `CARGA_PESO` varchar(1) DEFAULT NULL,
  `ROTACAO_TRONCO_VA` varchar(1) DEFAULT NULL,
  `ALTURA_CRISTAS_ILIACAS_VA` varchar(1) DEFAULT NULL,
  `ESCAPULA_ALADA_LADO` varchar(1) DEFAULT NULL,
  `PREGA_GLUTEA` varchar(1) DEFAULT NULL,
  `ESCAPULAS_MAISALTA_VP` varchar(1) DEFAULT NULL,
  `ESCAPULAS_SIMETRICAS_VP` varchar(1) DEFAULT NULL,
  `ESCAPULAS_ASSIMETRICAS_VP` varchar(1) DEFAULT NULL,
  `GIBOSIDADE_TORACICA` varchar(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `arq_quest`
--

CREATE TABLE `arq_quest` (
  `CODIGO` int(11) NOT NULL,
  `Q11` char(1) DEFAULT NULL,
  `Q12` char(1) DEFAULT NULL,
  `Q13` char(1) DEFAULT NULL,
  `Q14` char(1) DEFAULT NULL,
  `Q15` char(1) DEFAULT NULL,
  `Q16` char(1) DEFAULT NULL,
  `Q17` char(1) DEFAULT NULL,
  `Q18` char(1) DEFAULT NULL,
  `Q19` char(1) DEFAULT NULL,
  `Q19RESP` varchar(30) DEFAULT NULL,
  `Q2A` char(1) DEFAULT NULL,
  `Q20` char(1) DEFAULT NULL,
  `Q201` char(1) DEFAULT NULL,
  `Q1OBJ` char(1) DEFAULT NULL,
  `Q2AQ` varchar(40) DEFAULT NULL,
  `Q2AA` varchar(40) DEFAULT NULL,
  `Q2AASN` char(1) DEFAULT NULL,
  `Q2B` char(1) DEFAULT NULL,
  `Q2AAFATOR` varchar(40) DEFAULT NULL,
  `Q2BQ` varchar(40) DEFAULT NULL,
  `Q2BL` varchar(40) DEFAULT NULL,
  `Q2C` char(1) DEFAULT NULL,
  `Q2BLSN` char(1) DEFAULT NULL,
  `Q2CQ` varchar(40) DEFAULT NULL,
  `Q2BLTIPO` char(1) DEFAULT NULL,
  `Q31` char(1) DEFAULT NULL,
  `Q2CFIM` varchar(40) DEFAULT NULL,
  `Q32` char(1) DEFAULT NULL,
  `Q33` char(1) DEFAULT NULL,
  `Q2DTIPO` char(2) DEFAULT NULL,
  `Q3Q` varchar(40) DEFAULT NULL,
  `Q2ERH` char(1) DEFAULT NULL,
  `Q31Q` varchar(40) DEFAULT NULL,
  `Q4ATEMPO` varchar(40) DEFAULT NULL,
  `Q32Q` varchar(40) DEFAULT NULL,
  `Q4AE` char(1) DEFAULT NULL,
  `Q4APAROU` varchar(40) DEFAULT NULL,
  `Q34RESP` varchar(40) DEFAULT NULL,
  `Q33Q` varchar(40) DEFAULT NULL,
  `Q4B` char(1) DEFAULT NULL,
  `Q34` char(1) DEFAULT NULL,
  `Q4ATA` int(11) DEFAULT NULL,
  `Q4ATM` int(11) DEFAULT NULL,
  `Q4BDATA` varchar(40) DEFAULT NULL,
  `Q4APA` int(11) DEFAULT NULL,
  `Q34Q` varchar(40) DEFAULT NULL,
  `Q4C` int(11) DEFAULT NULL,
  `Q4APM` int(11) DEFAULT NULL,
  `Q4D1` char(1) DEFAULT NULL,
  `Q4BB` char(1) DEFAULT NULL,
  `Q4BBTIPO` char(1) DEFAULT NULL,
  `Q4BBTEMPO` varchar(40) DEFAULT NULL,
  `Q4E` char(1) DEFAULT NULL,
  `Q4ETIPO` varchar(40) DEFAULT NULL,
  `Q4BBVEZES` int(11) DEFAULT NULL,
  `Q4EPROF` char(1) DEFAULT NULL,
  `Q4BBA` int(11) DEFAULT NULL,
  `Q4BBM` int(11) DEFAULT NULL,
  `Q4ENOME` varchar(40) DEFAULT NULL,
  `Q4ECONTATO` varchar(40) DEFAULT NULL,
  `Q51` char(1) DEFAULT NULL,
  `Q4D2` char(1) DEFAULT NULL,
  `Q52` char(1) DEFAULT NULL,
  `Q4D3` char(1) DEFAULT NULL,
  `Q53` char(1) DEFAULT NULL,
  `Q54` char(1) DEFAULT NULL,
  `Q55` char(1) DEFAULT NULL,
  `Q56` char(1) DEFAULT NULL,
  `Q57` char(1) DEFAULT NULL,
  `Q58` char(1) DEFAULT NULL,
  `Q59` char(1) DEFAULT NULL,
  `Q510` char(1) DEFAULT NULL,
  `Q511` char(1) DEFAULT NULL,
  `Q511RESP` varchar(40) DEFAULT NULL,
  `Q6` char(1) DEFAULT NULL,
  `Q6TEMPO` varchar(40) DEFAULT NULL,
  `Q510T` char(1) DEFAULT NULL,
  `Q510TC` char(1) DEFAULT NULL,
  `Q510TD` char(1) DEFAULT NULL,
  `Q510TL` char(1) DEFAULT NULL,
  `Q6TA` int(11) DEFAULT NULL,
  `Q6TM` int(11) DEFAULT NULL,
  `Q6CAT` char(1) DEFAULT NULL,
  `Q3OBS` varchar(400) DEFAULT NULL,
  `QEST` char(1) DEFAULT NULL,
  `Q10OBS` varchar(40) DEFAULT NULL,
  `Q21OBS` varchar(400) DEFAULT NULL,
  `Q22OBS` varchar(400) DEFAULT NULL,
  `Q23OBS` varchar(400) DEFAULT NULL,
  `Q24OBS` varchar(400) DEFAULT NULL,
  `Q25OBS` varchar(400) DEFAULT NULL,
  `Q26OBS` varchar(400) DEFAULT NULL,
  `Q27OBS` varchar(40) DEFAULT NULL,
  `Q41OBS` varchar(400) DEFAULT NULL,
  `Q42OBS` varchar(400) DEFAULT NULL,
  `Q43OBS` varchar(400) DEFAULT NULL,
  `Q44OBS` varchar(400) DEFAULT NULL,
  `Q45OBS` varchar(400) DEFAULT NULL,
  `Q46OBS` varchar(400) DEFAULT NULL,
  `Q5OBS` varchar(400) DEFAULT NULL,
  `OBJECTIVO` varchar(40) DEFAULT NULL,
  `DT_OBJ` date DEFAULT NULL,
  `INTERESSE` int(11) DEFAULT NULL,
  `ALCANCA` int(11) DEFAULT NULL,
  `DEPENDE` int(11) DEFAULT NULL,
  `ANTES` char(1) DEFAULT NULL,
  `CRITERIOS` varchar(100) DEFAULT NULL,
  `Q31QTDE` int(11) DEFAULT NULL,
  `Q32QTDE` int(11) DEFAULT NULL,
  `Q33QTDE` int(11) DEFAULT NULL,
  `Q34QTDE` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `arq_rdc`
--

CREATE TABLE `arq_rdc` (
  `codigo` int(11) NOT NULL,
  `qtas` int(11) NOT NULL,
  `qtad` int(11) NOT NULL,
  `lsc` int(11) NOT NULL,
  `lsf` int(11) NOT NULL,
  `lst` int(11) NOT NULL,
  `lsg` int(11) NOT NULL,
  `gc` int(11) NOT NULL,
  `st` char(1) NOT NULL,
  `af50` int(11) NOT NULL,
  `hf` int(11) NOT NULL,
  `diabetes` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `arq_testf`
--

CREATE TABLE `arq_testf` (
  `codigo` int(11) NOT NULL,
  `data` int(11) NOT NULL,
  `flex` decimal(8,4) NOT NULL,
  `protocolo` int(11) NOT NULL,
  `flexb` int(11) NOT NULL,
  `abdominal` int(11) NOT NULL,
  `agachamento` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `arq_types`
--

CREATE TABLE `arq_types` (
  `id` int(11) NOT NULL,
  `designation` varchar(50) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `initials` varchar(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `arq_types`
--

INSERT INTO `arq_types` (`id`, `designation`, `description`, `initials`) VALUES
(3, 'PT', 'Conta de PT', 'PT'),
(4, 'Ginasio', 'Ginasios que podem criar PT e associar á sua conta', 'GYM'),
(5, 'Ginasio Personal Trainer', 'PT que estão associados um ginasio', 'PTG');

-- --------------------------------------------------------

--
-- Estrutura da tabela `arq_vo2`
--

CREATE TABLE `arq_vo2` (
  `CODIGO` int(11) NOT NULL,
  `DATA` date NOT NULL,
  `PROTOCOLO` int(11) NOT NULL,
  `MINUTO` int(11) DEFAULT NULL,
  `FC` int(11) DEFAULT NULL,
  `SEGUNDO` int(11) DEFAULT NULL,
  `FC2` int(11) DEFAULT NULL,
  `DISTANCIA` int(11) DEFAULT NULL,
  `CARGA` int(11) DEFAULT NULL,
  `MIN0` int(11) NOT NULL DEFAULT '0',
  `MIN2` int(11) NOT NULL DEFAULT '0',
  `MIN4` int(11) NOT NULL DEFAULT '0',
  `MIN6` int(11) NOT NULL DEFAULT '0',
  `MIN8` int(11) NOT NULL DEFAULT '0',
  `MIN10` int(11) NOT NULL DEFAULT '0',
  `MIN12` int(11) NOT NULL DEFAULT '0',
  `MIN14` int(11) NOT NULL DEFAULT '0',
  `MIN16` int(11) NOT NULL DEFAULT '0',
  `MIN18` int(11) NOT NULL DEFAULT '0',
  `MIN20` int(11) NOT NULL DEFAULT '0',
  `C_FCMAX` decimal(8,4) DEFAULT NULL,
  `C_FCRESERVA` decimal(8,4) DEFAULT NULL,
  `C_FCTESTE` decimal(8,4) DEFAULT NULL,
  `C_VM` decimal(8,4) DEFAULT NULL,
  `C_TEMPO` varchar(5) DEFAULT NULL,
  `C_VO2M` decimal(8,4) DEFAULT NULL,
  `C_VO2E` decimal(8,4) DEFAULT NULL,
  `C_FAI` decimal(8,4) DEFAULT NULL,
  `C_CLASSEFAI` varchar(50) DEFAULT NULL,
  `C_2` int(11) DEFAULT NULL,
  `C_3` int(11) DEFAULT NULL,
  `C_4` int(11) DEFAULT NULL,
  `DESCRICAO` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `cad_aluno`
--

CREATE TABLE `cad_aluno` (
  `id` int(11) NOT NULL,
  `entity` int(11) NOT NULL,
  `NOME` varchar(50) DEFAULT NULL,
  `SEXO` char(1) DEFAULT NULL,
  `DT_NASC` date DEFAULT NULL,
  `IDADE` int(11) DEFAULT NULL,
  `TELEMOVEL` varchar(30) DEFAULT NULL,
  `TELEFONE` varchar(30) DEFAULT NULL,
  `FAX` varchar(30) DEFAULT NULL,
  `EMAIL` varchar(40) DEFAULT NULL,
  `MORADA` varchar(50) DEFAULT NULL,
  `LOCALIDADE` varchar(40) DEFAULT NULL,
  `CP` varchar(9) DEFAULT NULL,
  `PROFISSAO` varchar(30) DEFAULT NULL,
  `DT_AVALIACAO` date DEFAULT NULL,
  `AVALIADOR` varchar(50) DEFAULT NULL,
  `TAMAX` decimal(8,3) DEFAULT NULL,
  `TAMIN` decimal(8,3) DEFAULT NULL,
  `FC` decimal(8,3) DEFAULT NULL,
  `IMC` decimal(8,3) DEFAULT NULL,
  `GRUPO` char(1) DEFAULT NULL,
  `SUBGRUPO` int(11) DEFAULT NULL,
  `TREINOS` int(11) DEFAULT NULL,
  `DT_PREVISTA` date DEFAULT NULL,
  `OBJETIVO` int(11) DEFAULT NULL,
  `ATIVIDADE` int(11) DEFAULT NULL,
  `FUMANTE` char(1) DEFAULT NULL,
  `QTOS` int(11) DEFAULT NULL,
  `AFS` int(11) DEFAULT NULL,
  `NAFS` char(1) DEFAULT NULL,
  `CLASSE` char(1) DEFAULT NULL,
  `ALTURA` decimal(8,3) DEFAULT NULL,
  `PESO` decimal(8,3) DEFAULT NULL,
  `ENVERGADURA` decimal(8,3) DEFAULT NULL,
  `TMB` decimal(8,3) DEFAULT NULL,
  `BRACO` decimal(8,3) DEFAULT NULL,
  `PERCGD` decimal(8,3) DEFAULT NULL,
  `JOELHO` decimal(8,3) DEFAULT NULL,
  `COTOVELO` decimal(8,3) DEFAULT NULL,
  `TRICPES` decimal(8,3) DEFAULT NULL,
  `SUBESCAPULAR` decimal(8,3) DEFAULT NULL,
  `GEMINAL` decimal(8,3) DEFAULT NULL,
  `SUPRAILIACA` decimal(8,3) DEFAULT NULL,
  `PERNA` decimal(8,3) DEFAULT NULL,
  `ABDOMEN` decimal(8,3) DEFAULT NULL,
  `QUADRIL` decimal(8,3) DEFAULT NULL,
  `TESTE_LASEGUE` varchar(1) DEFAULT NULL,
  `TESTE_THOMAS` varchar(1) DEFAULT NULL,
  `TESTE_OBER` varchar(1) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `lastaccess` datetime DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `cad_aluno`
--

INSERT INTO `cad_aluno` (`id`, `entity`, `NOME`, `SEXO`, `DT_NASC`, `IDADE`, `TELEMOVEL`, `TELEFONE`, `FAX`, `EMAIL`, `MORADA`, `LOCALIDADE`, `CP`, `PROFISSAO`, `DT_AVALIACAO`, `AVALIADOR`, `TAMAX`, `TAMIN`, `FC`, `IMC`, `GRUPO`, `SUBGRUPO`, `TREINOS`, `DT_PREVISTA`, `OBJETIVO`, `ATIVIDADE`, `FUMANTE`, `QTOS`, `AFS`, `NAFS`, `CLASSE`, `ALTURA`, `PESO`, `ENVERGADURA`, `TMB`, `BRACO`, `PERCGD`, `JOELHO`, `COTOVELO`, `TRICPES`, `SUBESCAPULAR`, `GEMINAL`, `SUPRAILIACA`, `PERNA`, `ABDOMEN`, `QUADRIL`, `TESTE_LASEGUE`, `TESTE_THOMAS`, `TESTE_OBER`, `password`, `token`, `lastaccess`, `active`) VALUES
(6, 2, 'Jeremi Mutter', 'M', '1967-09-14', 37, NULL, '226102005', NULL, 'jezmutter@hotmail.com', 'R. Henrique Lopes Mendonça, 267/21', 'Pinhais da Foz', NULL, 'teacher', '2005-09-01', 'Tuba', '84.000', '159.000', '71.000', '26.580', NULL, NULL, 3, '2005-09-02', NULL, NULL, 'E', 2, 3, '3', '1', '1.750', '81.400', '1.720', '1727.750', '32.700', '14.000', '7.200', '4.600', '10.500', '13.100', '7.500', '12.200', '37.000', '94.500', '102.000', NULL, NULL, NULL, NULL, NULL, NULL, 1),
(7, 1, 'Manuel Andrade', 'M', '1953-01-17', 52, '961939404', NULL, NULL, 'monteiro.andrade@sapo.pt', 'R. Brito Capelo, 1300, 4º tras', 'Matosinhos', NULL, 'Engenheiro Civil', '2005-09-01', 'Tuba', '82.000', '124.000', '60.000', '27.544', NULL, NULL, 3, '2005-09-01', NULL, NULL, 'N', 0, 1, '1', '0', '1.660', '75.900', '1.650', '1535.250', '35.500', '18.000', '8.100', '5.200', '12.500', '20.800', '11.400', '12.500', '37.500', '94.500', '98.000', NULL, NULL, NULL, NULL, NULL, NULL, 1),
(8, 1, 'Inês Faria Garcês da Cunha', 'F', '1981-03-03', 25, '966702321', NULL, NULL, 'ines_garces@hotmail.com', 'R. D. afonso II, 70', 'Coimbra', NULL, 'Economista', '2005-09-01', 'Tuba', '66.000', '108.000', '77.000', '20.672', NULL, NULL, 3, '2005-09-01', NULL, NULL, 'N', 0, 0, '1', '0', '1.650', '60.600', '1.620', '1293.750', '26.000', '18.000', '9.300', '6.100', '20.500', '12.000', '19.500', '14.500', '36.000', '65.300', '90.000', NULL, NULL, NULL, NULL, NULL, NULL, 1),
(10, 1, 'José Ricardo Monteiro', 'M', '1989-06-13', 16, '912289172', NULL, NULL, 'zericardo_monteiro@hotmail.com', 'R. Diogo Afonso, 71/54', 'Porto', NULL, 'Estudante', '2005-09-05', 'Tuba', '80.000', '133.000', '95.000', '20.976', NULL, NULL, 4, '2005-09-06', NULL, NULL, 'S', 5, 2, '3', '1', '1.670', '58.500', '1.650', '1547.500', '30.300', '10.000', '9.000', '6.700', '8.000', '9.200', '8.000', '4.600', '35.000', '71.000', '84.000', NULL, NULL, NULL, NULL, NULL, NULL, 1),
(13, 1, 'Manuel  Monteiro', 'M', '1971-08-09', 34, '968902860', NULL, NULL, 'diverparts.m@mail.telepac.pt', 'R. do Crasto, 315-1ºd', 'Porto', NULL, 'Administrador de Empresas', '2005-09-05', 'Tuba', '83.000', '137.000', '67.000', '28.089', NULL, NULL, 2, NULL, NULL, NULL, 'S', 20, NULL, '1', '0', '1.790', '90.000', '1.770', '1853.750', '0.000', '0.000', '0.000', '0.000', '0.000', '0.000', '0.000', '0.000', '0.000', '0.000', '0.000', NULL, NULL, NULL, NULL, NULL, NULL, 1),
(14, 1, 'Sabrina Bellini', 'F', '1982-02-26', 23, '932621982', NULL, NULL, NULL, 'R. das Laranjeiras, 191/F', 'Porto', NULL, 'Moda', '2005-09-05', 'Tuba', '64.000', '101.000', '72.000', '21.948', NULL, NULL, 5, '2005-09-06', NULL, NULL, 'N', 0, 1, '1', '0', '1.620', '57.600', '1.600', '1312.500', '28.000', '14.000', '7.000', '4.200', '17.500', '16.500', '17.400', '15.800', '34.000', '69.000', '97.000', NULL, NULL, NULL, NULL, NULL, NULL, 1),
(15, 1, 'Susana Lima', 'F', '1981-04-06', 24, '966488661', NULL, NULL, 'susana_lima@hotmail.com', 'R. Estevão Gomes, 25 1ºD', 'Porto', NULL, 'Bancária', '2005-09-05', 'Tuba', '84.000', '139.000', '67.000', '18.733', NULL, NULL, 3, '2005-09-05', NULL, NULL, 'S', 15, 1, '1', '0', '1.650', '51.000', '1.600', '1254.000', '0.000', '18.000', '0.000', '0.000', '0.000', '0.000', '0.000', '0.000', '0.000', '64.000', '89.000', NULL, NULL, NULL, NULL, NULL, NULL, 1),
(16, 1, 'Nuno Oliveira', 'M', '1975-05-20', 30, '961491660', NULL, NULL, NULL, 'R. Alto da Vila, 215', 'Porto', NULL, 'Gestor Bancário', '2005-09-06', 'Tuba', '87.000', '139.000', '68.000', '25.062', NULL, NULL, 3, '2005-09-07', NULL, NULL, 'S', 40, 1, '1', '0', '1.800', '81.200', '1.800', '1792.000', '34.000', '16.000', '9.200', '6.200', '18.000', '19.700', '6.500', '14.000', '39.000', '86.500', '102.000', NULL, NULL, NULL, NULL, NULL, NULL, 1),
(17, 1, 'Carla Pinto', 'F', '1972-04-30', 33, '966662751', NULL, NULL, 'carlasofiapinto@sapo.pt', 'R.Reu de Pina, torre 70, 12º D', 'Porto', NULL, 'Desempregada', '2005-09-05', 'Tuba', '77.000', '116.000', '75.000', '25.673', NULL, NULL, NULL, NULL, NULL, NULL, 'S', 20, 0, NULL, NULL, '1.670', '71.600', '1.650', '1427.500', '0.000', '0.000', '0.000', '0.000', '0.000', '0.000', '0.000', '0.000', '0.000', '0.000', '0.000', NULL, NULL, NULL, NULL, NULL, NULL, 1),
(18, 1, 'Hugo Lucas', 'M', '1984-08-10', 21, '938660121', NULL, NULL, NULL, 'Rua da Arrábida, 440', 'Porto', NULL, 'Eletricista', '2005-09-02', 'Tuba', '70.000', '120.000', '68.000', '24.419', NULL, NULL, 3, '2005-09-02', NULL, NULL, 'N', 0, 1, '1', '0', '1.810', '80.000', '1.800', '1831.250', '0.000', '0.000', '0.000', '0.000', '0.000', '0.000', '0.000', '0.000', '0.000', '0.000', '0.000', NULL, NULL, NULL, NULL, NULL, NULL, 1),
(19, 1, 'Carla Santos', 'F', '1989-11-21', 15, NULL, '917212795', NULL, 'carlasantos547@hotmail.com', 'R. do Campo Alegre, 1607- 6º Dt', 'Porto', NULL, 'Estudante', '2005-09-06', 'Henrique', '54.000', '109.000', '81.000', '23.359', NULL, NULL, 3, NULL, NULL, NULL, 'N', 0, 1, '1', '0', '1.600', '59.800', '1.590', '1362.000', '30.700', '18.000', '8.700', '5.400', '24.000', '17.500', '0.000', '25.000', '35.200', '74.000', '94.000', NULL, NULL, NULL, NULL, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `cad_aluno_`
--

CREATE TABLE `cad_aluno_` (
  `CODIGO` int(11) NOT NULL,
  `NOME` varchar(50) DEFAULT NULL,
  `MORADA` varchar(50) DEFAULT NULL,
  `LOCALIDADE` varchar(40) DEFAULT NULL,
  `TAMAX` decimal(8,4) DEFAULT NULL,
  `TELEFONE` varchar(30) DEFAULT NULL,
  `TAMIN` decimal(8,4) DEFAULT NULL,
  `TELEMOVEL` varchar(30) DEFAULT NULL,
  `FAX` varchar(30) DEFAULT NULL,
  `FC` decimal(8,4) DEFAULT NULL,
  `IMC` decimal(8,4) DEFAULT NULL,
  `DT_NASC` date DEFAULT NULL,
  `SEXO` char(1) DEFAULT NULL,
  `IDADE` int(11) DEFAULT NULL,
  `EMAIL` varchar(40) DEFAULT NULL,
  `DT_AVALIACAO` date DEFAULT NULL,
  `GRUPO` char(1) DEFAULT NULL,
  `SUBGRUPO` int(11) DEFAULT NULL,
  `TREINOS` int(11) DEFAULT NULL,
  `DT_PREVISTA` date DEFAULT NULL,
  `PROFISSAO` varchar(30) DEFAULT NULL,
  `OBJETIVO` int(11) DEFAULT NULL,
  `ATIVIDADE` int(11) DEFAULT NULL,
  `FUMANTE` char(1) DEFAULT NULL,
  `QTOS` int(11) DEFAULT NULL,
  `AFS` int(11) DEFAULT NULL,
  `NAFS` char(1) DEFAULT NULL,
  `CLASSE` char(1) DEFAULT NULL,
  `ALTURA` decimal(8,4) DEFAULT NULL,
  `PESO` decimal(8,4) DEFAULT NULL,
  `ENVERGADURA` decimal(8,4) DEFAULT NULL,
  `TMB` decimal(8,4) DEFAULT NULL,
  `BRACO` decimal(8,4) DEFAULT NULL,
  `PERCGD` decimal(8,4) DEFAULT NULL,
  `JOELHO` decimal(8,4) DEFAULT NULL,
  `COTOVELO` decimal(8,4) DEFAULT NULL,
  `TRICPES` decimal(8,4) DEFAULT NULL,
  `SUBESCAPULAR` decimal(8,4) DEFAULT NULL,
  `GEMINAL` decimal(8,4) DEFAULT NULL,
  `SUPRAILIACA` decimal(8,4) DEFAULT NULL,
  `PERNA` decimal(8,4) DEFAULT NULL,
  `ABDOMEN` decimal(8,4) DEFAULT NULL,
  `QUADRIL` decimal(8,4) DEFAULT NULL,
  `AVALIADOR` varchar(50) DEFAULT NULL,
  `CP` varchar(9) DEFAULT NULL,
  `TESTE_LASEGUE` varchar(1) DEFAULT NULL,
  `TESTE_THOMAS` varchar(1) DEFAULT NULL,
  `TESTE_OBER` varchar(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `cad_avalia`
--

CREATE TABLE `cad_avalia` (
  `codigo` int(11) NOT NULL,
  `data` datetime NOT NULL,
  `responsavel` varchar(255) NOT NULL,
  `peso` decimal(6,2) NOT NULL,
  `altura` decimal(6,2) NOT NULL,
  `tamin` decimal(6,2) NOT NULL,
  `tamax` decimal(6,2) NOT NULL,
  `envergadura` decimal(6,2) NOT NULL,
  `tmb` decimal(6,2) NOT NULL,
  `fc` decimal(6,2) NOT NULL,
  `idade` int(11) NOT NULL,
  `abdomen` decimal(6,2) NOT NULL,
  `quadril` decimal(6,2) NOT NULL,
  `braco` decimal(6,2) NOT NULL,
  `geminal` decimal(6,2) NOT NULL,
  `joelho` decimal(6,2) NOT NULL,
  `cotovelo` decimal(6,2) NOT NULL,
  `triceps` decimal(6,2) NOT NULL,
  `subscapular` decimal(6,2) NOT NULL,
  `suprailiaca` decimal(6,2) NOT NULL,
  `perna` decimal(6,2) NOT NULL,
  `imc` decimal(6,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `cad_biblio`
--

CREATE TABLE `cad_biblio` (
  `codigo` int(11) NOT NULL,
  `livro` varchar(255) NOT NULL,
  `artigo` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `cad_empresa`
--

CREATE TABLE `cad_empresa` (
  `CODIGO` int(11) NOT NULL DEFAULT '1',
  `NOME` varchar(100) NOT NULL DEFAULT 'Empresa teste',
  `MORADA` varchar(100) DEFAULT NULL,
  `LOCALIDADE` varchar(50) DEFAULT NULL,
  `CP` varchar(10) DEFAULT NULL,
  `TEL` varchar(50) DEFAULT NULL,
  `TLM` varchar(50) DEFAULT NULL,
  `FAX` varchar(50) DEFAULT NULL,
  `CONTATO` varchar(50) DEFAULT NULL,
  `SITE` varchar(100) DEFAULT NULL,
  `MAIL` varchar(100) DEFAULT NULL,
  `LOGO` varchar(255) DEFAULT NULL,
  `CONTRIBUINTE` varchar(10) DEFAULT NULL,
  `ACESSO1` varchar(255) DEFAULT NULL,
  `ACESSO2` varchar(255) DEFAULT NULL,
  `ACESSO3` varchar(255) DEFAULT NULL,
  `ACESSO4` varchar(255) DEFAULT NULL,
  `ACESSO5` varchar(255) DEFAULT NULL,
  `ACESSO6` varchar(255) DEFAULT NULL,
  `REL_HEADER` varchar(2000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `cad_entities`
--

CREATE TABLE `cad_entities` (
  `id` int(11) NOT NULL,
  `super_id` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `license` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `nif` varchar(20) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `mobile` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `web` varchar(255) DEFAULT NULL,
  `active` tinyint(4) NOT NULL DEFAULT '1',
  `registerdate` datetime DEFAULT CURRENT_TIMESTAMP,
  `date` datetime DEFAULT NULL,
  `username` varchar(150) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `cad_entities`
--

INSERT INTO `cad_entities` (`id`, `super_id`, `type`, `license`, `name`, `nif`, `address`, `phone`, `mobile`, `email`, `web`, `active`, `registerdate`, `date`, `username`, `password`, `token`) VALUES
(1, 0, 3, 1, 'Pedro Ferreira', '999999999', NULL, NULL, NULL, 'pedroferreira2005@gmail.com', NULL, 1, '2020-02-18 11:11:56', NULL, 'teste', 'senha', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJQQVAiLCJuYW1lIjoiUGVkcm8gRmVycmVpcmEiLCJpZCI6IjEiLCJzdXBlcl9lbnRpdHkiOiIwIiwidHlwZSI6IjMiLCJsaWNlbnNlIjoiMSJ9.4iqoZ9VgBCmNXj4HD8Rucgxth+kUrJa8RspZO2qdrj0=');

-- --------------------------------------------------------

--
-- Estrutura da tabela `rel_editavel`
--

CREATE TABLE `rel_editavel` (
  `nome_form` varchar(255) NOT NULL,
  `nome_componente` varchar(255) NOT NULL,
  `texto` varchar(2000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `arq_licenses`
--
ALTER TABLE `arq_licenses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `arq_types`
--
ALTER TABLE `arq_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cad_aluno`
--
ALTER TABLE `cad_aluno`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cad_entities`
--
ALTER TABLE `cad_entities`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `arq_licenses`
--
ALTER TABLE `arq_licenses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `arq_types`
--
ALTER TABLE `arq_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `cad_aluno`
--
ALTER TABLE `cad_aluno`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `cad_entities`
--
ALTER TABLE `cad_entities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
