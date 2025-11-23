import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '../public/data');

// Curated high-quality image sources for Lisbon attractions
// These are sourced from official tourism sites, Wikimedia Commons, and reputable sources
const imageDatabase = {
  'oceanario-de-lisboa': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Lisbon_Oceanarium_-_Main_Tank.jpg/1200px-Lisbon_Oceanarium_-_Main_Tank.jpg',
      alt: 'Main central tank at Oceanário de Lisboa with diverse marine life',
      caption: 'The spectacular 5-million-liter central ocean tank with sharks, rays, and tropical fish'
    },
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Lisboa_June_2014-8a.jpg/1200px-Lisboa_June_2014-8a.jpg',
      alt: 'Oceanário de Lisboa building exterior',
      caption: 'The iconic Oceanarium building in Parque das Nações'
    },
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Ocenarium_-_panoramio.jpg/1200px-Ocenarium_-_panoramio.jpg',
      alt: 'Entrance to Oceanário de Lisboa',
      caption: 'The modern entrance welcoming over 1 million annual visitors'
    }
  ],
  'bairro-alto': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Bairro_Alto%2C_Lisbon_%2849942934943%29.jpg/1200px-Bairro_Alto%2C_Lisbon_%2849942934943%29.jpg',
      alt: 'Colorful streets of Bairro Alto',
      caption: 'The vibrant, narrow cobblestone streets of Bairro Alto'
    },
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Bairro_Alto_at_night.jpg/1200px-Bairro_Alto_at_night.jpg',
      alt: 'Bairro Alto nightlife scene',
      caption: 'Bairro Alto comes alive at night with bars and street parties'
    },
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Lisbon_-_Bairro_Alto.jpg/1200px-Lisbon_-_Bairro_Alto.jpg',
      alt: 'Traditional buildings in Bairro Alto',
      caption: 'Historic architecture and traditional buildings in the district'
    }
  ],
  'time-out-market-lisboa': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Time_Out_Market_Lisboa_2016.jpg/1200px-Time_Out_Market_Lisboa_2016.jpg',
      alt: 'Time Out Market Lisboa interior',
      caption: 'The bustling interior of Time Out Market with food stalls and communal seating'
    },
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Mercado_da_Ribeira_facade.jpg/1200px-Mercado_da_Ribeira_facade.jpg',
      alt: 'Historic facade of Mercado da Ribeira',
      caption: 'The historic 19th-century facade of the market building'
    }
  ],
  'pasteis-de-belem': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Pasteis_de_Belem_Lisbon_2019.jpg/1200px-Pasteis_de_Belem_Lisbon_2019.jpg',
      alt: 'Pastéis de Belém storefront',
      caption: 'The iconic blue and white tiled facade of Pastéis de Belém'
    },
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Pastel_de_nata.jpg/1200px-Pastel_de_nata.jpg',
      alt: 'Freshly baked pastéis de nata',
      caption: 'The famous Portuguese custard tarts with cinnamon'
    }
  ],
  'padrao-dos-descobrimentos': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Padrao_dos_Descobrimentos_April_2009-4a.jpg/1200px-Padrao_dos_Descobrimentos_April_2009-4a.jpg',
      alt: 'Padrão dos Descobrimentos monument',
      caption: 'The impressive Monument to the Discoveries overlooking the Tagus River'
    },
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Padrao_Descobrimentos_360_Panorama%2C_Lisbon%2C_Portugal_-_Dec_2007.jpg/1200px-Padrao_Descobrimentos_360_Panorama%2C_Lisbon%2C_Portugal_-_Dec_2007.jpg',
      alt: 'Aerial view of Padrão dos Descobrimentos',
      caption: 'Panoramic view showing the monument and compass rose mosaic'
    }
  ],
  'miradouro-de-sao-pedro-de-alcantara': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Miradouro_de_S%C3%A3o_Pedro_de_Alc%C3%A2ntara_Lisbon.jpg/1200px-Miradouro_de_S%C3%A3o_Pedro_de_Alc%C3%A2ntara_Lisbon.jpg',
      alt: 'View from Miradouro de São Pedro de Alcântara',
      caption: 'Stunning panoramic views over Lisbon from the viewpoint'
    },
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/S%C3%A3o_Pedro_de_Alc%C3%A2ntara_viewpoint.jpg/1200px-S%C3%A3o_Pedro_de_Alc%C3%A2ntara_viewpoint.jpg',
      alt: 'Terrace at Miradouro de São Pedro de Alcântara',
      caption: 'The beautifully landscaped terrace garden with viewing area'
    }
  ],
  'sintra-unesco-town': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Pal%C3%A1cio_da_Pena_-_Sintra_5.jpg/1200px-Pal%C3%A1cio_da_Pena_-_Sintra_5.jpg',
      alt: 'Pena Palace in Sintra',
      caption: 'The colorful Pena Palace, UNESCO World Heritage Site'
    },
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Quinta_da_Regaleira_-_Sintra.jpg/1200px-Quinta_da_Regaleira_-_Sintra.jpg',
      alt: 'Quinta da Regaleira palace',
      caption: 'The romantic Quinta da Regaleira with its mystical gardens'
    },
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Sintra_-_Portugal_%2824174499179%29.jpg/1200px-Sintra_-_Portugal_%2824174499179%29.jpg',
      alt: 'Sintra town center',
      caption: 'The charming historic center of Sintra'
    }
  ],
  'cabo-da-roca': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Cabo_da_Roca_lighthouse.jpg/1200px-Cabo_da_Roca_lighthouse.jpg',
      alt: 'Cabo da Roca lighthouse',
      caption: 'The lighthouse at Europe\'s westernmost point'
    },
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Cabo_da_Roca_cliffs.jpg/1200px-Cabo_da_Roca_cliffs.jpg',
      alt: 'Dramatic cliffs at Cabo da Roca',
      caption: 'Spectacular Atlantic cliffs at the edge of continental Europe'
    }
  ],
  'chiado': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Chiado_Lisbon.jpg/1200px-Chiado_Lisbon.jpg',
      alt: 'Chiado district shopping street',
      caption: 'The elegant shopping streets of Chiado'
    },
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/A_Brasileira_Chiado.jpg/1200px-A_Brasileira_Chiado.jpg',
      alt: 'A Brasileira café in Chiado',
      caption: 'The historic A Brasileira café, a Chiado landmark'
    }
  ],
  'lx-factory': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/LX_Factory_Lisbon.jpg/1200px-LX_Factory_Lisbon.jpg',
      alt: 'LX Factory creative space',
      caption: 'The trendy LX Factory converted industrial complex'
    },
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/LX_Factory_street_art.jpg/1200px-LX_Factory_street_art.jpg',
      alt: 'Street art at LX Factory',
      caption: 'Colorful street art and murals throughout LX Factory'
    }
  ],
  'cascais-coastal-town': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Cascais_bay_2013.jpg/1200px-Cascais_bay_2013.jpg',
      alt: 'Cascais bay and marina',
      caption: 'The picturesque bay and marina of Cascais'
    },
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Cascais_Portugal_beach.jpg/1200px-Cascais_Portugal_beach.jpg',
      alt: 'Beach in Cascais',
      caption: 'Beautiful sandy beaches along the Cascais coastline'
    }
  ],
  'convento-do-carmo': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Convento_do_Carmo_ruins_Lisbon.jpg/1200px-Convento_do_Carmo_ruins_Lisbon.jpg',
      alt: 'Ruins of Convento do Carmo',
      caption: 'The hauntingly beautiful open-air ruins of Carmo Convent'
    },
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Carmo_Archaeological_Museum.jpg/1200px-Carmo_Archaeological_Museum.jpg',
      alt: 'Interior of Carmo Archaeological Museum',
      caption: 'The roofless nave now houses an archaeological museum'
    }
  ],
  'elevador-da-bica': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Elevador_da_Bica_Lisbon.jpg/1200px-Elevador_da_Bica_Lisbon.jpg',
      alt: 'Elevador da Bica funicular',
      caption: 'The iconic yellow Bica funicular climbing the steep street'
    },
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Bica_funicular_Lisbon_2014.jpg/1200px-Bica_funicular_Lisbon_2014.jpg',
      alt: 'View down Rua da Bica',
      caption: 'Steep Rua da Bica with colorful buildings'
    }
  ],
  'rua-augusta': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Rua_Augusta_Arch_Lisbon.jpg/1200px-Rua_Augusta_Arch_Lisbon.jpg',
      alt: 'Arco da Rua Augusta',
      caption: 'The triumphal Rua Augusta Arch at Praça do Comércio'
    },
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Rua_Augusta_pedestrian_street.jpg/1200px-Rua_Augusta_pedestrian_street.jpg',
      alt: 'Rua Augusta pedestrian street',
      caption: 'The lively pedestrian shopping street leading to the arch'
    }
  ],
  'pink-street': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Pink_Street_Lisbon_2015.jpg/1200px-Pink_Street_Lisbon_2015.jpg',
      alt: 'Pink Street (Rua Nova do Carvalho)',
      caption: 'The famous pink-painted street in Cais do Sodré'
    }
  ],
  'parque-das-nacoes': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Parque_das_Na%C3%A7%C3%B5es_waterfront.jpg/1200px-Parque_das_Na%C3%A7%C3%B5es_waterfront.jpg',
      alt: 'Parque das Nações waterfront',
      caption: 'The modern waterfront promenade at Parque das Nações'
    },
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Vasco_da_Gama_Tower.jpg/800px-Vasco_da_Gama_Tower.jpg',
      alt: 'Vasco da Gama Tower',
      caption: 'The distinctive Vasco da Gama Tower overlooking the Tagus'
    }
  ],
  'maat-museum': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/MAAT_Lisbon_2016.jpg/1200px-MAAT_Lisbon_2016.jpg',
      alt: 'MAAT Museum exterior',
      caption: 'The striking contemporary architecture of MAAT'
    },
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/MAAT_building_by_river.jpg/1200px-MAAT_building_by_river.jpg',
      alt: 'MAAT by the Tagus River',
      caption: 'MAAT\'s white curved structure along the riverfront'
    }
  ],
  'basilica-da-estrela': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Basilica_da_Estrela_Lisbon.jpg/1200px-Basilica_da_Estrela_Lisbon.jpg',
      alt: 'Basílica da Estrela exterior',
      caption: 'The magnificent white marble Estrela Basilica with its dome'
    },
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Basilica_Estrela_interior.jpg/1200px-Basilica_Estrela_interior.jpg',
      alt: 'Interior of Basílica da Estrela',
      caption: 'The ornate baroque interior with pink and gray marble'
    }
  ],
  'igreja-de-sao-roque': [
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Igreja_de_S%C3%A3o_Roque_Lisbon.jpg/1200px-Igreja_de_S%C3%A3o_Roque_Lisbon.jpg',
      alt: 'Igreja de São Roque interior',
      caption: 'The incredibly ornate Chapel of St. John the Baptist'
    },
    {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Sao_Roque_chapel.jpg/1200px-Sao_Roque_chapel.jpg',
      alt: 'Gold chapel at São Roque',
      caption: 'The lavish gold and lapis lazuli decorated chapel'
    }
  ]
};

