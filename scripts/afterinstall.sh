#!/bin/bash
# yum update -y
# # - npm run rollback
# # - npm run migrate
# # - npm run seed
# npm install
#!/bin/bash
source ~/.bashrc
source ~/.bash_profile
node -v
echo $PATH
echo “diridou”
cd /var/www/html/
pwd
sudo chmod 777 package-lock.json
echo “echo npm install”
npm install
# npm run migrate
echo “after install collect”
# systemctl start httpd
# systemctl enable httpd
#chmod 777 package-lock.json #r
#chmod 777 package.json #r
#chmod 777 build