1. Cel aplikacji

Aplikacja ma umożliwiać użytkownikom współpracę w zakresie zarządzania projektami infrastruktury informatycznej oraz wymiany informacji, łącząc funkcjonalności forum dyskusyjnego i systemu zarządzania projektami. Użytkownicy mogą tworzyć wątki na forum oraz dołączać do zespołów skierowanych na rozwój oprogramowania, śledząc zadania, przypisując je do osób i monitorując postęp ich realizacji zgodnie z zawartymi w systemie szablonami.


2. Opis funkcji

Główne moduły aplikacji:

Forum dyskusyjne                     - przestrzeń do wymiany spostrzeżeń zarówno w zamkniętych grupach projektowych i poza nimi 
Zarządzanie projektami               - system służący zarządzaniu pracą zespołu projektowego i stuktury grup
System śledzenia zadań               - funkcjonalności związane z przydziałem zadań oraz szablony przebiegu ich realizacji


3. Wymagania funkcjonalne
   
3.1. Moduł Forum

   Tworzenie wątków – Użytkownicy mogą inicjować wątki dyskusyjne na tematy związane z projektami lub innymi kwestiami.
    Struktura wątków – Obsługa kategorii forum powszechnego i hierarchii wątków projektowych oraz zadaniowych.
    Wyszukiwarka – Narzędzie wyszukiwania, umożliwiające filtrowanie wyników według daty, autora, kategorii lub projektu/zadania.

3.2. Moduł Zarządzania Projektami

   Tworzenie projektów – Uprawnieni użytkownicy mogą zakładać nowe projekty, z opcją nadawania im nazw, opisów oraz przypisywania kategorii.
    Przypisywanie uczestników – Możliwość dołączania do projektów przez użytkowników, podział na role w ramach zespołu.
    Status projektu – Wsparcie dla etapów projektu takich jak „Projektowanie”, „Development”, "Testy", „Zakończony”.
    Śledzenie postępu - Wyznaczanie stopnia ukończenia rdzennych funkcji projektu.
    Wątki projektowe – Dla każdego projektu istnieje możliwość tworzenia powiązanych z nim wątków dyskusyjnych.

3.3. System Śledzenia Zadań i Workflow

   Tworzenie zadań – Dla każdego projektu użytkownicy mogą tworzyć zadania z możliwością przypisania tytułu, opisu, kategorii, opcjonalny parametr priorytetyzacji.
    Przydzielanie zadań – Zadania mogą być przypisane do jednego użytkownika naraz, z możliwością zmiany przydziału w trakcie postępu prac nad nim.
    Status zadania – Wsparcie dla zmiany statusu zadania (np. „Nowe”, „W toku”, „Do zatwierdzenia”, „Zakończone”) w zgodzie z workflow projektu.
    Backlog – Możliwość uzupełniania projektu o funkcje, których wdrożenie może zostać rozpatrzone w trakcie prac.


4. Wymagania niefunkcjonalne

4.1. Interfejs użytkownika (UI/UX)

   Intuicyjność i czytelność – Aplikacja powinna posiadać prosty i intuicyjny interfejs z przejrzystą nawigacją.
    Dostosowanie platformowe – Uwzględnienie korzystania z aplikacji na różnych urządzeniach/przeglądarkach w metodzie implementacji.
    Oprawa graficzna – Zachęcający, estetyczny projekt interfejsu *z opcjami ograniczonego personalizowania (motyw jasny/ciemny).

4.2. Bezpieczeństwo

   Uwierzytelnianie i autoryzacja – Obsługa logowania i różnicowanie poziomów dostępu (administratorzy, menedżerowie, członkowie).
    Kontrola dostępu – Możliwość definiowania uprawnień na poziomie projektów i zadań, ograniczająca dostęp do określonych danych tylko dla uprawnionych użytkowników.

4.3. Utrzymywalność
    
   Logowanie działań - rejestrowanie sposobu i czasu wykonania kluczowych operacji.
    

5. Wymagania techniczne

    Technologia frontend: React.
    Backend: Java/Spring Boot.
    Baza danych: Hosting MS Azure, *własna baza Postgres.
    Testy: Junit, Mockito
    Wdrożenie: AWS


6. Przypadki użycia (Use Cases)

    1.  Tworzenie nowego projektu przez menedżera projektu.
    2.  Dodanie zadania i przypisanie go do konkretnego użytkownika.
    3.  Dodanie wpisu w wątku wewnątrz konkretnego projektu.
    4.  Sprawdzenie statusu zadania oraz jego zmiana.
    5.  Dołączenie ochotnika do zespołu projektowego.
    6.  Wyszukiwanie wątku lub zadania na podstawie kategorii.

Funkcje opcjonale oznaczono gwiazdką: *
