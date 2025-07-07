/*
  Warnings:

  - You are about to drop the `Perro` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PerroAmarillo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Perro";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "PerroAmarillo";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "rol" TEXT NOT NULL DEFAULT 'cliente'
);

-- CreateTable
CREATE TABLE "Animal" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "especie" TEXT NOT NULL,
    "fecha_nacido" DATETIME NOT NULL,
    "sexo" TEXT NOT NULL,
    "paraAdopcion" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "AtencionMedica" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tipo" TEXT NOT NULL,
    "animalId" INTEGER NOT NULL,
    "veterinario" TEXT NOT NULL,
    "fecha" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AtencionMedica_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "Animal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AtencionMedica_consulta" (
    "atencionMedicaId" INTEGER NOT NULL,
    "diagnostico" TEXT NOT NULL,
    "tratamiento" TEXT NOT NULL,
    CONSTRAINT "AtencionMedica_consulta_atencionMedicaId_fkey" FOREIGN KEY ("atencionMedicaId") REFERENCES "AtencionMedica" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AtencionMedica_vacunacion" (
    "atencionMedicaId" INTEGER NOT NULL,
    "vacuna" TEXT NOT NULL,
    CONSTRAINT "AtencionMedica_vacunacion_atencionMedicaId_fkey" FOREIGN KEY ("atencionMedicaId") REFERENCES "AtencionMedica" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Solicitud" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "animal_id" INTEGER NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "fecha" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estado" TEXT NOT NULL,
    CONSTRAINT "Solicitud_animal_id_fkey" FOREIGN KEY ("animal_id") REFERENCES "Animal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Solicitud_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Notificacion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usuarioId" INTEGER NOT NULL,
    "mensaje" TEXT NOT NULL,
    CONSTRAINT "Notificacion_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "AtencionMedica_consulta_atencionMedicaId_key" ON "AtencionMedica_consulta"("atencionMedicaId");

-- CreateIndex
CREATE UNIQUE INDEX "AtencionMedica_vacunacion_atencionMedicaId_key" ON "AtencionMedica_vacunacion"("atencionMedicaId");
