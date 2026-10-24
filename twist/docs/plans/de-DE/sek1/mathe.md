# Mathe, Klasse 5 to 10

Draft, 2026-10-24. Continues the Grundschule course (../mathe.md) to the
end of Sekundarstufe I. Follows the conventions in README.md: one
placement per skill in Gymnasium order, with ESA, MSA, G and "later in RS"
notes. Checked against the KMK Bildungsstandards ESA/MSA (2022), the NRW
Kernlehrpläne for Gymnasium (G9, 2019) and Realschule (2022), and
LehrplanPLUS Gymnasium Bayern, Klasse 5 to 10.

## Summary

| | |
|---|---|
| Domain | `math`, continued from Klasse 1 to 4 and shared with en-GB |
| Frameworks | KMK Bildungsstandards Mathematik ESA und MSA (2004/2003, i.d.F. 23.06.2022, with a correction of 18.06.2026); NRW Kernlehrplan Gymnasium G9 (2019) and Realschule (2022); LehrplanPLUS Gymnasium Bayern |
| Skills | 233 (Klasse 5: 44, 6: 47, 7: 43, 8: 36, 9: 36, 10: 27); 47 of them already exist in the library for en-GB Years 5 and 6 |
| Levels | 21 skills G (Gymnasium only); 1 E; every other skill is ESA or MSA |
| Lessons | about 500 (2 per skill, 3 to 4 for about 25 big new ideas) |
| Taught | every Klasse, 4 to 5 hours a week, in every Land and school type |

## Structure

### Official areas

| Framework | Areas |
|---|---|
| KMK ESA/MSA (2022) | Leitideen: Zahl und Operation; Größen und Messen; Strukturen und funktionaler Zusammenhang; Raum und Form; Daten und Zufall. Process competences: argumentieren, kommunizieren, Probleme lösen, modellieren, darstellen, mit mathematischen Objekten umgehen, mit Medien mathematisch arbeiten |
| NRW Gymnasium (G9) | Inhaltsfelder Arithmetik/Algebra, Funktionen, Geometrie, Stochastik, each in three bands: Ende der Erprobungsstufe (5/6), Erste Stufe (7/8), Zweite Stufe (9/10) |
| NRW Realschule | the same four Inhaltsfelder in Doppeljahrgangsstufen 5/6, 7/8, 9/10 |
| Bayern Gymnasium | one Fachlehrplan per Jahrgangsstufe with numbered Lernbereiche (M5 1 to M5 4, M6 1 to 3, M7 1 to 5, M8 1 to 7, M9 1 to 7, M10 1 to 5) and Gegenstandsbereiche matching the KMK Leitideen |

Bayern gives a year for every topic, NRW only a two-year band, so Twist
takes the Bayern year when it falls inside the NRW band and otherwise
picks the year the benchmark and the two Länder share most; the note
column names each disagreement.

### Twist progressions

Continued from Klasse 1 to 4 or from en-GB Years 5 and 6:

| Progression | Sek I content |
|---|---|
| `math.large-numbers` | numbers past a million, rounding, powers of ten, negative numbers |
| `math.mult-div-larger`, `math.mult-div`, `math.written-mult-div` | primes, squares and cubes, long division (en-GB skills placed for de-DE) |
| `math.fractions` | the en-GB Year 5 and 6 skills plus meanings, of-fractions, division by a fraction |
| `math.decimals` | the en-GB skills plus multiplying and dividing decimals, recurring decimals |
| `math.percentages-ratio` | percent from the meaning to compound interest |
| `math.algebra` | variables, terms, simplifying, expanding, binomial formulas, formulas |
| `math.angles` | measuring to 360°, angle pairs at parallels, angle sums |
| `math.coordinates` | four quadrants, translation, reflection, rotation |
| `math.symmetry` | point reflection |
| `math.area-volume` | area and volume formulas for plane figures and cuboids, units |
| `math.shapes`, `math.solids` | line relations, quadrilaterals, oblique drawings |
| `math.data` | line and pie charts, mean, class intervals |

New progressions:

| Progression | Title (de) | Content |
|---|---|---|
| `math.integers` | Ganze Zahlen | order, absolute value, the four operations with signs |
| `math.rational` | Rationale Zahlen | ordering and calculating in ℚ, mixed terms, why number sets grow |
| `math.arithmetic` | Rechnen und Terme strukturieren | term structure, laws, inverse operations, estimating |
| `math.divisibility` | Teilbarkeit | divisibility rules, ggT and kgV |
| `math.units` | Größen umrechnen | all units of length, mass, time, money; reference sizes |
| `math.proportion` | Zuordnungen | rule of three, scale, proportional and inverse proportional |
| `math.equations` | Gleichungen | linear equations and inequalities, systems, quadratic equations |
| `math.functions` | Funktionen | function concept, linear, quadratic, power and polynomial functions |
| `math.growth` | Wachstum | exponential growth and decay, logarithm |
| `math.powers-roots` | Potenzen und Wurzeln | powers, roots, real numbers, scientific notation |
| `math.constructions` | Konstruktionen | compass and straightedge, triangles, congruence, Thales |
| `math.proofs` | Begründen und Beweisen | angle sum, statement and converse, Pythagoras, √2 |
| `math.circles` | Kreis | circumference, area, π, sector |
| `math.solid-measure` | Körperberechnung | prisms, cylinder, pyramid, cone, sphere |
| `math.similarity` | Ähnlichkeit | central dilation, similar figures, intercept theorems |
| `math.pythagoras` | Satz des Pythagoras | theorem, converse, applications |
| `math.trigonometry` | Trigonometrie | ratios, right triangle, unit circle, sine function |
| `math.statistics` | Statistik | frequencies, median, quartiles, box plots, histograms, misleading statistics |
| `math.probability` | Wahrscheinlichkeit | counting, experiments, Laplace, trees, two-way tables, conditional probability |

`math.data` and `math.chance` stay the primary-school lines; `statistics`
and `probability` start where they end, so a Year 6 en-GB child and a
Klasse 6 de-DE child meet the same skills. Ids carry no grade and no
German-only term, so en-GB can place the same skills at Key Stage 3 and 4
later.

## Draft skills

Note column: **ESA**, **MSA**, **G**, **later in RS** as in README.md;
**E** enrichment with the reason; **reuse**: the skill exists in the
library (en-GB Years 5 and 6) and needs a de-DE lesson set; **check**: the
sources disagree or are silent, confirm when writing the framework record.
A skill marked ESA but placed in Klasse 10 is taught by Klasse 9 in ESA
courses; the profile setting handles that.

### Klasse 5

Bayern M5: big numbers and integers, figures and line relations, the
four operations, units and area. NRW 5/6 band.

