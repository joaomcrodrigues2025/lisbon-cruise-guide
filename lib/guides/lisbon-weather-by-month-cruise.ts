import type { Guide } from '../guides';

export const lisbonWeatherByMonthCruise: Guide = {
  slug: 'lisbon-weather-cruise-season',
  title: 'Lisbon Weather by Month for Cruise Passengers',
  metaTitle: 'Lisbon Weather by Month for Cruise Passengers (2026)',
  metaDescription:
    'A Lisbon port day month by month: IPMA temperature and rain averages, sunset times, the busiest cruise months, what to wear on cobbles and beating the heat.',
  excerpt:
    'Lisbon is mild all year, but a port day in August and a port day in January are different trips. Month-by-month climate figures from Portugal\'s weather service, and what they mean for your hours ashore.',
  author: 'João Rodrigues',
  publishedDate: '2026-09-25',
  readingTime: '8 min read',
  sections: [
    {
      paragraphs: [
        'Lisbon has one of the mildest climates of any European capital: frost essentially never happens, and even the wettest months have plenty of dry days. For a cruise passenger, though, the averages hide what actually shapes a port day: heat on the hills in summer, short afternoons and rain showers in winter, and polished cobbles in every season.',
        'The climate figures below are the official **1991–2020 climate normals** published by IPMA, Portugal\'s national weather service, for the Lisboa/Instituto Geofísico station, which sits in the city centre. Sunset times are approximate for the middle of each month. Everything else is practical advice on what those numbers mean for a few hours ashore.',
      ],
    },
    {
      heading: 'Lisbon month by month',
      table: {
        headers: ['Month', 'Avg high', 'Avg low', 'Rain (mm)', 'Rain days (≥1 mm)', 'Sunset (mid-month, approx.)'],
        rows: [
          ['January', '15.1 °C', '8.6 °C', '104', '10', '17:40'],
          ['February', '16.4 °C', '9.1 °C', '78', '8', '18:10'],
          ['March', '18.9 °C', '11.0 °C', '69', '8', '18:40'],
          ['April', '20.4 °C', '12.3 °C', '72', '8', '20:10'],
          ['May', '23.1 °C', '14.4 °C', '58', '6', '20:40'],
          ['June', '26.1 °C', '16.8 °C', '14', '2', '21:00'],
          ['July', '28.2 °C', '18.2 °C', '3', '1', '21:00'],
          ['August', '28.8 °C', '18.8 °C', '5', '1', '20:30'],
          ['September', '26.6 °C', '17.6 °C', '39', '4', '19:45'],
          ['October', '22.8 °C', '15.3 °C', '111', '9', '19:00'],
          ['November', '18.1 °C', '11.8 °C', '134', '10', '17:25'],
          ['December', '15.4 °C', '9.4 °C', '109', '10', '17:15'],
        ],
      },
      note: 'Source: IPMA, Normal Climatológica Lisboa/Instituto Geofísico 1991–2020. Rain days rounded to the nearest whole day. Sunset times calculated for Lisbon; the clocks change on the last Sunday of March and of October.',
    },
    {
      heading: 'Spring (March to May): the best all-round months',
      paragraphs: [
        'Highs of 19–23 °C are ideal walking weather for the hills of Alfama and the climb to the castle. Rain is still possible, with about 8 rain days a month in March and April, but showers tend to pass quickly. Daylight is long once the clocks go forward at the end of March, with sunset after 20:00 from April.',
        'The trade-off is company: spring is one of the busiest periods for cruise calls in Lisbon (see the cruise season section below). Carry a light waterproof layer; it will probably stay in your bag.',
      ],
    },
    {
      heading: 'Summer (June to August): plan around the heat',
      paragraphs: [
        'July and August are almost completely dry, with average highs of 28–29 °C. The average hides the hot days: IPMA counts an average of **8.5 days in July and 10.2 in August with highs of 30 °C or more**, and a couple of days each summer month above 35 °C. The city\'s record, 43.3 °C, was set in August 2018. On those days, climbing from the river to the castle at midday is genuinely draining.',
        'A heat strategy that works on a port day:',
      ],
      list: [
        '**Do the hills first.** Get off the ship early and do Alfama and the viewpoints before 11:00; the [viewpoints route](/guides/lisbon-viewpoints-from-cruise-port) is almost all downhill if you ride to the top.',
        '**Put indoor sights in the middle of the day**: the tile museum, the Oceanário, the cloisters of Jerónimos or a long lunch.',
        '**Use transport for the climbs.** A tuk-tuk or taxi up the hill costs less than an afternoon lost to heat exhaustion.',
        '**Carry water and refill it.** Cafés will usually sell a bottle for little; the cheapest is a supermarket in the Baixa.',
        '**Sun protection**: hat and sunscreen. Pale limestone streets reflect the light, so it feels hotter than the thermometer says.',
      ],
    },
    {
      heading: 'Autumn (September to November): warm, then wet',
      paragraphs: [
        'September is often the sweet spot: highs still around 27 °C, only about 4 rain days, and sunset around 19:45. October keeps warm days (about 23 °C highs) but is the month the rain returns, with 111 mm on average. **November is the wettest month of the year** (134 mm, about 10 rain days) and the afternoons are short: sunset is around 17:25 once the clocks go back.',
        'In autumn, check the forecast the night before and keep a plan B. Our [rainy day guide](/guides/rainy-day-lisbon-cruise) lists the indoor options closest to the terminal.',
      ],
    },
    {
      heading: 'Winter (December to February): what changes',
      paragraphs: [
        'Winter in Lisbon is mild rather than cold, with highs around 15 °C and lows around 9 °C, but it is wet and the days are short. Expect about 10 rain days in December and January, and sunset before 18:00.',
        'Opening hours shrink too. The [Castelo de São Jorge](/attractions/castelo-de-sao-jorge), for example, closes at **18:00 from November to February** (last entry 17:30), against 21:00 from March to October, and it is closed on 1 January and 24, 25 and 31 December. Most national monuments, including [Jerónimos Monastery](/attractions/mosteiro-dos-jeronimos), close on Mondays all year. On a winter call, check the hours of anything you plan to visit, and plan for the light going in the late afternoon.',
        'The upside: fewer people at the viewpoints, shorter queues, and clear winter days can be the crispest light of the year.',
      ],
    },
    {
      heading: 'What to wear, in any month',
      list: [
        '**Shoes with grip.** Lisbon\'s calçada (limestone cobbles) is polished smooth by foot traffic and is slippery even when dry. After rain it is treacherous, especially downhill. Trainers with a rubber tread are better than sandals or leather soles.',
        '**Layers.** A breeze off the river can make a 20 °C day feel cool in the shade, and Alfama\'s narrow lanes are much cooler than the open squares.',
        '**A compact umbrella or waterproof** from October to April. Umbrellas and steep, narrow streets do not mix well in wind; a hooded jacket is often easier.',
        '**A small bag worn in front.** Not weather-related, but crowded trams and viewpoints are where pickpockets work. See our [money and safety guide](/guides/money-safety-lisbon-cruise).',
      ],
    },
    {
      heading: 'The Lisbon cruise season: when is it busiest?',
      paragraphs: [
        'Lisbon receives ships all year, and the busiest months for ship calls are not necessarily the hottest. According to the Port of Lisbon (APL), **April 2025 saw 55 cruise calls, a record for that month**, while the record-breaking August of 2026 had **33 calls** and 86,322 passengers. In the first eight months of 2026, the port handled 220 calls and 448,037 passengers.',
        'Across 2025 as a whole, APL counted about 499,000 transit passengers (people on a port call, like most readers of this guide) and a record 206,226 passengers starting or ending their cruise in Lisbon. Of the European passengers, the UK was the largest single market.',
        'What that means on the ground: on days with several ships in port, the Alfama viewpoints, tram 28 and Belém get noticeably busier from mid-morning. Summer adds land-based tourists on top. If your ship is one of several in port, go early, and consider starting at the less obvious end of your plan. Our [cruise terminal guide](/guides/lisbon-cruise-terminal-guide) covers how to get moving quickly once you are off the ship.',
      ],
    },
  ],
  relatedAttractions: [
    'castelo-de-sao-jorge',
    'mosteiro-dos-jeronimos',
    'oceanario-de-lisboa',
    'miradouro-de-santa-luzia',
  ],
};
