use world;
select count(*) from city where district = 'Galicia';

select count(*) from city where district = 'Andalusia' or 
district='Galicia';

-- ESTA
select id, district, name 
from city 
where district = 'Andalusia' or  district='Galicia'
order by population desc;

select district as comunidad, max(population) as poblacion
from city 
where 
 district = 'Andalusia' or district ='Galicia'
group by district;

select district, name, population
from city
 where countrycode='ESP'and 
 population in(

select  max(population) as poblacion
from city 
where 
 district = 'Andalusia' or district ='Galicia'
group by district) ;

select district,count(*)  as ciudades from city where Countrycode='ESP' group by district;

update city set distrid ='Cataluña'
where district ='Katalonia';

select id, name 
from city 
where countrycode ='ESP' and district ='Katalonia';


update city set district ='Esuskadi'
where district ='Baskimaa' and countrycode ='ESP';

select id, name, district 
from city

where district in ('Euskadi','Pais Vasco');
desc city;

insert into city (name, countrycode,district, population)
values ('Portugalete','ESP','Euskadi',800);
delete from city where name='Portugalete'and countrycode='ESP'
;
