#!/bin/bash
yum update -y
systemctl start httpd
systemctl enable httpd