import pandas as pd
import time
import pickle

df=pd.read_csv('Oversampled_dataset.csv', sep=',')
df["ip.proto"].fillna(-1,inplace=True)
df.fillna(0, inplace=True)
#print(df.isnull().any(axis=0))
#df.to_csv("cc.csv",index=False)
performance = []
#####_---________---__--__--__-__--_--__-_--_-_

######__----_--__-__--_--_-__-__-__--_--_-__--_
X=pd.DataFrame(df.iloc[:, [1,2,3,4,5,6,7,8,9,10,11,12]])

y=pd.DataFrame(df.iloc[:,-1])


from sklearn.model_selection import train_test_split

X_train , X_test , y_train, y_test=train_test_split(X,y,test_size=0.1,random_state=3)


from sklearn.ensemble import RandomForestClassifier

classifier= RandomForestClassifier(n_estimators=20,criterion='gini',random_state=3,max_depth=5)
classifier.fit(X_train,y_train)

y_pred=classifier.predict(X_test)

from sklearn.metrics import accuracy_score
#print(accuracy_score(y_train,classifier.predict(X_train)))
print("Random Forest")
acc=(accuracy_score(y_test,y_pred))
acc=round(acc,4)
print (acc)
performance.append(acc)
# # ##########_______----__---_--__--_-__-__--_-__-__--_-
from sklearn.naive_bayes import GaussianNB

gnb=GaussianNB()
y_pred = gnb.fit(X_train, y_train).predict(X_test)
print("Naive Bayes")
acc=(accuracy_score(y_test,y_pred))
acc=round(acc,4)
print (acc)
performance.append(acc)
# ######_______-------______----_____---______-

from sklearn.neighbors import KNeighborsClassifier
start=time.time()
neigh = KNeighborsClassifier(n_neighbors=3)
y_pred=neigh.fit(X_train,y_train).predict(X_test)
print("KNN")
acc=(accuracy_score(y_test,y_pred))
acc=round(acc,4)
print (acc)
performance.append(acc)
# # #_____------_______-----___------_----__-__--_--_

# from sklearn import svm
# clf = svm.SVC()
# y_pred=clf.fit(X_train, y_train).predict(X_test)
# print("SVM")
# print (accuracy_score(y_test,y_pred))
# # performance.append(accuracy_score(y_test,y_pred))

# #____-------______----______----_____--
# # from sklearn.neural_network import MLPClassifier

# # clf = MLPClassifier(hidden_layer_sizes=(8,8,8), random_state=5,max_iter=500)
# # y_pred=clf.fit(X_train, y_train).predict(X_test)
# # print("MLP")
# # print (accuracy_score(y_test,y_pred))
# # performance.append(accuracy_score(y_test,y_pred))

# #_____-----_____----__--_--____--_-_--_-_---
from sklearn import tree
clf=tree.DecisionTreeClassifier(criterion='gini',random_state=3,max_depth=3)
y_pred=clf.fit(X_train, y_train).predict(X_test)
print("Decision Tree")
acc=(accuracy_score(y_test,y_pred))
acc=round(acc,4)
print (acc)
performance.append(acc)


import matplotlib.pyplot as plt; plt.rcdefaults()
import numpy as np
import matplotlib.pyplot as plt

fig, ax = plt.subplots()
def autolabel(rects):
    """Attach a text label above each bar in *rects*, displaying its height."""
    for rect in rects:
        height = rect.get_height()
        ax.annotate('{}'.format(height),
                    xy=(rect.get_x() + rect.get_width() / 2, height),
                    xytext=(0, 3),  # 3 points vertical offset
                    textcoords="offset points",
                    ha='center', va='bottom')


objects = ('Random Forest', 'Naive Bayes', 'KNN', 'Decision Tree')
y_pos = np.arange(len(objects))
s=plt.bar(y_pos, performance, align='center', alpha=0.5)
plt.xticks(y_pos, objects)
plt.ylabel('Accuracy')
plt.title('ML Models')
autolabel(s)
plt.show()
plt.savefig('model.png', bbox_inches='tight')

