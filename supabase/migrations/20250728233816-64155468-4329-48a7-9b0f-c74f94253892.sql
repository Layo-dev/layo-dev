-- Add subject column and rename messages to message for better consistency
ALTER TABLE "contact messages" ADD COLUMN subject text;
ALTER TABLE "contact messages" RENAME COLUMN messages TO message;