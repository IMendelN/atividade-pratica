const LIST = [
  {
    id: 1,
    name: "Mestre Yoda",
    image: "images/yoda.png",
  },
  {
    id: 2,
    name: "Luke Skywalker",
    image: "images/luke.png",
  },
  {
    id: 3,
    name: "Princesa Leia",
    image: "images/leia.png",
  },
  {
    id: 4,
    name: "Han Solo",
    image: "images/hansolo.png",
  },
  {
    id: 5,
    name: "Darth Vader",
    image: "images/vader.png",
  },
  {
    id: 6,
    name: "Chewbacca",
    image: "images/chewbacca.png",
  },
  {
    id: 7,
    name: "R2-D2",
    image: "images/r2d2.png",
  },
  {
    id: 8,
    name: "C-3PO",
    image: "images/c3po.png",
  },
];

const App = new Vue({
  el: "#app",
  data: {
    title: "Star Wars Lego Characters",
    userName: "Iago Nogueira",
    characters: LIST,
    searchName: "",
  },
  methods: {
    countLikes(character) {
      if (!character.likes) {
        this.$set(character, "likes", 0);
      }
      character.likes += 1;
    },
    searchCharacter() {
      if (this.searchName.trim() === "") {
        this.characters = LIST;
      } else {
        const filteredCharacters = LIST.filter((character) =>
          character.name.toLowerCase().includes(this.searchName.toLowerCase()),
        );

        if (filteredCharacters.length === 0) {
          alert("Character not found!");
          this.characters = LIST;
        } else {
          this.characters = filteredCharacters;
        }
      }
    },
    deleteCharacter(characterId) {
      this.characters = this.characters.filter(
        (character) => character.id !== characterId,
      );
    },
  },
});
