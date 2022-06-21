import pandas as pd
df=pd.read_csv('first_dataset_3_attacks.csv', sep=',',header=None)

l=list(df[6])
s=[]
num=[]
for i in l:
    if (i.startswith("GET")):
        a = i.split("=")
        b = (a[1].split(" "))
        num.append(b[0])
    else:
        num.append("null")



print (num)
df["Value"]=num

df.to_csv('Sahil.csv')
