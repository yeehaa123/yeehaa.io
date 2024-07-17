ALTER TABLE `foo` RENAME TO `bookmarks`;--> statement-breakpoint
ALTER TABLE `bookmarks` ADD `courseId` text NOT NULL;--> statement-breakpoint
ALTER TABLE `bookmarks` ADD `userName` text NOT NULL;--> statement-breakpoint
ALTER TABLE `bookmarks` ADD `bookmarked_at` integer;--> statement-breakpoint
ALTER TABLE `bookmarks` DROP COLUMN `bar`;