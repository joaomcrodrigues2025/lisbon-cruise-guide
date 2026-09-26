// Port day planner: turns a ship's hours in Lisbon into a timed, realistic itinerary.
// Pure functions only, so the logic can run in the browser and be tested in isolation.

export type Interest = 'history' | 'views' | 'food' | 'museums' | 'family';
export type AreaId = 'alfama' | 'baixa' | 'belem' | 'oriente' | 'sintra';
export type Mobility = 'full' | 'limited';

export interface PlannerStop {
  id: string; // attraction slug
  name: string;
  minutes: number; // realistic visit time for a port day
  interests: Interest[];
  hilly?: boolean; // steep or stepped approach on foot
  closedOn?: number[]; // weekdays closed to visitors, 0 = Sunday
  note?: string;
  coords: [number, number];
}

export interface PlannerArea {
  id: AreaId;
  name: string;
  summary: string;
  // Door-to-door minutes from the cruise terminal, by the recommended mode
  fromTerminal: number;
  transport: string;
  minHoursAshore: number;
  stops: PlannerStop[];
}

export const TERMINAL: [number, number] = [38.7104, -9.1263];

export const AREAS: PlannerArea[] = [
  {
    id: 'alfama',
    name: 'Alfama & the Castle',
    summary: 'The medieval quarter directly behind the terminal: cathedral, viewpoints and São Jorge Castle.',
    fromTerminal: 5,
    transport: 'On foot from the terminal',
    minHoursAshore: 2,
    stops: [
      { id: 'museu-do-fado', name: 'Fado Museum', minutes: 60, interests: ['museums', 'history'], closedOn: [1], coords: [38.712778, -9.125833] },
      { id: 'se-de-lisboa', name: 'Lisbon Cathedral (Sé)', minutes: 35, interests: ['history'], closedOn: [0], coords: [38.71, -9.133] },
      { id: 'miradouro-de-santa-luzia', name: 'Miradouro de Santa Luzia', minutes: 20, interests: ['views'], hilly: true, coords: [38.7112, -9.1295] },
      { id: 'miradouro-das-portas-do-sol', name: 'Miradouro das Portas do Sol', minutes: 15, interests: ['views'], hilly: true, coords: [38.7119, -9.13] },
      { id: 'castelo-de-sao-jorge', name: 'São Jorge Castle', minutes: 90, interests: ['history', 'views', 'family'], hilly: true, note: 'Buy tickets online to skip the queue.', coords: [38.713928, -9.133596] },
      { id: 'alfama', name: 'Wander the Alfama lanes', minutes: 40, interests: ['history', 'food'], hilly: true, note: 'Downhill always leads back towards the river and the ship.', coords: [38.7125, -9.128333] },
    ],
  },
  {
    id: 'baixa',
    name: 'Baixa & Chiado',
    summary: 'The grand riverside square, the downtown grid and the elegant Chiado district, flat until the last climb.',
    fromTerminal: 14,
    transport: 'On foot along the river (14 min to Praça do Comércio)',
    minHoursAshore: 2,
    stops: [
      { id: 'praca-do-comercio', name: 'Praça do Comércio', minutes: 20, interests: ['history', 'views'], coords: [38.7077, -9.1365] },
      { id: 'arco-da-rua-augusta', name: 'Rua Augusta Arch (rooftop)', minutes: 30, interests: ['views', 'history'], coords: [38.7087, -9.1365] },
      { id: 'rua-augusta', name: 'Rua Augusta', minutes: 20, interests: ['food'], coords: [38.7103, -9.13692] },
      { id: 'convento-do-carmo', name: 'Carmo Convent ruins', minutes: 45, interests: ['history', 'museums'], closedOn: [0], hilly: true, note: 'The Santa Justa lift is closed; take the metro to Baixa-Chiado (Chiado exit) or walk up Calçada do Sacramento from the Baixa.', coords: [38.7119, -9.1402] },
      { id: 'chiado', name: 'Chiado cafés and shops', minutes: 45, interests: ['food'], coords: [38.7108, -9.1421] },
      { id: 'time-out-market-lisboa', name: 'Lunch at Time Out Market', minutes: 60, interests: ['food', 'family'], coords: [38.707, -9.1459] },
    ],
  },
  {
    id: 'belem',
    name: 'Belém',
    summary: 'Lisbon’s great monuments of the Age of Discovery, 7 km west on the river.',
    fromTerminal: 25,
    transport: 'Taxi or app car (15–20 min), or tram 15E from Praça do Comércio (30–40 min)',
    minHoursAshore: 4,
    stops: [
      { id: 'maat-museum', name: 'MAAT and its rooftop', minutes: 60, interests: ['museums', 'views'], note: 'On the river about 1 km east of the monastery; the taxi can drop you here first.', coords: [38.6959, -9.1933] },
      { id: 'mosteiro-dos-jeronimos', name: 'Jerónimos Monastery', minutes: 90, interests: ['history', 'museums'], closedOn: [1], note: 'Closed on Mondays. Book a timed ticket in high season.', coords: [38.697617, -9.206247] },
      { id: 'pasteis-de-belem', name: 'Pastéis de Belém', minutes: 30, interests: ['food', 'family'], note: 'The takeaway queue moves fast; the rooms inside are quicker still.', coords: [38.6977, -9.2033] },
      { id: 'padrao-dos-descobrimentos', name: 'Monument to the Discoveries', minutes: 40, interests: ['history', 'views'], coords: [38.693611, -9.205722] },
      { id: 'torre-de-belem', name: 'Belém Tower', minutes: 40, interests: ['history', 'views', 'family'], closedOn: [1], note: 'Closed on Mondays. The outside and riverside are the highlight if time is short.', coords: [38.691594, -9.215979] },
    ],
  },
  {
    id: 'oriente',
    name: 'Parque das Nações & Oceanarium',
    summary: 'The modern riverside district: one of Europe’s best aquariums and a cable car along the water.',
    fromTerminal: 25,
    transport: 'Train from Santa Apolónia to Oriente (walk 10 min to the station), or taxi (15 min)',
    minHoursAshore: 4,
    stops: [
      { id: 'oceanario-de-lisboa', name: 'Oceanário de Lisboa', minutes: 120, interests: ['family', 'museums'], coords: [38.7635, -9.0937] },
      { id: 'teleferico-de-lisboa', name: 'Riverside cable car', minutes: 30, interests: ['views', 'family'], coords: [38.768, -9.0945] },
    ],
  },
  {
    id: 'sintra',
    name: 'Sintra',
    summary: 'Fairy-tale palaces in the hills 30 km from the port. Magnificent, and the easiest way to miss the ship.',
    fromTerminal: 90,
    transport: 'Metro to Restauradores, train from Rossio to Sintra, then bus 434 or a tuk-tuk up the hill (75–90 min each way)',
    minHoursAshore: 8,
    stops: [
      { id: 'palacio-da-pena', name: 'Pena Palace and park', minutes: 150, interests: ['history', 'views', 'family'], hilly: true, note: 'Timed tickets are compulsory: book before you leave the ship.', coords: [38.7877, -9.3906] },
      { id: 'quinta-da-regaleira', name: 'Quinta da Regaleira', minutes: 90, interests: ['history', 'views'], hilly: true, coords: [38.7962, -9.3961] },
      { id: 'sintra-unesco-town', name: 'Sintra old town', minutes: 30, interests: ['food'], coords: [38.8029, -9.3817] },
    ],
  },
];

