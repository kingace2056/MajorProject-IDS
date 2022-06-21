import pandas as pd
import numpy as np
import time
import pickle
import seaborn as sns
import matplotlib.pyplot as plt
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


from sklearn.model_selection import train_test_split

X_train , X_test , y_train, y_test=train_test_split(X,y,test_size=0.1,random_state=3)


from sklearn.ensemble import RandomForestClassifier

classifier= RandomForestClassifier(n_estimators=20,criterion='gini',random_state=3,max_depth=3)
classifier.fit(X_train,y_train)

y_pred=classifier.predict(X_test)
# print (y_pred)
# print ((X_test)) 

from sklearn.metrics import accuracy_score

train_scores=accuracy_score(y_train,classifier.predict(X_train))
print(train_scores)

test_scores=accuracy_score(y_test,y_pred)
print (test_scores)
#print(type(y_pred))
print (time.time()-start)  

pickle.dump(classifier,open("model.txt", 'wb'))

with open('m.txt', 'w') as f:
    for item in y_train["normality"]:
        f.write("%s\n" % item)

from sklearn.metrics import confusion_matrix    
Confusion_matrix=confusion_matrix(y_test, y_pred)
from sklearn.metrics import plot_confusion_matrix
print(Confusion_matrix)
titles_options = [("Confusion matrix, without normalization", None),
                  ("Normalized confusion matrix", 'true')]
for title, normalize in titles_options:
    disp = plot_confusion_matrix(classifier, X_test, y_test,                                
                                 cmap=plt.cm.Blues,
                                 normalize=normalize)
    disp.ax_.set_title(title)

    print(title)
    print(disp.confusion_matrix)

plt.show()

data = pd.read_csv('Oversampled_dataset.csv', sep=',')

corr = data.corr()
ax = sns.heatmap(
    corr, 
    vmin=-1, vmax=1, center=0,
    cmap=sns.diverging_palette(20, 220, n=200),
    square=True
)
ax.set_xticklabels(
    ax.get_xticklabels(),
    rotation=45,
    horizontalalignment='right'
);
plt.show()

# Univariate Selection

import numpy as np

from sklearn.feature_selection import SelectKBest
from sklearn.feature_selection import f_classif
data = pd.read_csv('Oversampled_dataset.csv', sep=',')
ind_col = data.iloc[:,0:12]  #independent columns
target = data.iloc[:,-1]    #target column i.e normality code

#apply SelectKBest class to extract top 10 best features
bestfeatures = SelectKBest(score_func=f_classif)
fit = bestfeatures.fit(X,y)
dfscores = pd.DataFrame(fit.scores_)
dfcolumns = pd.DataFrame(X.columns)

#concat two dataframes for better visualization 
featureScores = pd.concat([dfcolumns,dfscores],axis=1)
featureScores.columns = ['Specs','Score']  #naming the dataframe columns
print(featureScores.nlargest(12,'Score'))  #print 10 best features





# from sklearn.ensemble import ExtraTreesClassifier
# import matplotlib.pyplot as plt

# model_extra = ExtraTreesClassifier()
# model_extra.fit(X,y)
# print(model_extra.feature_importances_) #use inbuilt class feature_importances of tree based classifiers
# #plot graph of feature importances for better visualization
# feat_importances = pd.Series(model_extra.feature_importances_, index=ind_col.columns)
# feat_importances.nlargest(12).plot(kind='barh')
# plt.show()

import seaborn as sns
#get correlations of each features in dataset
corrmat = data.corr()
top_corr_features = corrmat.index
plt.figure(figsize=(20,20))
#plot heat map
g=sns.heatmap(data[top_corr_features].corr(),annot=True,cmap="RdYlGn")
plt.show()


