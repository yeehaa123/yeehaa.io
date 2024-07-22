ALTER TABLE `course` RENAME COLUMN `payload` TO `course`;--> statement-breakpoint
DROP INDEX IF EXISTS `course_courseId_unique`;