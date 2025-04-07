<template>
  <div class="w-full px-34">
    <div class="text-4xl uppercase pb-4">
      {{ $route.name }}
    </div>
    <div
      className="border-b-[1px] border-zinc-200 flex items-center  justify-center  "
    ></div>
    <div class="flex">
      <div class="w-full">
        <div v-if="isLoading" class="flex items-center justify-center h-96">
          Loading...
        </div>
        <!-- asdasdasdasd -->
        <div
          v-else-if="posts.length > 0"
          class="flex flex-col items-center justify-center px-40 mx-auto pt-5"
        >
          <!-- แสดงข้อมูลของโพสต์ -->
          <div v-for="post in posts" :key="post._id" class="w-[50rem] pb-10">
            <div>
              <div class="flex flex-col gap-10">
                <div class="flex justify-between">
                  <h3 class="font-bold">{{ post.header }}</h3>
                  <div class="flex flex-col relative">
                    <div class="absolute right-[-5rem]">
                      <ModalEditContent :post="post" />
                    </div>
                    <h1
                      class="px-2 py-1 bg-zinc-100 shadow-sm shadow-zinc-400 text-sm text-black"
                    >
                      {{ formatDate(post.createdAt) }}
                    </h1>
                  </div>
                </div>

                <div>
                  <p>{{ post.content }}</p>
                </div>
              </div>
              <div
                v-if="post.image"
                class="rounded-sm flex items-center pt-10 w-full justify-center"
              >
                <img
                  :src="`http://localhost:5555${post.image}`"
                  alt="ProgrammerImage"
                  class="w-96 h-96"
                />
              </div>
            </div>
            <div
              className="border-b-2 border-zinc-200 flex items-center  justify-center border-dotted pt-10"
            ></div>
          </div>
        </div>
        <div v-else class="flex items-center justify-center h-96">
          <p>No posts available</p>
        </div>
      </div>
      <!-- <div class="w-64 bg-zinc-200 flex">For ad</div> -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import ModalEditContent from "./ModalEditContent.vue";

const posts = ref([]);
const isLoading = ref(true);

const fetchPosts = async () => {
  try {
    isLoading.value = true;
    const response = await axios.get(
      "http://localhost:5555/api/auth/programmer"
    );
    posts.value = response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
  } finally {
    isLoading.value = false;
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("th-TH", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

onMounted(() => {
  fetchPosts();
});
</script>
