-- AlterTable
CREATE SEQUENCE "tickets_ticketid_seq";
ALTER TABLE "tickets" ALTER COLUMN "ticketId" SET DEFAULT nextval('tickets_ticketid_seq');
ALTER SEQUENCE "tickets_ticketid_seq" OWNED BY "public"."tickets"."ticketId";
