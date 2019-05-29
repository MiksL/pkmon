// #region Variables
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
var attackcomplete;
var selectmove;
var turn = 1;


var team1pkmon = "";
var team2pkmon = "";
// #endregion

// #region ObjectTemplates
function pakiman(name,lvl,hp,att,sp,def,spatt,spdef,move1,move2,move3,move4,imglink)
{
    this.name = name;
    this.lvl = lvl;
    this.hp = hp;
    this.maxhp = hp;
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
    this.currentcooldown = 0;
}
// #endregion

// #region Objects
const mRTX = new move('RAY TRACING',100,5,'RTX',true,30,2);
const mOC = new move('OC',40,10,'normal',false,50,0);
const mNVENC = new move('NVENC',20,25,'normal',false,200,1);
const mDRIVERUPDATE = new move('DRIVER UPDATE',50,10,'fire',false,90,0);

const mHeatwave = new move('HEATWAVE',40,10,'fire',false,40,0);
const mLN2 = new move('LN2',60,5,'air',true,120,1);
const mHBM2 = new move('HBM2',40,3,'electric',true,1000,2);

const RTX2080Ti = new pakiman('RTX2080Ti',68,272,68,70,50,80,50,mRTX,mOC,mNVENC,mDRIVERUPDATE,'pakimans/epic.png');
const RadeonVII = new pakiman('RadeonVII',50,331,40,50,69,60,65,mHeatwave,mLN2,mOC,mHBM2,'pakimans/epic2.png');

var pakimani = [RTX2080Ti,RadeonVII];
//#endregion


// #region HoverFunctions
function hover(bt)
{
    btname = bt.innerHTML;
    btname = btname.replace(/\s/,'');
    btname.trimLeft();
    bt.innerHTML = '►' + btname;
}

function movehover(bt,move)
{
    hover(bt);

    updatepp(move);
}

function updatepp(move)
{
    var remainingpp = team1pkmon[move].rempp;
    var totalpp = team1pkmon[move].pp;
    pp.innerHTML = "PP " + remainingpp + "/" + totalpp;
}

function unhover(bt)
{
    bt.innerHTML.replace("►","");
    bt.innerHTML = ' ' + btname;
}
// #endregion


// #region Init team1char & team2character
t1pkmn();
function t1pkmn()
{
    charsel = Math.floor(Math.random() * 1);
    
    team1pkmon = pakimani[0];
    t1n.innerHTML = pakimani[0].name;
    t1lv.innerHTML = "Lv" + pakimani[0].lvl;
    t1hpbar.innerHTML = pakimani[0].hp + "/" + pakimani[0].hp;
    t1img.src = pakimani[0].imglink;

    team2pkmon = pakimani[1];
    t2n.innerHTML = pakimani[1].name;
    t2lv.innerHTML = "Lv" + pakimani[1].lvl;
    t2hpbar.innerHTML = pakimani[1].hp + "/" + pakimani[1].hp;
    t2img.src = pakimani[1].imglink;
}
// #endregion

// #region Player Attack

function attack(move)
{
    AIattack();
    console.log(selectmove);
    var t2speed = Math.round(team2pkmon[selectmove].sp * (1 + team2pkmon.sp * 0.01));
    var t1speed = Math.round(team1pkmon[move].sp * (1 + team1pkmon.sp * 0.01));
    console.log(t1speed);
    console.log(t2speed);
    if(t1speed > t2speed)
    {
        playerattack(move);

        AIattack();
    }
    else
    {
        AIattack();

        playerattack(move);
    }

    turn++;
}

