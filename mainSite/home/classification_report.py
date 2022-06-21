import pandas as pd
import os
from sklearn.metrics import confusion_matrix, classification_report, accuracy_score

workpath = os.path.dirname(os.path.abspath(__file__))
resultfile = pd.read_csv(os.path.join(workpath, "resultfile.csv"))
actual_val = resultfile.iloc[:, 0]
predicted_val = resultfile.iloc[:, 1]
print(accuracy_score(actual_val, predicted_val))
print(confusion_matrix(actual_val, predicted_val))
print(classification_report(actual_val, predicted_val))
