# Порядок deploy

Deploy делается с помощью yc  
Утановите yc и создайте профиль

### Начало работы с интерфейсом командной строки
https://cloud.yandex.ru/docs/cli/quickstart

### Создание профиля
yc init
yc config profile create as006

yc config set folder-id b1gt***************
yc config set --token AQAAA*************

yc config set cloud-id b1gc**************
yc config profile get as006

### установить парсер json - нужен для yc
sudo apt-get install jq

# Запуск deploy
### Из корня проекта запустите:
./s3-compress-after-presign/deploy/first-setup-func.sh  
Эта команда создает новую функцию и делает ее публичной.  
У вновь созданной функции запрашивается function_id и записывает в файл.

Далее запускайте создание экземпляра функции:  
./s3-compress-after-presign/deploy/deploy.sh


