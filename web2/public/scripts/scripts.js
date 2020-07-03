//Funktion um die eigentliche Ueberschrift von der Slideshow in das div mit der id "text_slideshow" zu schreiben
//carousel.caption wird hierzu zusaetzlich in der css ueber "display: none" verborgen
$(document).ready(function() {
  $('#text_slideshow').html($('.active > .carousel-caption').html());
  $('.carousel').on('slid.bs.carousel', function() {
    $('#text_slideshow').html($('.active > .carousel-caption').html());
  });

  $('#endpreis').html($('.active > .carousel-caption.corvette').html());
  $('.carousel').on('slid.bs.carousel', function() {
    $('#endpreis').html($('.active > .carousel-caption.corvette').html());
  });

  $('#endpreis').html($('.active > .carousel-caption.nissan').html());
  $('.carousel').on('slid.bs.carousel', function() {
    $('#endpreis').html($('.active > .carousel-caption.nissan').html());
  });

  $('#endpreis').html($('.active > .carousel-caption.porsche').html());
  $('.carousel').on('slid.bs.carousel', function() {
    $('#endpreis').html($('.active > .carousel-caption.porsche').html());
  });
});


function tableAusstattung() {
  //Variablen Preis zuweisen
  var lackschutz_preis = document.getElementById("check_lackschutz").getAttribute("preis");
  var lackschutz_preis_int = parseInt(lackschutz_preis);

  //Wenn checkbox ausgewaehlt, dann wird Preis dazu addiert, ansonsten wieder subtrahiert
  switch (check_lackschutz.checked) {
    case true:
      document.getElementById("endpreis").innerHTML = parseInt(document.getElementById("endpreis").textContent) + lackschutz_preis_int;
      document.getElementById("endpreis").innerHTML += "€";
      break;
    case false:
      document.getElementById("endpreis").innerHTML = parseInt(document.getElementById("endpreis").textContent) - lackschutz_preis_int;
      document.getElementById("endpreis").innerHTML += "€";
      break;
  }
}


//Funktion auf Unterseite_2_Events
//Funktion die auf den value der einzelnen Drop-Down Elemente zugreift und den jeweiligen Wert zurueckliefert.
//Dieser Wert wird ueber ein switch-statement ausgewertet und das jeweilige Datum wird in das span-Element des angelegten div's geschrieben,
//welches ueber die id event_datum angesprochen wird
$(document).ready(function() {
  $(".select_event").on("change", function() {
    var eventAuswahl = $(".select_event option:selected").val();
    switch (eventAuswahl) {
      case "1":
        $("#event_datum span").text("Datum: 08.07. - 13.07.2019");
        break;
      case "2":
        $("#event_datum span").text("Datum: 20.07. - 24.07.2019");
        break;
      case "3":
        $("#event_datum span").text("Datum: 18.08. - 21.08.2019");
        break;
    }
  });
});


//Funktion auf Unterseite_3_About
//Funktion mit der die Oeffnungszeiten abhaengig von dem jeweiligen Wochentag abgefragt werden koennen
$(document).ready(function() {
  $(".select_wochentag").on("change", function() {
    var wochentagAuswahl = $(".select_wochentag option:selected").val();
    switch (wochentagAuswahl) {
      case "1":
        $("#wochentag_öffnungszeiten span").text("Geöffnet: 8:00 - 19:00 Uhr");
        break;
      case "2":
        $("#wochentag_öffnungszeiten span").text("Geöffnet: 8:45 - 19:30 Uhr");
        break;
      case "3":
        $("#wochentag_öffnungszeiten span").text("Geöffnet: 8:45 - 19:30 Uhr");
        break;
      case "4":
        $("#wochentag_öffnungszeiten span").text("Geöffnet: 8:45 - 19:30 Uhr");
        break;
      case "5":
        $("#wochentag_öffnungszeiten span").text("Geöffnet: 8:00 - 17:30 Uhr");
        break;
      case "6":
        $("#wochentag_öffnungszeiten span").text("Geöffnet: 9:00 - 16:45 Uhr");
        break;
      case "7":
        $("#wochentag_öffnungszeiten span").text("Geschlossen!");
        break;
    }
  });
});



// Skript für Benoetigte Felder in Event Formular
(function () {
      'use strict';
      window.addEventListener('load', function () {
        var forms = document.getElementsByClassName('needs-validation');
        var validation = Array.prototype.filter.call(forms, function (form) {
          form.addEventListener('submit', function (event) {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add('was-validated');
          }, false);
        });
      }, false);
    })();
