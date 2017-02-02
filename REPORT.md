# Omschrijving

![GitHub excample](/doc/printscreen.PNG)
![GitHub excample](/doc/printscreen2.PNG)

De website bestaat uit de volgende onderdelen:
 -  de staafdiagram
 -  de circeldiagram
 -  de tijdlijn
 -  de checkbox voor de sortfunctie
 -  de zoekfunctie

De visualisatie geeft aan waarom bands en artiesten zoveel albums hebben verkocht. De webpagina start met een barchart. Deze geeft het aantal verkochte albums weer van de 100 artiesten die de meeste albums hebben verkocht en of de artiest of band nogsteeds actief is. Boven de barchart zijn een checkbox en een zoekfunctie te vinden. Wanneer je de Checkbox aanklikt wordt de barchart gesorteerd op meest verkochte albums in plaats van de alfabetische volgorde. Via de zoekfunctie of een bar van de barchart kan je bij de andere visualisaties komen. Als je een band zoekt (die in de top 100 lijst staat) verschijnen een pie chart en een timeline. Hetzelfde gebeurt als je op een bar van de barchart klikt. De timeline geeft weer hoelang de band of artiest al actief is en uit welke artiesten een band op een bepaald moment bestond. De instrumenten zijn aangegeven met kleuren. De piechart geeft weer of een band veel succesvolle albums heeft gemaakt of gewoon heel veel albums. Voor alle albums die meer dan 20 miljoen keer verkocht zijn kan je zien hoeveel procent die uitmaken van de totale albumverkopen. Het andere deel van de piechart geeft aan hoeveel albums er voor de rest zijn verkocht en hoeveel miljoen die hebben opgeleverd. De albums zijn zowel studio als compilatie en live albums omdat deze allemaal zijn geteld in de lijst met best verkochte albums.

# Technisch design
 
## Een kort overzicht
 
### De staafdiagram
De staafdiagram bestaat uit code voor het maken van de staafdiagram en code voor de checkbox met transitie.
 
### De circeldiagram
De circeldiagram bestaat uit code voor het verranderen van de titel, het verwijderen van de oude circeldiagram en het maken van de      circeldiagram.
 
### De tijdlijn
De tijdlijncode bestaat uit code voor het verwijderen van de tijdlijncontainer, code voor het verranderen van de tijdlijn titel, code voor het omlaag scrollen in de tijdlijn scrollbalk en webpagina scrollbalk en code voor het maken van de tijdlijn.
 
### De checkbox voor de sortfunctie
Deze functie zit verwerkt in de staafdiagram functie.
 
### De zoekfunctie
De zoekfunctie bestaat uit code voor het controleren van de ingegeven text en het starten van de tijdlijn en circeldiagram functie.
  
## Details

## de staafdiagram

De staafdiagram is gelinkt aan de piechart en timeline. Als je klikt op een staaf dan start de onclick functie. Deze start de timeline en piechart functie. 
De functie begint met het vaststellen van de hoogte, breedte en marges voor de visualisatie. Daarna wordt de range voor de x en y bepaald. Vervolgens worden er assen toegevoegd en kleuren gedefineerd en de text voor de tooltip. De data wordt ingeladen en daarna worden de Assen, text en staven gemaakt. In de functie die de staven maakt wordt de onclick functie aangeroepen die Bandid, Totalsold en Totalalbums een waarde geeft en de andere functies (timeline en piechart) start. In de mouseover en mouseout word aangegeven dat de tooltip moet verschijnen on mouse over en moet verdwijnen on mouse out. De kleuren voor de staven worden verranderd in css door de actieve bands en niet actieve bands een andere class te geven.

## De tijdlijn

Voor de tijdlijn functie moet de data in een bepaald format staan. Dit gebeurt in het begin van de code. Ook word de oude tijdlijn verwijderd. Voor de tijdlijn moet worden aangegeven wanneer een line begint en wanneer hij stopt. Ook moet de text voor de lines worden toegevoegd. In de data staat al vast welke artiest in welke lijn van de tijdlijn komt. De tijdlijn zit in een container. De container zorgt ervoor dat je een scrolbalk hebt voor de tijdlijn. Zo is de visualisatie niet te groot voor bands als Santana met 67 artiesten.
Om de tijdlijn niet over teveel tijd te laten gaan heb ik besloten het begin en eind aan te passen zodat deze gelijk zijn aan het begin van de band -1 en het eind van de band +1. Door de +1 en -1 blijft er ruimte open aan de zijkanten waardoor het overzichtelijker word. Deze waarden worden gebruikt voor de x scale die er vor zorgt dat de x as en de lengte van de lijnen steeds wordt aangepast. Na de timeline functie is doorlopen word de pagina naar beneden gehaald zodat je kan zien dat de tijdlijn is gemaakt.

## De circeldiagram

De piechart voor de piechart wordt de data in een ander format gezet. Eerst gaat een for loop over alle artiesten om te kijken wie een bepaalde bandnaam heeft. Daarna word de data in het nieuwe format gezet. Voor de albums heb ik ook nog jaar toegevoegd maar ik heb geen tijd gehad om dat te kunnen gebruiken. De value is gelijk aan de verkopen. De verkopen worden berekend voor de albums met minder dan 20 miljoen verkopen. Het label is afhankelijk van het album. Voor de albums met minder dan 20 miljoen verkopen wordt alleen een berekend totaal bedrag laten zien en een standaardtext. Voor de text op de circeldiagram wordt het percentage berekend.