| Klasse | Skill | Ich kann … | Note |
|---|---|---|---|
| 5 | `large-numbers.to-ten-million` | Zahlen bis 10 000 000 lesen, schreiben, ordnen und den Wert jeder Ziffer nennen | ESA, reuse |
| 5 | `large-numbers.beyond-million` | Zahlen über eine Million (Milliarde, Billion) lesen, schreiben und am Zahlenstrahl darstellen | ESA |
| 5 | `large-numbers.round-context` | Zahlen je nach Sachlage sinnvoll runden und gerundete Angaben deuten | ESA |
| 5 | `large-numbers.powers-of-ten` | große Zahlen mit Zehnerpotenzen schreiben (3 · 10⁶) | ESA |
| 5 | `large-numbers.negative-numbers` | negative Zahlen am Zahlenstrahl und auf dem Thermometer lesen | ESA, reuse |
| 5 | `large-numbers.negative-in-context` | negative Zahlen in Sachsituationen deuten und Abstände über die Null berechnen | ESA, reuse |
| 5 | `integers.order-absolute` | ganze Zahlen auf der Zahlengeraden ordnen und ihren Betrag angeben | ESA |
| 5 | `mult-div.table-11-12` | alle Malaufgaben bis 12 · 12 schnell und sicher | E: no standard names it; quick products are needed for common denominators in Klasse 6. reuse |
| 5 | `arithmetic.term-structure` | Rechenterme gliedern und mit Fachbegriffen benennen (Summe, Differenz, Produkt, Quotient) | ESA |
| 5 | `arithmetic.word-to-term` | Rechenanweisungen und Sachsituationen in Rechenterme übersetzen | ESA |
| 5 | `arithmetic.laws` | Kommutativ-, Assoziativ- und Distributivgesetz zum geschickten Rechnen nutzen und begründen | ESA |
| 5 | `arithmetic.inverse` | Rechenanweisungen umkehren und Aufgaben wie x − 7 = 12 mit der Umkehraufgabe lösen | ESA |
| 5 | `arithmetic.estimate-check` | Ergebnisse mit Überschlag und Probe kontrollieren | ESA |
| 5 | `written-mult-div.multi-digit-large` | große Zahlen schriftlich addieren, subtrahieren und mit mehrstelligen Zahlen multiplizieren | ESA |
| 5 | `written-mult-div.long-division` | schriftlich durch zweistellige Zahlen teilen und den Rest passend angeben | ESA, reuse |
| 5 | `divisibility.rules-combined` | Teilbarkeitsregeln für 2, 3, 4, 5, 9 und 10 anwenden und zu neuen Regeln kombinieren (durch 6, durch 15) | ESA |
| 5 | `mult-div-larger.primes` | Primzahlen erkennen und Zahlen in Primfaktoren zerlegen | ESA, reuse |
| 5 | `mult-div-larger.squares-cubes` | Quadrat- und Kubikzahlen erkennen und 5² und 2³ schreiben | ESA, reuse |
| 5 | `powers-roots.powers` | Potenzen mit natürlichen Exponenten berechnen und Basis und Exponent benennen | ESA |
| 5 | `probability.counting-principle` | Anzahlen mit Baumdiagramm und Zählprinzip bestimmen (Outfits, Zahlenschlösser) | MSA; Bayern 5, NRW Gymnasium 9/10 |
| 5 | `units.convert` | Längen, Massen, Zeiten und Geldbeträge in andere Einheiten umrechnen (km bis mm, t bis mg) | ESA |
| 5 | `units.calculate` | mit Größen rechnen und Sachaufgaben mit verschiedenen Einheiten lösen | ESA |
| 5 | `units.estimate-reference` | Größen mit Bezugsgrößen schätzen und Ergebnisse damit prüfen | ESA |
| 5 | `units.time-spans` | Zeitspannen in h, min und s berechnen, auch über mehrere Tage | ESA |
| 5 | `proportion.rule-of-three-intro` | Sachaufgaben mit dem Schluss über die Einheit lösen (Dreisatz) | ESA |
| 5 | `proportion.scale` | mit Maßstäben auf Karten und Plänen rechnen (1 : 25 000) | ESA |
| 5 | `area-volume.area-rectangles` | den Flächeninhalt von Rechtecken berechnen | ESA, reuse |
| 5 | `area-volume.area-units` | Flächeneinheiten von mm² bis km², a und ha umrechnen | ESA |
| 5 | `area-volume.area-perimeter-relation` | erklären, dass gleiche Flächeninhalte verschiedene Umfänge haben können | ESA, reuse |
| 5 | `area-volume.compose-decompose` | Flächeninhalte zusammengesetzter Figuren durch Zerlegen und Ergänzen bestimmen | ESA |
| 5 | `area-volume.surface-cuboid` | den Oberflächeninhalt von Würfel und Quader berechnen | ESA |
| 5 | `solids.oblique-drawing` | Schrägbilder und Netze von Würfel und Quader zeichnen und Körper daraus erkennen | ESA |
| 5 | `coordinates.first-quadrant` | Punkte im Koordinatensystem angeben und eintragen | ESA, reuse |
| 5 | `shapes.lines-relations` | Lagebeziehungen von Punkten, Geraden und Kreisen beschreiben (parallel, senkrecht, Abstand) | ESA |
| 5 | `shapes.distance-loci` | alle Punkte finden, die einen bestimmten Abstand zu einem Punkt oder einer Geraden haben | ESA, check (Bayern 5 only) |
| 5 | `angles.acute-obtuse` | spitze, rechte und stumpfe Winkel unterscheiden | ESA, reuse |
| 5 | `angles.measure-draw` | Winkel bis 360° schätzen, mit dem Geodreieck messen und zeichnen | ESA, reuse |
| 5 | `shapes.classify-polygons` | Dreiecke und Vierecke nach ihren Eigenschaften einteilen | ESA, reuse |
| 5 | `shapes.quadrilateral-family` | Quadrat, Rechteck, Raute, Parallelogramm, Drachen und Trapez im Haus der Vierecke ordnen | ESA |
| 5 | `fractions.of-quantities` | Bruchteile von Größen und Mengen finden (¾ von 12) | ESA, reuse; Bayern 6 |
| 5 | `fractions.equivalent-simple` | gleichwertige Brüche mit kleinen Nennern erkennen | ESA, reuse; Bayern 6 |
| 5 | `fractions.on-number-line` | Brüche als Zahlen am Zahlenstrahl finden | ESA, reuse; Bayern 6 |
| 5 | `data.class-intervals` | Daten in Ur- und Strichlisten erfassen und sinnvoll in Klassen einteilen | ESA |
| 5 | `data.line-graphs` | Liniendiagramme lesen und zeichnen | ESA, reuse |

### Klasse 6

Bayern M6: rational numbers, area and volume, percent and data. NRW 5/6:
transformations and symmetry, Dreisatz, mean and median.

