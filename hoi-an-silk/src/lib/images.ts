/**
 * Image paths configuration
 * Quản lý tập trung đường dẫn ảnh trong ứng dụng
 */

// Base paths
const IMAGES_BASE = '/images';
const PRODUCTS_PATH = `${IMAGES_BASE}/products`;
const HERO_PATH = `${IMAGES_BASE}/hero`;
const STORY_PATH = `${IMAGES_BASE}/story`;
const BACKGROUNDS_PATH = `${IMAGES_BASE}/backgrounds`;

// Fallback images from Unsplash (dùng khi chưa có ảnh thật)
export const FALLBACK_IMAGES = {
  hero: 'https://images.unsplash.com/photo-1558769132-cb1aea1f5994?w=1920&h=1080&fit=crop&q=80',
  silkFabric: 'https://images.unsplash.com/photo-1610701076302-32ad96e05c6e?w=800&h=600&fit=crop&q=80',
  traditionalDress: 'https://images.unsplash.com/photo-1617627143750-d86bc393c82b?w=800&h=600&fit=crop&q=80',
  fabricRolls: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=600&fit=crop&q=80',
  hoiAnStreet: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&h=600&fit=crop&q=80',
};

// Product images
export const PRODUCT_IMAGES = {
  khanLuaHoaSen: `${PRODUCTS_PATH}/khan-lua-hoa-sen.jpg`,
  aoDaiTruyenThong: `${PRODUCTS_PATH}/ao-dai-truyen-thong.jpg`,
  vaiLuaThanLan: `${PRODUCTS_PATH}/vai-lua-than-lan.jpg`,
  khanChoangHoaMai: `${PRODUCTS_PATH}/khan-choang-hoa-mai.jpg`,
  tuiLuaTheuTay: `${PRODUCTS_PATH}/tui-lua-theu-tay.jpg`,
  aoDaiCachTan: `${PRODUCTS_PATH}/ao-dai-cach-tan.jpeg`,
};

// Hero images (dùng cho trang chủ)
export const HERO_IMAGES = {
  main: `${HERO_PATH}/hero-main.jpg`, // Thêm file này nếu có
  silkWeaving: `${HERO_PATH}/hero-silk-weaving.jpg`, // Thêm file này nếu có
  fabric: `${HERO_PATH}/hero-fabric.jpg`, // Thêm file này nếu có
  // Fallback
  fallback: FALLBACK_IMAGES.hero,
};

// Story timeline images (dùng cho trang câu chuyện)
export const STORY_IMAGES = {
  origin17th: `${STORY_PATH}/origin-17th-century.jpg`,
  preview: `${STORY_PATH}/story-preview.jpg`,
  goldenAge18: `${STORY_PATH}/golden-age-18-19.jpg`,
  preservation20th: `${STORY_PATH}/preservation-20th.jpg`,
  modern21st: `${STORY_PATH}/modern-21st.jpg`,
  // Fallbacks if local images not found
  fallback: {
    origin: FALLBACK_IMAGES.silkFabric,
    goldenAge: FALLBACK_IMAGES.hoiAnStreet,
    preservation: FALLBACK_IMAGES.fabricRolls,
    modern: FALLBACK_IMAGES.traditionalDress,
  },
};

// Background images
export const BACKGROUND_IMAGES = {
  patternSilk: `${BACKGROUNDS_PATH}/pattern-silk.jpg`,
  textureFabric: `${BACKGROUNDS_PATH}/texture-fabric.jpg`,
  hoiAnStreet: `${BACKGROUNDS_PATH}/hoi-an-street.jpg`,
};

/**
 * Helper function: Lấy ảnh với fallback
 * Nếu ảnh local không có, dùng fallback từ Unsplash
 */
export function getImageWithFallback(localPath: string, fallbackUrl: string): string {
  // Trong production, bạn có thể thêm logic check file tồn tại
  // Hiện tại return local path, nếu lỗi browser sẽ fallback
  return localPath || fallbackUrl;
}

/**
 * Helper: Lấy ảnh story theo title
 */
export function getStoryImage(title: string): string {
  if (title.includes('Khởi Nguồn') || title.includes('17')) {
    return STORY_IMAGES.origin17th;
  } else if (title.includes('Hoàng Kim') || title.includes('18') || title.includes('19')) {
    return STORY_IMAGES.goldenAge18;
  } else if (title.includes('Gìn Giữ') || title.includes('20')) {
    return STORY_IMAGES.preservation20th;
  } else if (title.includes('Hiện Đại') || title.includes('21')) {
    return STORY_IMAGES.modern21st;
  }
  return STORY_IMAGES.origin17th;
}
