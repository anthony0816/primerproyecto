-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AtencionMedica" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tipo" TEXT NOT NULL,
    "animalId" INTEGER NOT NULL,
    "veterinario" TEXT NOT NULL,
    "fecha" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AtencionMedica_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "Animal" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_AtencionMedica" ("animalId", "fecha", "id", "tipo", "veterinario") SELECT "animalId", "fecha", "id", "tipo", "veterinario" FROM "AtencionMedica";
DROP TABLE "AtencionMedica";
ALTER TABLE "new_AtencionMedica" RENAME TO "AtencionMedica";
CREATE TABLE "new_AtencionMedica_consulta" (
    "atencionMedicaId" INTEGER NOT NULL,
    "diagnostico" TEXT NOT NULL,
    "tratamiento" TEXT NOT NULL,
    CONSTRAINT "AtencionMedica_consulta_atencionMedicaId_fkey" FOREIGN KEY ("atencionMedicaId") REFERENCES "AtencionMedica" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_AtencionMedica_consulta" ("atencionMedicaId", "diagnostico", "tratamiento") SELECT "atencionMedicaId", "diagnostico", "tratamiento" FROM "AtencionMedica_consulta";
DROP TABLE "AtencionMedica_consulta";
ALTER TABLE "new_AtencionMedica_consulta" RENAME TO "AtencionMedica_consulta";
CREATE UNIQUE INDEX "AtencionMedica_consulta_atencionMedicaId_key" ON "AtencionMedica_consulta"("atencionMedicaId");
CREATE TABLE "new_AtencionMedica_vacunacion" (
    "atencionMedicaId" INTEGER NOT NULL,
    "vacuna" TEXT NOT NULL,
    CONSTRAINT "AtencionMedica_vacunacion_atencionMedicaId_fkey" FOREIGN KEY ("atencionMedicaId") REFERENCES "AtencionMedica" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_AtencionMedica_vacunacion" ("atencionMedicaId", "vacuna") SELECT "atencionMedicaId", "vacuna" FROM "AtencionMedica_vacunacion";
DROP TABLE "AtencionMedica_vacunacion";
ALTER TABLE "new_AtencionMedica_vacunacion" RENAME TO "AtencionMedica_vacunacion";
CREATE UNIQUE INDEX "AtencionMedica_vacunacion_atencionMedicaId_key" ON "AtencionMedica_vacunacion"("atencionMedicaId");
CREATE TABLE "new_Imagen" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL DEFAULT '',
    "animalId" INTEGER NOT NULL,
    CONSTRAINT "Imagen_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "Animal" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Imagen" ("animalId", "id", "url") SELECT "animalId", "id", "url" FROM "Imagen";
DROP TABLE "Imagen";
ALTER TABLE "new_Imagen" RENAME TO "Imagen";
CREATE TABLE "new_Notificacion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usuarioId" INTEGER NOT NULL,
    "mensaje" TEXT NOT NULL,
    "contexto" TEXT NOT NULL DEFAULT '',
    "leido" BOOLEAN NOT NULL DEFAULT false,
    "fecha" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Notificacion_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Notificacion" ("contexto", "fecha", "id", "leido", "mensaje", "usuarioId") SELECT "contexto", "fecha", "id", "leido", "mensaje", "usuarioId" FROM "Notificacion";
DROP TABLE "Notificacion";
ALTER TABLE "new_Notificacion" RENAME TO "Notificacion";
CREATE TABLE "new_Solicitud" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "animal_id" INTEGER NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "fecha" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estado" TEXT NOT NULL DEFAULT 'espera',
    "descripcion" TEXT NOT NULL DEFAULT '',
    CONSTRAINT "Solicitud_animal_id_fkey" FOREIGN KEY ("animal_id") REFERENCES "Animal" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Solicitud_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Solicitud" ("animal_id", "descripcion", "estado", "fecha", "id", "usuarioId") SELECT "animal_id", "descripcion", "estado", "fecha", "id", "usuarioId" FROM "Solicitud";
DROP TABLE "Solicitud";
ALTER TABLE "new_Solicitud" RENAME TO "Solicitud";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