| Klasse | Skill | Ich kann … | Note |
|---|---|---|---|
| 6 | `fractions.meanings` | Brüche als Teil eines Ganzen, Teil mehrerer Ganzer, Quotient und Verhältnis deuten | ESA |
| 6 | `fractions.compare` | Stammbrüche und Brüche mit gleichem Nenner vergleichen | ESA, reuse |
| 6 | `fractions.equivalent-families` | Familien gleichwertiger Brüche finden | ESA, reuse |
| 6 | `fractions.simplify` | Brüche kürzen, erweitern und auf einen gemeinsamen Nenner bringen | ESA, reuse |
| 6 | `divisibility.gcd-lcm` | ggT und kgV bestimmen und zum Kürzen und für den Hauptnenner nutzen | ESA, check (KMK: "untersuchen Zahlen nach ihren Faktoren") |
| 6 | `fractions.compare-strategies` | Brüche mit Hauptnenner, Stammbrüchen oder dem Abstand zu 1 vergleichen und ordnen | ESA |
| 6 | `fractions.mixed-numbers` | gemischte Zahlen und unechte Brüche ineinander umwandeln | ESA, reuse |
| 6 | `fractions.add-sub-same-denominator` | Brüche mit gleichem Nenner addieren und subtrahieren | ESA, reuse |
| 6 | `fractions.add-sub-related` | Brüche addieren und subtrahieren, deren Nenner Vielfache voneinander sind | ESA, reuse |
| 6 | `fractions.add-sub-different` | Brüche mit verschiedenen Nennern und gemischte Zahlen addieren und subtrahieren | ESA, reuse |
| 6 | `fractions.multiply-by-whole` | Brüche mit ganzen Zahlen multiplizieren | ESA, reuse |
| 6 | `fractions.multiply-divide` | zwei Brüche multiplizieren und einen Bruch durch eine ganze Zahl teilen | ESA, reuse; later in RS (NRW RS 7/8) |
| 6 | `fractions.of-fractions` | Anteile von Anteilen berechnen (⅔ von ¾) | ESA; later in RS |
| 6 | `fractions.divide-by-fraction` | durch einen Bruch dividieren und erklären, warum man mit dem Kehrwert multipliziert | ESA; later in RS |
| 6 | `decimals.thousandths` | Dezimalzahlen bis zu den Tausendsteln in der Stellenwerttafel lesen und schreiben | ESA, reuse |
| 6 | `decimals.compare-round` | Dezimalzahlen vergleichen, ordnen und runden | ESA, reuse |
| 6 | `decimals.fraction-equivalents` | einfache Brüche als Dezimalzahlen schreiben und umgekehrt | ESA, reuse |
| 6 | `decimals.divide-by-10-100` | Dezimalzahlen mit 10, 100 und 1000 multiplizieren und dividieren | ESA, reuse |
| 6 | `decimals.calculate` | Dezimalzahlen addieren, subtrahieren und mit ganzen Zahlen multiplizieren | ESA, reuse |
| 6 | `decimals.multiply-divide` | Dezimalzahlen miteinander multiplizieren und durch Dezimalzahlen dividieren | ESA |
| 6 | `decimals.fraction-as-division` | einen Bruch als Division verstehen und in eine Dezimalzahl umrechnen (3/8 = 0,375) | ESA, reuse |
| 6 | `decimals.recurring` | periodische Dezimalzahlen erkennen und einfache in Brüche umwandeln (0,3̅ = ⅓) | ESA, check (both NRW plans name it, KMK does not) |
| 6 | `rational.mixed-terms` | Terme mit Brüchen und Dezimalzahlen in der richtigen Reihenfolge und geschickt berechnen | ESA |
| 6 | `rational.word-problems` | Sachaufgaben mit Brüchen und Dezimalzahlen lösen und die günstige Darstellung wählen | ESA |
| 6 | `integers.add-sub` | ganze Zahlen addieren und subtrahieren (Guthaben und Schulden, Temperatur) | ESA; Bayern 5, NRW 7/8 |
| 6 | `percentages-ratio.percent-meaning` | Prozente als Hundertstel, Bruch und Dezimalzahl schreiben | ESA, reuse |
| 6 | `percentages-ratio.equivalences` | die Prozentwerte von ½, ¼, ⅕ und Zehnteln sicher nutzen | ESA, reuse |
| 6 | `percentages-ratio.percent-of-amount` | Prozente von Größen berechnen (15 % von 360) | ESA, reuse |
| 6 | `percentages-ratio.everyday` | einfache Prozentaufgaben aus dem Alltag lösen (Rabatt, Anteil der Klasse) | ESA |
| 6 | `proportion.tables-graphs` | Zusammenhänge zwischen zwei Größen in Worten, Tabellen und Diagrammen beschreiben | ESA |
| 6 | `algebra.linear-sequences` | Zahlenfolgen fortsetzen und die Regel als Term angeben | ESA, reuse |
| 6 | `algebra.formulae` | einfache Formeln mit Buchstaben verwenden (u = 2 · (a + b)) | ESA, reuse |
| 6 | `algebra.missing-numbers` | Platzhalteraufgaben mit Buchstaben schreiben und lösen | ESA, reuse |
| 6 | `area-volume.area-triangles` | den Flächeninhalt von Parallelogrammen und Dreiecken berechnen | ESA, reuse; NRW Gymnasium 5/6 only the right triangle |
| 6 | `area-volume.trapezoid-polygons` | Flächeninhalte von Trapezen und Vielecken durch Zerlegen berechnen | ESA; NRW 7/8 |
| 6 | `area-volume.volume-formula` | das Volumen von Würfel und Quader berechnen | ESA, reuse |
| 6 | `area-volume.volume-units` | Volumeneinheiten von mm³ bis m³ sowie Liter und Milliliter umrechnen | ESA |
| 6 | `area-volume.compose-solids` | Volumen und Oberfläche von Körpern aus Quadern bestimmen | ESA |
| 6 | `coordinates.four-quadrants` | Punkte in allen vier Quadranten eintragen und Figuren dort bewegen | ESA, reuse |
| 6 | `coordinates.reflect-translate` | Figuren verschieben und an Achsen spiegeln | ESA, reuse |
| 6 | `coordinates.rotate` | Figuren um einen Punkt drehen und den Drehwinkel angeben | ESA |
| 6 | `symmetry.point-reflection` | Figuren an einem Punkt spiegeln und Symmetriepunkte finden | ESA; Bayern 7 |
| 6 | `statistics.relative-frequency` | absolute und relative Häufigkeiten bestimmen und als Bruch, Dezimalzahl und Prozent angeben | ESA |
| 6 | `data.mean` | den Mittelwert berechnen und deuten | ESA, reuse |
| 6 | `statistics.median-range` | Median, Spannweite, Minimum und Maximum bestimmen und deuten | ESA; Bayern 7 |
| 6 | `data.pie-charts` | Kreisdiagramme lesen und zeichnen | ESA, reuse |
| 6 | `statistics.choose-chart` | das passende Diagramm wählen und Vor- und Nachteile von Darstellungen nennen | ESA |

