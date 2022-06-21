from django.shortcuts import render
from background_task import background
import subprocess
import os
from django.http import JsonResponse


cur_path = os.path.dirname(os.path.abspath(__file__))
# run tshark script after 1 second of index reload
@background(schedule=1)
def run_tshark():
    print("running tshark_shell_script.sh ...")
    subprocess.call(["gnome-terminal", "--", cur_path + "/tshark_shell_script.sh"])


# kill all instances of tshark before running tshark
@background(schedule=1)
def kill_tshark():
    print("killing all instances of tshark ...")
    subprocess.call([cur_path + "/kill_all_tshark.sh"])


# render index -> linked to front end


def index(request):
    kill_tshark()
    run_tshark()
    return render(request, "index.html")


def restart_tshark(request):

    print("killing all instances of tshark ...")
    subprocess.call([cur_path + "/kill_all_tshark.sh"])

    print("running tshark_shell_script.sh ...")
    subprocess.call(["gnome-terminal", "--", cur_path + "/tshark_shell_script.sh"])

    response = {"success": "true"}

    return JsonResponse(response)
