#!/bin/bash

echo 'password will be entered automatically...'
echo 'if you have a different password, replace s3rbeproj in kill_all_tshark.sh.'
echo '.'
if sudo -n true
then
  echo 'already in sudo...'
else
  echo abc12345# | sudo -S su
fi
echo .
ps -ef | grep tshark | grep -v grep | awk '{print $2}' | xargs -t sudo kill -9