### Klasse 7

Bayern M7: terms, symmetry and angles, linear equations and percent,
measures of data, congruence and constructions. NRW 7/8 first half.

| Klasse | Skill | Ich kann … | Note |
|---|---|---|---|
| 7 | `integers.multiply-divide` | ganze und rationale Zahlen multiplizieren und dividieren und die Vorzeichenregeln begründen | ESA; Bayern 5 and 6 |
| 7 | `rational.order` | rationale Zahlen auf der Zahlengeraden darstellen und ordnen | ESA |
| 7 | `rational.calculate` | mit rationalen Zahlen in allen vier Grundrechenarten rechnen, auch mit Klammern | ESA |
| 7 | `rational.why-extend` | an Beispielen begründen, warum man von ℕ zu ℤ und ℚ erweitert | ESA |
| 7 | `algebra.variable-roles` | Variablen als Platzhalter, Unbekannte und Veränderliche unterscheiden | ESA |
| 7 | `algebra.set-up-terms` | Terme zu Sachsituationen, Mustern und Figuren aufstellen und deuten | ESA |
| 7 | `algebra.term-values-table` | Termwerte für viele Einsetzungen in einer Tabelle berechnen, auch mit Tabellenkalkulation | ESA |
| 7 | `algebra.simplify` | Terme durch Zusammenfassen gleichartiger Glieder vereinfachen | ESA |
| 7 | `algebra.expand` | Klammern auflösen, Summen multiplizieren und Minusklammern richtig auflösen | ESA |
| 7 | `algebra.factor-out` | einen gemeinsamen Faktor ausklammern | MSA |
| 7 | `algebra.equivalent-terms` | prüfen, ob zwei Terme gleichwertig sind, und Fehler in Umformungen finden | ESA |
| 7 | `equations.set-up` | Gleichungen zu Zahlenrätseln und Sachsituationen aufstellen | ESA |
| 7 | `equations.try-systematically` | einfache Gleichungen durch systematisches Probieren lösen | ESA |
| 7 | `equations.balance` | lineare Gleichungen mit Äquivalenzumformungen lösen (Waagemodell) | ESA |
| 7 | `equations.brackets-fractions` | lineare Gleichungen mit Klammern und Brüchen lösen | ESA |
| 7 | `equations.check-interpret` | Lösungen durch Einsetzen prüfen und im Sachzusammenhang deuten | ESA |
| 7 | `equations.word-problems` | Sachaufgaben mit linearen Gleichungen lösen (Alter, Bewegung, Mischung) | ESA |
| 7 | `percentages-ratio.base-value` | Grundwert, Prozentwert und Prozentsatz unterscheiden und die fehlende Größe berechnen | ESA |
| 7 | `percentages-ratio.percent-strip` | Prozentaufgaben mit Prozentstreifen und Dreisatz lösen | ESA |
| 7 | `percentages-ratio.change-factor` | prozentuale Zu- und Abnahme mit dem Wachstumsfaktor berechnen (Preis plus 19 % MwSt.) | ESA |
| 7 | `percentages-ratio.percent-points` | Prozent und Prozentpunkte unterscheiden und Prozentangaben in Medien prüfen | ESA, check (Bayern 6 names it) |
| 7 | `percentages-ratio.interest` | Jahres-, Monats- und Tageszinsen berechnen | ESA |
| 7 | `proportion.proportional` | proportionale Zuordnungen an Quotientengleichheit und Graph erkennen | ESA |
| 7 | `proportion.inverse` | antiproportionale Zuordnungen an Produktgleichheit erkennen und mit dem umgekehrten Dreisatz rechnen | ESA |
| 7 | `proportion.which-type` | entscheiden, ob eine Zuordnung proportional, antiproportional oder keins von beiden ist | ESA |
| 7 | `angles.angle-facts` | Winkel um einen Punkt und an einer Geraden nutzen | ESA, reuse |
| 7 | `angles.angle-pairs` | Neben-, Scheitel-, Stufen- und Wechselwinkel erkennen und fehlende Winkel berechnen | ESA |
| 7 | `angles.missing-angles` | fehlende Winkel in Dreiecken und Vierecken berechnen | ESA, reuse |
| 7 | `proofs.triangle-angle-sum` | mit Wechselwinkeln begründen, warum die Innenwinkel im Dreieck zusammen 180° ergeben | MSA |
| 7 | `angles.polygon-sum` | die Innenwinkelsumme von Vielecken herleiten und nutzen | MSA |
| 7 | `angles.base-exterior` | Basiswinkelsatz und Außenwinkelsatz nutzen | G |
| 7 | `constructions.basic` | Mittelsenkrechte, Lot und Winkelhalbierende mit Zirkel und Lineal konstruieren | ESA |
| 7 | `constructions.symmetric` | achsen- und punktsymmetrische Figuren konstruieren und Vierecke nach ihren Symmetrien ordnen | ESA |
| 7 | `constructions.triangles` | Dreiecke aus drei gegebenen Stücken konstruieren und die Schritte beschreiben | ESA |
| 7 | `constructions.congruence` | mit den Kongruenzsätzen entscheiden, ob ein Dreieck eindeutig konstruierbar ist | MSA |
| 7 | `constructions.special-lines` | Umkreis, Inkreis und Schwerpunkt eines Dreiecks konstruieren | G (NRW Realschule only the Mittelsenkrechte) |
| 7 | `proofs.statement-converse` | Voraussetzung und Behauptung eines Satzes unterscheiden und den Kehrsatz bilden | G |
| 7 | `constructions.thales` | den Satz des Thales begründen und rechtwinklige Dreiecke damit konstruieren | MSA |
| 7 | `area-volume.triangle-heights` | Höhen einzeichnen und den Flächeninhalt von Dreiecken mit jeder Grundseite berechnen | ESA |
| 7 | `statistics.boxplot` | Quartile bestimmen, Boxplots zeichnen und Datensätze damit vergleichen | MSA; NRW Gymnasium 5/6 |
| 7 | `statistics.compare-averages` | Mittelwert und Median vergleichen und erklären, wann welcher passt (Ausreißer) | ESA |
| 7 | `probability.experiments` | Zufallsexperimente durchführen und relative Häufigkeiten als Schätzwerte nutzen | ESA |
| 7 | `probability.law-large-numbers` | erklären, warum relative Häufigkeiten bei vielen Versuchen stabiler werden | ESA |

### Klasse 8

Bayern M8: functions, linear functions, fraction terms, Laplace, linear
systems, circle and cylinder. NRW 7/8 second half.

