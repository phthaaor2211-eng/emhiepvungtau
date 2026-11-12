
/* =========================================
   HENRY'S STORY
   FILE: script.js
   Quản lý dữ liệu và hiển thị nội dung website.
   Website chỉ đọc, khách truy cập không thể đăng bài.
   ========================================= */


/* =========================================
   1. DANH SÁCH CHỦ ĐỀ
   Muốn đổi tên chủ đề thì sửa thuộc tính name.
   Muốn đổi mô tả thì sửa thuộc tính description.
   Không sửa id nếu chưa cập nhật các bài viết liên quan.
   ========================================= */

const topics = [
  {
    id: "school",
    name: "Lẩu thập cẩm tình anh em",
    description: "Những câu chuyện học đường",
    number: "01"
  },
  {
    id: "work",
    name: "Rắn cắn vẫn hùa theo rắn",
    description: "Chuyện nơi công sở",
    number: "02"
  },
  {
    id: "love",
    name: "Anh yêu em nhưng mà...",
    description: "Góc nhìn trong các mối quan hệ",
    number: "03"
  },
  {
    id: "other",
    name: "Chị Thảo ơi?",
    description: "Những câu chuyện khác",
    number: "04"
  }
];


/* =========================================
   2. DANH SÁCH BÀI VIẾT
   Muốn thêm bài mới thì sao chép một đối tượng
   bên dưới và thay đổi các thông tin.
   topic phải trùng với id của một chủ đề.
   ========================================= */

const stories = [
  {
    id: 1,
    topic: "school",
    title: "ANH EM THÂN THIẾT BẤY LÂU NAY...",
    excerpt: "Một ví dụ về cách nhìn người trước khi đặt niềm tin vào họ.",
    date: "2026",
    author: "henryngn1405",
    content: "Đây là nội dung minh họa. Hãy thay đoạn này bằng câu chuyện đã được biên tập và kiểm tra. Nên ghi rõ đâu là trải nghiệm cá nhân, đâu là thông tin đã xác minh."
  },
  {
    id: 2,
    topic: "work",
    title: "RẮN HAI MANG ",
    excerpt: "Một tình huống giả định để minh họa cách nhìn nhận câu chuyện rõ ràng, bình tĩnh.",
    date: "2026",
    author: "henryngn1405",
    content: "Đây là bài viết mẫu. Khi thêm nội dung thật, hãy mô tả sự việc theo trình tự, tránh suy đoán động cơ và cho phép các bên liên quan được phản hồi khi phù hợp."
  },
  {
    id: 3,
    topic: "love",
    title: "EM TÔN TRỌNG NÓ",
    excerpt: "Một chủ đề về giao tiếp, ranh giới cá nhân và sự tôn trọng trong mối quan hệ.",
    date: "2026",
    author: "henryngn1405",
    content: "Đây là nội dung mẫu. Không đăng tin nhắn riêng tư, hình ảnh riêng tư hoặc thông tin có thể nhận diện người khác khi chưa được phép."
  },
  {
    id: 4,
    topic: "other",
    title: "CHÓ CẮN",
    excerpt: "Không phải câu chuyện nào cũng có thể vẽ.",
    date: "2026",
    author: "henryngn1405",
    content: "Đây là nội dung minh họa cho danh mục Khác. M có thể thay bằng bài viết của mình và bổ sung nguồn tham khảo nếu có."
  }
];


/* =========================================
   3. LẤY CÁC THÀNH PHẦN HTML
   Kết nối JavaScript với các khu vực trong index.html.
   ========================================= */

const topicGrid = document.getElementById("topicGrid");
const storyGrid = document.getElementById("storyGrid");
const searchInput = document.getElementById("searchInput");
const storyHeading = document.getElementById("storyHeading");
const storySubheading = document.getElementById("storySubheading");
const emptyState = document.getElementById("emptyState");
const dialog = document.getElementById("storyDialog");

// Mặc định hiển thị tất cả chủ đề.
let selectedTopic = "all";


/* =========================================
   4. HIỂN THỊ DANH SÁCH CHỦ ĐỀ
   Chỉ sử dụng MỘT vòng lặp forEach.
   Mỗi chủ đề trong mảng topics chỉ tạo một thẻ.
   ========================================= */

function renderTopics() {

  // Xóa nội dung cũ trước khi hiển thị lại.
  topicGrid.innerHTML = `
    <button
      class="topic-card ${selectedTopic === "all" ? "selected" : ""}"
      data-topic="all"
    >
      <span class="topic-number">✦</span>
      <strong>Tình tiết tăng nhanh</strong>
      <small>Xem mọi câu chuyện</small>
    </button>
  `;

  // Duyệt danh sách chủ đề đúng một lần.
  topics.forEach(topic => {

    topicGrid.innerHTML += `
      <button
        class="topic-card ${selectedTopic === topic.id ? "selected" : ""}"
        data-topic="${topic.id}"
      >
        <span class="topic-number">${topic.number}</span>
        <strong>${topic.name}</strong>
        <small>${topic.description}</small>
      </button>
    `;

  });

  // Gắn sự kiện nhấn vào từng chủ đề.
  topicGrid.querySelectorAll("[data-topic]").forEach(button => {

    button.addEventListener("click", () => {

      // Lưu chủ đề đang được chọn.
      selectedTopic = button.dataset.topic;

      // Cập nhật lại giao diện chủ đề và bài viết.
      renderTopics();
      renderStories();

      // Cuộn đến khu vực bài viết.
      document.getElementById("stories").scrollIntoView({
        behavior: "smooth"
      });

    });

  });

}


