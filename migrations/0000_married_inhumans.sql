CREATE TABLE `bookmarked` (
	`courseId` text NOT NULL,
	`bookmarked_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `commands` (
	`created_at` integer NOT NULL,
	`type` text NOT NULL,
	`payload` text
);
--> statement-breakpoint
CREATE TABLE `completed` (
	`course_id` text NOT NULL,
	`checkpoint_id` text NOT NULL,
	`completed_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `course` (
	`course_id` text PRIMARY KEY NOT NULL,
	`curator` text NOT NULL,
	`course` text
);
--> statement-breakpoint
CREATE TABLE `followed` (
	`courseId` text NOT NULL,
	`followed_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `bookmarked_courseId_unique` ON `bookmarked` (`courseId`);--> statement-breakpoint
CREATE UNIQUE INDEX `completed_course_id_unique` ON `completed` (`course_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `completed_checkpoint_id_unique` ON `completed` (`checkpoint_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `followed_courseId_unique` ON `followed` (`courseId`);