| Klasse | Skill | Ich kann … | Note |
|---|---|---|---|
| 8 | `algebra.binomial` | die binomischen Formeln begründen und zum Umformen und Faktorisieren nutzen | MSA; Bayern 7 |
| 8 | `algebra.rearrange-formulas` | Formeln nach einer Variablen umstellen (v = s : t, Flächenformeln) | MSA |
| 8 | `algebra.fraction-terms` | Bruchterme kürzen, erweitern und addieren | G |
| 8 | `equations.inequalities` | lineare Ungleichungen aufstellen und lösen | MSA |
| 8 | `equations.fraction-equations` | einfache Bruchgleichungen lösen und die Definitionsmenge beachten | G |
| 8 | `algebra.two-unknowns` | Zahlenpaare finden, die eine Gleichung mit zwei Unbekannten erfüllen | MSA, reuse; later in RS |
| 8 | `equations.systems-graphical` | lineare Gleichungssysteme mit zwei Variablen grafisch lösen | MSA; later in RS (NRW RS 9/10) |
| 8 | `equations.systems-substitution` | lineare Gleichungssysteme mit dem Einsetzungs- und Gleichsetzungsverfahren lösen | MSA; later in RS |
| 8 | `equations.systems-elimination` | lineare Gleichungssysteme mit dem Additionsverfahren lösen und das passende Verfahren wählen | MSA; later in RS |
| 8 | `equations.systems-solvability` | begründen, wann ein Gleichungssystem keine, eine oder unendlich viele Lösungen hat | MSA; later in RS |
| 8 | `equations.systems-word` | Sachaufgaben mit zwei Unbekannten lösen (Tarife, Mischungen) | MSA; later in RS |
| 8 | `functions.concept` | eine Funktion als eindeutige Zuordnung erkennen und die Begriffe Definitionsmenge, Wertemenge und Graph nutzen | ESA |
| 8 | `functions.representations` | Funktionen in Worten, Wertetabelle, Graph und Term darstellen und zwischen ihnen wechseln | ESA |
| 8 | `functions.read-graphs` | Graphen aus dem Alltag lesen und deuten (Füllgraphen, Fahrtgraphen) | ESA |
| 8 | `functions.linear-slope` | Steigung und y-Achsenabschnitt am Graphen bestimmen (Steigungsdreieck) | ESA |
| 8 | `functions.linear-graph` | lineare Funktionen y = m · x + b zeichnen und den Einfluss von m und b beschreiben | ESA |
| 8 | `functions.linear-equation` | die Funktionsgleichung einer Geraden aus Punkt und Steigung oder zwei Punkten aufstellen | ESA |
| 8 | `functions.linear-zeros-intersections` | Nullstellen und Schnittpunkte zweier Geraden bestimmen | ESA |
| 8 | `functions.linear-models` | lineare Funktionen in Sachsituationen aufstellen und die Steigung deuten (Handytarif) | ESA |
| 8 | `functions.reciprocal` | Graphen von y = a/x zeichnen und als antiproportionale Zuordnung deuten | G |
| 8 | `percentages-ratio.combined-changes` | mehrere prozentuale Änderungen nacheinander berechnen | ESA |
| 8 | `percentages-ratio.compound-interest` | Zinseszins mit Wachstumsfaktor und Tabellenkalkulation berechnen | ESA |
| 8 | `circles.circumference-pi` | den Kreisumfang berechnen und π näherungsweise bestimmen | ESA; NRW 9/10 |
| 8 | `circles.area` | den Flächeninhalt eines Kreises berechnen und die Formel plausibel machen | ESA; NRW 9/10 |
| 8 | `circles.composite` | Flächen zusammengesetzter Figuren mit Kreisteilen berechnen (Kreisring) | ESA; NRW 9/10 |
| 8 | `solid-measure.prisms` | gerade Prismen erkennen und Netze und Schrägbilder zeichnen | ESA |
| 8 | `solid-measure.prism-volume-surface` | Volumen und Oberfläche von Prismen berechnen | ESA |
| 8 | `solid-measure.cylinder` | Netz, Oberfläche und Volumen eines Zylinders bestimmen | ESA; NRW 9/10 |
| 8 | `solid-measure.composite` | Volumen und Oberfläche zusammengesetzter Körper in Sachsituationen berechnen | ESA |
| 8 | `probability.terms` | Ergebnis, Ereignis und Gegenereignis unterscheiden | ESA |
| 8 | `probability.laplace` | Laplace-Wahrscheinlichkeiten berechnen und Laplace-Experimente von anderen unterscheiden | ESA |
| 8 | `probability.tree-two-stage` | zweistufige Zufallsexperimente als Baumdiagramm darstellen | MSA; Bayern 10 |
| 8 | `probability.path-rules` | Wahrscheinlichkeiten mit Pfadmultiplikations- und Pfadadditionsregel berechnen | MSA; Bayern 10 |
| 8 | `probability.simulate` | Zufallsexperimente mit Zufallszahlen simulieren | ESA |
| 8 | `statistics.histogram` | klassierte Daten als Histogramm darstellen und lesen | MSA |
| 8 | `statistics.survey-plan` | eine statistische Erhebung planen (Frage, Stichprobe, Fragebogen) | MSA |

### Klasse 9

Bayern M9: square roots, quadratic functions and equations, linked
events, similarity, powers, Pythagoras, trigonometry. NRW 9/10 first half.

