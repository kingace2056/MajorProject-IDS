# Real Time Intrusion Detection System for IoT Networks using Random Forest

The project contains a full stack web app created with React front end and Django back end. It is an Intrusion Detection system which detects attacks in real time that occur within the IoT network in consideration.

## Steps to install and run the application:

1. Ensure you have python 3.6.9, node v12.16.0, npm 6.14.5, apache 2.4.29.

2. Clone the repo and cd to be-project
```bash
cd be-project
 ```


3. Create virtual environment for backend development
```bash
 virtualenv env
```

4. Activate the virtual environment
```bash
 source env/bin/activate
```

5. Install backend dependencies present in requirements.txt
```bash
 pip3 install -r requirements.txt
```

6. Install frontend dependencies present in package.json
```bash
 npm i
```

7. Build production folder of the front end
```bash
 npm run build
```

8. Setup data base with backend
```bash
 python3 manage.py migrate
```

9. Setup apache2 server - install apache2 or xampp and copy the ids folder in the web server directory. If you've installed xampp, you need to find the htdocs dir. If you've installed apache2, run this command from be-project dir.
```bash
cd be-project
sudo cp ids /var/www/html/ -r
```

10. Run backend + build server
```bash
 python3 manage.py runserver 0.0.0.0:8000
```

11. To Simulate the node (if actual node is not used) 
```bash
 python3 home/node_simulator.py
```

12. The shell script for tshark is in the home folder of be-project.<br/>
Before you run it, you'll have to replace s3rbeproj with your computer's password.<br/>
```bash
 cd home
 ./tshark_shell_script.sh
```
Make sure the script has permissions to execute. If not, run
```bash
cd home
chmod -v +x tshark_shell_script.sh
```

13. Kill all instances of tshark
The shell script for kill_all_tshark is in the home folder of be-project.<br/>
Before you run it, you'll have to replace s3rbeproj with your computer's password.
```bash
cd home
./kill_all_tshark.sh
```
Make sure the script has permissions to execute. If not, run
```bash
cd home
chmod -v +x kill_all_tshark.sh
```

14. Testing

React Jest Testing
```bash
 npm test
```
Django Selenium Testing
```bash
 python3 manage.py test home.tests
```
For selenium testing, Make sure the script addGeckoToUsrBin has permissions to execute. If not, run
```bash
cd home
chmod -v +x addGeckoToUsrBin.sh
```
# Important notes
For your own data collection please follow the steps specified in the Thesis , I'd suggest you to read theis completely before running the project. 

# TODO 
Use standard dataset to train model , 
Decrease false positive rate 