#!/bin/bash
yum update -y
# - npm run rollback
# - npm run migrate
# - npm run seed
systemctl start httpd
systemctl enable httpd
