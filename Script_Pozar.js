var slider2 = document.getElementById("s2");
var slider3 = document.getElementById("s3");

var output2 = document.getElementById("ska_pro");
var output3 = document.getElementById("wod_pro");

  slider2.oninput = function() {
    output2.innerHTML = this.value;
  }

  slider3.oninput = function() {
    output3.innerHTML = this.value;
  }


var komorka = {
    rozmiar_X: 50,
    rozmiar_Y: 50,
    las_procentowo: 1, //75%
    pozar_procentowo: 0.0001, //0,01%
    wypalenie_procentowo: 0.1,
    blok_procentowo: slider2.value/100, //0.15
    woda_procentowo: slider3.value/100, //0.15
    tmp: [],
    kolor: ['rgb(0,0,0)', 'rgb(0,200,50)', 'rgb(252,3,0)','rgb(192,192,192)','rgb(64, 164, 223)']
};

var losuj_wiatr = 0;

var nIntervId;

var licznik_woda = 0;
var licznik_las = 0;
var licznik_skaly = 0;
var licznik_ognia = 0;
var licznik_wypalony = 0;


var jaki_wiatr = 0;


function Aktualizacja_danych()
{
    licznik_woda = 0;
    licznik_las = 0;
    licznik_skaly = 0;
    licznik_ognia = 0;
    licznik_wypalony = 0;

    for(var i = 0; i < komorka.rozmiar_X; i++) {
        for(var j = 0; j < komorka.rozmiar_Y; j++) {

            if(komorka.tmp[i][j] == 0)
            {
                licznik_wypalony++;
            }
            else if(komorka.tmp[i][j] == 1)
            {
                licznik_las++;
            }
            else if(komorka.tmp[i][j] == 2)
            {
                licznik_ognia++;
            }
            else if(komorka.tmp[i][j] == 3)
            {
                licznik_skaly++;
            }
            else if(komorka.tmp[i][j] == 4)
            {
                licznik_woda++;
            }
            

        }
    }

    document.getElementById('woda').innerHTML = licznik_woda;
    document.getElementById('las').innerHTML = licznik_las;
    document.getElementById('skaly').innerHTML = licznik_skaly;
    document.getElementById('ogien').innerHTML = licznik_ognia;
    document.getElementById('wypa').innerHTML = licznik_wypalony;

    if(jaki_wiatr == 0)
    {
        document.getElementById('wiatr').innerHTML = "Wschodni";
    }
    else if(jaki_wiatr == 1)
    {
        document.getElementById('wiatr').innerHTML = "Zachodni";
    }
}

/*
Potrojnrozmiar_Y operator warunkowrozmiar_Y
c = (a > b) ? a : b

if (a > b) {
   c = a;
} else {
   c = b;
}
*/



//poczatkowy
function Generate()
{
    var losowanko_i = Math.floor(Math.random() * 50)+1;
    var losowanko_j = Math.floor(Math.random() * 50)+1;

    komorka.blok_procentowo = slider2.value/100;
    komorka.woda_procentowo = slider3.value/100;


    jaki_wiatr = Math.floor(Math.random() * 2);

for(var i = 0; i < komorka.rozmiar_X; i++) {
    komorka.tmp[i] = [];
    for(var j = 0; j < komorka.rozmiar_Y; j++) {
      //  komorka.tmp[i][j] = (Math.random() < komorka.las_procentowo) ? 1 : 0;  //komorka i puste
      //  console.log("wypalone: " +licznik_wypalony);
        if(Math.random() < komorka.las_procentowo)
        {
            komorka.tmp[i][j] = 1;
        }
        /*
        else if(Math.random() < komorka.wypalenie_procentowo)
        {
            komorka.tmp[i][j] = 0
        } 
*/
        if(Math.random() < komorka.blok_procentowo)
        {
            komorka.tmp[i][j] = 3;
        } 
        else if(Math.random() < komorka.woda_procentowo)
        {
            komorka.tmp[i][j] = 4;
        } 
        
      //  if(i == komorka.rozmiar_X/2 && j==komorka.rozmiar_Y/2)
      //  {
        if(i == losowanko_i && j==losowanko_j)
        {
            komorka.tmp[i][j]=1; //w las
            komorka.tmp[i][j]=2; //ogien w srodku
        }
        
    }
}
}