| Klasse | Skill | Ich kann … | Note |
|---|---|---|---|
| 9 | `powers-roots.square-roots` | Quadratwurzeln verstehen und bei geeigneten Zahlen im Kopf bestimmen oder abschätzen | ESA |
| 9 | `powers-roots.cube-roots` | Kubikwurzeln bestimmen | ESA |
| 9 | `powers-roots.irrational` | rationale und irrationale Zahlen unterscheiden und erklären, was reelle Zahlen sind | MSA |
| 9 | `powers-roots.heron` | Quadratwurzeln mit dem Heron-Verfahren oder einer Intervallschachtelung annähern, auch in einer Tabellenkalkulation | MSA |
| 9 | `powers-roots.root-rules` | Wurzelterme mit den Wurzelgesetzen vereinfachen und teilweise radizieren | G |
| 9 | `powers-roots.scientific-notation` | sehr große und sehr kleine Zahlen in Zehnerpotenzschreibweise angeben und vergleichen | ESA |
| 9 | `powers-roots.power-laws` | Potenzgesetze für ganzzahlige Exponenten anwenden | MSA |
| 9 | `powers-roots.rational-exponents` | Wurzeln als Potenzen mit rationalen Exponenten schreiben und umformen | G |
| 9 | `proofs.irrational-root-two` | mit einem indirekten Beweis zeigen, dass √2 irrational ist | G |
| 9 | `functions.parabola-normal` | die Normalparabel und verschobene Parabeln zeichnen und beschreiben | MSA |
| 9 | `functions.parabola-parameters` | den Einfluss von a, d und e in y = a · (x − d)² + e auf die Parabel beschreiben | MSA |
| 9 | `functions.parabola-forms` | den Scheitel mit quadratischer Ergänzung bestimmen und zwischen den Termformen wechseln | MSA |
| 9 | `equations.quadratic-simple` | einfache quadratische Gleichungen ohne Formel lösen (x² = c, Ausklammern) | MSA |
| 9 | `equations.quadratic-formula` | quadratische Gleichungen mit der Lösungsformel lösen | MSA |
| 9 | `equations.quadratic-solvability` | die Anzahl der Lösungen an der Diskriminante bestimmen und deuten | MSA |
| 9 | `functions.parabola-zeros-intersections` | Nullstellen von Parabeln und Schnittpunkte von Parabel und Gerade berechnen | MSA |
| 9 | `functions.quadratic-models` | Extremwertaufgaben und Flugbahnen mit quadratischen Funktionen lösen | MSA |
| 9 | `functions.power-functions` | Graphen von Potenzfunktionen y = a · xⁿ beschreiben | G |
| 9 | `equations.vieta` | mit dem Satz von Vieta Lösungen finden und prüfen | G |
| 9 | `similarity.enlarge` | Figuren durch zentrische Streckung vergrößern und verkleinern und Zentrum und Faktor bestimmen | ESA |
| 9 | `similarity.similar-figures` | prüfen, ob Figuren ähnlich sind, und fehlende Längen berechnen | ESA |
| 9 | `similarity.intercept-theorems` | die Strahlensätze in Figuren und Sachsituationen anwenden | MSA, check (Bayern 9 names them, NRW only "Ähnlichkeitsbeziehungen") |
| 9 | `similarity.area-volume-scaling` | erklären, wie sich Fläche und Volumen beim Strecken mit k ändern (k², k³) | MSA, check (Bayern 9) |
| 9 | `pythagoras.theorem` | den Satz des Pythagoras an rechtwinkligen Dreiecken anwenden | ESA |
| 9 | `proofs.pythagoras` | einen Beweis des Satzes des Pythagoras nachvollziehen und erklären | MSA |
| 9 | `pythagoras.converse` | mit der Umkehrung prüfen, ob ein Dreieck rechtwinklig ist | MSA |
| 9 | `pythagoras.applications` | Längen in Sachsituationen und Körpern berechnen (Leiter, Raumdiagonale, Bildschirmdiagonale) | ESA |
| 9 | `pythagoras.distance-points` | den Abstand zweier Punkte im Koordinatensystem berechnen | MSA, check |
| 9 | `trigonometry.ratios` | Sinus, Kosinus und Tangens als Seitenverhältnisse im rechtwinkligen Dreieck erklären | MSA |
| 9 | `trigonometry.right-triangle` | Seiten und Winkel im rechtwinkligen Dreieck berechnen | MSA |
| 9 | `trigonometry.applications` | Höhen, Steigungen und Entfernungen mit Trigonometrie berechnen | MSA |
| 9 | `trigonometry.identities` | sin² α + cos² α = 1 und sin α = cos(90° − α) begründen | G |
| 9 | `probability.four-field-table` | eine Vierfeldertafel aufstellen und Wahrscheinlichkeiten daraus ablesen | MSA |
| 9 | `probability.events-sets` | Und- und Oder-Ereignisse mit Mengendiagrammen darstellen | G |
| 9 | `statistics.misleading` | Manipulationen in Diagrammen und Statistiken erkennen und beschreiben | ESA |
| 9 | `statistics.media-claims` | statistische Aussagen in echten Texten prüfen und beurteilen | MSA |

### Klasse 10

Bayern M10: exponential growth and logarithm, compound experiments and
simulation, sine and cosine functions, polynomial functions, solids. NRW
9/10 second half.

| Klasse | Skill | Ich kann … | Note |
|---|---|---|---|
| 10 | `growth.linear-vs-exponential` | lineares und exponentielles Wachstum an Tabellen und Graphen unterscheiden | MSA |
| 10 | `growth.exponential-function` | Exponentialfunktionen f(x) = a · bˣ mit Anfangswert und Wachstumsfaktor darstellen und deuten | MSA |
| 10 | `growth.decay` | exponentielle Abnahme beschreiben und berechnen (Wertverlust, Medikament im Blut) | MSA |
| 10 | `growth.doubling-half-life` | Verdopplungszeit und Halbwertszeit bestimmen | MSA, check (only NRW Gymnasium names it) |
| 10 | `growth.equations-trial` | Gleichungen wie bˣ = c durch Probieren und mit Tabellenkalkulation lösen | MSA |
| 10 | `growth.logarithm` | den Logarithmus als Umkehrung des Potenzierens erklären und bˣ = c damit lösen | G; NRW Realschule also asks for it |
| 10 | `growth.models` | ein Wachstumsmodell wählen, Prognosen treffen und die Grenzen des Modells beurteilen | MSA |
| 10 | `functions.compare-classes` | lineare, quadratische und exponentielle Zusammenhänge an Tabelle, Graph und Term unterscheiden | MSA |
| 10 | `functions.data-fit` | in Messreihen mit einem digitalen Werkzeug einen passenden funktionalen Zusammenhang finden | MSA |
| 10 | `functions.polynomial` | ganzrationale Funktionen am Term und am Graphen beschreiben (Grad, Nullstellen) | G |
| 10 | `functions.symmetry` | prüfen, ob ein Graph achsensymmetrisch zur y-Achse oder punktsymmetrisch zum Ursprung ist | G |
| 10 | `trigonometry.unit-circle` | Sinus und Kosinus am Einheitskreis für Winkel bis 360° bestimmen | MSA |
| 10 | `trigonometry.sine-function` | periodische Vorgänge mit f(x) = a · sin(b · x) beschreiben (Riesenrad, Gezeiten) | MSA |
| 10 | `trigonometry.radian` | Winkel im Bogenmaß angeben und zwischen Grad- und Bogenmaß umrechnen | G |
| 10 | `trigonometry.sine-parameters` | den Einfluss aller Parameter in a · sin(b · (x + c)) + d beschreiben | G |
| 10 | `trigonometry.sine-cosine-rule` | Sinussatz und Kosinussatz in beliebigen Dreiecken anwenden | G; Bayern 9 |
| 10 | `circles.arc-sector` | Kreisbogen und Kreisausschnitt berechnen | MSA |
| 10 | `solid-measure.pyramid` | Netz, Oberfläche und Volumen einer Pyramide bestimmen | ESA |
| 10 | `solid-measure.cone` | Netz, Oberfläche und Volumen eines Kegels bestimmen | MSA |
| 10 | `solid-measure.sphere` | Oberfläche und Volumen einer Kugel berechnen | MSA |
| 10 | `solid-measure.cavalieri` | mit dem Prinzip von Cavalieri begründen, warum Körper gleiches Volumen haben | G |
| 10 | `solid-measure.composite-advanced` | zusammengesetzte Körper mit Pythagoras und Trigonometrie berechnen | MSA |
| 10 | `probability.multi-stage` | mehrstufige Zufallsexperimente mit und ohne Zurücklegen berechnen (Urnenmodell) | MSA |
| 10 | `probability.conditional` | bedingte Wahrscheinlichkeiten mit Vierfeldertafel und Baum erkennen (Test mit falschem Alarm) | MSA |
| 10 | `probability.counting-arrangements` | Anzahlen von Anordnungen und Auswahlen bestimmen (Händeschütteln, Lotto) | MSA |
| 10 | `probability.monte-carlo` | Wahrscheinlichkeiten, die ich nicht berechnen kann, durch Simulation schätzen (Ziegenproblem) | G |
| 10 | `equations.solving-strategies` | bei einer Gleichung erkennen, ob sie linear, quadratisch oder exponentiell ist, und ein passendes Verfahren wählen | MSA |