function playerattack(move)
{
    if(team1pkmon[move].rempp > 0)
    {

        if(team1pkmon[move].currentcooldown > 0)
        {
            alert("This attack is on a cooldown!");
            return;
        }
        else
        {
            cooldowns();
            dealdamage(move);
            if(team1pkmon[move].cooldown > 0)
            {
                team1pkmon[move].currentcooldown = team1pkmon[move].cooldown + 1;
            }
            team1pkmon[move].rempp--;
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

    updatepp(move);
}

// #region Player Cooldown Check

function cooldowns()
{
    cooldowncheck('move1');
    cooldowncheck('move2');
    cooldowncheck('move3');
    cooldowncheck('move4');
}

function cooldowncheck(move)
{
    if(team1pkmon[move].currentcooldown > 0)
    {
        team1pkmon[move].currentcooldown--;
    }
}

// #endregion

function dealdamage(move)
{
    var damage = team1pkmon[move].dmg;
    if(team1pkmon[move].issp == false)
    {
        damage = damage * ((1 + team1pkmon.att * 0.01) - (team2pkmon.def * 0.005));
    }
    else
    {
        damage = damage * ((1 + team1pkmon.spatt * 0.0125) - (team2pkmon.spdef * 0.005));
    }
    damage = Math.round(damage);
    team2pkmon.hp -= damage;
    if(team2pkmon.hp <= 0)
    {
        team2pkmon.hp = 0;
    }
    updatehpbar();
}

// #endregion

// #region AI Attack

function AIattack()
{
    for(var check = 1; check < 5; check++)
    {
        move = 'move' + check;
        var aidamage = team2pkmon[move].dmg;
        if(team2pkmon[move].issp == false)
        {
            aidamage = aidamage * ((1 + team2pkmon.att * 0.01) - (team1pkmon.def * 0.005));
        }
        else
        {
            aidamage = aidamage * ((1 + team2pkmon.spatt * 0.0125) - (team1pkmon.spdef * 0.005));
        }
        aidamage = Math.round(aidamage);

        AICooldowns();

        if(team1pkmon.hp - aidamage <= 0 && team2pkmon[move].pp > 0)
        {
            selectmove = team2pkmon[move];
        }
        else
        {
        }
    }

    team1pkmon.hp -= aidamage;
    if(team1pkmon.hp <= 0)
    {
        team1pkmon.hp = 0;
    }


}

function AICooldowns()
{
    AIcooldowncheck('move1');
    AIcooldowncheck('move2');
    AIcooldowncheck('move3');
    AIcooldowncheck('move4');
}

function AIcooldowncheck(move)
{
    if(team2pkmon[move].currentcooldown > 0)
    {
        team2pkmon[move].currentcooldown--;
    }
    else if(team2pkmon[move].cooldown == 0)
    {
    }
    else if(team2pkmon[move].currentcooldown == 0 && team2pkmon[move].cooldown > 0)
    {
        team2pkmon[move].currentcooldown = team2pkmon[move].cooldown + 1;
    }
    else if(turn = 1 && team2pkmon[move].currentcooldown > 0)
    {
        team2pkmon[move].currentcooldown = 0;
    }

}

// #endregion

// #region Update Enemy HP
function updatehpbar()
{
    t1hpbar.innerHTML = team1pkmon.hp + "/" + team1pkmon.maxhp;
    t1hpbar.style.width = ((325 * Math.round(team1pkmon.hp * (100 / team1pkmon.maxhp))) / 100);
    if(t1hpbar.offsetWidth < 162.5 && t1hpbar.offsetWidth > 65)
    {
        t1hpbar.style.backgroundColor = '#E4EA33';
    }
    else if(t1hpbar.offsetWidth <= 65)
    {
        t1hpbar.style.backgroundColor = 'red';
    }
    t1hpbar.style.borderRadius = '10px 0px 0px 10px';

    t2hpbar.innerHTML = team2pkmon.hp + "/" + team2pkmon.maxhp;
    t2hpbar.style.width = ((325 * Math.round(team2pkmon.hp * (100 / team2pkmon.maxhp))) / 100);
    if(t2hpbar.offsetWidth < 162.5 && t2hpbar.offsetWidth > 65)
    {
        t2hpbar.style.backgroundColor = '#E4EA33';
    }
    else if(t2hpbar.offsetWidth <= 65)
    {
        t2hpbar.style.backgroundColor = 'red';
    }
    t2hpbar.style.borderRadius = '10px 0px 0px 10px';
}
// #endregion


// #region AttackButton move change
function gotomoves()
{
    bt1.innerHTML = ' ' + team1pkmon.move1.name;
    bt1.onclick = function()
    {
        attack('move1');
    }
    bt1.onmouseover = function() 
    {
        movehover(bt1,'move1');
    }
    updatepp('move1');

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
    bt4.onclick = function()
    {
        attack('move4');
    }
    bt4.onmouseover = function() 
    {
        movehover(bt4,'move4');
    }
}
// #endregion