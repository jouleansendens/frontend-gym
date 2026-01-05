-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 05, 2026 at 02:32 PM
-- Server version: 5.7.39
-- PHP Version: 8.4.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gym_project`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `certificates`
--

CREATE TABLE `certificates` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `issuer` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `certificates`
--

INSERT INTO `certificates` (`id`, `name`, `issuer`, `created_at`, `updated_at`) VALUES
(3, 'dwaawdawd', 'dawdwadaw', '2026-01-05 06:09:37', '2026-01-05 06:09:37'),
(4, 'dwadawdaw', 'dwadawdaw', '2026-01-05 06:09:40', '2026-01-05 06:09:40'),
(5, 'dawdwa', 'dwadwadwa', '2026-01-05 06:54:50', '2026-01-05 06:54:50');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `faqs`
--

CREATE TABLE `faqs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `question` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `answer` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `faqs`
--

INSERT INTO `faqs` (`id`, `question`, `answer`, `created_at`, `updated_at`) VALUES
(1, 'Is this suitable for absolute beginners?', 'Absolutely! Every program is customized to your current fitness level. We start with the basics to ensure your form is perfect before progressing to more intense exercises.', '2025-12-23 10:40:05', '2025-12-23 10:40:05'),
(2, 'How does the Online Coaching work?', 'Online coaching is delivered via our dedicated app. You will receive customized workout plans, nutrition goals, and have 24/7 access to chat with the coach. Weekly video check-ins ensure you stay on track.', '2025-12-23 10:40:05', '2025-12-23 10:40:05'),
(3, 'Do I need a gym membership for the home plans?', 'Not necessarily. While a gym provides more equipment, we can design highly effective home-based programs using just dumbbells, resistance bands, or even just your body weight.', '2025-12-23 10:40:05', '2025-12-23 10:40:05'),
(4, 'Is nutrition coaching included in all plans?', 'Nutrition guidance is included in our Pro Coaching and Elite Transformation plans. Starter plans focus primarily on training access and basic assessments.', '2025-12-23 10:40:05', '2025-12-23 10:40:05'),
(5, 'Can I cancel my subscription at any time?', 'Yes, our plans are flexible. You can cancel or pause your subscription at any time through the member portal or by contacting support directly.', '2025-12-23 10:40:05', '2025-12-23 10:40:05');

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `data` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `leaderboard`
--

CREATE TABLE `leaderboard` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `steps` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `leaderboard`
--

