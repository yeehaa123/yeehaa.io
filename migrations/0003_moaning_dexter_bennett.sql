ALTER TABLE `bookmarked` RENAME TO `bookmark`;--> statement-breakpoint
ALTER TABLE `commands` RENAME TO `command`;--> statement-breakpoint
ALTER TABLE `completed` RENAME TO `complete`;--> statement-breakpoint
DROP INDEX IF EXISTS `bookmarked_courseId_unique`;--> statement-breakpoint
DROP INDEX IF EXISTS `completed_checkpoint_id_unique`;--> statement-breakpoint
CREATE UNIQUE INDEX `bookmark_courseId_unique` ON `bookmark` (`courseId`);--> statement-breakpoint
CREATE UNIQUE INDEX `complete_checkpoint_id_unique` ON `complete` (`checkpoint_id`);