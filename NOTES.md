# Notes

To są moje różne myśli/przemyślenia, dlatego jest trochę chaotycznie, to miałem po prostu w głowie :)

- pobieram channels.json, biorę tylko to co trzeba żeby nie pchać całego obiektu – tytuł, logo medium+high, url, statystyki
- srcset dla logo kanałów żeby ekrany z większą gęstością pikseli miały lepszą jakość – 1x medium (240px), 2x high (800px)
- width/height daję takie jak medium czyli 240x240, wygląda podobnie wielkościowo jak na screenach, reszta i tak się skaluje dzięki max-width:100% height:auto w css, więc jak jest mniej miejsca to się zmniejszy
- header js logo zrobiłem jako img z srcset (alt, dostępność + zachowuje się jak normalny element graficzny), najlepiej byłoby użyć SVG (skalowalność, brak utraty jakości, mniejszy rozmiar pliku), ale w zadaniu użyłem zgodnie z dostarczonymi materiałami
- normalizeText – żeby filtrowanie nie miało problemów z polskimi znakami, dla ł = l musiałem jeszcze replace() użyć jako wyjątek
- formatNumber – dla statystyk, żeby były przecinki 1,000,000
- parseNumber – zamiana stringów na liczby, usuwa kropki, przecinki, spacje
- localStorage – zapisuję visits, lastVisit, currentVisit, lastVisit to poprzednie currentVisit, w związku z czym dla pierwszej wizyty dla lastVisit daję "none", trochę się zastanawiałem czy wgl dobrze to rozumiem nie ukrywam, ale jest git
- klik na channel otwiera nową kartę z utm timestamp – jak sprawdzałem w console.log to jest timestamp, ale gdy przenosi na kanał youtube, wtedy nie ma, youtube usuwa i tyle
- sortowanie po title/subscribers/videos/views, sortBtn zmienia asc/desc, clearBtn resetuje filtry i sortowanie, przyciski się blokują jak nie ma aktywnych filtrów
- contrast-mode – po prostu invert(1) na html, zastanawiałem się nad hue-rotate żeby kolory były mniej dziwne ale chyba nie trzeba
- meta viewport dodałem bo layout skalował się źle - wyglądało jak desktop pomniejszony na mobilce no i to było słabe
- grid layout w css zmienia kolumny w breakpointach (1280px, 1680px) - (reszta już była dopasowana), wygląda dobrze na wszystkich testowanych szerokościach
- testowane na Opera GX, Edge, Chrome, Firefox – działa tak samo
