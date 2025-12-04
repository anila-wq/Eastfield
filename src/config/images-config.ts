/**
 * Image Configuration for Production Deployment
 * 
 * INSTRUCTIONS FOR DEPLOYMENT:
 * 1. Download all images from Figma Make environment
 * 2. Upload images to your server (e.g., /public/images/ folder) or CDN
 * 3. Update the BASE_URL below to match your hosting location
 * 4. Replace all figma:asset/ imports with imports from this config file
 */

// Update this to your production image hosting URL
// Examples:
// - For local hosting: '/images/'
// - For CDN: 'https://cdn.yoursite.com/eastfield/'
// - For cloud storage: 'https://storage.yoursite.com/eastfield/'
export const BASE_URL = '/images/';

// Logo Images
export const LOGOS = {
  eastfieldLogo: `${BASE_URL}eastfield-logo.png`, // figma:asset/b78dfbf3470d5d565260ab21c2330454f0208f80.png
  urbanestLogo: `${BASE_URL}urbanest-realty-logo.png`, // figma:asset/0c1e9899896b786103246b29b6b25c9fbfdc5fa9.png
  urbanestReraLogo: `${BASE_URL}urbanest-rera-logo.png`, // figma:asset/eae075123418c2f6b24913ac633abc96778773bf.png
};

// Hero Section Images
export const HERO_IMAGES = {
  heroMain: `${BASE_URL}eastfield-hero-main.png`, // figma:asset/2d730b41dab0c9b9877a156bdbc4f6cd6cf7df35.png
  heroBackground: `${BASE_URL}eastfield-hero-background.png`, // figma:asset/03055be5c6e78eff6f1477444dd526e0eb5f37f6.png
};

// Amenities Images
export const AMENITIES_IMAGES = {
  clubhouse: `${BASE_URL}eastfield-clubhouse-amenity.png`, // figma:asset/c03b50ce-e9c1-4ccb-93ea-61be6ecfe9df.png
  swimmingPool: `${BASE_URL}eastfield-swimming-pool.png`, // figma:asset/d6e06fea-9549-40b1-b6f9-0094bd97a9f9.png
  womensPool: `${BASE_URL}eastfield-womens-pool.png`, // figma:asset/d6e06fea-9549-40b1-b6f9-0094bd97a9f9.png (same as swimming pool)
  communityEvents: `${BASE_URL}eastfield-community-events.png`, // figma:asset/1b2a2dbc-f7f2-41b1-8b3b-bf8e5e5e85b6.png
  businessCentre: `${BASE_URL}eastfield-business-centre.png`, // figma:asset/a6e6f4f4-2334-4c6a-8e9a-2d2e8e8e8e8e.png
  yogaDeck: `${BASE_URL}eastfield-yoga-deck.png`, // figma:asset/c03b50ce-e9c1-4ccb-93ea-61be6ecfe9df.png (same as clubhouse)
  kidsPlayArea: `${BASE_URL}eastfield-kids-play-area.png`, // figma:asset/91a39b14-3a3b-4a02-ba36-59db8c94c4b3.png
  petPark: `${BASE_URL}eastfield-pet-park.png`, // figma:asset/73b4567f-5432-4321-9876-543210987654.png
};

// Floor Plans Images
export const FLOOR_PLANS = {
  masterPlan: `${BASE_URL}eastfield-master-plan.png`, // figma:asset/master-plan-1.png
  towerAUnit1: `${BASE_URL}eastfield-tower-a-unit-1.png`, // figma:asset/tower-a-unit-1.png
  towerAUnit2: `${BASE_URL}eastfield-tower-a-unit-2.png`, // figma:asset/tower-a-unit-2.png
  towerAUnit3: `${BASE_URL}eastfield-tower-a-unit-3.png`, // figma:asset/tower-a-unit-3.png
  towerAUnit4: `${BASE_URL}eastfield-tower-a-unit-4.png`, // figma:asset/c3f18e0c-fdc0-4f7f-9b25-3a7b8c8f0e2d.png
  towerBUnit1: `${BASE_URL}eastfield-tower-b-unit-1.png`, // figma:asset/7e1c8d9b-2e5f-4a8b-9c7d-1e2f3a4b5c6d.png
  towerBUnit2: `${BASE_URL}eastfield-tower-b-unit-2.png`, // figma:asset/tower-b-unit-2.png
  towerBUnit3: `${BASE_URL}eastfield-tower-b-unit-3.png`, // figma:asset/4f7a8b9c-3d5e-4f8b-9c7d-2e3f4a5b6c7d.png
  towerBLayout: `${BASE_URL}eastfield-tower-b-complete-layout.png`, // figma:asset/9b8a7c6d-4e5f-4a8b-9c7d-3e4f5a6b7c8d.png
};

