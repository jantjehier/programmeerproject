function search()
{
  // getting the user input from the textbox
  var userInput = document.getElementById("userInput").value;

  // loading the bardata in the search function
  d3.json("bardata.json", function(error, data) {

  data.forEach(function(d) {
      d.artist = d.artist;
      d.sales = +d.sales;
      d.active = d.active;
      d.albums = +d.albums;
    });

    // defining bandId, Totalsold and Totalalbums
    var BandId;
    var Totalsold;
    var Totalalbums;
    for (var i = 0; i < data.length; i++)
    {
      // search with capital letters
      if (data[i].artist == userInput)
      {
        BandId = data[i].artist;
        Totalsold = data[i].sales;
        Totalalbums = data[i].albums;
      }
      // search in lowercase letters
      else if (data[i].artist.toLowerCase() == userInput)
      {
        BandId = data[i].artist;
        Totalsold = data[i].sales;
        Totalalbums = data[i].albums;
      }
    }

    // when Bandid is defined start the timeline and piechart functions
    if (BandId != undefined)
    {
      timeline(BandId, Totalalbums);
      piechart(BandId, Totalsold, Totalalbums);
    }
    // else the band is not in the list
    else
    {
      alert("Sorry, couldn't find this band")
    }
  });
}

