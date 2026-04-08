-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th9 22, 2025 lúc 11:53 AM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `quiz_db`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `answers`
--

CREATE TABLE `answers` (
  `id` int(11) NOT NULL,
  `question_id` int(11) DEFAULT NULL,
  `answer_text` varchar(255) DEFAULT NULL,
  `is_correct` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `answers`
--

INSERT INTO `answers` (`id`, `question_id`, `answer_text`, `is_correct`) VALUES
(1, 1, 'A. Đo nhiệt độ nước làm mát', 0),
(2, 1, 'B. Đo áp suất dầu bôi trơn', 0),
(3, 1, 'C. Đo nồng độ khí oxy trong khí xả', 1),
(4, 1, 'D. Đo tốc độ vòng quay bánh xe', 0),
(5, 2, 'A. Giúp tiết kiệm nhiên liệu', 0),
(6, 2, 'B. Giúp xe chạy nhanh hơn', 0),
(7, 2, 'C. Giúp chống bó cứng bánh xe khi phanh', 1),
(8, 2, 'D. Giúp lái xe nhẹ hơn', 0),
(9, 3, 'A. Xe con 4 chỗ', 0),
(10, 3, 'B. Xe tải', 0),
(11, 3, 'C. Xe cứu hỏa', 1),
(12, 3, 'D. Xe khách 45 chỗ', 0),
(13, 4, 'A. 4x2', 0),
(14, 4, 'B. 4x4', 0),
(15, 4, 'C. 6x4', 1),
(16, 4, 'D. 6x2', 0),
(17, 5, 'A. Ngắt và nối truyền động từ động cơ đến hộp số', 1),
(18, 5, 'B. Làm mát động cơ', 0),
(19, 5, 'C. Điều khiển quạt gió', 0),
(20, 5, 'D. Truyền điện đến bugi', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `questions`
--

CREATE TABLE `questions` (
  `id` int(11) NOT NULL,
  `question_text` text NOT NULL,
  `answer` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `questions`
--

INSERT INTO `questions` (`id`, `question_text`, `answer`) VALUES
(1, 'Cảm biến O₂ (Oxygen Sensor) trên ô tô được dùng để làm gì?', 0),
(2, 'Hệ thống ABS giúp:', 0),
(3, 'Xe nào dưới đây thuộc xe chuyên dụng:', 0),
(4, 'Xe có 6 bánh chủ động có công thức bánh xe là:', 0),
(5, 'Ly hợp (côn) có tác dụng gì?', 0);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `answers`
--
ALTER TABLE `answers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `question_id` (`question_id`);

--
-- Chỉ mục cho bảng `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `answers`
--
ALTER TABLE `answers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT cho bảng `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `answers`
--
ALTER TABLE `answers`
  ADD CONSTRAINT `answers_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
