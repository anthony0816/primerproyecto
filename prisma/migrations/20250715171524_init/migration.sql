-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Animal" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "especie" TEXT NOT NULL,
    "fecha_nacido" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sexo" TEXT NOT NULL,
    "paraAdopcion" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_Animal" ("especie", "fecha_nacido", "id", "nombre", "paraAdopcion", "sexo") SELECT "especie", "fecha_nacido", "id", "nombre", "paraAdopcion", "sexo" FROM "Animal";
DROP TABLE "Animal";
ALTER TABLE "new_Animal" RENAME TO "Animal";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
