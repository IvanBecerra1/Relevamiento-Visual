# Relevamiento Visual - App móvil colaborativa con fotos y votaciones

Aplicación móvil desarrollada con Ionic + Angular + Firebase que permite a los usuarios realizar un relevamiento visual del edificio mediante la carga de fotografías, clasificándolas como cosas lindas o cosas feas.

El proyecto integra captura de imágenes, almacenamiento en la nube, interacción entre usuarios y visualización de resultados mediante gráficos.

Video demostración:  
https://www.youtube.com/watch?v=lASOoIGzKEs

---

## Tecnologías utilizadas

- Ionic
- Angular
- Firebase Authentication
- Firebase Firestore
- Firebase Storage
- Cámara del dispositivo
- Gráficos estadísticos

---

## Enunciado funcional de la aplicación

La aplicación permite a los usuarios participar de un relevamiento visual colaborativo del edificio, subiendo fotos y votando las imágenes cargadas por otros usuarios.

### Reglas de funcionamiento

1. El usuario debe iniciar sesión (registrado previamente en la base de datos).
2. La pantalla principal muestra dos botones que ocupan toda la pantalla:
   - Cosas LINDAS del edificio
   - Cosas FEAS del edificio
3. Cada botón posee imágenes alusivas a la categoría.
4. Al ingresar a una sección, el usuario puede:
   - Tomar una foto con la cámara del dispositivo.
   - Subir una o varias fotos a la nube.
5. El nombre del usuario queda asociado a cada foto subida.
6. Todos los usuarios pueden visualizar las fotos cargadas.
7. Las fotos se muestran ordenadas por fecha en forma descendente.
8. Los usuarios pueden votar cada foto (un voto por foto).
9. Se pueden visualizar los resultados mediante:
   - Gráfico de torta para las cosas lindas.
   - Gráfico de barras para las cosas feas.
10. Al seleccionar un resultado del gráfico, se muestra la foto correspondiente.
11. Existe una sección donde el usuario puede ver únicamente las fotos que él mismo subió.

---

## Objetivo técnico del ejercicio

Este proyecto permite demostrar:

- Integración con la cámara del dispositivo
- Almacenamiento de imágenes en Firebase Storage
- Persistencia de datos en Firebase Firestore
- Asociación de datos entre usuarios y contenido subido
- Manejo de colecciones y consultas ordenadas
- Implementación de sistema de votación
- Generación de gráficos estadísticos dinámicos
- Interacción colaborativa entre usuarios

---

## Flujo de uso

1. El usuario inicia sesión.
2. Selecciona la categoría (lindas o feas).
3. Toma una o varias fotos y las sube.
4. Otros usuarios visualizan las fotos.
5. Se realizan votaciones.
6. Los resultados se muestran en gráficos interactivos.
7. El usuario puede consultar sus propias fotos subidas.

---

## Autor

Iván Becerra
