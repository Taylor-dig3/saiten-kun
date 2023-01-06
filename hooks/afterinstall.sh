#!/bin/bash
yum update -y
# # - npm run rollback
# # - npm run migrate
# # - npm run seed
# npm install


#!/bin/bash

source ~/.bashrc
source ~/.bash_profile

node -v
echo $PATH

echo "diridou"
cd /var/www/html/
pwd

npm install
npm run migrate

echo "after install collect"
systemctl start httpd
systemctl enable httpd