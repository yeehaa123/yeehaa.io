CREATE TABLE `followed` (
	`courseId` text NOT NULL,
	`followed_at` integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE `bookmarks` RENAME TO `bookmarked`;--> statement-breakpoint
DROP INDEX IF EXISTS `bookmarks_courseId_unique`;--> statement-breakpoint
CREATE UNIQUE INDEX `followed_courseId_unique` ON `followed` (`courseId`);--> statement-breakpoint
CREATE UNIQUE INDEX `bookmarked_courseId_unique` ON `bookmarked` (`courseId`);