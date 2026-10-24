# Making the new subjects fun

A child chooses Twist at home, after school. A lesson that feels like a
worksheet loses them. These rules apply to every new subject on top of
docs/lesson-anatomy.md (activities, authoring checks, mastery), and the
review checks them like any other authoring check.

## Rules for every lesson set

1. **Open with a question, not a fact.** Learn starts with something to
   guess: "Schwimmt ein Apfel?", "Welcher Vogel singt so?", "Wie alt ist
   diese Burg?" The child commits to an answer, then finds out. The guess
   never counts for mastery.
2. **The child does something.** Every Practise stage has the child move,
   sort, build, listen or choose. Reading a fact and tapping "weiter" is
   not a task.
3. **One small story per lesson set.** A situation the child is inside:
   helping a friend find the way, getting a bike ready for the test,
   travelling back to a Roman camp. Same rule as story lessons in Deutsch:
   scenarios, names and stories are written for Twist.
4. **Real things look real.** Animals, plants, birds, trees, tools and
   places are photos or detailed pictures, not icons. Sounds are real
   recordings.
5. **A surprise in every lesson.** One "Wusstest du?" line the child will
   want to tell someone: a snail has thousands of tiny teeth, a
   hummingbird's heart beats more than 1000 times a minute. Checked facts only.
6. **Short and varied.** No more than three tasks of the same type in a
   row. Lesson length stays within lesson-anatomy.md.
7. **Humour is allowed.** Wrong options can be funny (a penguin on the
   meadow) as long as the right answer is never in doubt.
8. **The mascot joins in.** Each new topic family gets a start pose
   (assets/mascot.yaml `topics`): explorer hat for nature, helmet for
   traffic, map for Raum, knight's helmet for history, headphones for
   Musik, paint brush for Kunst.

## Hooks per subject

### Sachunterricht

| Hook | What it is | Used in |
|---|---|---|
| Try it at home (Probier's aus) | A safe mini experiment with things from home, set up in the app: predict, do it with a parent, come back and say what happened. The prediction and the report never count for mastery; the skill check that follows does | `float-sink`, `light-shadow`, `magnets`, `air`, `water-states`, `plant-growth`, `sound` |
| Puzzles | Drag the Länder into the map, rebuild the water cycle, place the organs in the body, put events on the timeline | `germany-map`, `water-cycle`, `digestion`, `timeline` |
| Build it | Connect battery, bulb and switch until the bulb lights; build a bridge that holds | `electric-circuit`, `conductors`, `bridges` |
| Be the cyclist | A drawn junction: who goes first? The child steers through it | `right-of-way`, `turning-left`, `cycling-test` |
| Listen | Which bird is singing? Which animal makes that sound? | `native-birds`, `forest`, `farm-animals` |
| Time travel | Each history skill is a trip to one time with a guide child from that time | `stone-age`, `middle-ages`, `then-now` |
| Detective | Real or made up? Find the clue in a photo, an advert or a message | `media-reality`, `fact-fiction`, `advertising`, `internet-safety` |
| Code the mascot | Give the mascot a sequence of moves to reach the goal | `algorithms` |

### DaZ

Songs and chants for the first words, a picture dictionary the child
builds as they go, everyday scenes (breakfast, playground, shop) where the
child taps and hears every object.

### Musik

Clap-back rhythm games, an instrument detective (hear it, find it),
"higher or lower" races, the orchestra as a building to explore, Peter und
der Wolf told as a story with each character's instrument.

### Kunst

A colour lab (mix two paints, see the result), find the detail in a famous
painting, spot what changed between two versions of a picture, sort
paintings by mood.

### Ethik

Choose-your-path stories: the child decides what a character does next and
sees what follows. Several answers can be fine; the task asks for the
reasons that fit (see ethik.md, Fit).

## What needs building

| Item | Kind | For |
|---|---|---|
| `drag_and_drop` onto a picture (map, body, cycle) | task type (listed as not used yet in task-types.md) | puzzles |
| circuit builder | task type and drawing | Build it |
| junction | drawing with movable cyclist | Be the cyclist |
| sequence of moves on a grid | task type | Code the mascot |
| tap the rhythm | task type | Musik |
| colour mixer | drawing | Kunst |
| choose-your-path | task type (branching story; check counts only the final reasons task) | Ethik |
| at-home experiment | activity setting: predict, pause, report; never counts | Try it at home |
| bird and animal sound bank | assets, licensed recordings | Listen |

## Review question

Each lesson set's review adds one question to the authoring checks: would a
seven-year-old (or ten-year-old for Klasse 3 and 4) choose to do this
lesson again? If the answer is "only because it is homework", change the
hook before publishing.
