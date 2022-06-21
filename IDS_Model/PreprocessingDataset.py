import pandas as pd
import time
start=time.time()
# #first_dataset_3_attacks
df=pd.read_csv('dataset1.csv', sep=',')
l=list(df["Info"])
df=df.drop(axis=1,columns="Info")
# print (df.columns)
num=[]
prev_source=0
prev_destination=0
source=[]
destination=[]
ll=len(l)
print(ll)


###################----------Data Separation-----------///////////////////////////////////////  
c=0
e=0
for i in range(0,ll):
    if(l[i].startswith("GET / HTTP/1.1 ")):
        source.append(0)
        destination.append(0)
        num.append("-99")
        print("hel")
    elif (l[i].startswith("GET")):  ###### wrong setup and data type probing
        a = l[i].split("=")
        b = (a[1].split(" "))
        source.append(0)
        destination.append(0)
        num.append(b[0])
    elif(l[i].startswith("Echo")):          ######### ddos
        num.append("ping")
        source.append(0)
        destination.append(0)
    elif "="  in l[i] :
        if l[i].startswith("[TCP"):
            d=l[i].split(">")
            prev_source=(d[0].split("]")[1])
            prev_destination=(d[1].split("  ")[1].split(" ")[0])
            source.append(prev_source)
            destination.append(prev_destination)
            num.append("-99")
        else:
            d=l[i].split(">")
            prev_source=d[0]
            prev_destination=(d[1].split("  ")[1].split(" ")[0])
            source.append(prev_source)
            destination.append(prev_destination)
            num.append("-99")
    elif (l[i].startswith("Who")):              ############# scan 
        newCon=df["Destination"][i]
        if newCon.startswith("broadcast") or newCon.startswith("Liteon"):
            #e+=1
            num.append("scan")
        else:
            num.append("-99")
        source.append(0)
        destination.append(0)
        #num.append(b[0])
    elif "duplicate " in l[i]:                  ############# mitm
        print(l[i])
        source.append(0)
        destination.append(0)
        num.append("mitm")       
    else:
       source.append(0)
       destination.append(0)
       num.append("-99") 
    i+=1
    
###################------Normality---------------///////////////////////////////////////    
print(e)
normality=[]
for i in range(0,len(num)):
    if num[i].replace(".","",1).isdigit():
        if float(num[i]) > 2 and float(num[i]) < 400 :
            normality.append(1)                     # 1 - wrong setup
        else:
            normality.append(0)                     # normal
    elif num[i]=="ping":
        num[i]=-1
        normality.append(2)                           # ddos
    elif num[i].lstrip("-").isdigit():
        normality.append(0)
    elif num[i]=="scan":
        num[i]=-1
        normality.append(4)                        #### scan attack
    elif num[i]=="mitm":
        num[i]=-1
        normality.append(5)                        # mitm
    else:
        normality.append(3)                     #data type probing
        num[i]=-1
        
###################---------------------///////////////////////////////////////    

df["Source_port"]=source
df["Destination_port"]=destination
df["Value"]=num
df["normality"]=normality
print((num))
############### protocol conversion to decimal 
pf=pd.read_csv('protocol-numbers-1.csv', sep=',')
#print(pf["Keyword"])

key=pf["Keyword"]
value=pf["Decimal"]

protocolDictionary={}
j=0
for i in range(0,len(key)):
    protocolDictionary[key[i]]=value[j]
    j+=1

#print(protocolDictionary)
protocol=df["Protocol"]
con_protocol=[]
for i in protocol:
    if (protocolDictionary.get(i,"None"))=="None":
        con_protocol.append(-1)
        continue
    con_protocol.append((protocolDictionary.get(i)))

#print(con_protocol)
df["Protocol"]=con_protocol
df.to_csv('c_dataset1.csv',index=False)
print (time.time()-start)   