Generate();

function Scena(komorka) {
    var size_quad = 10; //10 przy 50
    var canvas = document.getElementById('canvas');
    var c = canvas.getContext('2d');
    for(var i = 0; i < komorka.rozmiar_X; i++) {
        for(var j = 0; j < komorka.rozmiar_Y; j++) {
            c.fillStyle = komorka.kolor[komorka.tmp[i][j]];
            c.fillRect(size_quad*j, size_quad*i, size_quad*j, size_quad*i);
        }
    }
}

function krok(komorka) {
   // var licznik =0;
    var to = [];

    for(var i = 0; i < komorka.rozmiar_Y; i++) {
        to[i] = komorka.tmp[i].slice(0); 
        /*
        Slice, Wydobywa fragment tablicy i zwraca go jako nową tablicę.
         np. var animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];
        console.log(animals.slice(2));
         expected output: Array ["camel", "duck", "elephant"]
        */
    }
 
    for(var i = 0; i < komorka.rozmiar_Y; i++) {
        for(var j = 0; j < komorka.rozmiar_Y; j++) {
            if(to[i][j] == 0) {
                //console.log("puste");
                //jesli jest pustrozmiar_Y to losuj i tworz komorka
               // komorka.tmp[i][j] = (Math.random() < komorka.las_procentowo2) ? 1 : 0; 
            } else if(to[i][j] == 1) { //komorka
                //sasiedzi 
                
                //wszystkie kierunki
                /*
                if( ((i>0) && (to[i-1][j] == 2)) || //dolnrozmiar_Y
                    ((i<komorka.rozmiar_Y-1) && (to[i+1][j] == 2)) || //gornrozmiar_Y
                    ((j>0) && (to[i][j-1] == 2)) || //prawrozmiar_Y
                    ((j<komorka.rozmiar_X-1) && (to[i][j+1] == 2)) //lewrozmiar_Y
                    ) 
                    {
                    komorka.tmp[i][j] = 2;
                    }
                   
                else  */if(i>0 && (to[i-1][j] ==2)) //dolny
                {
                    komorka.tmp[i][j] = 2;  
                } 
                else if((i<komorka.rozmiar_Y-1) && (to[i+1][j] == 2)) //gorny
                {
                    komorka.tmp[i][j] = 2;  
                }
                else if((j>0) && (to[i][j-1] == 2) && (jaki_wiatr == 1)) //prawy
                {
                    komorka.tmp[i][j] = 2;  
                }
                else if((j<komorka.rozmiar_X-1) && (to[i][j+1] == 2) && (jaki_wiatr == 0)) //lewy
                {
                    komorka.tmp[i][j] = 2;  
                }
                /*
                } else {
                    //losuj ogien
                   // komorka.tmp[i][j] = (Math.random() < komorka.pozar_procentowo) ? 2 : 1;
                }
                */
            } 
            else if(to[i][j] == 2) 
            {
             //jesli pozar to potem pustrozmiar_Y
            komorka.tmp[i][j] = 0;
            }
        }
        losuj_wiatr++;

        if(losuj_wiatr == 800) //800
        {
            //4 kierunki 0 - lewa, 1 - prawa, 3 - gora, 4 dol
            jaki_wiatr = Math.floor(Math.random() * 2);
            losuj_wiatr = 0;
        }
    }
}

function start(d){
    if (d == "Stop")
    {
        clearInterval(nIntervId);
    }
    else if(d == "Restart")
    {
        Generate();
        clearInterval(nIntervId);

        nIntervId = setInterval(function()
        {   
            Scena(komorka);
            krok(komorka);
            Aktualizacja_danych();
        }, 100);
    }
    else if(d == "Start")
    {
        //Generate();
        clearInterval(nIntervId);

        nIntervId = setInterval(function()
        {   
            Scena(komorka);
            krok(komorka);
            Aktualizacja_danych();
        }, 100);
    }
}

start('Start');

