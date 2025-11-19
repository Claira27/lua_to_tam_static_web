export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
  featured: boolean;
}

export const PRODUCT_CATEGORIES = [
  "Tất cả",
  "Khăn Lụa",
  "Áo Dài",
  "Vải Lụa",
  "Phụ Kiện",
];

export const PRODUCTS: Product[] = [
  {
    id: "khan-lua-hoa-sen",
    name: "Khăn Lụa Hoa Sen",
    category: "Khăn Lụa",
    description: "Khăn lụa tơ tằm thủ công với họa tiết hoa sen truyền thống, thể hiện sự tinh tế và thanh cao của người phụ nữ Việt.",
    price: 850000,
    image: "/images/products/khan-lua-hoa-sen.jpg",
    featured: true,
  },
  {
    id: "ao-dai-truyen-thong",
    name: "Áo Dài Lụa Truyền Thống",
    category: "Áo Dài",
    description: "Áo dài lụa tơ tằm may thủ công theo phong cách cổ điển Hội An, đường may tinh xảo, form dáng uyển chuyển.",
    price: 3500000,
    image: "/images/products/ao-dai-truyen-thong.jpg",
    featured: true,
  },
  {
    id: "vai-lua-than-lan",
    name: "Vải Lụa Thần Lân",
    category: "Vải Lụa",
    description: "Vải lụa tơ tằm dệt thủ công với họa tiết thần lân cổ điển, màu sắc rực rỡ, chất liệu mềm mại sang trọng.",
    price: 2200000,
    image: "/images/products/vai-lua-than-lan.jpg",
    featured: true,
  },
  {
    id: "khan-choang-hoa-mai",
    name: "Khăn Choàng Hoa Mai",
    category: "Khăn Lụa",
    description: "Khăn choàng lụa với họa tiết hoa mai vàng, biểu tượng của mùa xuân và sự thịnh vượng.",
    price: 1200000,
    image: "/images/products/khan-choang-hoa-mai.jpg",
    featured: false,
  },
  {
    id: "tui-lua-theu-tay",
    name: "Túi Lụa Thêu Tay",
    category: "Phụ Kiện",
    description: "Túi đeo chéo bằng lụa tơ tằm, thêu tay họa tiết hoa văn truyền thống, phù hợp đi dạo phố.",
    price: 650000,
    image: "/images/products/tui-lua-theu-tay.jpg",
    featured: false,
  },
  {
    id: "ao-dai-cach-tan",
    name: "Áo Dài Cách Tân Hiện Đại",
    category: "Áo Dài",
    description: "Áo dài cách tân kết hợp giữa truyền thống và hiện đại, phù hợp với phong cách trẻ trung.",
    price: 2800000,
    image: "/images/products/ao-dai-cach-tan.jpeg",
    featured: false,
  },
];
