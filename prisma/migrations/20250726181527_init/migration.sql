-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Solicitud" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "animal_id" INTEGER NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "fecha" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estado" TEXT NOT NULL DEFAULT 'espera',
    "descripcion" TEXT NOT NULL DEFAULT '',
    CONSTRAINT "Solicitud_animal_id_fkey" FOREIGN KEY ("animal_id") REFERENCES "Animal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Solicitud_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Solicitud" ("animal_id", "estado", "fecha", "id", "usuarioId") SELECT "animal_id", "estado", "fecha", "id", "usuarioId" FROM "Solicitud";
DROP TABLE "Solicitud";
ALTER TABLE "new_Solicitud" RENAME TO "Solicitud";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
