# remote_file_server

## Setup MySQL Server

### Setup on Raspberry Pi (Raspbian)

1. Install MariaDB using the following commands:
```bash
sudo apt update
sudo apt upgrade
sudo apt install mariadb-server
```
Optionally, you can also run the following to make your install more secure. You will be prompted several times, it is up to you which you want to implement, but at the very least a password for 'root' is suggested.
```bash
sudo mysql_secure_installation
```
2. Now you can start up the MySQL command line:
```bash
sudo mysql -u root -p
```
3. First, create the database:
```mysql
CREATE DATABASE remote_server;
```
4. Next, create a user for the application:
```mysql
CREATE USER 'remote_server'@'localhost' IDENTIFIED BY 'remote_server';
```
> Note: You should change the user name and password to something unique, and use those for the remaining commands. This will also need to be done in app/backend/server.js
5. Third, give the user permissions:
```mysql
GRANT ALL PRIVILEGES ON remote_server.* TO 'remote_server'@localhost;
```
> Note: If you want to allow your new user access from any other computer on the network, rerun the command with '%' substituted for localhost
6. Finalize the user privileges:
```mysql
FLUSH PRIVILEGES;
```


If you want to confirm that the privileges were save, you can run:
```mysql
SHOW GRANTS FOR 'remote_server'@localhost;
```

### Setup for Other Systems
There should be a plethora of tutorials on how to install MySQL on your OS. Once that is complete, and you have opened the MySQL command line, you should be able to use the instructions above starting at step 3.