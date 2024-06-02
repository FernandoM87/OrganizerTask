<template>
    <div class="max-w-xl mx-auto">
        <h1 class="text-4xl text-center font-bold mt-36">Welcome to Task Organizer</h1>
        <div  class="text-lg mt-12">
            <p>
                Task Organizer is a simple application designed to help you manage your tasks efficiently. You can add,
                edit, and delete tasks, as well as mark them as complete or incomplete.
            </p>
            <p>
                Navigate to the Home page to start managing your tasks. Click on a task to edit its title, and use the
                provided buttons to delete tasks or toggle their completion status.
            </p>
        </div>
        <div class="mt-10">
            <router-link to="/" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">Go to
                Home</router-link>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: 'Introduction',
};
</script>

<style scoped>
h1 {
    margin-bottom: 1rem;
}

p {
    margin-bottom: 0.5rem;
}
</style>