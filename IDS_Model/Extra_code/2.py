import pandas as pd
import time
start=time.time()
df=pd.read_csv('first_dataset_3_attacks.csv', sep=',')
l=list(df["Info"])
df=df.drop(axis=1,columns="Info")
# print (df.columns)
s=[]
num=[]
for i in range(0,len(l)):
    if (l[i].startswith("GET")):
        #print("Hh")
        a = l[i].split("=")
        b = (a[1].split(" "))
        num.append(b[0])
        #print(b[0])
    elif(l[i].startswith("Echo")):
        num.append("ping")
    else:
    
        df=df.drop(i)
    i+=1
print (len(num)) 


normality=[]
for i in range(0,len(num)):
    if num[i].replace(".","",1).isdigit():
        if float(num[i]) < 2:
            normality.append(1)                     # 1 - wrong setup
        else:
            normality.append(0)                     # normal
    else:
        if num[i]=="ping":
            normality.append(2)                     # ddos
        else:
            normality.append(3)                     #data type probing
        num[i]=-1
df["Value"]=num
df["normality"]=normality
df.to_csv('c_dataset.csv',index=False)
print (time.time()-start)