const addToRanking = function(numbers){
  ranking.update(numbers);
  ranking.render();
}
const randomNumbers = new RandomNumbers('#random-numbers',addToRanking);
const ranking = new Ranking('#numbers-ranking');

ranking.init();
randomNumbers.init();