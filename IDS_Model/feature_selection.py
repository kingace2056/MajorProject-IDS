import pandas as pd
import numpy as np
import time
import pickle
start=time.time()
df=pd.read_csv('Oversampled_dataset.csv', sep=',')
df["ip.proto"].fillna(-1,inplace=True)
df.fillna(0, inplace=True)
print(df.isnull().any(axis=0))
#df.to_csv("cc.csv",index=False)

#####_---________---__--__--__-__--_--__-_--_-_

######__----_--__-__--_--_-__-__-__--_--_-__--_
X=pd.DataFrame(df.iloc[:, [1,2,3,4,5,6,7,8,9,10,11,12]])

y=pd.DataFrame(df.iloc[:,-1])


# from sklearn.model_selection import train_test_split

# X_train , X_test , y_train, y_test=train_test_split(X,y,test_size=0.1,random_state=3)


# from sklearn.ensemble import RandomForestClassifier

# classifier= RandomForestClassifier(n_estimators=20,criterion='gini',random_state=3,max_depth=3)
# classifier.fit(X_train,y_train)

# y_pred=classifier.predict(X_test)
# print (y_pred)

# print ((X_test))    
# from sklearn.metrics import accuracy_score
# print(accuracy_score(y_train,classifier.predict(X_train)))
# print (accuracy_score(y_test,y_pred))
# #print(type(y_pred))
# print (time.time()-start)  

# pickle.dump(classifier,open("model.txt", 'wb'))

# with open('m.txt', 'w') as f:
#     for item in y_train["normality"]:
#         f.write("%s\n" % item)

# from sklearn.metrics import confusion_matrix    
# print(confusion_matrix(y_test, y_pred))

##########_______----__---_--__--_-__-__--_-__-__--_-


import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.feature_selection import SelectFromModel

from sklearn.model_selection import train_test_split

X_train , X_test , y_train, y_test=train_test_split(X,y,test_size=0.3,random_state=3)
sel = SelectFromModel(RandomForestClassifier(n_estimators = 100))
sel.fit(X_train, y_train)
print(sel.get_support())

selected_feat= X_train.columns[(sel.get_support())]
print(len(selected_feat))

print(selected_feat)

#pd.series(sel.estimator_,feature_importances_.ravel()).hist()