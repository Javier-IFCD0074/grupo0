# Hola
## Sección
```mermaid
graph RL

    Euskadi --Egun On--> A[Bizkaia]
    Euskadi --> B[Guipúzcoa]
    Euskadi -.-> C[Álava]

    style 0 fill:yellow
    style A fill:red
    style B fill:blue
    style C fill:green
```

```mermaid
graph RL
    Galicia --> 1[La Coruña]
    Galicia --> 2[Orense]
    Galicia -.-> 3[Lugo]
    Galicia --> 4[Pontevedra]
    Galicia -----> Galicia

1-->2
3-->4
```

```mermaid
graph RL
    Galicia --> A[La Coruña]
    Galicia --> B[Orense]
    Galicia -.-> C[Lugo]
    Galicia --> D[Pontevedra]
    Galicia -----> Galicia

    style Galicia fill:yellow
    style A fill:red
    style B fill:blue
    style C fill:green
    style D fill:green
```
```mermaid
sankey-beta
Semana,ITET,25
Semana,Cine,7
Semana,Pasear,8
```
```mermaid
    pie
        title Un Gráfico de Sectores
        "Segmento A" : 5
        "Segmento B" : 15
```

```mermaid
    pie
        title Un Gráfico de Sectores
        "Segmento A" : 25
        "Segmento B" : 75
```

```mermaid
graph TB
    User--port3000--> API --PORT3306-->DB
```
## Occidente
```mermaid
erDiagram

Men {
String DNI PK
String DNI_Esposa FK
String Nombre
}

DNIS {
    Int ID PK
    String DNI_Esposa FK
    String DNI_Esposo FK
}

Men ||--|| DNIS: ER


Women {
String DNI PK
String DNI_Esposo FK
String Nombre
}

DNIS ||--|| Women: ER
```
## Oriente 
:::mermaid
erDiagram
Men {
String DNI PK
String DNI_Esposa FK
String Nombre
}
Women {
String DNI PK
String DNI_Esposo FK
String Nombre
}
Men |o--o{ Women: ER
:::



