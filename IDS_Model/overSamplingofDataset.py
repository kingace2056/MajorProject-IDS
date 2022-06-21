import pandas as pd
import time
import pickle
start=time.time()
df=pd.read_csv('c_dataset1.csv', sep=',')
df["ip.proto"].fillna(-1,inplace=True)
df.fillna(0, inplace=True)
print(df.isnull().any(axis=0))
#df.to_csv("cc.csv",index=False)

X=pd.DataFrame(df.iloc[:, [1,2,3,4,5,6,7,8,9,10,11,12]])

y=pd.DataFrame(df.iloc[:,-1])

print(df['normality'].value_counts())

#print(df.columns)
from imblearn.over_sampling import ADASYN

ada = ADASYN()
X_resampled, y_resampled = ada.fit_resample(df.iloc[:,0:13], df['normality'])

# print(X_resampled)
# print(y_resampled)
#print(len(X_resampled.shape))
data_oversampled = pd.concat([pd.DataFrame(X_resampled), pd.DataFrame(y_resampled)], axis=1)
print(data_oversampled)

data_oversampled.columns = df.columns

print(data_oversampled['normality'].value_counts())

data_oversampled.to_csv("Oversampled_dataset.csv",index=False)