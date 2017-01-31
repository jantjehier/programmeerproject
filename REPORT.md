# Omschrijving

## Start with a short description of your application (like in the README.md, but very short, including a single screen shot).

### screenshot

De visualisatie geeft aan waarom bands en artiesten zoveel albums hebben verkocht. De webpagina start met een barchart. Deze geeft het aantal verkochte albums weer van de 100 artiesten die de meeste albums hebben verkocht en of de artiest of band nogsteeds actief is. Boven de barchart zijn een checkbox en een zoekfunctie te vinden. Wanneer je de Checkbox aanklikt wordt de barchart gesorteerd op meest verkochte albums in plaats van de alfabetische volgorde. Via de zoekfunctie of een bar van de barchart kan je bij de andere visualisaties komen. Als je een band zoekt (die in de top 100 lijst staat) verschijnen een pie chart en een timeline. Hetzelfde gebeurt als je op een bar van de barchart klikt. De timeline geeft weer hoelang de band of artiest al actief is en uit welke artiesten een band op een bepaald moment bestond. De instrumenten zijn aangegeven met kleuren. De piechart geeft weer of een band veel succesvolle albums heeft gemaakt of gewoon heel veel albums. Voor alle albums die meer dan 20 miljoen keer verkocht zijn kan je zien hoeveel procent die uitmaken van de totale albumverkopen. Het andere deel van de piechart geeft aan hoeveel albums er voor de rest zijn verkocht en hoeveel miljoen die hebben opgeleverd. De albums zijn zowel studio als compilatie en live albums omdat deze allemaal zijn geteld in de lijst met best verkochte albums.

# Technisch design

high level overview

De barchart is gelinkt aan de piechart en timeline. De barchart is te sorteren met een sort functie. Deze verranderd de volgorde van de labels op de x as voor bar_yes en bar_no (actieve en niet actieve bands). En sorteerd de bars op de waarde. Als je klikt op een bar dan start de onclick functie. Deze start de timeline en piechart functie. De zoekfunctie gaat via aan andere functie. Deze zoekt uit of de band die je zoekt ook in de data staat. Als dat zo is dan worden de timeline en piechart functies gestart, anders krijg je een alert. Voor de timeline functie moet de data in een bepaald format staan. Dit gebeurt in het begin van de code. Ook word de oude timeline verwijderd. Voor de timeline moet worden aangegeven wanneer een line begint en wanneer hij stopt. Ook moet de text voor de lines worden toegevoegd. In de data staat al vast welke artiest in welke lijn van de timeline komt. Na de timeline functie is doorlopen word de pagina naar beneden gehaald zodat je kan zien dat de timeline is gemaakt. De timeline zit in een div die in een div zit. De eerste div zorgt ervoor dat je een scrolbalk hebt voor de tweede div. Zo is de visualisatie niet te groot voor bands als Santana met 67 artiesten. De piechart voor de piechart wordt de data in een ander format gezet. Ook word het percentage berekend. Een deel van de piechart geeft aan hoeveel procent van de totale albumverkopen een bepaald albums is. Voor het andere deel moet een nieuw bedrag berekend worden (totaal - albums). Ook moet berekend worden hoeveel albums er overblijven als je de albums die meer dan 20 miljoen keer verkocht zijn er af haalt. Deze worden weer laten zien in de tooltip. 

# Uitdagingen

Een van de uitdagingen was het verzinnen van een goed idee voor de pie chart. Nu is in de pie chart te zien hoeveel procent een album is van de totale album verkopen. 
Het dropdown menu uit het oorspronkelijke ontwerp voegde weinig toe omdat je een deel van dezelfde data inlaad. Daarom heb ik gekozen voor een sort functie. Toen de bar chart alleen op alfabet gesorteerd was, was moeilijk te zien welke artiesten bijvoorbeeld evenveel albums hebben verkocht. Nu is dat beter zichtbaar.


## Clearly describe the technical design: how is the functionality implemented in your code? This should be like your DESIGN.md but updated to reflect the final application. First, give a high level overview, which helps us navigate and understand the total of your code (which components are there?). Second, go into detail, and describe the modules/classes and how they relate.

## Clearly describe challenges that your have met during development. Document all important changes that your have made with regard to your design document (from the PROCESS.md). Here, we can see how much you have learned in the past month.

# Keuzes

Een pie chart met daarin het percentage van de orginele leden was dat lastig te begrijpen. Daarom heb ik de pie chart in week 3 aangepast. Hierdoor geeft de pie chart nuttige informatie weer die goed te begrijpen is.



## Defend your decisions by writing an argument of a most a single paragraph. Why was it good to do it different than you thought before? Are there trade-offs for your current solution? In an ideal world, given much more time, would you choose another solution?

