export interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export interface KnowledgeItem {
  keywords: string[];
  response: string;
}

export const CHATBOT_KNOWLEDGE: KnowledgeItem[] = [
  {
    keywords: ["giá", "bao nhiêu", "tiền", "cost", "price", "costs"],
    response: "Giá sản phẩm của chúng tôi dao động từ 650,000 VNĐ đến 3,500,000 VNĐ tùy theo loại sản phẩm. Bạn có thể xem chi tiết giá tại trang Bộ Sưu Tập. Chúng tôi cũng có chương trình ưu đãi đặc biệt cho khách hàng thân thiết!"
  },
  {
    keywords: ["lịch sử", "truyền thống", "nguồn gốc", "history", "tradition", "câu chuyện"],
    response: "Nghề dệt lụa Hội An có lịch sử hơn 300 năm, được truyền từ thế hệ này sang thế hệ khác. Chúng tôi vẫn giữ gìn phương pháp dệt thủ công truyền thống kết hợp với kỹ thuật hiện đại để tạo ra những sản phẩm lụa cao cấp nhất."
  },
  {
    keywords: ["vận chuyển", "giao hàng", "ship", "delivery", "shipping"],
    response: "Chúng tôi cung cấp dịch vụ giao hàng toàn quốc và quốc tế. Thời gian giao hàng trong nước: 2-5 ngày. Quốc tế: 7-14 ngày. Miễn phí vận chuyển cho đơn hàng trên 2,000,000 VNĐ."
  },
  {
    keywords: ["sản phẩm", "mua", "đặt hàng", "product", "buy", "order"],
    response: "Bạn có thể xem và đặt hàng các sản phẩm của chúng tôi tại trang Bộ Sưu Tập. Nếu cần tư vấn chi tiết, vui lòng liên hệ: +84 123 456 789 hoặc email: contact@lua-tho-tam-hoi-an.com"
  },
  {
    keywords: ["chất liệu", "vải", "lụa", "material", "fabric", "silk"],
    response: "Tất cả sản phẩm của chúng tôi đều được dệt từ tơ tằm thiên nhiên 100%, không pha trộn. Quy trình từ nuôi tằm, kéo tơ đến dệt vải đều được kiểm soát chặt chẽ để đảm bảo chất lượng cao nhất."
  },
  {
    keywords: ["bảo quản", "giặt", "care", "wash", "maintain"],
    response: "Để bảo quản lụa tơ tằm tốt nhất: Giặt tay nhẹ nhàng với nước lạnh, không vắt mạnh, phơi trong bóng râm, là ủi ở nhiệt độ thấp. Tránh tiếp xúc trực tiếp với nước hoa và hóa chất mạnh."
  },
  {
    keywords: ["cửa hàng", "showroom", "địa chỉ", "address", "location", "visit"],
    response: "Showroom của chúng tôi tại Phố Cổ Hội An, Quảng Nam. Giờ mở cửa: 8:00 - 20:00 hàng ngày. Bạn có thể ghé thăm để trực tiếp cảm nhận chất lượng sản phẩm và tìm hiểu quy trình dệt lụa truyền thống."
  },
  {
    keywords: ["tặng quà", "gift", "quà tặng", "present"],
    response: "Lụa tơ tằm Hội An là món quà tuyệt vời thể hiện sự tinh tế và sang trọng. Chúng tôi cung cấp dịch vụ gói quà cao cấp và thiệp chúc mừng theo yêu cầu. Đặc biệt phù hợp cho dịp lễ, sinh nhật, hay quà tặng doanh nghiệp."
  },
  {
    keywords: ["xin chào", "chào", "hello", "hi", "hey"],
    response: "Xin chào! Tôi là trợ lý ảo của Lụa Tơ Tằm Hội An. Tôi có thể giúp bạn về giá cả, sản phẩm, lịch sử, vận chuyển và nhiều thông tin khác. Bạn cần tư vấn gì ạ?"
  },
  {
    keywords: ["cảm ơn", "thank", "thanks", "cám ơn"],
    response: "Rất vui được hỗ trợ bạn! Nếu có thêm câu hỏi nào, đừng ngại hỏi nhé. Chúc bạn một ngày tốt lành! 🎋"
  },
];

export const DEFAULT_RESPONSE = "Xin lỗi, tôi chưa hiểu rõ câu hỏi của bạn. Bạn có thể hỏi về: giá cả, sản phẩm, lịch sử, vận chuyển, chất liệu, bảo quản, hoặc địa chỉ cửa hàng. Hoặc liên hệ trực tiếp: +84 123 456 789 để được hỗ trợ tốt hơn!";

export function findBestMatch(userMessage: string): string {
  const normalizedMessage = userMessage.toLowerCase().trim();

  for (const item of CHATBOT_KNOWLEDGE) {
    for (const keyword of item.keywords) {
      if (normalizedMessage.includes(keyword.toLowerCase())) {
        return item.response;
      }
    }
  }

  return DEFAULT_RESPONSE;
}
