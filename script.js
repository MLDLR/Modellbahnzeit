const timeComboBox = document.getElementById('timeComboBox'); // Hole das select-Element mit der ID 'timeComboBox'
const clock = document.getElementById('clock'); // Hole das div-Element mit der ID 'clock'
const speedComboBox = document.getElementById('speedComboBox'); 

// Erzeuge dynamisch Elemente für jede halbe Stunde
for (let hour = 0; hour < 24; hour++) { // Schleife durch die Stunden von 0 bis 23
  for (let minute = 0; minute < 60; minute += 30) { // Schleife durch die Minuten von 0 bis 59, erhöhe um 30
    const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`; // Erstelle einen formatierten Zeitstring mit führenden Nullen
    const option = document.createElement('option'); // Erstelle ein neues 'option'-Element
    option.textContent = time; // Setze den Textinhalt des option-Elements auf den Zeitstring
    timeComboBox.appendChild(option); // Hänge das option-Element an das select-Element an
  }
}

// Hole die aktuell ausgewählte Zeit der timeComboBox
function getSelectedTime() {
  return timeComboBox.value; // Gib den Wert der ausgewählten Option zurück
}

function getSpeedFactor(speed) {
  // Define the speed factors based on the provided ratios
  const speedFactors = {
    'normal': 1,
    '2m': 22.5,
    '1': 32,
    '0': 45,
    'S': 64,
    '00': 76,
    'H0': 87,
    'TT': 120,
    'N': 160,
    'Z': 220,
    'ZZ': 300,
    'T': 450,
  };
  
  return speedFactors[speed] || 1; // Default to 1 if the speed is not found
}

let intervalId; // Erstelle eine Variable, um die ID der Intervallfunktion zu speichern
let speed = getSpeedFactor(speedComboBox.value);
// Starte eine Uhr und zeige sie in der Mitte des Bildschirms an
function startClock() {
  if (intervalId) { // Wenn die Variable intervalId einen Wert hat
    clearInterval(intervalId); // Lösche die Intervallfunktion mit dieser ID
  }
  let selectedTime = getSelectedTime(); // Hole die aktuell ausgewählte Zeit
  let [hour, minute, second] = selectedTime.split(':'); // Teile den Zeitstring nach ':' auf und weise die Stunde, Minute und Sekunde Variablen zu -> auftrennen
  second = 0; // Initialisiere die Sekunde mit 0, weil man sie in der timeComboBox nicht auswählbar sind.
  clock.textContent = selectedTime + ':00'; // Setze den Textinhalt des Uhr-Elements auf die ausgewählte Zeit mit Sekunden
  intervalId = setInterval(() => { // Setze eine Intervallfunktion, die alle 1000 Millisekunden (1 Sekunde) läuft und weise die ID der Variable intervalId zu
    second++; // Erhöhe die Sekunde um 1
    if (second === 60) { // Wenn die Sekunde 60 erreicht
      second = 0; // Setze die Sekunde auf 0 zurück
      minute++; // Erhöhe die Minute um 1
      if (minute === 60) { // Wenn die Minute 60 erreicht
        minute = 0; // Setze die Minute auf 0 zurück
        hour++; // Erhöhe die Stunde um 1
        if (hour === 24) { // Wenn die Stunde 24 erreicht
          hour = 0; // Setze die Stunde auf 0 zurück
        }
      }
    }
    // Formatiere die Stunde, Minute und Sekunde mit führenden Nullen
    const formattedHour = hour.toString().padStart(2, '0');
    const formattedMinute = minute.toString().padStart(2, '0');
    const formattedSecond = second.toString().padStart(2, '0');
    // Setze den Textinhalt des Uhr-Elements auf die formatierte Zeit -> formatieren
    clock.textContent = `${formattedHour}:${formattedMinute}:${formattedSecond}`;
  }, 1000 / speed); // Ende der Intervallfunktion
}
// Füge einen Event-Listener zum timeComboBox-Element hinzu
timeComboBox.addEventListener('change', () => { // Wenn der Benutzer die ausgewählte Option ändert
  startClock(); // Rufe die startClock-Funktion auf
});

// To-Do -> Tag-Counter(1), Dark/Light Mode Switcher -> allg. Design verbessern (2)
speedComboBox.addEventListener('change', () => {
  speed = getSpeedFactor(speedComboBox.value);
  startClock();
});

document.addEventListener('DOMContentLoaded', () => {
  // Rufe die Funktion auf, um die Uhr zu starten
  startClock();
});