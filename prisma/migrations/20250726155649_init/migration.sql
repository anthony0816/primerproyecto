-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Notificacion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usuarioId" INTEGER NOT NULL,
    "mensaje" TEXT NOT NULL,
    "leido" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Notificacion_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Notificacion" ("id", "mensaje", "usuarioId") SELECT "id", "mensaje", "usuarioId" FROM "Notificacion";
DROP TABLE "Notificacion";
ALTER TABLE "new_Notificacion" RENAME TO "Notificacion";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
