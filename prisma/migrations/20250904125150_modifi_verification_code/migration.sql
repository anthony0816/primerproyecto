-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_VerificationCode" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_VerificationCode" ("code", "createdAt", "email", "expiresAt", "id", "used") SELECT "code", "createdAt", "email", "expiresAt", "id", "used" FROM "VerificationCode";
DROP TABLE "VerificationCode";
ALTER TABLE "new_VerificationCode" RENAME TO "VerificationCode";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
