# import pandas as pd 
# import numpy as np 
# import matplotlib.pyplot as plt 
# plt.style.use('seaborn')
# df = pd.read_csv('Oversampled_dataset.csv') 
# pf=df['ip.proto']
# dict={0:'normal',1:'Wrong Setup',2:'ddos', 3:'Data type probing',4:'scan attack',5:'mitm'}
# df['ip.proto'].replace(dict,inplace=True)
# # table = pd.pivot_table(data=df,index='ip.proto',aggfunc=np.sum)
# # print(table)
# pd.value_counts(df['ip.proto']).plot(kind='pie',autopct='%.1f%%' )
# plt.show()
# print(df['ip.proto'].value_counts())

# import matplotlib.pyplot as plt

# f = plt.figure(figsize=(19, 15))
# plt.matshow(df.corr(), fignum=f.number)
# plt.xticks(range(df.shape[1]), df.columns, fontsize=14, rotation=45)
# plt.yticks(range(df.shape[1]), df.columns, fontsize=14)
# cb = plt.colorbar(ax=None)
# cb.ax.tick_params(labelsize=14)
# plt.title('Correlation Matrix', fontsize=16)
# plt.show()

# def correlation_matrix(df):
#     from matplotlib import pyplot as plt
#     from matplotlib import cm as cm

#     fig = plt.figure()
#     ax1 = fig.add_subplot(111)
#     cmap = cm.get_cmap('jet', 30)
#     cax = ax1.imshow(df.corr(), interpolation="nearest", cmap=cmap)
#     ax1.grid(True)
#     plt.title('Abalone Feature Correlation')
#     labels=['Sex','Length','Diam','Height','Whole','Shucked','Viscera','Shell','Rings',]
#     ax1.set_xticklabels(labels,fontsize=6)
#     ax1.set_yticklabels(labels,fontsize=6)
#     # Add colorbar, make sure to specify tick locations to match desired ticklabels
#     fig.colorbar(cax, ticks=[.75,.8,.85,.90,.95,1])
#     plt.show()

# correlation_matrix(df)



# import pandas as pd
# pf=pd.read_csv('/Users/virus/Desktop/IDS_Model/Resources/protocol-numbers-1.csv', sep=',')
# #print(pf["Keyword"])

# key=pf["Keyword"]
# value=pf["Decimal"]
# print(pf.count)
# print(key)
# dict={}
# for i in range(0,pf.count):
#     dict.a

# import csv
# reader = csv.reader(open('/Users/virus/Desktop/IDS_Model/Resources/protocol-numbers-1.csv', 'r'))
# d = {}
# for row in reader:
#     try:
#         k=float(row[0])
#         v = row[1]
#     except:
#         k=0
#         v=0
#     d[k] = v
# print(d)


# import pandas as pd 
# import numpy as np 
# import matplotlib.pyplot as plt 
# plt.style.use('seaborn')
# df = pd.read_csv('c_dataset1.csv') 
# pf=df['ip.proto']
# dict={0:'normal',1:'Wrong Setup',2:'ddos', 3:'Data type probing',4:'scan attack',5:'mitm'}
# df['ip.proto'].replace(d,inplace=True)
# # table = pd.pivot_table(data=df,index='ip.proto',aggfunc=np.sum)
# # print(table)
# pd.value_counts(df['ip.proto']).plot(kind='line' )
# plt.show()
# print(df['ip.proto'].value_counts())

import pandas as pd 
import numpy as np 
import matplotlib.pyplot as plt 
plt.style.use('seaborn')
df = pd.read_csv('c_dataset1.csv') 
pf=df['ip.proto']
# dict={0:'normal',1:'Wrong Setup',2:'ddos', 3:'Data type probing',4:'scan attack',5:'mitm'}
# df['ip.proto'].replace(d,inplace=True)
# table = pd.pivot_table(data=df,index='ip.proto',aggfunc=np.sum)
# print(table)
pd.value_counts(df['ip.src']).plot(kind='bar' )
plt.show()
print(df['ip.dst'].value_counts())