Count: 44 + 47 + 43 + 36 + 36 + 27 = 233 skills, 186 new and 47 reused.

Unplaced en-GB skills: `decimals.tenths`, `decimals.hundredths`,
`angles.turns`, `angles.right-angles`, `coordinates.translate`,
`percentages-ratio.relative-size`, `unequal-sharing`, `scale-factor`,
`length.imperial`, `large-numbers.roman-numerals-large`,
`mass-capacity.temperature`. They stay prerequisites (the tenths and
hundredths are covered by de-DE money and length notation in Klasse 3 and
4) or en-GB only.

## Overlaps and prerequisites

### With Grundschule

| Grundschule | Klasse 5 picks up |
|---|---|
| `large-numbers` to a million, rounding | numbers past a million, powers of ten |
| `written-mult-div` (one-digit divisor, enrichment for Bayern) | long division by two-digit numbers |
| `written-mult-div.divisibility` (Klasse 4 enrichment) | `divisibility.rules-combined` |
| `fractions.everyday-measures`, `name-fractions` | the en-GB fraction skills placed in 5 and 6 |
| `patterns.proportional` | `proportion.rule-of-three-intro` |
| `shapes.scale` | `proportion.scale` |
| `symmetry.point-symmetry` (Klasse 4 enrichment) | `symmetry.point-reflection` |
| `area-volume.perimeter`, `volume-cubes` | area and volume formulas |
| `data.critical`, `data.digital-tools` | `statistics.choose-chart`, `statistics.misleading` |
| `chance.fair-games`, `chance.combinations` | `probability.counting-principle`, `probability.experiments` |

### With other secondary subjects

| Subject | Uses from Mathe | Order to respect |
|---|---|---|
| Physik | proportional relations, rearranging formulas, line graphs, scientific notation | `algebra.rearrange-formulas` (8) before physics formulas; Physik in 7 uses `proportion.proportional` |
| Chemie | rule of three, percent concentration, powers of ten | `percentages-ratio.base-value` (7) before mass percent |
| Biologie | percent, charts, probability in genetics (Mendel) | `probability.tree-two-stage` (8) before Mendel's rules |
| Erdkunde | scale, climate charts, population growth | `proportion.scale` (5); Erdkunde shows population growth before `growth.exponential-function` (10), so it uses tables and graphs, not the function |
| Wirtschaft, Politik | interest, credit, percent in the news, statistics | `percentages-ratio.compound-interest` (8), `statistics.media-claims` (9) |
| Informatik | binary numbers, algorithms, spreadsheets | Heron and Monte Carlo are algorithms written in a spreadsheet; the Informatik doc can link them |
| Musik | frequency, periodic sine curves | optional link from `trigonometry.sine-function` |
| Kunst | symmetry, perspective, oblique drawings | `solids.oblique-drawing` |

Each overlap is a prerequisite link, not a second lesson.

## Out of scope for an app

For omitted.md, with the reason:

- **Constructing on paper with compass, ruler and Geodreieck.** The
  standards ask for it from Klasse 5. Twist teaches the steps with a
  drawn compass and straightedge on screen and checks the result; the
  fine-motor skill of paper construction stays in class.
- **Open work with dynamic geometry software and computer algebra.** Twist
  offers fixed sliders where a skill needs to see a parameter change; free
  exploration in GeoGebra or similar stays in class.
- **Real spreadsheets.** Skills that use Tabellenkalkulation get a small
  built-in table with formula cells; learning a spreadsheet program is not
  taught.
- **Measuring in the surroundings and running a real survey.** Twist
  supplies the data and offers a "Probier's aus" task at home (measure a
  can for π, count cars for 10 minutes) that never counts for mastery.
- **Writing a full proof in free text.** Twist checks proofs by ordering
  steps, filling gaps and choosing reasons; free proof writing stays in
  class.
- **Presenting, discussing and group modelling projects.**
- **Mengenlehre as a topic of its own** (the benchmark has it; KMK and both
  Länder use sets only as a notation, which `probability.events-sets`
  covers).
- **Kathetensatz and Höhensatz** (Satzgruppe des Pythagoras, in the
  benchmark): neither NRW nor Bayern Gymnasium names them. Not checked in
  other Länder.
- **Bernoulli experiments, binomial distribution, logarithm functions,
  calculus, vectors**: Oberstufe in NRW and Bayern (../omitted.md already
  excludes Klasse 11 to 13).
- **Spherical segments and other Kugelausschnitte** (benchmark): in no
  captured curriculum.
- **Calculator handling as a skill.** Where the standards say "mit
  digitalen Mathematikwerkzeugen", Twist shows an on-screen calculator for
  that task; using a school calculator model is not taught.

## Task types and drawn components

New task types or interactions (each needs an entry in
docs/task-types.md before first use):

| Type | What the child does | For |
|---|---|---|
| `drag_and_drop` (listed, not used yet) | drags points, a line or a vertex on a grid or graph | functions, transformations, box plots |
| `multi_select` (listed, not used yet) | taps every true statement | properties of quadrilaterals, functions, proofs |
| `text_input` keypad modes | keypad with minus sign, comma, fraction bar, power, root and π | every calculation from Klasse 5 |
| `equation_steps` | picks the next transformation ("−3 auf beiden Seiten") and fills the new line; each line is checked | equations, terms, formulas |
| `construct` | uses an on-screen compass and straightedge; the finished figure is checked by geometry, not by the steps | `constructions.*`, `symmetry.point-reflection` |
| `measure_angle` | turns a drawn protractor and reads the angle | `angles.measure-draw` and later |
| `slider_explore` | moves a parameter slider after predicting what will change; never counts for mastery | linear, quadratic, exponential, sine functions |
| `simulate` | runs 10, 100 or 1000 trials and watches the relative frequency settle | `probability.experiments`, `law-large-numbers`, `monte-carlo` |
| `fill_tree` | fills probabilities on the branches of a tree diagram | probability trees and path rules |
| `spreadsheet` | fills formula cells in a small table | term values, compound interest, Heron |

