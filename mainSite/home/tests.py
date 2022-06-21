from django.test import LiveServerTestCase
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException
import os
import subprocess
import time
import random

# setting path for geckodriver (firefox driver for selenium)
CUR_DIR = os.path.dirname(os.path.abspath(__file__))
os.environ["PATH"] += os.pathsep + os.path.join(CUR_DIR, 'geckodriver')
# adding geckodriver to /usr/bin if not present
subprocess.call([os.path.join(CUR_DIR, 'addGeckoToUsrBin.sh')])
print('.')

print('starting django server in new terminal.\n.')
subprocess.call(['gnome-terminal', '--', 'python3', 'manage.py', 'runserver'])
time.sleep(7)


class IDSTestCase(LiveServerTestCase):

    # setting up class variable
    login_credentials = {}
    test_count = 0

    # set up code for every test
    def setUp(self):
        # print('.\nstarting test ' + str(IDSTestCase.test_count) + '.')
        print('.\nstarting test --- ' + self.id() + ' --- .')
        IDSTestCase.test_count += 1
        # creating selenium test object
        self.selenium = webdriver.Firefox()
        super(IDSTestCase, self).setUp()
        self.vars = {}
        self.open_browser()

    # tear down code for every test
    def tearDown(self):
        self.selenium.quit()
        print('ending test.')
        super(IDSTestCase, self).tearDown()

    def wait_for_window(self, timeout=2):
        time.sleep(round(timeout / 1000))
        wh_now = self.selenium.window_handles
        wh_then = self.vars["window_handles"]
        if len(wh_now) > len(wh_then):
            return set(wh_now).difference(set(wh_then)).pop()

    # function to open browser, maximise it and connect to ids website
    def open_browser(self):
        selenium = self.selenium
        print('maximising browser window.')
        selenium.maximize_window()
        print('opening browser to url - http://127.0.0.1:8000.')
        selenium.get('http://127.0.0.1:8000')
        # check if page is loaded
        delay = 5  # seconds
        try:
            myElem = WebDriverWait(selenium, delay).until(
                EC.presence_of_element_located((By.ID, 'menu_item_home')))
            # print "Page is ready!"
        except TimeoutException:
            print("Loading took too much time!")

    def get_random_string(self, userOrPass='pass'):
        length = 16
        random_string = ''
        alphabets = 'abcdefghijklmnopqrstuvwxyz'
        cap_alpha = alphabets.upper()
        numbers = '1234567890'
        sp_chars = '`~!#$%^&*()<>?:"-=+_'
        for i in range(length // 4):
            random_string += alphabets[random.randint(0, len(alphabets) - 1)] + cap_alpha[random.randint(
                0, len(cap_alpha) - 1)] + numbers[random.randint(0, len(numbers) - 1)]
            if (userOrPass == 'pass'):
                random_string += sp_chars[random.randint(0, len(sp_chars) - 1)]
            else:
                pass
        random.shuffle(list(random_string))
        return str(random_string)

    def test_0_home_page(self):
        selenium = self.selenium
        print('testing home page.')
        print('moved to signup page.')
        selenium.find_element(By.ID, "menu_item_signup").click()
        print('moved to login page.')
        selenium.find_element(By.ID, "menu_item_login").click()
        print('moved to home page.')
        selenium.find_element(By.ID, "menu_item_home").click()
        assert ("intrusion" in selenium.page_source)

    def test_1_signup(self):
        selenium = self.selenium
        IDSTestCase.login_credentials = {
            'user': self.get_random_string('user'),
            'email': self.get_random_string('user') + "@" + self.get_random_string('user') + ".com",
            'password': self.get_random_string()
        }
        print('signing up using credentials: ' +
              str(IDSTestCase.login_credentials))
        selenium.find_element(By.ID, "menu_item_signup").click()
        selenium.find_element(By.NAME, "username").click()
        selenium.find_element(By.NAME, "username").send_keys(
            IDSTestCase.login_credentials['user'])
        selenium.find_element(By.NAME, "email").click()
        selenium.find_element(By.NAME, "email").send_keys(
            IDSTestCase.login_credentials['email'])
        selenium.find_element(By.NAME, "password1").send_keys(
            IDSTestCase.login_credentials['password'])
        selenium.find_element(By.NAME, "password2").send_keys(
            IDSTestCase.login_credentials['password'])
        selenium.find_element(By.ID, "signup_button").click()
        # check if page is loaded
        delay = 10  # seconds
        try:
            myElem = WebDriverWait(selenium, delay).until(
                EC.presence_of_element_located((By.ID, 'menu_item_logout')))
            # print "Page is ready!"
        except TimeoutException:
            print("Loading took too much time!")
        print('logging out.')
        selenium.find_element(By.ID, "menu_item_logout").click()

    def login(self):
        if(len(IDSTestCase.login_credentials) == 0):
            IDSTestCase.login_credentials = {
                'user': 'beproj',
                'email': 'beproj@gmail.com',
                'password': 's3rbeproj'
            }
        print('logging in using credentials: ' +
              str(IDSTestCase.login_credentials))
        self.selenium.find_element(By.ID, "menu_item_login").click()
        self.selenium.find_element(By.NAME, "username").click()
        self.selenium.find_element(By.NAME, "username").send_keys(
            IDSTestCase.login_credentials['user'])
        self.selenium.find_element(By.NAME, "password").click()
        self.selenium.find_element(By.NAME, "password").send_keys(
            IDSTestCase.login_credentials['password'])
        self.selenium.find_element(By.ID, "login_button").click()
        # check if page is loaded
        delay = 10  # seconds
        try:
            myElem = WebDriverWait(self.selenium, delay).until(
                EC.presence_of_element_located((By.ID, 'menu_item_logout')))
            # print "Page is ready!"
        except TimeoutException:
            print("Loading took too much time!")

    def test_2_login(self):
        if(len(IDSTestCase.login_credentials) == 0):
            IDSTestCase.login_credentials = {
                'user': 'beproj',
                'email': 'beproj@gmail.com',
                'password': 's3rbeproj'
            }
        print('logging in using credentials: ' +
              str(IDSTestCase.login_credentials))
        self.selenium.find_element(By.ID, "menu_item_login").click()
        self.selenium.find_element(By.NAME, "username").click()
        self.selenium.find_element(By.NAME, "username").send_keys(
            IDSTestCase.login_credentials['user'])
        self.selenium.find_element(By.NAME, "password").click()
        self.selenium.find_element(By.NAME, "password").send_keys(
            IDSTestCase.login_credentials['password'])
        self.selenium.find_element(By.ID, "login_button").click()
        # check if page is loaded
        delay = 10  # seconds
        try:
            myElem = WebDriverWait(self.selenium, delay).until(
                EC.presence_of_element_located((By.ID, 'menu_item_logout')))
            # print "Page is ready!"
        except TimeoutException:
            print("Loading took too much time!")
        print('logging out.')
        self.selenium.find_element(By.ID, "menu_item_logout").click()

    def test_3_layout_buttons(self):
        self.login()
        print('moved to home.')
        self.selenium.find_element(By.ID, "menu_item_home").click()
        print('moved to network logs.')
        self.selenium.find_element(By.ID, "menu_item_network_logs").click()
        print('moved to dashboard.')
        self.selenium.find_element(By.ID, "menu_item_dashboard").click()
        print('moved to visualisations.')
        self.selenium.find_element(By.ID, "menu_item_visualisations").click()
        print('moved to notifications.')
        self.selenium.find_element(By.ID, "menu_item_notifications").click()
        print('started tshark.')
        self.selenium.find_element(By.ID, "menu_item_tshark").click()
        print('logging out.')
        self.selenium.find_element(By.ID, "menu_item_logout").click()

    def test_4_dashboard_buttons(self):
        self.login()
        print('moved to dashboard.')
        self.selenium.find_element(By.ID, "menu_item_dashboard").click()
        print('moved to burglar alarm.')
        self.selenium.find_element(By.ID, "menu_item_alarm").click()
        reset_button = self.selenium.find_element(
            By.ID, "reset_burglar_button")
        if(reset_button):
            print('reset alarm.')
            reset_button.click()
        print('cleared burglar logs.')
        self.selenium.find_element(By.ID, "clear_burglar_log_button").click()
        print('moved to car.')
        self.selenium.find_element(By.ID, "menu_item_car").click()
        print('logging out.')
        self.selenium.find_element(By.ID, "menu_item_logout").click()

    def test_5_visualisations_buttons(self):
        self.login()
        print('moved to visualisations.')
        self.selenium.find_element(By.ID, "menu_item_visualisations").click()
        print('moved to ModelComparison.')
        self.selenium.find_element(By.ID, "ModelComparison").click()
        print('moved to ConfusionMatrix.')
        self.selenium.find_element(By.ID, "ConfusionMatrix").click()
        print('moved to Correction.')
        self.selenium.find_element(By.ID, "Correction").click()
        print('moved to WithOverProtocol.')
        self.selenium.find_element(By.ID, "WithOverProtocol").click()
        print('moved to WithoutOverProtocol.')
        self.selenium.find_element(By.ID, "WithoutOverProtocol").click()
        print('moved to OAttackDis.')
        self.selenium.find_element(By.ID, "OAttackDis").click()
        print('moved to AttackDis.')
        self.selenium.find_element(By.ID, "AttackDis").click()
        print('moved to Disable.')
        self.selenium.find_element(By.ID, "Disable").click()
        print('logging out.')
        self.selenium.find_element(By.ID, "menu_item_logout").click()

    def test_6_github_link(self):
        self.login()
        print('opening github link.')
        self.vars["window_handles"] = self.selenium.window_handles
        self.selenium.find_element(By.ID, "github_link").click()
        self.vars["win5647"] = self.wait_for_window(2000)
        self.vars["root"] = self.selenium.current_window_handle
        print('switch to github window.')
        self.selenium.switch_to.window(self.vars["win5647"])
        self.selenium.close()
        print('switch back to ids window.')
        self.selenium.switch_to.window(self.vars["root"])
        print('logging out.')
        self.selenium.find_element(By.ID, "menu_item_logout").click()

    def test_7_settings_menu(self):
        self.login()
        print('opening settings tab.')
        self.selenium.find_element(
            By.CSS_SELECTOR, ".icon:nth-child(2)").click()
        print('disabling dashboard sound.')
        self.selenium.find_element(
            By.CSS_SELECTOR, ".item:nth-child(2) > .ui > label").click()
        print('opening settings tab.')
        self.selenium.find_element(By.ID, "ddown_item_settings").click()
        print('disabling notifications sound.')
        self.selenium.find_element(By.CSS_SELECTOR, ".checked > label").click()
        print('opening settings tab.')
        self.selenium.find_element(By.ID, "ddown_item_settings").click()
        print('enabling dashboard sound.')
        self.selenium.find_element(
            By.CSS_SELECTOR, ".item:nth-child(2) > .ui > label").click()
        print('opening settings tab.')
        self.selenium.find_element(By.ID, "ddown_item_settings").click()
        print('enabling notifications sound.')
        self.selenium.find_element(
            By.CSS_SELECTOR, ".item:nth-child(1) label").click()
        print('logging out.')
        self.selenium.find_element(By.ID, "menu_item_logout").click()
