import pandas as pd
import time
import pickle
import matplotlib.pyplot as plt
import numpy as np
start=time.time()
df=pd.read_csv('2018.csv', sep=',')
#######
df.replace([np.inf, -np.inf], np.nan, inplace=True)
df.drop(['Timestamp'], axis=1, inplace=True)
########
#df["ip.proto"].fillna(-1,inplace=True)
#df.fillna(0, inplace=True)
print(df.isnull().any(axis=0))
#df.to_csv("cc.csv",index=False)

#####_---________---__--__--__-__--_--__-_--_-_

######__----_--__-__--_--_-__-__-__--_--_-__--_
X=pd.DataFrame(df.iloc[:, [1,2,3,4,5,6,7,8,9,10,11,12]])

y=pd.DataFrame(df.iloc[:,-1])


from sklearn.model_selection import train_test_split

X_train , X_test , y_train, y_test=train_test_split(X,y,test_size=0.1,random_state=3)


from sklearn.ensemble import RandomForestClassifier

classifier= RandomForestClassifier(n_estimators=20,criterion='gini',random_state=3,max_depth=3)
classifier.fit(X_train,y_train)

y_pred=classifier.predict(X_test)
print (y_pred)

print ((X_test))    
from sklearn.metrics import accuracy_score
print(accuracy_score(y_train,classifier.predict(X_train)))
train_scores = accuracy_score(y_train,classifier.predict(X_train))
test_scores = accuracy_score(y_test,y_pred)
print("Helllllo")
print (accuracy_score(y_test,y_pred))
#print(type(y_pred))
print (time.time()-start)  

pickle.dump(classifier,open("model.txt", 'wb'))

#with open('m.txt', 'w') as f:
#    for item in y_train["normality"]:
#        f.write("%s\n" % item)
from sklearn.metrics import confusion_matrix    
print(confusion_matrix(y_test, y_pred)) 




##########_______----__---_--__--_-__-__--_-__-__--_-

train_mean = np.mean(train_scores, axis=1)
train_std = np.std(train_scores, axis=1)

# Calculate mean and standard deviation for test set scores
test_mean = np.mean(test_scores, axis=1)
test_std = np.std(test_scores, axis=1)

# Plot mean accuracy scores for training and test sets
plt.plot(param_range, train_mean, label="Training score", color="black")
plt.plot(param_range, test_mean, label="Cross-validation score", color="dimgrey")

# Plot accurancy bands for training and test sets
plt.fill_between(param_range, train_mean - train_std, train_mean + train_std, color="gray")
plt.fill_between(param_range, test_mean - test_std, test_mean + test_std, color="gainsboro")

# Create plot
plt.title("Validation Curve With Random Forest")
plt.xlabel("Number Of Trees")
plt.ylabel("Accuracy Score")
plt.tight_layout()
plt.legend(loc="best")
plt.show()
