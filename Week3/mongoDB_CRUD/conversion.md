### Steps using the CLI

> mysql -u root -p
> mysql> show databases;
> mysql> USE world;

#### If we try to execute the commands from the MAKEME.md file we will get the following error

_#1290 - The MySQL server is running with the --secure-file-priv option so it cannot execute this statement_

##### To fix the error we need to execute the following command then add the result to the previous commands

> mysql> SHOW VARIABLES LIKE "secure\*file_priv";
> select \* into outfile '/var/lib/mysql-files/city.csv' FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' from city;
> select \_ into outfile '/var/lib/mysql-files/country.csv' FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' from country;
> select \* into outfile '/var/lib/mysql-files/countrylanguage.csv' FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' from countrylanguage;

### Steps using Atlas

_After creating our account to use Atlas_

1. We create a **Project**
2. We create a **Cluster**
   1. Create a **Database user**
   2. Specify a **Network Access**

### Steps using MongoDB Compass

1. Create Database _world_
2. Create Collection _city_
3. ADD DATA -> Import File
   1. Select File _city.csv_
   2. Select Input File Type _CSV_
   3. Options -> Specify Fields and Types (unselect ID, converted Population into _Number_)
4. Repeat **Step 3** for _country.csv_
5. Repeat **Step 3** for _countrylanguage.csv_
