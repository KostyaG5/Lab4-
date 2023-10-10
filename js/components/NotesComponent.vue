<template>
  <div class="row">
    <div class="col-md-2">
    </div>
    <div class="col-md-8 col-sm-8 col-xs-12">
      <div id="myDIV" class="header">
        <h2 style="margin:5px">My Notes List</h2>

        <select class="mySelect" v-model="createnote.categoryId">
          <option v-for="category, index in categories" v-bind:value="category.id">{{ category.name }}</option>
        </select>

        <input type="text" id="myInput" placeholder="Title..." v-model="createnote.name">

        <span class="addBtn" v-on:click="createNote()">Add</span>

        <div class="row">
          <div class="col myRadio" v-for="category, index in categories">
            <input type="radio" name="rd" v-on:click="listNotesCategory(category.id)"> {{ category.name }}
          </div>
        </div>

      </div>
      <div>
        <ul id="myUL" v-for="note, index in notes">
          <li><b>{{ note.categoryName }}</b> {{ note.name }}<span class="close"
              v-on:click.stop="destroyNote(note.id)">×</span></li>
        </ul>
      </div>
    </div>
    <div class="col-md-2">
    </div>
  </div>
</template>

<script>
import { initializeApp } from "firebase/app";
import {
  getDocs,
  collection,
  doc,
  getFirestore,
  setDoc,
  addDoc,
  deleteDoc,
  query,
  where
} from 'firebase/firestore'

export default {
  data: function () {
    return {
      DB: null,
      notes: [],
      categories: [],
      createnote: {
        name,
        categoryId: "1",
      },
    }
  },
  mounted() {
    var app = this;

    const firebaseConfig = {
      apiKey: "AIzaSyAk5fROv62254ZpfB5670juylW18-KGeF4",
      authDomain: "lab4-c08a2.firebaseapp.com",
      projectId: "lab4-c08a2",
      storageBucket: "lab4-c08a2.appspot.com",
      messagingSenderId: "623215451310",
      appId: "1:623215451310:web:5be858f4d3e9cbf1d6e13f",
      measurementId: "G-YVJ15YS5T3"
    };


    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);


    this.listCategories();
  },
  methods: {
    listCategories() {
      var app = this;

      let notes = getDocs(collection(app.DB, 'Categories'));

      notes.then(responce => {
        responce.forEach(document => {
          console.log(document.data());

          let category = document.data();
          category.id = document.id;

          app.categories.push(category);
        });

        app.listNotes();
      });
    },

    listNotes() {
      var app = this;

      let notes = getDocs(collection(app.DB, 'Notes'));

      this.pushNotes(notes);
    },

    getCategoryName(categoryId) {
      var app = this;

      for (let i = 0; i < app.categories.length; ++i) {
        if (app.categories[i].id == categoryId) {
          return app.categories[i].name;
        }
      }
    },

    listNotesCategory(id) {
      var app = this;

      app.notes = [];

      let q = query(collection(app.DB, "Notes"), where("categoryId", "==", id));

      let notes = getDocs(q);

      this.pushNotes(notes);
    },

    pushNotes(notes) {
      var app = this;

      notes.then(responce => {
        responce.forEach(document => {
          console.log(document.data());

          let note = document.data();
          note.id = document.id;


          note.categoryName = app.getCategoryName(note.categoryId);

          app.notes.push(note);
        });
      });
    },

    createNote() {
      var app = this;

      addDoc(collection(app.DB, 'Notes'), app.createnote);

      app.createnote.name = '';
      app.createnote.categoryId = "1";

      app.notes = [];

      this.listNotes();
    },

    destroyNote(id) {
      var app = this;

      deleteDoc(doc(app.DB, "Notes", id));

      app.notes = [];

      this.listNotes();
    },
  },
}
</script>