// Minutes between two areas by taxi, including finding a car
const TRANSFER: Record<string, number> = {
  'alfama-baixa': 10,
  'alfama-belem': 25,
  'alfama-oriente': 25,
  'baixa-belem': 20,
  'baixa-oriente': 25,
  'belem-oriente': 30,
  'alfama-sintra': 90,
  'baixa-sintra': 80,
  'belem-sintra': 60,
  'oriente-sintra': 70,
};

export function transferMinutes(a: AreaId | 'terminal', b: AreaId | 'terminal'): number {
  if (a === b) return 0;
  if (a === 'terminal') return AREAS.find((x) => x.id === b)!.fromTerminal;
  if (b === 'terminal') return AREAS.find((x) => x.id === a)!.fromTerminal;
  return TRANSFER[`${a}-${b}`] ?? TRANSFER[`${b}-${a}`] ?? 30;
}

function haversine(a: [number, number], b: [number, number]): number {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b[0] - a[0]);
  const dLon = toRad(b[1] - a[1]);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a[0])) * Math.cos(toRad(b[0])) * Math.sin(dLon / 2) ** 2;
  return 2 * 6371000 * Math.asin(Math.sqrt(h));
}

// Street routes are ~30% longer than straight lines; hills and limited mobility slow the pace
export function walkMinutes(a: [number, number], b: [number, number], mobility: Mobility, hilly = false): number {
  const metresPerMinute = (mobility === 'limited' ? 50 : 75) * (hilly ? 0.75 : 1);
  return Math.max(2, Math.round((haversine(a, b) * 1.3) / metresPerMinute));
}

