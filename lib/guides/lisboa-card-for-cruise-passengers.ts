import type { Guide } from '../guides';

export const lisboaCardForCruisePassengers: Guide = {
  slug: 'lisboa-card-cruise-passengers',
  title: 'Is the Lisboa Card Worth It on a Single Port Day? The Arithmetic',
  metaTitle: 'Lisboa Card on a Cruise Port Day: Is It Worth It? (2026)',
  metaDescription:
    'The 24-hour Lisboa Card costs €31 in 2026. We run the numbers for three typical cruise port days against pay-as-you-go tickets to show when it pays off.',
  excerpt:
    'The Lisboa Card is a good deal for some cruise passengers and a waste of €31 for most. It depends almost entirely on how many paid monuments you will actually enter.',
  author: 'João Rodrigues',
  publishedDate: '2026-09-25',
  readingTime: '8 min read',
  sections: [
    {
      paragraphs: [
        'Short answer: **the 24-hour Lisboa Card pays off on a port day only if you will enter at least two of the big paid monuments, and one of them is in Belém.** If your plan is the old town, one castle ticket and a tram ride, you will spend less paying as you go. If you are travelling with children under 12, the case gets weaker still, because most of the headline monuments already let them in free.',
        'The card is sold on the promise of "free everything", and for a three-day city break that is roughly true. A cruise passenger has six to nine usable hours, a hard deadline, and a lot of that time spent walking between sights rather than inside them. That changes the arithmetic, so here it is in full.',
      ],
    },
    {
      heading: 'What the 24-hour card costs and covers',
      paragraphs: [
        'For 2026 (prices valid from 1 April 2026 to 31 March 2027), the 24-hour Lisboa Card costs **€31 for adults (16+)** and **€21 for children aged 4 to 15**. Under-4s need no card. The clock starts at first use, not at purchase, and runs for 24 consecutive hours.',
        'What you get on a port day:',
      ],
      list: [
        '**Unlimited Carris buses and trams** (including tram 28 and tram 15E to Belém) and the **Lisbon Metro**.',
        '**CP suburban trains**: the card lists free travel to Sintra, Cascais and the south bank of the Tagus. If you plan to use it on the Santa Apolónia to Oriente train for the Oceanário, confirm at the ticket gate or desk before you rely on it.',
        '**Free entry** to Jerónimos Monastery (cloister), Torre de Belém, Castelo de São Jorge, the Padrão dos Descobrimentos, the Arco da Rua Augusta viewpoint, the Pilar 7 Bridge Experience, the Royal Treasure Museum and more than 40 others.',
        '**Discounts only** (not free) on many others, including the Oceanário (15%), the Lisbon Cathedral (20%), MAAT (15%), the Teleférico in Parque das Nações (10%) and Pena Palace in Sintra (10%).',
      ],
      note: 'Even with the card, Jerónimos and the Torre de Belém require you to reserve a timed slot after you have collected the physical card. The card gets you in free; it does not get you in whenever you like.',
    },
    {
      heading: 'Free versus merely discounted: the ones that matter on a port day',
      table: {
        headers: ['Attraction', 'Normal adult price (2026)', 'With Lisboa Card'],
        rows: [
          ['Castelo de São Jorge', '€17', 'Free'],
          ['Jerónimos Monastery (cloister)', '€18', 'Free, timed slot required'],
          ['Torre de Belém', '€15', 'Free, timed slot required'],
          ['Padrão dos Descobrimentos (viewpoint)', '€10', 'Free'],
          ['Oceanário de Lisboa', 'From about €25.50 to €29.90, by time slot', '15% off'],
          ['Lisbon Cathedral (Sé)', 'Paid', '20% off'],
          ['Elevador de Santa Justa', 'Normally included', 'Closed since September 2025; check before you plan around it'],
        ],
      },
    },
    {
      heading: 'The alternative: a €0.50 card and pay as you go',
      paragraphs: [
        'Lisbon\'s occasional-use transport card (the **navegante ocasional**, still widely called Viva Viagem) costs €0.50 from any metro or train station machine. You load it with a fare type, or with "zapping" credit that is deducted per journey. The 2026 fares, in force since 1 January:',
      ],
      table: {
        headers: ['Ticket', 'Price', 'Notes'],
        rows: [
          ['Tram single bought on board', '€3.30', 'Cash on board; the most expensive way to ride'],
          ['Bus single bought on board', '€2.30', ''],
          ['Carris ride with zapping credit', '€1.72', 'Valid one hour on the Carris network'],
          ['Carris/Metro single', '€1.90', '60 minutes across Carris and Metro'],
          ['24h Carris/Metro', '€7.25', 'Unlimited buses, trams, metro'],
          ['24h Carris/Metro/CP', '€11.40', 'Adds the Sintra, Cascais, Azambuja and Sado train lines'],
        ],
      },
      note: 'On 24 September 2026 the Lisbon metropolitan authority approved talks on new 1-, 3- and 5-day Navegante tickets aimed at visitors. At the time of writing they are a proposal, not something you can buy.',
    },
    {
      heading: 'The arithmetic for three typical port days',
      paragraphs: [
        'Adult prices, pay-as-you-go including the €0.50 card. We assume you walk from the terminal to Praça do Comércio (about 14 minutes) and use trams where they make sense.',
      ],
      table: {
        headers: ['Port-day plan', 'Paying as you go', 'With 24h Lisboa Card', 'Verdict'],
        rows: [
          [
            'Old town: castle, Alfama on foot, one tram 28 ride, Baixa',
            '€17 castle + €1.72 tram + €0.50 card = **€19.22**',
            '€31',
            'Card loses about €12',
          ],
          [
            'Belém monuments: tram 15E both ways, Jerónimos, Torre de Belém, Padrão viewpoint',
            '€18 + €15 + €10 + 2 × €1.72 + €0.50 = **€46.94**',
            '€31',
            'Card saves about €16',
          ],
          [
            'Castle in the morning, Belém in the afternoon (Jerónimos only), tram both ways',
            '€17 + €18 + €7.25 (24h ticket) + €0.50 = **€42.75**',
            '€31',
            'Card saves about €12',
          ],
          [
            'Oceanário half-day, train there and back',
            'Ticket about €29.90 (morning slot) + two train singles',
            '€31 + ticket less 15%',
            'Card loses heavily',
          ],
        ],
      },
    },
    {
      heading: 'The catches the savings column hides',
      list: [
        '**Taxis cut the value.** Many cruise passengers take a taxi to Belém (15–20 minutes) rather than tram 15E (30–40 minutes from Praça do Comércio). Every leg you do by taxi is transport value you paid for and did not use.',
        '**Collection time.** You buy online, receive a voucher and must swap it for a physical card at an Ask Me Lisboa desk. The one nearest the ship that is on the published pick-up list is at **Terreiro do Paço (Praça do Comércio)**, listed as open daily 10:00–19:00. If your ship docks at 08:00, the card cannot start your day for you. There is also an Ask Me Lisboa desk at Santa Apolónia station, but it does not appear on the published pick-up list, so do not count on it.',
        '**Monday.** Jerónimos and the Torre de Belém are closed on Mondays. On a Monday call, the Belém plan above collapses and the card is rarely worth it.',
        '**Three monuments in Belém is a full day in port terms.** The Belém plan needs about four hours on the ground plus transit. It fits a port call of 8 hours or more; see the [itineraries by time in port](/guides/lisbon-itineraries-4-6-8-hours) before you commit.',
      ],
    },
    {
      heading: 'Children: usually not worth a card of their own',
      paragraphs: [
        'The child card costs €21 (ages 4–15). But **under-12s already enter free** at the Castelo de São Jorge, the Padrão dos Descobrimentos and the state monuments such as Jerónimos and the Torre de Belém (accompanied by an adult). For a child of 4 to 11, the child card is mainly buying transport, which on a port day rarely adds up to €21. Children under 4 travel free on Carris and the Metro.',
        'For a 12- to 15-year-old the numbers improve, since the castle charges €8.50 for 13–25s and the state monuments give 13–24s half price. Run the sums for your actual plan, with each child\'s real age, before you buy anything.',
      ],
    },
    {
      heading: 'The verdict',
      paragraphs: [
        '**Buy the 24-hour card** if you are an adult, your call is 8 hours or longer on a Tuesday to Sunday, and you will enter at least two of Jerónimos, the Torre de Belém and the castle, using public transport rather than taxis. Collect it at Terreiro do Paço and book the Belém time slots straight away.',
        '**Skip it** if you are staying in the old town, if you are travelling mostly by taxi or tuk-tuk, if it is Monday, or if the day is about the Oceanário. A €0.50 card with a few euros of zapping credit, or a €7.25 24-hour ticket, does the job.',
        'For the transport options to Belém in detail, see [terminal to Belém, every option](/guides/cruise-terminal-to-belem). For a day without any monuments at all, the [Alfama walking route](/guides/alfama-walking-route-from-port) costs nothing but your legs. You can also build a timed plan around your all-aboard in the [port day planner](/planner).',
      ],
    },
  ],
  relatedAttractions: [
    'mosteiro-dos-jeronimos',
    'torre-de-belem',
    'castelo-de-sao-jorge',
    'padrao-dos-descobrimentos',
  ],
};