/* =========================================
   5. LẤY TÊN CHỦ ĐỀ
   Dựa vào id để xác định tên chủ đề của bài viết.
   ========================================= */

function getTopicName(topicId) {

  const topic = topics.find(item => item.id === topicId);

  return topic ? topic.name : "Khác";

}


/* =========================================
   6. HIỂN THỊ BÀI VIẾT
   Lọc bài viết theo chủ đề và từ khóa tìm kiếm.
   ========================================= */

function renderStories() {

  // Lấy từ khóa người xem nhập vào ô tìm kiếm.
  const keyword = searchInput.value
    .trim()
    .toLocaleLowerCase("vi");

  // Lọc bài viết phù hợp.
  const filtered = stories.filter(story => {

    // Kiểm tra bài viết có thuộc chủ đề đang chọn không.
    const matchTopic =
      selectedTopic === "all" ||
      story.topic === selectedTopic;

    // Nội dung được dùng để tìm kiếm.
    const searchableText = `
      ${story.title}
      ${story.excerpt}
      ${story.content}
    `.toLocaleLowerCase("vi");

    // Trả về bài viết phù hợp cả hai điều kiện.
    return matchTopic && searchableText.includes(keyword);

  });


  // Tìm thông tin chủ đề đang được chọn.
  const currentTopic = topics.find(
    topic => topic.id === selectedTopic
  );


  // Cập nhật tiêu đề khu vực bài viết.
  storyHeading.innerHTML = currentTopic
    ? `Chủ đề <em>${currentTopic.name}</em>`
    : `Câu chuyện <em>mới nhất</em>`;


  // Cập nhật mô tả khu vực bài viết.
  storySubheading.textContent = currentTopic
    ? currentTopic.description
    : "Chọn một thẻ để đọc câu chuyện đầy đủ.";


  // Hiển thị danh sách bài viết.
  storyGrid.innerHTML = filtered.map(story => `

    <article
      class="story-card"
      tabindex="0"
      role="button"
      data-story="${story.id}"
      aria-label="Đọc ${story.title}"
    >

      <div class="story-topline">

        <span class="story-tag">
          ${getTopicName(story.topic)}
        </span>

        <time>${story.date}</time>

      </div>

      <h3>${story.title}</h3>

      <p>${story.excerpt}</p>

      <span class="story-read">
        ĐỌC CÂU CHUYỆN ↗
      </span>

    </article>

  `).join("");


  // Nếu không có bài viết thì hiện thông báo trống.
  emptyState.hidden = filtered.length > 0;


  // Gắn sự kiện mở bài viết.
  storyGrid.querySelectorAll("[data-story]").forEach(card => {

    const open = () => {
      openStory(Number(card.dataset.story));
    };

    // Nhấn chuột để mở bài viết.
    card.addEventListener("click", open);

    // Nhấn Enter hoặc Space để mở bài viết.
    card.addEventListener("keydown", event => {

      if (event.key === "Enter" || event.key === " ") {

        event.preventDefault();
        open();

      }

    });

  });

}


/* =========================================
   7. MỞ BÀI VIẾT CHI TIẾT
   Khi nhấn vào một bài viết, hiển thị nội dung
   trong hộp thoại.
   ========================================= */

function openStory(storyId) {

  // Tìm bài viết theo id.
  const story = stories.find(
    item => item.id === storyId
  );

  // Nếu không tìm thấy bài viết thì dừng.
  if (!story) return;

  // Cập nhật nội dung hộp thoại.
  document.getElementById("dialogCategory").textContent =
    getTopicName(story.topic);

  document.getElementById("dialogTitle").textContent =
    story.title;

  document.getElementById("dialogMeta").textContent =
    `${story.date} · ${story.author}`;

  document.getElementById("dialogBody").textContent =
    story.content;

  // Mở hộp thoại.
  dialog.showModal();

}


/* =========================================
   8. ĐÓNG HỘP THOẠI
   Có thể đóng bằng nút đóng hoặc nhấn ra ngoài.
   ========================================= */

// Đóng khi nhấn nút.
document.getElementById("dialogClose").addEventListener(
  "click",
  () => dialog.close()
);

// Đóng khi nhấn vào vùng bên ngoài hộp thoại.
dialog.addEventListener("click", event => {

  if (event.target === dialog) {
    dialog.close();
  }

});


/* =========================================
   9. CHỨC NĂNG TÌM KIẾM
   Tự động cập nhật kết quả khi nhập từ khóa.
   ========================================= */

searchInput.addEventListener("input", renderStories);


/* =========================================
   10. KHỞI ĐỘNG WEBSITE
   Hiển thị chủ đề và bài viết khi mở trang.
   ========================================= */

renderTopics();
renderStories();
