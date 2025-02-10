Select
   a.nombre, 
   p.nombre_pelicula
From
  aula as a,
  peliculas as p,peliculas
  relaciones as r
Where
a.codigo = r.cod_alumno and
r.cod_pelicula = p.codigo_pelicula;
