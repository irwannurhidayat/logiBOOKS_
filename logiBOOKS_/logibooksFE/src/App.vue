
<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h2>List Category</h2>
        <table class="table">
    <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Description</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for = "category in dataCategory">
        <td>{{ category.name }}</td>
        <td>{{ category.description }}</td>
        <td><input type="button" class="btn btn-info btn-sm mx-1" value="Update"/>
        <input type="button" class="btn btn-danger btn-sm mx-1" value="Delete"/></td>
      </tr>
    </tbody>
  </table>
      </div>
      <div class="col">
        <h2>Form Category</h2>
        <form>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Email address</label>
      <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
      <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">Password</label>
      <input type="password" class="form-control" id="exampleInputPassword1">
    </div>
    <div class="mb-3 form-check">
      <input type="checkbox" class="form-check-input" id="exampleCheck1">
      <label class="form-check-label" for="exampleCheck1">Check me out</label>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
      </div>
    </div>
  </div>
</template>

  <script setup>

  import axios from "axios";
  import { onMounted, ref } from 'vue';

  const url = "http://localhost:3000/api/v1";

  const dataCategory = ref([]);
  
  const getCategory = async () => {
    try {
      const response = await axios.get(url + '/categories');
      dataCategory.value = response.data.data;
    } catch (error) {
      console.error(error);
    }
  };

    onMounted(() => {
    getCategory();
  });

  </script>