INSERT INTO `leaderboard` (`id`, `name`, `steps`, `created_at`, `updated_at`) VALUES
(1, 'David Beckham', 120500, '2025-12-23 10:40:06', '2025-12-23 10:40:06'),
(2, 'Sarah Jenkins', 115200, '2025-12-23 10:40:06', '2025-12-23 10:40:06'),
(3, 'Marcus Thorne', 98400, '2025-12-23 10:40:06', '2025-12-23 10:40:06'),
(4, 'Elena Rodriguez', 92100, '2025-12-23 10:40:06', '2025-12-23 10:40:06'),
(5, 'Kevin Hart', 88300, '2025-12-23 10:40:06', '2025-12-23 10:40:06');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `goal` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_12_23_092637_create_certificates_table', 1),
(5, '2025_12_23_092638_create_images_table', 1),
(6, '2025_12_23_092638_create_pricings_table', 1),
(7, '2025_12_23_092638_create_services_table', 1),
(8, '2025_12_23_092639_create_f_a_q_s_table', 1),
(9, '2025_12_23_092639_create_leaderboards_table', 1),
(10, '2025_12_23_092639_create_testimonials_table', 1),
(11, '2025_12_23_092640_create_messages_table', 1),
(12, '2025_12_23_092641_create_site_settings_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'auth_token', '01b9fc032258f96309926ecbcb9bf807d5441827cc0a4e845011734466ecff15', '[\"*\"]', '2026-01-05 07:32:18', NULL, '2026-01-05 05:50:18', '2026-01-05 07:32:18');

-- --------------------------------------------------------

--
-- Table structure for table `pricing`
--

CREATE TABLE `pricing` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `period` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `features` json NOT NULL,
  `popular` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pricing`
--

INSERT INTO `pricing` (`id`, `name`, `price`, `period`, `description`, `features`, `popular`, `created_at`, `updated_at`) VALUES
(1, 'Starter Plan', '350000', 'per month', 'Perfect for those just starting their fitness journey with full gym access.', '\"[\\\"Unlimited Gym Access\\\",\\\"Locker & Shower Room\\\",\\\"Free Fitness Assessment\\\",\\\"Basic Workout Plan\\\"]\"', 0, '2025-12-23 10:40:05', '2025-12-23 10:40:05'),
(2, 'Pro Coaching', '1200000', 'per month', 'Accelerate your results with dedicated 1-on-1 personal training sessions.', '\"[\\\"Everything in Starter\\\",\\\"8 Personal Training Sessions\\\",\\\"Customized Nutrition Plan\\\",\\\"Progress Tracking App\\\"]\"', 1, '2025-12-23 10:40:05', '2025-12-23 10:40:05'),
(3, 'Elite Transformation', '3500000', 'per month', 'The ultimate package for total body transformation and 24/7 support.', '\"[\\\"Unlimited PT Sessions\\\",\\\"Supplementation Guide\\\",\\\"Monthly Body Scan (InBody)\\\",\\\"24\\\\/7 VIP Priority Support\\\"]\"', 0, '2025-12-23 10:40:05', '2025-12-23 10:40:05'),
(4, 'wadwa', '23131321', 'per month', 'dwawda', '[\"213131\", \"dawwada\", \"awdawdwa\", \"dwadwadaw\", \"dwadwadwa\", \"dawdwaaw\"]', 1, '2026-01-05 06:19:41', '2026-01-05 06:20:05');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `icon_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `features` json NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `title`, `description`, `icon_name`, `features`, `created_at`, `updated_at`) VALUES
(1, '1-on-1 Personal Training', 'Highly personalized sessions focused on your specific goals, form, and rapid progress.', 'User', '\"[\\\"Customized workout plans\\\",\\\"Posture & form correction\\\",\\\"Private training environment\\\"]\"', '2025-12-23 10:40:05', '2025-12-23 10:40:05'),
(2, 'Online Coaching', 'Train from anywhere in the world with expert guidance delivered straight to your smartphone.', 'Video', '\"[\\\"Mobile app integration\\\",\\\"Weekly video check-ins\\\",\\\"24\\\\/7 Chat support\\\"]\"', '2025-12-23 10:40:05', '2025-12-23 10:40:05'),
(3, 'Competition Prep', 'Specialized programming for athletes looking to step on stage or compete at elite levels.', 'Activity', '\"[\\\"Peak week protocols\\\",\\\"Posing coaching\\\",\\\"Performance analysis\\\"]\"', '2025-12-23 10:40:05', '2025-12-23 10:40:05'),
(4, 'Nutrition Planning', 'Fuel your body correctly with science-based meal plans tailored to your metabolism.', 'Heart', '\"[\\\"Macro-nutrient breakdown\\\",\\\"Supplement guidance\\\",\\\"Grocery shopping lists\\\"]\"', '2025-12-23 10:40:05', '2025-12-23 10:40:05'),
(5, 'Small Group Sessions', 'The perfect balance of professional coaching and high-energy community motivation.', 'Users', '\"[\\\"Max 5 people per group\\\",\\\"Accountability partners\\\",\\\"Budget-friendly rates\\\"]\"', '2025-12-23 10:40:05', '2025-12-23 10:40:05'),
(6, 'Express HIIT', 'High-intensity interval training designed to burn maximum calories in just 30 minutes.', 'Zap', '\"[\\\"Metabolic conditioning\\\",\\\"Rapid fat loss\\\",\\\"Equipment-free options\\\"]\"', '2025-12-23 10:40:05', '2025-12-23 10:40:05');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `site_settings`
--

CREATE TABLE `site_settings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `site_settings`
--

INSERT INTO `site_settings` (`id`, `key`, `value`, `created_at`, `updated_at`) VALUES
(1, 'hero.badge', 'Certified Personal Trainer', '2025-12-23 10:40:05', '2025-12-23 10:40:05'),
(2, 'hero.title', 'Transform Your Body,\nTransform Your Life', '2025-12-23 10:40:05', '2025-12-23 10:40:05'),
(3, 'hero.subtitle', 'Achieve your fitness goals with personalized 1-on-1 coaching, customized workout plans, and expert guidance - both in-person and online.', '2025-12-23 10:40:05', '2025-12-23 10:40:05'),
(4, 'hero.cta_primary', 'Start Your Journey', '2025-12-23 10:40:05', '2025-12-23 10:40:05'),
(5, 'hero.cta_secondary', 'Watch Video', '2025-12-23 10:40:05', '2025-12-23 10:40:05'),
(6, 'hero.stat1_value', '500+', '2025-12-23 10:40:05', '2025-12-23 10:40:05'),
(7, 'hero.stat1_label', 'Clients Trained', '2025-12-23 10:40:05', '2025-12-23 10:40:05'),
(8, 'hero.stat2_value', '10+', '2025-12-23 10:40:05', '2025-12-23 10:40:05'),
(9, 'hero.stat2_label', 'Years Experience', '2025-12-23 10:40:05', '2025-12-23 10:40:05'),
(10, 'hero.stat3_value', '98%', '2025-12-23 10:40:05', '2025-12-23 10:40:05'),
(11, 'hero.stat3_label', 'Success Rate', '2025-12-23 10:40:05', '2025-12-23 10:40:05'),
(12, 'about.label', 'About Me', '2025-12-23 10:40:05', '2025-12-23 10:40:05'),
(13, 'about.title', 'Your Partner in\nFitness Excellence', '2025-12-23 10:40:05', '2025-12-23 10:40:05'),
(14, 'about.desc1', 'With over 10 years of experience in personal training and fitness coaching, I\'ve helped hundreds of clients achieve their fitness goals.', '2025-12-23 10:40:05', '2025-12-23 10:40:05'),
(15, 'about.desc2', 'My approach combines proven training methodologies with personalized attention to ensure you not only reach your goals but maintain them for life.', '2025-12-23 10:40:05', '2025-12-23 10:40:05'),
(16, 'about.button', 'Learn More About Me', '2025-12-23 10:40:05', '2025-12-23 10:40:05'),
(17, 'about.modal_title', 'My Fitness Journey', '2025-12-23 10:40:05', '2025-12-23 10:40:05'),
(18, 'about.modal_content', 'With over 10 years of experience, I started this journey because I believe everyone deserves to feel strong and confident in their own skin...dwadadwa', '2025-12-23 10:40:05', '2026-01-05 06:49:03'),
(19, 'about.modal_button', 'Close Story', '2025-12-23 10:40:05', '2025-12-23 10:40:05'),
(20, 'coach.label', 'Meet Your Coach', '2025-12-23 10:40:05', '2025-12-23 10:40:05'),
(21, 'coach.title', 'Your Partner in Fitness Excellence', '2025-12-23 10:40:05', '2025-12-23 10:40:05'),
(22, 'coach.desc1', 'With over 10 years of experience in personal training, I help people transform their lives through sustainable fitness.', '2025-12-23 10:40:05', '2025-12-23 10:40:05'),
(23, 'coach.desc2', 'My approach focuses on functional movement and nutrition tailored to your lifestyle.', '2025-12-23 10:40:05', '2025-12-23 10:40:05'),
(24, 'coach.cert1.title', 'NASM', '2025-12-23 10:40:05', '2025-12-23 10:40:05'),
(25, 'coach.cert1.desc', 'Certified Personal Trainer', '2025-12-23 10:40:05', '2025-12-23 10:40:05'),
(26, 'coach.cert2.title', 'PN1', '2025-12-23 10:40:05', '2025-12-23 10:40:05'),
(27, 'coach.cert2.desc', 'Nutrition Coach', '2025-12-23 10:40:05', '2025-12-23 10:40:05'),
(28, 'coach.link', 'Read My Full Story', '2025-12-23 10:40:05', '2025-12-23 10:40:05'),
(29, 'contact.phone', '6281234567890', '2025-12-23 10:40:05', '2025-12-23 10:40:05'),
(30, 'contact.wa_template', 'Halo Coach, saya tertarik daftar paket *{name}* dengan harga {price}/{period}. Mohon infonya.', '2025-12-23 10:40:05', '2025-12-23 10:40:05'),
(31, 'contact.hours.mon_fri', '6:00 AM - 10:00 PM', '2025-12-23 10:40:05', '2025-12-23 10:40:05'),
(32, 'contact.hours.sat', '8:00 AM - 8:00 PM', '2025-12-23 10:40:05', '2025-12-23 10:40:05'),
(33, 'contact.hours.sun', '9:00 AM - 6:00 PM', '2025-12-23 10:40:05', '2025-12-23 10:40:05'),
(34, 'social.instagram', 'https://instagram.com', '2025-12-23 10:40:05', '2025-12-23 10:40:05'),
(35, 'social.facebook', 'https://facebook.com', '2025-12-23 10:40:05', '2025-12-23 10:40:05'),
(36, 'social.youtube', 'https://youtube.com/tadawda', '2025-12-23 10:40:05', '2026-01-05 06:10:29'),
(37, 'social.linkedin', '', '2025-12-23 10:40:05', '2025-12-23 10:40:05'),
(38, 'social.twitter', '', '2025-12-23 10:40:05', '2025-12-23 10:40:05'),
(39, 'site.name', 'FITCOACH', '2025-12-23 10:40:05', '2025-12-23 10:40:05'),
(40, 'quote.text', 'The only bad workout is the one that didn\'t happen.', '2025-12-23 10:40:05', '2025-12-23 10:40:05'),
(41, 'quote.font', '\"Playfair Display\", serif', '2025-12-23 10:40:05', '2025-12-23 10:40:05'),
(42, 'quote.author', '— COACH FITCOACH', '2025-12-23 10:40:05', '2025-12-23 10:40:05'),
(43, 'social.tiktok', 'dwadwadwa', '2026-01-05 06:18:11', '2026-01-05 06:18:11'),
(44, 'social.instagram.enabled', 'false', '2026-01-05 06:18:12', '2026-01-05 06:29:47'),
(45, 'social.facebook.enabled', 'false', '2026-01-05 06:18:12', '2026-01-05 06:23:03'),
(46, 'social.youtube.enabled', 'true', '2026-01-05 06:18:13', '2026-01-05 06:30:31'),
(47, 'social.tiktok.enabled', 'true', '2026-01-05 06:18:13', '2026-01-05 06:29:49');

-- --------------------------------------------------------

--
-- Table structure for table `testimonials`
--

CREATE TABLE `testimonials` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `rating` int(11) NOT NULL DEFAULT '5',
  `text` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `testimonials`
--

INSERT INTO `testimonials` (`id`, `name`, `role`, `image`, `rating`, `text`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Michael Chen', 'Software Engineer', 'https://i.pravatar.cc/150?img=12', 5, 'Best decision I ever made! I lost 30 pounds in 4 months and gained so much confidence. The personalized coaching made all the difference.', 1, '2025-12-23 10:40:05', '2025-12-23 10:40:05'),
(2, 'Sarah Jenkins', 'Marketing Director', 'https://i.pravatar.cc/150?img=32', 5, 'The online coaching is perfect for my busy schedule. Professional, knowledgeable, and always there to support me. Highly recommend!', 1, '2025-12-23 10:40:05', '2025-12-23 10:40:05'),
(3, 'David Rodriguez', 'Business Owner', 'https://i.pravatar.cc/150?img=13', 5, 'Transformed my body and mindset in just 3 months. The workouts are challenging but achievable, and the results speak for themselves.', 1, '2025-12-23 10:40:05', '2025-12-23 10:40:05'),
(4, 'James Thompson', 'Accountant', 'https://i.pravatar.cc/150?img=14', 5, 'The 1-on-1 sessions are worth every penny. Finally achieved the physique I always wanted. Expert guidance at its best.', 1, '2025-12-23 10:40:05', '2025-12-23 10:40:05'),
(5, 'Elena Vance', 'Graphic Designer', 'https://i.pravatar.cc/150?img=44', 5, 'Started as a complete beginner and now I feel like an athlete. Great coaching, great programs, and truly great results!', 1, '2025-12-23 10:40:05', '2025-12-23 10:40:05'),
(6, 'Marcus Thorne', 'Project Manager', 'https://i.pravatar.cc/150?img=68', 5, 'Excellent trainer who really cares about his clients. The custom meal plans and workout routines were exactly what I needed.', 1, '2025-12-23 10:40:05', '2025-12-23 10:40:05');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Test User', 'test@example.com', NULL, '$2y$12$STz4zZtAyYTRkay5f8Pug.1MLtrSYlK/mn2nrp/aPPB1m4mS.NOXi', NULL, '2026-01-05 05:48:24', '2026-01-05 05:48:24');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `certificates`
--
ALTER TABLE `certificates`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `faqs`
--
ALTER TABLE `faqs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `images_key_unique` (`key`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `leaderboard`
--
ALTER TABLE `leaderboard`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `pricing`
--
ALTER TABLE `pricing`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `site_settings`
--
ALTER TABLE `site_settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `site_settings_key_unique` (`key`);

--
-- Indexes for table `testimonials`
--
ALTER TABLE `testimonials`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `certificates`
--
ALTER TABLE `certificates`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `faqs`
--
ALTER TABLE `faqs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `leaderboard`
--
ALTER TABLE `leaderboard`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `pricing`
--
ALTER TABLE `pricing`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `site_settings`
--
ALTER TABLE `site_settings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `testimonials`
--
ALTER TABLE `testimonials`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
