# 🧪 Examen Extraordinario de Técnicas de Programación Web

## Facultad de Tecnologías Interactivas

## Gestión de Clínica Veterinaria

**Duración:** 4 horas  
**Modalidad:** Desarrollo individual – Proyecto Django funcional

---

## 🐾 Contexto General

La clínica veterinaria "Amigos Peludos" desea implementar un sistema básico de **gestión clínica y adopción** que permita:

- Registrar animales.
- Registrar consultas médicas con su diagnóstico y tratamiento.
- Controlar las vacunas aplicadas.
- Gestionar solicitudes de adopción para aquellos animales que estén disponibles en el centro.

El sistema debe contemplar las especies más comunes atendidas:

- 🐶 Perros
- 🐱 Gatos
- 🐹 Hámsters
- 🐦 Aves

Para cada especie, hay **un veterinario asignado en el sistema**:

- Perros: Dr. Andrés Herrera
- Gatos: Dra. Clara Núñez
- Hámsters: Dra. Sofía Mena
- Aves: Dr. Luis Torres

---

## 🔐 Seguridad y Roles

El sistema debe tener un **mecanismo de autenticación** con dos roles:

## 👤 Usuario Administrador

- Gestiona animales y atenciones médicas.
- Administra las solicitudes de adopciones.

## 👥 Usuario Registrado (Cliente)

- Visualiza el listado de animales disponibles para adopción.
- Visualiza el historial de atenciones médicas que ha recibido un animal disponible, ordenadas cronológicamente.
- Solicita la adopción de un animal disponible y visualiza el estado de la misma en todo momento.

**Reglas del negocio:**

1. Una vez solicitada la adopción, el sistema debe cambiar la disponibilidad del animal automáticamente, evitando
  que otros usuarios intenten solicitarlo.
2. La clínica solo permite el registro de una solicitud por usuario en este momento.

---

### 🛠️ Requisitos Funcionales

## a) 🐶 Gestión de Animales, Atenciones Médicas y Solicitudes de Adopción

- Registrar animales: nombre, especie (perro, gato, hamster, ave), edad, sexo, disponible para adopción (sí/no).
- Registrar atención médica: tipo (consulta, vacunación), **animal**, **veterinario asignado**, fecha + hora.
- Administrar las solicitudes de adopción: animal, usuario solicitante, fecha de solicitud, accion(aprobar/denegar).

  **Reglas del negocio:**

  1. Si la atención médica es de tipo **consulta**, se debe además registrar la siguiente información: diagnóstico, tratamiento.
  2. Si la atención médica es de tipo **vacunación**, se debe además registrar el nombre de la vacuna aplicada.
    Nota: La vacuna debe ser válida para la especie en cuestión
    Vacunas según especie (ejemplo):
      - **Perros:** Anti-Rabia, Anti-Parvovirus
      - **Gatos:** Anti-Rabia, Anti-Leucemia felina
      - **Hámsters:** Anti-Tifoidea, Anti-Tularemia
      - **Aves:** Anti-Viruela aviar, Anti-Newcastle
  3. En caso de denegar la solicitud, el administrador debe ofrecer un **motivo** al usuario que solicitó la adopción, enviando   una notificación

## b) 📊 Consultas Funcionales (implementa al menos 3)

1. Mostrar cantidad de **animales vacunados este mes**.
2. Listar animales **disponibles para adopción** junto a su consulta más reciente.
3. Calcular el **porcentaje de animales con al menos una vacuna** registrada.
4. Dado nombre y fecha, mostrar el **diagnóstico más cercano** de un animal.
5. Obtener el **animal más joven con diagnóstico dado**.
6. Listar las consultas de **un diagnóstico específico en el mes actual**, ordenadas por fecha.

---

## 💻 Componentes de Interfaz (Requeridos)

- Navbar Bootstrap con enlaces a cada sección (Inicio, Animales, Fichas, Citas, Adopciones, Vacunas).
- Login y Logout con formularios estilizados.
- Uso de tablas Bootstrap con badges de color (ej: estado de adopción).
- Formularios responsivos con Bootstrap 5.

---

## ⚙️ Tecnologías a Usar

- **Frontend:** HTML5, CSS3, Bootstrap 5, JS Vanilla
- **Backend:** Django, Django Forms, Django ORM, Vistas FBV o CBV
- **Base de datos:** SQLite

---

## 📁 Entregable Esperado

- Proyecto Django funcional con base de datos inicial.
- CRUD funcionales de animales, atencion médica y adopciones.
- Interfaz limpia y navegable.
- Validaciones requeridas
- Empleo de formularios en Django
- Mensajes de acción
- Funciones de consulta implementadas en views.

## 💡 Recomendaciones

- Prioriza la funcionalidad sobre el diseño.
- Usa relaciones entre modelos (`ForeignKey`, `ManyToMany` si es necesario).
- Apóyate en la documentación oficial(`https://devdocs.io/django~5.2/`) y tus apuntes de laboratorio.

---

¡Mucho éxito! 🐾
