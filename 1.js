let person=[];
let pmovein=[];
let pmoveout=[];//the database
let billtypes=[];
let starts=[];
let ends=[];  
let prices=[];        
let display=[];//controls display elements 
let display2=[];
let display3=[];
let totaldayforabill=[0,0,0,0,0,0,0,0,0,0];
let apersoneachbillday=[[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]
[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]
[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]
[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]];
let baserate=[0,0,0,0,0,0,0,0,0,0];
 function add(a){
	 var name = document.getElementById("name").value;
			var movein = document.getElementById("movein").value;
			var moveout= document.getElementById("moveout").value;
			var bill = document.getElementById("billtype").value;
			var start = document.getElementById("start").value;
			var end= document.getElementById("end").value;
			var price=document.getElementById("price").value;
            //alert(bill);
			var nv = document.getElementById("1");
			if (a==0){
			nv.innerHTML="now at "+name+" "+movein+" "+moveout;
			for (let i=0;i<person.length;i++){
				if (person[i]==name){
					pmovein[i]=movein;
					pmoveout[i]=moveout;
					display[i].innerHTML=name+" "+movein+" "+moveout;
					return;
				}
			}
			var p = document.createElement("p");  //创建段落元素
			p.innerHTML=name+" "+movein+" "+moveout;
			document.body.appendChild(p);  //增加段落元素到body元素下
			person.push(name);
			pmovein.push(movein);
			pmoveout.push(moveout);
			display.push(p);
			//console.log("display",display);
			return;
			}
			else if (a==1){
				nv.innerHTML="now at "+bill+" "+start+" "+end;
				for (let i=0;i<billtypes.length;i++){
				if (billtypes[i]==bill){
					starts[i]=start;
					ends[i]=end;
					prices[i]=price;
					display2[i].innerHTML=bill+" "+start+" "+end+" "+price;
					return;
				}
			}
			var s = document.createElement("p");  //创建段落元素
			s.innerHTML=bill+" "+start+" "+end+" "+price;
			document.body.appendChild(s);  //增加段落元素到body元素下
			billtypes.push(bill);
			starts.push(start);
			ends.push(end);
			display2.push(s);
			prices.push(price);
			//console.log("display",display2);
			//console.log("what",a);
			return;
			}
			}//人比账单后走，账单总天数正确，分摊到人头上不正确 已解决
			//缺点：没有解决房子没人住但是有账单的情况
			function calculate(){////////////////////////////////////////////core function////////////////////////////////////////////////////////
				totaldayforabill=[0,0,0,0,0,0,0,0,0,0];//row: person column: billtype
				apersoneachbillday=[[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]];
				baserate=[0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0];//一个账单一天多少钱
				var nv = document.getElementById("1");
				//abillaperson(0,0);
				//abillaperson(0,1);
				for (let i=0;i<person.length;i++){
					for (let j=0;j<billtypes.length;j++){
						abillaperson(j,i);
				}}
				console.log("debug2"+person.length+" "+billtypes.length);
				console.log("debug2",apersoneachbillday);
				for (let j=0;j<billtypes.length;j++){
					baserate[j]=Number(prices[j])/totaldayforabill[j];
					console.log(baserate[j]);
				}
				var a = document.createElement("p");  //创建段落元素
				a.innerHTML="------this is a bill-----------";
			document.body.appendChild(a);  //增加段落元素到body元素下
				for (let i=0;i<person.length;i++){
					for (let j=0;j<billtypes.length;j++){
						var s = document.createElement("p");  //创建段落元素
						s.style.color = 'red';
						for (let k=0;k<display3.length;k++){
							if (display3[k]==s){//not working now
								display3[k].innerHTML=person[i]+" bill "+billtypes[j]+" amount ="+baserate[j]*apersoneachbillday[i][j];
								console.log(here);
								break;
								
						}}
						console.log("debug",apersoneachbillday[i][j]);
			s.innerHTML=person[i]+" bill "+billtypes[j]+" amount ="+baserate[j]*apersoneachbillday[i][j];
			document.body.appendChild(s);  //增加段落元素到body元素下
			display3.push(s);
			//console.log(display3);
					}
				}
				//console.log(totaldayforabill);
				//console.log(apersoneachbillday);
				
				//console.log(prices[0],person.length)
				//nv.innerHTML="price is "+sum(prices)/(person.length)+" per person";
			}
			function sum(price){
				var totalprice=0.0;
				for (let i=0;i<price.length;i++){
					totalprice+=Number(price[i]);
					//console.log(typeof price[i]);
				}
				return totalprice;
			}
			function abillaperson(billindex,personindex){
				if (Number(starts[billindex])<=Number(pmovein[personindex])){//账单开始早，按人入住
					if (Number(ends[billindex])>Number(pmoveout[personindex])){//账单结束晚，按人搬走
						totaldayforabill[billindex]+=numberofdays(pmovein[personindex],pmoveout[personindex]);
						apersoneachbillday[personindex][billindex]+=numberofdays(pmovein[personindex],pmoveout[personindex]);
						return;
					}
					else{//账单结束早，按账单结束
						totaldayforabill[billindex]+=numberofdays(pmovein[personindex],ends[billindex]);
						apersoneachbillday[personindex][billindex]+=numberofdays(pmovein[personindex],ends[billindex]);
						return;
					}
				}
				else{//账单开始晚，按账单开始
					if (Number(ends[billindex])>Number(pmoveout[personindex])){//账单结束玩，按人搬走
						totaldayforabill[billindex]+=numberofdays(starts[billindex],pmoveout[personindex]);
						apersoneachbillday[personindex][billindex]+=numberofdays(starts[billindex],pmoveout[personindex]);
						return;
					}
					else{//账单结束早，按账单结束
						totaldayforabill[billindex]+=numberofdays(starts[billindex],ends[billindex]);
						apersoneachbillday[personindex][billindex]+=numberofdays(starts[billindex],ends[billindex]);
						return;
					}
				}
			}
			function numberofdays(start,end){
				var day;
				if ((start.length!=8) | (end.length!=8)){
					alert("idiot");
					return;
				}
				if (Number(start)>Number(end)){
					console.log("reversed");
					return;
				}//check error
				if (Number(start)==Number(end)){
					alert("check input");
					return;
				}//check error
				day=Number((end[0]+end[1]+end[2]+end[3])-Number(start[0]+start[1]+start[2]+start[3]))*365+(Number(end[4]+end[5])-Number(start[4]+start[5]))*30+(Number(end[6]+end[7])-Number(start[6]+start[7]));
				//console.log("day"+day);
				return(day);
				//console.log(start[start.length-2]+start[start.length-1]);
			}
			
 