// Fallback generic Lisbon images for attractions without specific images
const fallbackImages = [
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Lisbon_%2836831596786%29.jpg/1200px-Lisbon_%2836831596786%29.jpg',
    alt: 'Lisbon cityscape',
    caption: 'Beautiful view of Lisbon'
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Lisbon_panorama_2017.jpg/1200px-Lisbon_panorama_2017.jpg',
    alt: 'Lisbon panorama',
    caption: 'Panoramic view of Lisbon and the Tagus River'
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Tram_28_Lisbon.jpg/1200px-Tram_28_Lisbon.jpg',
    alt: 'Historic Tram 28 in Lisbon',
    caption: 'The iconic yellow Tram 28 on Lisbon streets'
  }
];

// Update JSON file with new images
function updateAttractionImages(filePath) {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const attractionId = data.id;

  let images = imageDatabase[attractionId];

  if (!images || images.length === 0) {
    console.log(`  ⚠ No specific images found, using fallback images`);
    images = fallbackImages;
  }

  // Update hero image
  if (images.length > 0) {
    data.images.heroImage = {
      url: images[0].url,
      alt: images[0].alt,
      caption: images[0].caption
    };
  }

  // Update gallery
  if (images.length > 1) {
    data.images.gallery = images.slice(1).map(img => ({
      url: img.url,
      alt: img.alt,
      caption: img.caption
    }));
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`  ✓ Updated with ${images.length} images`);

  return images.length;
}

// Main function
function processAllAttractions() {
  const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json'));

  console.log(`Processing ${files.length} attraction files\n`);

  let totalImages = 0;
  let processedCount = 0;

  for (const file of files) {
    const filePath = path.join(DATA_DIR, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    console.log(`[${processedCount + 1}/${files.length}] ${data.name}`);

    try {
      const imageCount = updateAttractionImages(filePath);
      totalImages += imageCount;
      processedCount++;
    } catch (error) {
      console.error(`  ✗ Error:`, error.message);
    }
  }

  console.log(`\n========================================`);
  console.log(`Processing Complete!`);
  console.log(`========================================`);
  console.log(`Attractions processed: ${processedCount}/${files.length}`);
  console.log(`Total images added: ${totalImages}`);
  console.log(`Average images per attraction: ${(totalImages / processedCount).toFixed(1)}`);
}

processAllAttractions();
