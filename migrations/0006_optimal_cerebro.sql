CREATE TABLE `course` (
	`courseId` text NOT NULL,
	`payload` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `course_courseId_unique` ON `course` (`courseId`);