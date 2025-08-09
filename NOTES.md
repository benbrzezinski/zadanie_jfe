# Notes

To są moje różne myśli/przemyślenia, dlatego jest chaotycznie i nie zwracałem uwagi, aby było pięknie, to miałem po prostu w głowie

- pobieram channels.json, biorę tylko to co trzeba żeby nie pchać całego obiektu – tytuł, logo medium+high, url, statystyki
- srcset dla logo kanałów żeby retina miała lepszą jakość – 1x medium (240px), 2x high (800px), 88px nie użyty bo wygląda słabo na designie, niby jest ale po co jak i tak wszędzie jest większe logo,
  zastanawiałem się po co w ogóle 88px wersja logo, może do miniaturek, ale w projekcie nigdzie nie widzę żeby to pasowało, a do header js logo nie pasuje musiało być mniejsze, aby było zgodne ze screenami
- width/height daję takie jak medium czyli 240x240, wygląda podobnie wielkościowo jak na screenach, reszta i tak się skaluje dzięki max-width:100% height:auto w css, więc jak jest mniej miejsca to się zmniejszy
- header js logo zrobiłem jako <img> z srcset a nie background-image, bo alt i dostępność + zachowuje się jak normalny element graficzny
- normalizeText – żeby filtrowanie nie miało problemów z polskimi znakami, dla ł = l musiałem jeszcze replace() użyć jako wyjątek
- formatNumber – dla statystyk, żeby były przecinki 1,000,000
- parseNumber – zamiana stringów na liczby, usuwa kropki, przecinki, spacje
- localStorage – zapisuję visits, lastVisit, currentVisit, lastVisit to poprzednie currentVisit, w związku z czym dla pierwszej wizyty dla lastVisit daję "none", trochę się zastanawiałem czy wgl dobrze to rozumiem nie ukrywam, ale jest git
- klik na channel otwiera nową kartę z ?utm_ts=timestamp – jak sprawdzałem w console.log to jest timestamp, ale gdy przenosi na kanał youtube, wtedy nie ma, youtube usuwa i tyle
- sortowanie po title/subscribers/videos/views, sortBtn zmienia asc/desc, default asc, clearBtn resetuje filtry i sortowanie, przyciski się blokują jak nie ma aktywnych filtrów
- contrast-mode – po prostu invert(1) na html, zastanawiałem się nad hue-rotate żeby kolory były mniej dziwne ale chyba nie trzeba
- meta viewport dodałem bo layout skalował się źle - wyglądało jak desktop pomniejszony na mobilce no i to było słabe
- grid layout w css zmienia kolumny w breakpointach (1280px, 1680px) - (reszta już była dopasowana), wygląda dobrze na wszystkich testowanych szerokościach
- testowane na Opera GX, Edge, Chrome, Firefox – działa tak samo
