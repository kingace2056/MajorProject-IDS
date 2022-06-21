import json
import time
import os
import pickle
import sklearn
import pandas as pd

line = [123839512302085, 42, 167275820076079, 281474976710655, 0, 0, 0, 0, 0, 0, 0, -4]


def modelTesting():
    filename = "model2.txt"
    infile = open(filename, "rb")
    rf_model = pickle.load(infile)
    ip_df = pd.DataFrame([line])
    assert rf_model.predict(ip_df)[0] == 4, "Should be 4"


modelTesting()
print("Everything Passed")
