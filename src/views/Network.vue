<template>
  <div class="flex flex-col">
    <ModalAddContent />
    <div class="pt-5">
      <div v-if="posts.length > 0">
        <!-- แสดงข้อมูลของโพสต์ -->
        <div v-for="post in posts" :key="post._id" class="post-item">
          <h3 class="font-bold">{{ post.header }}</h3>
          <p>{{ post.content }}</p>
          <img
            :src="`http://localhost:5555${post.image}`"
            alt="Post Image"
            class="w-96 h-96"
          />
        </div>
      </div>
      <div v-else>
        <p>No posts available</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import ModalAddContent from "@/components/Network/ModalAddContent.vue";

// สร้างตัวแปรสำหรับเก็บข้อมูลโพสต์
const posts = ref([]);

// ฟังก์ชันดึงข้อมูลโพสต์จาก API
const fetchPosts = async () => {
  try {
    const response = await axios.get("http://localhost:5555/api/auth/network");
    posts.value = response.data; // เก็บข้อมูลที่ได้จาก API ใน posts
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

// เรียกใช้ฟังก์ชันเมื่อ component ถูก mount
onMounted(() => {
  fetchPosts();
});
</script>

<style scoped>
.post-item {
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #f9f9f9;
}
</style>
