docker pull kartoza/geoserver
docker run -d -p 8080:8080 --name geoserver -e GEOSERVER_ADMIN_USER=admin -e GEOSERVER_ADMIN_PASSWORD=geoserver -v /home/tungba103/geoserver/data_dir:/opt/geoserver/data_dir kartoza/geoserver


# Import data to postgis
raster2pgsql -s 4326 -I -C -M -F /etc/postgresql/16/months/PVOUT_01.tif -t auto geotiff_table | psql -d hello_world

for file in /etc/postgresql/16/months/*.tif; do
  raster2pgsql -s 4326 -I -C -M -F "$file" -t auto geotiff_table | psql -d hello_world
done

raster2pgsql -s 4326 -I -C -M -F /etc/postgresql/16/months/PVOUT_01.tif -t auto geotiff_table | PGPASSWORD=postgres psql -h localhost -p 5439 -U postgres -d postgis


<!-- Docker compose -->
docker-compose up
docker-compose up -d
docker-compose stop
docker-compose down
docker-compose down -v
docker-compose ps
docker-compose logs
docker-compose logs geoserver
docker-compose restart
docker-compose build
docker-compose exec geoserver /bin/bash

<!-- Connect db -->
docker exec -it postgis bash
psql -U postgres -d postgis
CREATE EXTENSION postgis;
CREATE EXTENSION postgis_raster;