## De checkbox voor de sortfunctie

De staafdiagram is te sorteren met een sort functie. Deze functie wordt aangeroepen door de checkbox. In javascript wordt de status van de checkbox gecontroleerd. Zolang deze niet is aangeklikt gebeurt er niets. Wanneer de checkbox is aangeklikt sorteerd deze de volgorde van de labels op de x as voor bar_yes en bar_no (actieve en niet actieve bands). De staven worden gesorteerd op waarde. Vervolgens start de functie een transitie. Als je opnieuw klikt verranderd de staafdiagram terug.

## De zoekfunctie

De zoekfunctie gaat via een apparte functie. Deze zoekt uit of de band die je zoekt ook in de data staat voor zowel de naam in de data als de naam zonder hoofdletters. In de functie wordt dezelfde data ingeladen als bij de staafdiagram. De zoekfunctie moet namelijk dezelfde functies starten. Als de band waarop gezocht is kan worden teruggevonden in de database dan worden de timeline en piechart functies gestart, anders krijg je een alert. 

# Uitdagingen

## De circeldiagram
Een van de uitdagingen was het verzinnen van een goed idee voor de pie chart. Nu is in de circeldiagram te zien hoeveel procent een album is van de totale album verkopen. In het oorspronkelijke plan wou ik graag laten zien hoeveel leden er over zijn van de band waarmee het begon.

## De staafdiagram
In het oorspronkelijke plan begon het met een staafdiagram. Daarna heb ik deze aangepast naar een bubblediagram omdat ik graag een nieuwe visualisatie wou gaan maken. Toen ik daar meer data voor nodig bleek te hebben heb ik het ontwerp weer terug aangepast naar een staafdiagram.

## De timeline
De timeline visualisatie was een uitdaging omdat deze niet volledig op internet te vinden was. Een bestaande visualisatie moest worden aangepast en de data moest in een ander format worden gezet. Ook moest er een x as worden toegevoegd voor de duidelijkheid. Bij dataprocessing heb ik alleen maar bestaande visualisaties gekozen. 

## De checkbox met sortfunctie
Ik heb gekozen voor een sort functie gekozen in plaats van een dropdown menu met actieve en niet actieve bands.

## De zoekfunctie
De checkbox en zoekfunctie waren een uitdaging. Bij dataprocessing heb ik alleen gewerkt met dropdown menu's. Mijn dropdown menu's maakten het niet mogelijk om de visualisatie op de pagina te laten verschijnen als de pagina laade. De overschakeling naar het maken van twee goed werkende extra features was groot. Nu moesten er meer functies worden toegevoegd waarvan ik geen idee had hoe ik die moest maken. 

## De data
De data die ik wou gebruiken voor de visualisaties is niet volledig te vinden op internet. De timelines op wikipedia maken het aanpassen wat makkelijker maar die zijn er lang niet voor elke band. Omdat wikipedia wordt geschreven door veel verschillende mensen staat de informatie over bandleden steeds ook weer in een ander format. Scrapen was niet mogelijk dus moest de informatie zelf gemaakt worden. Dit kost veel tijd. De volgende keer zal ik zoeken naar bestaande data in plaats van de data zelf te maken.

## Github
Github was ook een uitdaging voor mij. Voor dit project heb ik aleen maar code geupload omdat ik geen idee had hoe Github werkt. Omdat ik alleen dataprocessing had gevolgt kwam ik daar mee weg. Door dit project heb ik geleerd hoe je code pusht op github. Hierdoor was het ook mogelijk om better code hub te gebruiken.

# Keuzes

## De circeldiagram
Een circeldiagram met daarin het percentage van de orginele leden was dat lastig te begrijpen. Daarom heb ik de pie chart in week 3 aangepast. Hierdoor geeft de pie chart nuttige informatie weer die goed te begrijpen is. 

## De staafdiagram
Het was een goed idee om een nieuw soort visualisatie toe te voegen maar de visualisatie paste niet bij mijn data. Om een bubblediagram af te maken moet er informatie staan op de assen. Als ik hier bijvoorbeeld het aantal albums had neergezet dan had dat de visualisatie alleen maar onduidelijker gemaakt. Daarnaast moest ik daar ook nog weer nieuwe data voor zoeken. Daarom heb ik besloten de visualisatie toch een staafdiagram te houden.

## De checkbox met sortfunctie
Het dropdown menu uit het oorspronkelijke ontwerp voegde weinig toe omdat je een deel van dezelfde data inlaad die al goed te onderscheiden is door kleuren. Toen de bar chart alleen op alfabet gesorteerd was, was moeilijk te zien welke artiesten bijvoorbeeld evenveel albums hebben verkocht. Nu is dat beter zichtbaar.

## Verbeteringen
Als ik meer tijd had dan had ik mijn code meer verbeterd zodat ik een volgende keer makkelijker mijn visualisatie zou kunnen hergebruiken. Ook zou ik een langere geschiedenis van git commits bijhouden. Graag zou ik bij de timeline nog verticale lijnen toevoegen die albums weergeven zodat het makkelijk te zien is wie daar aan gewerkt hebben. Het liefst had ik meer visualisaties aan elkaar gelinkt maar omdat mijn plan daar weinig ruimte voor bood en ik niet genoeg tijd had heb ik dat laten zitten. 
Ook zou ik de pagina wat mooier inrichten en me meer verdiepen in html en css.




