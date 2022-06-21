
pf=pd.read_csv('filename_csv', sep='$')



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
    td=tt[i].split(" ")
    timeStamp.append(td[3].split(":")[2])
pf["eth.src"]=s
pf["eth.dst"]=d

##################_---------------------------------    

pf["ip.src"]=sourceIP
pf["ip.dst"]=destIP
###############_______________------------__________------___________--____  
pf["frame.time"]=timeStamp
# ##############---------------------------------------

for i in range(0,c):  
    if(l[i].startswith("GET / HTTP/1.1 ")):
        num.append("-99")
    elif (l[i].startswith("GET")):  ###### wrong setup and data type probing
        a = l[i].split("=")
        b = (a[1].split(" "))
        num.append(b[0])
    elif(l[i].startswith("Echo")):          ######### ddos
        num.append("-1")
    elif (l[i].startswith("Who")):              ############# scan 
        num.append("-1")   
        
    elif "duplicate " in l[i]:                  ############# mitm
        num.append("-1")       
    else:
       num.append("-99") 
    i+=1