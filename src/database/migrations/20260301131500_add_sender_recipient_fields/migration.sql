ALTER TABLE "TradeTransaction"
ADD COLUMN "senderInstitution" TEXT,
ADD COLUMN "senderIban" TEXT,
ADD COLUMN "senderName" TEXT,
ADD COLUMN "recipientInstitution" TEXT,
ADD COLUMN "recipientIban" TEXT,
ADD COLUMN "recipientName" TEXT;
