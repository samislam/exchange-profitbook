CREATE TABLE "Institution" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Institution_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Institution_name_key" ON "Institution"("name");

ALTER TABLE "TradeTransaction"
ADD COLUMN "recipientInstitutionId" TEXT;

INSERT INTO "Institution" ("id", "name", "createdAt", "updatedAt")
SELECT
  md5(lower(trim("recipientInstitution"))) AS id,
  trim("recipientInstitution") AS name,
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
FROM "TradeTransaction"
WHERE "recipientInstitution" IS NOT NULL
  AND trim("recipientInstitution") <> ''
GROUP BY trim("recipientInstitution");

UPDATE "TradeTransaction" AS tt
SET "recipientInstitutionId" = md5(lower(trim(tt."recipientInstitution")))
WHERE tt."recipientInstitution" IS NOT NULL
  AND trim(tt."recipientInstitution") <> '';

ALTER TABLE "TradeTransaction"
DROP COLUMN "recipientInstitution";

CREATE INDEX "TradeTransaction_recipientInstitutionId_idx"
ON "TradeTransaction"("recipientInstitutionId");

ALTER TABLE "TradeTransaction"
ADD CONSTRAINT "TradeTransaction_recipientInstitutionId_fkey"
FOREIGN KEY ("recipientInstitutionId") REFERENCES "Institution"("id")
ON DELETE SET NULL ON UPDATE CASCADE;