// Gallery Images
export const GALLERY_IMAGES = {
  familyTogether: `${BASE_URL}eastfield-family-together.png`, // figma:asset/7bf07920dd546a9118b17d15aa3bedab2c19a9d2.png
  familyRain: `${BASE_URL}eastfield-family-rain.png`, // figma:asset/4bb47f72d9245f9190a71316599bd9935c361ec5.png
  eveningCityView: `${BASE_URL}eastfield-evening-city-view.png`, // figma:asset/ce3ba545c4f9df52a265432e033a394e7a527713.png
  videoThumbnail: `${BASE_URL}eastfield-video-thumbnail.png`, // figma:asset/2e47635dd8e1e6b1e439cd73e790bed477fdd071.png
  apartmentLivingDining: `${BASE_URL}eastfield-apartment-living-dining.png`, // figma:asset/2687f3f9905cac3f269b933757f72c565c95dcc5.png
  apartmentBalconyView: `${BASE_URL}eastfield-apartment-balcony-view.png`, // figma:asset/022b4a9cbf4b6ef670a1d04be29242e31703fb52.png
  apartmentModernLiving: `${BASE_URL}eastfield-apartment-modern-living.png`, // figma:asset/363797b7f3f89584a0305af7c2f778741962a1bf.png
  luxuryLivingRoom: `${BASE_URL}eastfield-luxury-living-room.png`, // figma:asset/f91f5f9bfdaaa2e6aa5e0d16abaa677e389c15dd.png
  masterBedroom: `${BASE_URL}eastfield-master-bedroom.png`, // figma:asset/e2758c5b7ce25a00bea790752cad0c224315633a.png
  modernKitchen: `${BASE_URL}eastfield-modern-kitchen.png`, // figma:asset/4bf5896c0facad2556298d7d81aa65a472eb161e.png
  buildingExteriorEvening: `${BASE_URL}eastfield-building-exterior-evening.png`, // figma:asset/5b6627d12f65b44f23bdd2c38b35d9d19f1ed4d4.png
  buildingAerialView: `${BASE_URL}eastfield-building-aerial-view.png`, // figma:asset/3ed87ae776dca51e00eeb7e87d9fd631f8d6edfe.png
  buildingDaylightView: `${BASE_URL}eastfield-building-daylight-view.png`, // figma:asset/5768c060f4f4f3c07cd347123f255370171f3e54.png
  familyOutdoorActivities: `${BASE_URL}eastfield-family-outdoor-activities.png`, // figma:asset/91a39b14-3a3b-4a02-ba36-59db8c94c4b3.png
};

// Other Projects Images
export const OTHER_PROJECTS_IMAGES = {
  eliteVilla: `${BASE_URL}urbanest-elite-villa-project.png`, // figma:asset/c448b27b0a7e484978529def6d6f246f89740e41.png
  northGate: `${BASE_URL}urbanest-northgate-project.png`, // figma:asset/cacc7d0542330c66e3ec96e4dd0de6bf4fa060f6.png
  eastfieldExterior: `${BASE_URL}eastfield-building-exterior-evening.png`, // figma:asset/5b6627d12f65b44f23bdd2c38b35d9d19f1ed4d4.png (reused)
};

// Export all images for easy access
export const ALL_IMAGES = {
  ...LOGOS,
  ...HERO_IMAGES,
  ...AMENITIES_IMAGES,
  ...FLOOR_PLANS,
  ...GALLERY_IMAGES,
  ...OTHER_PROJECTS_IMAGES,
};

/**
 * Helper function to get image URL
 * Usage: getImageUrl('eastfieldLogo')
 */
export function getImageUrl(imageName: keyof typeof ALL_IMAGES): string {
  return ALL_IMAGES[imageName];
}

/**
 * List of all unique image files needed for deployment
 * Use this checklist when downloading and uploading images
 */
export const IMAGE_FILES_CHECKLIST = [
  'eastfield-logo.png',
  'urbanest-realty-logo.png',
  'urbanest-rera-logo.png',
  'eastfield-hero-main.png',
  'eastfield-hero-background.png',
  'eastfield-clubhouse-amenity.png',
  'eastfield-swimming-pool.png',
  'eastfield-community-events.png',
  'eastfield-business-centre.png',
  'eastfield-pet-park.png',
  'eastfield-kids-play-area.png',
  'eastfield-master-plan.png',
  'eastfield-tower-a-unit-1.png',
  'eastfield-tower-a-unit-2.png',
  'eastfield-tower-a-unit-3.png',
  'eastfield-tower-a-unit-4.png',
  'eastfield-tower-b-unit-1.png',
  'eastfield-tower-b-unit-2.png',
  'eastfield-tower-b-unit-3.png',
  'eastfield-tower-b-complete-layout.png',
  'eastfield-family-together.png',
  'eastfield-family-rain.png',
  'eastfield-evening-city-view.png',
  'eastfield-video-thumbnail.png',
  'eastfield-apartment-living-dining.png',
  'eastfield-apartment-balcony-view.png',
  'eastfield-apartment-modern-living.png',
  'eastfield-luxury-living-room.png',
  'eastfield-master-bedroom.png',
  'eastfield-modern-kitchen.png',
  'eastfield-building-exterior-evening.png',
  'eastfield-building-aerial-view.png',
  'eastfield-building-daylight-view.png',
  'eastfield-family-outdoor-activities.png',
  'urbanest-elite-villa-project.png',
  'urbanest-northgate-project.png',
];
