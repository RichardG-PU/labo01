ALTER TABLE "notes" ADD COLUMN "is_archived" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "notes" DROP COLUMN IF EXISTS "archived";