export interface PlanInput {
  arrival: string; // "HH:MM" when you can step ashore
  allAboard: string; // "HH:MM" printed in the ship's daily programme
  areas: AreaId[];
  interests: Interest[];
  mobility: Mobility;
  weekday?: number; // 0 = Sunday; omit when the day is unknown
}

export type PlanItem =
  | { kind: 'move'; start: number; end: number; label: string }
  | { kind: 'visit'; start: number; end: number; stop: PlannerStop }
  | { kind: 'return'; start: number; end: number; label: string };

export interface Plan {
  items: PlanItem[];
  backAtTerminal: number; // minutes since midnight
  mustLeaveBy: number;
  hoursAshore: number;
  warnings: string[];
  droppedAreas: string[];
}

// Be back at the terminal this long before all-aboard, plus a traffic margin when coming from afar
export const RETURN_MARGIN = 45;
const FAR_AREA_EXTRA = 20;
const DISEMBARK = 20;
const LUNCH_FROM = 12 * 60 + 30;
const LUNCH_MINUTES = 45;

export function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + (m || 0);
}

export function formatTime(minutes: number): string {
  const m = ((Math.round(minutes) % 1440) + 1440) % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
}

function scoreStop(stop: PlannerStop, interests: Interest[]): number {
  if (interests.length === 0) return 1;
  return stop.interests.filter((i) => interests.includes(i)).length;
}

