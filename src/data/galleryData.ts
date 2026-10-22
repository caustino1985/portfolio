export interface GalleryImage {
  id: string;
  title: string;
  subtitle: string;
  category: 'transit' | 'campus' | 'clean-energy' | 'urban-locks';
  src: string;
  description: string;
  yearEst: string;
}

export const CANAL_GALLERY_IMAGES: GalleryImage[] = [
  {
    id: 'woodlawn-sunset-lock',
    title: 'Woodlawn SSA Campus Canal Terminal & Locks',
    subtitle: 'Passenger Ferry & Floating Solar Array Interlock',
    category: 'urban-locks',
    src: '/assets/aistudio/h1osi_c0d763f4.jpg',
    description: 'Aerial twilight view of the Woodlawn SSA Campus Canal locks with passenger ferry ingress, floating solar photovoltaic arrays, and waterborne transit connection to downtown Baltimore.',
    yearEst: '2026 - 2092 Master Plan',
  },
  {
    id: 'woodlawn-canal-pier',
    title: 'SSA Campus Canal Terminal Plaza',
    subtitle: 'M/V Woodlawn Spirit At Passenger Pier',
    category: 'transit',
    src: '/assets/aistudio/tIQSL_7170c5db.jpg',
    description: 'Pedestrian promenade and ticketing gates for the Woodlawn Spirit electric passenger ferry terminal, integrating clean transit with the modern SSA headquarters towers.',
    yearEst: 'Master Civic Architecture',
  },
  {
    id: 'woodlawn-2100-overview',
    title: 'Woodlawn 2100 Canal Terminal & Final Locks',
    subtitle: 'Sustainable Vertical Forests & Active Waterway Locks',
    category: 'campus',
    src: '/assets/aistudio/4F5RN_1b65e4ed.jpg',
    description: 'Waterfront promenade featuring vertical eco-towers, precision hydraulic lock gates, and high-efficiency water taxis serving federal employees and municipal residents.',
    yearEst: 'Vision 2100',
  },
  {
    id: 'floating-solar-locks',
    title: 'Cascadia Navigation Locks & Solar Microgrid',
    subtitle: 'Decentralized Clean Power on Water Infrastructure',
    category: 'clean-energy',
    src: '/assets/aistudio/kjfVT_1__f518ff31.jpg',
    description: 'Overhead master perspective of the hydraulic lock chambers with multi-megawatt floating solar arrays generating clean electricity for the surrounding Baltimore communities.',
    yearEst: 'Infrastructure Initiative',
  },
  {
    id: 'climate-resilience-park',
    title: 'Woodlawn SSA Eco-District & Climate Resilience Park',
    subtitle: 'Water Management, Floating Solar & Living Bio-Lilypods',
    category: 'campus',
    src: '/assets/aistudio/mudKd_5c36a1db.jpg',
    description: 'Futuristic research district with holographic wayfinding, autonomous electric river barges, floating bio-filtration wetland discs, and integrated energy grids.',
    yearEst: 'Est. 2092 Civic Plan',
  },
  {
    id: 'edmondson-rowhomes-canal',
    title: 'US 40 Edmondson Avenue Rowhome Canal Corridor',
    subtitle: 'Linear Waterway, Floating Solar & Historical Rowhome Integration',
    category: 'urban-locks',
    src: '/assets/aistudio/z7jus_0d2ab6f3.jpg',
    description: 'Transformation of the highway corridor into a tree-lined navigable canal with floating solar panels and passenger ferries adjacent to restored historic Baltimore rowhomes.',
    yearEst: 'Baltimore Urban Revitalization',
  },
  {
    id: 'cascadia-freight-terminal',
    title: 'Cascadia Multimodal Freight Terminal & Lock Chamber',
    subtitle: 'Industrial Barge Intermodal Hub & Clean Logistics',
    category: 'transit',
    src: '/assets/aistudio/APBxR_dc3aa322.jpg',
    description: 'Heavy logistics terminal with gantry cranes transferring intermodal containers and bulk materials directly from deep-draft canal barges onto electric trucks and rail.',
    yearEst: 'Economic Development',
  },
  {
    id: 'cascade-canal-transit-hub',
    title: 'Cascade Canal Passenger Ferry Terminal & Water Taxi',
    subtitle: 'Inner Harbor & Fells Point Transit Gateways',
    category: 'transit',
    src: '/assets/aistudio/1RLlo_b79bf32d.jpg',
    description: 'Public boarding docks with automated digital ticketing kiosks, bicycle parking racks, and scheduled water taxi service to Fells Point, Fort McHenry, and downtown Baltimore.',
    yearEst: 'Public Transit Network',
  },
];
