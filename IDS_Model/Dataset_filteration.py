# import pandas as pd
# pf=pd.read_csv('protocol-numbers-1.csv', sep=',')
# #print(pf["Keyword"])

# key=pf["Keyword"]
# value=pf["Decimal"]

# print(value.unique)

import pandas as pd
import time
start=time.time()
pf=pd.read_csv('raw_data_from_tshark.csv', sep='$')

pf.to_csv("sssss.csv",index=False)
# print(pf)
pf["ip.src"].fillna(0, inplace=True)
pf["ip.dst"].fillna(0, inplace=True)
# d.to_csv('c_dataset1.csv',index=False)
l=list(pf["_ws.col.Info"])
c=len(l)
s=[]
d=[]
num=[]
###############_______________------------__________------___________--____  
ip=list(pf["ip.src"])
dp=list(pf["ip.dst"])
sourceIP=[]
destIP=[]
ipSource=len(ip)
#############_______----------________------__________-----_________----__---
ss=list(pf["eth.src"])
dd=list(pf["eth.dst"])
#########_____________________-------________------___________-----______---
tt=list(pf["frame.time"])
tl=len(tt)
timeStamp=[]
######__________------------____________-----__________-------_____----ip address conversion
for i in range(0,len(ss)):
    if ip[i]==0:
        sourceIP.append(0)
        destIP.append(0)
    else:
        temp=ip[i].split(".")
        sourceIP.append("".join(temp))
        temp1=dp[i].split(".")
        destIP.append("".join(temp1))
#######______----------________------____________------___________---_______-mac address conversion to decimal
    ll=ss[i].split(":")
    m=dd[i].split(":")
    ll="".join(ll)
    ll=int(ll,16)
    m="".join(m)
    m=int(m,16)
    d.append(m)
    s.append(ll)
########______________--------------____________------___________-----______#Time conversion    
    td=tt[i].split(" ")[3].replace(":","").replace(".","")
    print(td)
    timeStamp.append(td)
pf["eth.src"]=s
pf["eth.dst"]=d

##################_---------------------------------    

pf["ip.src"]=sourceIP
pf["ip.dst"]=destIP
###############_______________------------__________------___________--____  
pf["frame.time"]=timeStamp
# ##############---------------------------------------
y=0
for i in range(0,c):  
    if(l[i].startswith("GET / HTTP/1.1 ")):
        num.append("-99")
    elif (l[i].startswith("GET")):  ###### wrong setup and data type probing
        a = l[i].split("=")
        b = (a[1].split(""))
        num.append(b[0])
    elif(l[i].startswith("Echo")):          ######### ddos
        num.append("ping")
    elif "duplicate " in l[i]:                  ############# mitm
        y+=1
        #print(y)
        num.append("mitm")    
    elif (l[i].startswith("Who")):              ############# scan 
        num.append("scan")   
        
       
    else:
       num.append("-99") 
    i+=1
print(y)
##################------Normality---------------///////////////////////////////////////    

normality=[]
for i in range(0,len(num)):
    if num[i].replace(".","",1).isdigit():
        if float(num[i]) > 2 and float(num[i]) < 400 :
            normality.append(1)                     # 1 - wrong setup
        else:
            normality.append(0)                     # normal
    elif num[i]=="ping":
        num[i]=-2
        normality.append(2)                           # ddos
    elif num[i].lstrip("-").isdigit():
        normality.append(0)
    elif num[i]=="scan":
        num[i]=-4
        normality.append(4)                        #### scan attack
    elif num[i]=="mitm":
        num[i]=-5
        normality.append(5)                        # mitm
    else:
        normality.append(3)                     #data type probing
        num[i]=-3
        
###################---------------------///////////////////////////////////////    

pf=pf.drop(axis=1,columns="_ws.col.Info")
pf["Value"]=num
pf["normality"]=normality
print(pf.dtypes)
pf.to_csv('c_dataset1.csv',index=False)
print (time.time()-start)  