Proofs reuse `ordering` (put the steps in order) and `fill_in_blank`
(choose the reason for each step); no new type.

New drawings in pages/player/drawn.js (existing ones such as `numberLine`,
`angle`, `coordinates`, `lineGraph`, `pieChart`, `fraction`, `cubes`,
`circleParts`, `equation` and `spinner` are extended, not replaced):

| Drawing | For |
|---|---|
| function graph (any term, several graphs, slider-ready) | functions, growth, trigonometry |
| balance scale | `equations.balance` |
| percent strip | percent skills |
| algebra tiles (area model) | `algebra.expand`, `algebra.binomial` |
| box plot, histogram | statistics |
| tree diagram, four-field table, Venn diagram | probability |
| protractor, compass and straightedge | constructions, angles |
| parallel lines with a transversal | `angles.angle-pairs` |
| oblique drawing and net of prism, cylinder, pyramid, cone, sphere | solids and `solid-measure` |
| right triangle with labelled sides and angle | Pythagoras, trigonometry |
| squares on the sides (Pythagoras figure) | `pythagoras.theorem`, `proofs.pythagoras` |
| intercept figure (two rays, two parallels) | `similarity.intercept-theorems` |
| unit circle with angle and sine and cosine | `trigonometry.unit-circle`, `sine-function` |
| map with scale bar | `proportion.scale` |

## Fun: hooks for ages 10 to 16

fun.md applies. At 10 to 16 the hooks change: less mascot play, more
challenge, real use and the chance to beat one's own record. The child
can skip the story in a lesson they repeat.

| Hook | What it is | Used in |
|---|---|---|
| Knobelaufgabe | Every lesson set ends with one optional hard puzzle (Zahlenrätsel, Streichholzrätsel, a missing angle three steps deep). Solving it earns a badge, failing costs nothing | all |
| Wo ist der Fehler? | A worked solution by a made-up classmate with one mistake; the child finds and fixes it | terms, equations, fractions, percent |
| Rechne nach | Claims from everyday life checked with maths: Is the large pizza really better value? Is "50 % mehr Inhalt" the same as "33 % Rabatt"? Does a phone plan with a monthly fee pay off? | area, circles, percent, linear functions |
| Diagramme, die lügen | Real-looking charts with a cut axis, a 3D pie or a misleading average; the child names the trick | statistics |
| Bestzeit | Timed rounds of mental arithmetic, squares, powers of ten, sign rules; the child plays against their own last time, never against others | arithmetic, integers, roots |
| Escape room | Three to five tasks in a row unlock a door; each answer is a digit of the code | end of each topic family |
| Geschichte der Mathematik | One short true story per big idea: Thales measuring a pyramid by its shadow, Eratosthenes measuring the Earth, Gauss adding 1 to 100, the proof that √2 is irrational | Thales, similarity, sequences, roots |
| Simulation | Run the goat problem or the birthday problem 1000 times and see the surprise come true | probability |
| Probier's aus | Measure π with a string and a can, roll a die 60 times, time a bouncing ball; predict first, report back, never counts | circles, probability, quadratic models |
| Design it | Make a fair game, plan a garden with a fixed fence length, fit a ramp with a set slope | probability, quadratic models, trigonometry |
| Wachstum sehen | Exponential growth with folded paper, a viral message, a debt with interest | growth |

Humour stays (absurd wrong answers: a classroom 3 km long), names and
situations are written for Twist, and brands are not used.

## Sources

Captured on 2026-10-24 (rnd/official-de/, each logged in fetch-log.jsonl):

| File | Document |
|---|---|
| kmk/raw/2022_06_23-Bista-ESA-MSA-Mathe.pdf, kmk/text/…txt | KMK Bildungsstandards Mathematik ESA und MSA, i.d.F. 23.06.2022, with the correction of 18.06.2026 |
| nrw/raw/g9_m_klp_3401_2019_06_23_0.pdf, nrw/text/…txt | NRW Kernlehrplan Mathematik Gymnasium Sek I (G9), Heft 3401, 2019 |
| nrw/raw/rs_m_klp_2022_06_17.pdf, nrw/text/…txt | NRW Kernlehrplan Mathematik Realschule, Heft 3302, 2022 |
| by/raw/lehrplanplus-gym-mathematik-jgs5.html to jgs10.html, by/text/…txt | LehrplanPLUS Gymnasium Bayern, Mathematik, Jahrgangsstufe 5 to 10 |

Still to fetch:

- LehrplanPLUS Realschule Bayern, Mathematik 7 to 10 (Wahlpflichtfächergruppe I and II/III): the page for Klasse 5 exists at /fachlehrplan/realschule/5/mathematik, but the URL for the split groups from Klasse 7 was not found.
- LehrplanPLUS Mittelschule Bayern (ESA level, Klasse 5 to 9).
- NRW Hauptschule Kernlehrplan Mathematik 2022 (hs_m_klp_2022_06_17_0.pdf on lehrplannavigator.nrw.de), for the ESA path.
- Baden-Württemberg Bildungsplan 2016 Gymnasium Mathematik and Berlin/Brandenburg Rahmenlehrplan Teil C Mathematik, to settle the "check" notes (Strahlensätze, Satzgruppe des Pythagoras, Halbwertszeit).

## Size and benchmark

| Klasse | Twist skills | Twist lessons (estimate) | Benchmark lessons |
|---|---|---|---|
| 5 | 44 | 90 | 65 |
| 6 | 47 | 95 | 57 |
| 7 | 43 | 90 | 47 |
| 8 | 36 | 80 | 54 |
| 9 | 36 | 85 | 54 (one course for 9 and 10) |
| 10 | 27 | 60 | |
| Total | 233 | about 500 | 277 |

Twist's Grundschule course has 417 lessons against the benchmark's 296
(1.4 times); this plan is about 1.8 times the benchmark because every
skill gets its own lesson set where the benchmark puts several ideas in
one lesson, and because it covers the G-only Bayern topics (polynomial
functions, Sinussatz and Kosinussatz, Monte Carlo) that the benchmark
leaves out. About 100 of the 500 lessons are for the 47 reused skills,
which have en-GB lesson sets to adapt. Klasse 5 and 6 are the largest
because they take over the en-GB fraction, decimal and percent skills;
Klasse 10 is the smallest, as in Bayern, where Klasse 10 has five
Lernbereiche.