export function buildPlan(input: PlanInput): Plan {
  const warnings: string[] = [];
  const droppedAreas: string[] = [];
  const start = toMinutes(input.arrival) + DISEMBARK;
  let allAboard = toMinutes(input.allAboard);
  if (allAboard <= toMinutes(input.arrival)) allAboard += 1440;
  const backBy = allAboard - RETURN_MARGIN;
  const hoursAshore = (allAboard - toMinutes(input.arrival)) / 60;

  // Far areas first, while the day is fresh; the old town last because it is next to the ship
  const order: AreaId[] = ['sintra', 'belem', 'oriente', 'baixa', 'alfama'];
  let chosen = order.filter((id) => input.areas.includes(id));
  if (chosen.length === 0) chosen = ['alfama', 'baixa'];

  for (const id of [...chosen]) {
    const area = AREAS.find((a) => a.id === id)!;
    if (hoursAshore < area.minHoursAshore) {
      chosen = chosen.filter((c) => c !== id);
      droppedAreas.push(area.name);
      warnings.push(
        `${area.name} needs at least ${area.minHoursAshore} hours ashore to be safe; you have ${hoursAshore.toFixed(1)}. We left it out.`
      );
    }
  }
  if (chosen.includes('sintra') && chosen.some((c) => c !== 'sintra' && c !== 'alfama')) {
    const keep: AreaId[] = chosen.filter((c) => c === 'sintra' || c === 'alfama');
    for (const c of chosen.filter((x) => !keep.includes(x))) droppedAreas.push(AREAS.find((a) => a.id === c)!.name);
    chosen = keep;
    warnings.push('Sintra takes most of a port day on its own, so we paired it only with Alfama, next to the ship.');
  }
  if (chosen.length === 0) chosen = ['alfama'];

  const items: PlanItem[] = [];
  let now = start;
  let here = 'terminal' as AreaId | 'terminal';
  let position: [number, number] = TERMINAL;
  let hadLunch = false;
  const needsLunch = start <= 12 * 60 && backBy > LUNCH_FROM + 90;

  // Old-town areas are walked back from wherever the day ended (up to ~30 min from Cais do Sodré)
  const returnTime = (from: AreaId | 'terminal') => {
    if (from === 'terminal') return 0;
    if (from === 'alfama' || from === 'baixa') return from === 'alfama' ? 12 : 30;
    return transferMinutes(from, 'terminal') + FAR_AREA_EXTRA;
  };

  chosen.forEach((areaId, index) => {
    const area = AREAS.find((a) => a.id === areaId)!;
    const travel = transferMinutes(here, areaId);
    // Leave room for the areas still to come, at least a short visit each
    const reserveForLater = chosen
      .slice(index + 1)
      .reduce((sum, next, i, arr) => sum + transferMinutes(i === 0 ? areaId : arr[i - 1], next) + 45, 0);

    if (now + travel + 30 + returnTime(areaId) + reserveForLater > backBy) {
      droppedAreas.push(area.name);
      warnings.push(`Not enough time left for ${area.name}; we dropped it rather than risk the all-aboard.`);
      return;
    }

    if (travel > 0) {
      items.push({
        kind: 'move',
        start: now,
        end: now + travel,
        label: here === 'terminal' ? area.transport : `Taxi or app car to ${area.name} (about ${travel} min)`,
      });
      now += travel;
    }
    here = areaId;

    const candidates = [...area.stops]
      .filter((s) => !(input.mobility === 'limited' && s.hilly && s.id === 'alfama'))
      .filter((s) => !(input.weekday !== undefined && s.closedOn?.includes(input.weekday)))
      .map((s, i) => ({ s, i, score: scoreStop(s, input.interests) }))
      .sort((a, b) => b.score - a.score || a.i - b.i);
    const deadline = backBy - returnTime(areaId) - reserveForLater;

    // Lay out stops in the area's natural walking order, with a lunch break if the visit spans midday
    const layout = (stops: PlannerStop[]) => {
      const ordered = [...stops].sort((a, b) => area.stops.indexOf(a) - area.stops.indexOf(b));
      const out: PlanItem[] = [];
      let t = now;
      let lunch = hadLunch;
      let pos = ordered[0]?.coords ?? position;
      ordered.forEach((stop, i) => {
        if (i > 0) {
          const walk = walkMinutes(pos, stop.coords, input.mobility, stop.hilly);
          out.push({ kind: 'move', start: t, end: t + walk, label: `Walk to ${stop.name} (about ${walk} min)` });
          t += walk;
        }
        const isMeal = stop.interests.includes('food') && stop.minutes >= 45;
        if (!lunch && needsLunch && t >= LUNCH_FROM && !isMeal) {
          out.push({ kind: 'move', start: t, end: t + LUNCH_MINUTES, label: `Lunch break nearby (${LUNCH_MINUTES} min)` });
          t += LUNCH_MINUTES;
          lunch = true;
        }
        out.push({ kind: 'visit', start: t, end: t + stop.minutes, stop });
        t += stop.minutes;
        if (isMeal) lunch = true;
        pos = stop.coords;
      });
      return { out, end: t, lunch, pos };
    };

    // Greedy by interest, then drop the weakest stops until the real timeline fits
    let picked: PlannerStop[] = [];
    for (const { s } of candidates) {
      if (layout([...picked, s]).end <= deadline) picked.push(s);
    }
    while (picked.length > 0 && layout(picked).end > deadline) picked = picked.slice(0, -1);

    const result = layout(picked);
    items.push(...result.out);
    now = result.end;
    hadLunch = result.lunch;
    position = result.pos;
  });

  const walkingBack = here === 'alfama' || here === 'baixa';
  const back = walkingBack ? walkMinutes(position, TERMINAL, input.mobility) : returnTime(here);
  items.push({
    kind: 'return',
    start: now,
    end: now + back,
    label:
      here === 'terminal'
        ? 'You are at the terminal'
        : walkingBack
          ? `Walk back to the terminal (about ${back} min, or a 10-min taxi)`
          : `Head back to the ship by taxi (about ${transferMinutes(here, 'terminal')} min, plus a traffic margin)`,
  });
  now += back;

  if (input.mobility === 'limited' && chosen.includes('alfama')) {
    warnings.push('Alfama’s viewpoints sit at the top of steep lanes and stairs: a tuk-tuk from the terminal gate reaches them without the climb.');
  }
  if (input.weekday !== undefined) {
    const closed = AREAS.filter((a) => chosen.includes(a.id))
      .flatMap((a) => a.stops)
      .filter((st) => st.closedOn?.includes(input.weekday!))
      .map((st) => st.name);
    if (closed.length > 0) warnings.push(`Closed on the day you are in port, so left out: ${closed.join(', ')}.`);
  }
  if (hoursAshore < 3) {
    warnings.push('With under three hours ashore, stay on foot near the terminal: Alfama and the riverside are the safe choice.');
  }

  return {
    items,
    backAtTerminal: now,
    mustLeaveBy: backBy - back,
    hoursAshore,
    warnings,
    droppedAreas,
  };
}
