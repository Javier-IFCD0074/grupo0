``` mermaid
graph 
GALICIA--hola-->A[La Coruña]
GALICIA-.->B[Lugo]
GALICIA----->C[Orense]
GALICIA----->D[Pontevedra]

style C fill: yellow
style B fill: blue
style A fill: red
style GALICIA fill: aquamarine
style D fill: magenta

```

``` mermaid
sankey-beta
Semana,ITET,25
Semana,cine,7
Semana,Pasear,8
```

``` mermaid 
pie
title Un gráfico de sectores
"Segmento A" :5
"Segmento B" :10
"Segmento C" :5

```
``` mermaid
erDiagram 

Men{
string DNI PK
string DNIesposa FK
string nombre}
Women{
int IDs PK
String DNIesposo FK
string nombre
}
DNI{
string DNI PK
string DNIesposa FK
string DNIesposo FK}
Men |o--o{Women:"Conyugue Oriente"
Women ||--o{DNI:DNI
Men ||--o|DNI:DNI
```
``` mermaid
erDiagram
Men{
string DNI PK
string esposa FK
string nombre}
Women{string DNI PK
string esposo FK
string nombre}
Men |o--o|Women:"Conyugue Europa"

```
``` mermaid
erDiagram
Men{
string DNI PK
string esposa FK
string nombre}
Women{string DNI PK
string esposo FK
string nombre}
DNI{
string DNI PK
string nombre FK
string nombre}
Men |o--o|Women:"Conyugue Europa"
Men |o--o{Women:"Conyugue Oriente"
Women ||--|{DNIwomen:DNI
```



``` mermaid
erDiagram
Paises{
string Pais PK
string Continente FK
}
CCAA{
string Comunidad PK
string Pais FK
}
PROV{
string Nombre PK
string Comunidad FK
int poblacion 
}

Paises||--|{CCAA:GO
CCAA||--|{PROV:GO


