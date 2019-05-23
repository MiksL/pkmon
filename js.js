
const t1n = document.getElementById("team1name");
const t1lv = document.getElementById("team1lv");
const t1hpbar = document.getElementById("team1hpbar");
const t1img = document.getElementById("t1img");

const t2n = document.getElementById("team2name");
const t2lv = document.getElementById("team2lv");
const t2hpbar = document.getElementById("team2hpbar");
const t2img = document.getElementById("t2img");

const pp = document.getElementById("pp");
const mtype = document.getElementById("movetype");

const bt1 = document.getElementById("button1");
const bt2 = document.getElementById("button2");
const bt3 = document.getElementById("button3");
const bt4 = document.getElementById("button4");

var hstr;
var btname;
var wsbtname;
var charsel;
var imglt1;


var team1pkmon = "";
var team2pkmon = "";


function pakiman(name,lvl,hp,att,sp,def,spatt,spdef,move1,move2,move3,move4,imglink)
{
    this.name = name;
    this.lvl = lvl;
    this.hp = hp;
    this.att = att;
    this.sp = sp;
    this.def = def;
    this.spatt = spatt;
    this.spdef = spdef;
    this.move1 = move1;
    this.move2 = move2;
    this.move3 = move3;
    this.move4 = move4;
    this.imglink = imglink;
    this.hasfainted = false;
}

function move(name,dmg,pp,type,issp,sp,cooldown)
{
    this.name = name;
    this.dmg = dmg;
    this.pp = pp;
    this.rempp = pp;
    this.type = type;
    this.issp = issp;
    this.sp = sp;
    this.cooldown = cooldown;
}

var mRTX = new move('RAY TRACING',100,5,'RTX',true,30,2);
var mOC = new move('OC',40,10,'normal',false,50,0);
var mNVENC = new move('NVENC',20,25,'normal',false,200,1);
var mDRIVERUPDATE = new move('DRIVER UPDATE',50,10,'fire',false,90,0);

var mHeatwave = new move('HEATWAVE',40,10,'fire',false,40,0);
var mLN2 = new move('LN2',60,5,'air',true,120,1);
var mHBM2 = new move('HBM2',40,3,'electric',true,1000,2);

var RTX2080Ti = new pakiman('RTX2080Ti',68,272,34,12,50,80,12,mRTX,mOC,mNVENC,mDRIVERUPDATE,'pakimans/epic.png');
var RadeonVII = new pakiman('RadeonVII',50,331,20,7,69,60,16,mHeatwave,mLN2,mOC,mHBM2,'pakimans/epic2.png');

var pakimani = [RTX2080Ti];

function hover(bt)
{
    btname = bt.innerHTML;
    btname = btname.replace(/\s/,'');
    btname.trimLeft();
    bt.innerHTML = '►' + btname;
}

function movehover(bt,move)
{
    btname = bt.innerHTML;
    btname = btname.replace(/\s/,'');
    btname.trimLeft();
    bt.innerHTML = '►' + btname;

    var remainingpp = team1pkmon[move].rempp;
    var totalpp = team1pkmon[move].pp;
    pp.innerHTML = "PP " + remainingpp + "/" + totalpp;
    /* TODO MAKE ALL BUTTONS WORK. ONLY 3 AND 4 WORK */
}

function unhover(bt)
{
    bt.innerHTML.replace("►","");
    bt.innerHTML = ' ' + btname;
}


t1pkmn();

function t1pkmn()
{
    charsel = Math.floor(Math.random() * 1);

    t1n.innerHTML = pakimani[0].name;
    t1lv.innerHTML = "Lv" + pakimani[0].lvl;
    t1hpbar.innerHTML = pakimani[0].hp + "/" + pakimani[0].hp;
    t1img.src = pakimani[0].imglink;

    team1pkmon = pakimani[0];


    t2img.src = 'pakimans/epic2.png';


}

function attack(move) /* TODO - FINISH */
{
    console.log(team1pkmon);
    console.log(team1pkmon[move].pp);
    if(team1pkmon[move].rempp > 0)
    {
        team1pkmon[move].rempp--;

        if(team1pkmon[move].cooldown > 0)
        {
            alert("This attack is on a cooldown!");
        }
        else
        {
            alert("Move's working!")
        }
    }
    else if(team1pkmon[move].rempp == 0)
    {
        alert("Not enough PP!");
    }
    else
    {
        alert("Some PP error");
    }
}

function gotomoves()
{
    bt1.innerHTML = ' ' + team1pkmon.move1.name;
    bt1.onclick = function()
    {
        attack('move1');
    }
    bt1.onmouseover = function() 
    {
        hover(bt1,'move1');
    }

    bt2.innerHTML = ' ' + team1pkmon.move2.name;
    bt2.onclick = function()
    {
        attack('move2');
    }
    bt2.onmouseover = function() 
    {
        movehover(bt2,'move2');
    }

    bt3.innerHTML = ' ' + team1pkmon.move3.name;
    bt3.onclick = function()
    {
        attack('move3');
    }
    bt3.onmouseover = function() 
    {
        movehover(bt3,'move3');
    }

    bt4.innerHTML = ' ' + team1pkmon.move4.name;
    bt3.onclick = function()
    {
        attack('move3');
    }
    bt4.onmouseover = function() 
    {
        movehover(bt4,'move4');
    }
}