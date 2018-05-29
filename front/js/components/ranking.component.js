function Ranking(selector) {
  Component.call(this, selector);
  this.numbers = [];
}

Ranking.prototype = Object.create(Component.prototype);
Ranking.constructor = Ranking;

Ranking.prototype.init = function() {
  const self = this;

  axios.get('http://localhost:3000/numbers')
    .then(function(response) {
      self.numbers = response.data.data.map(function(number) {
        return {
          nr: number,
          counter: 0         
        }
      });
      
      self.render();
    })
    .catch(function(error) {
      console.error(error);
    });
  };
  
Ranking.prototype.update = function(newNumbers) {

  for(let i = 0; i < newNumbers.length; i++){
    for(let j = 0; j < this.numbers.length; j++){
      if(newNumbers[i].nr === this.numbers[j].nr){
        this.numbers[j].counter++;
      } 
    }
  }

  this.numbers.sort(function(a,b){
    return b.counter - a.counter;
  })
}
  
Ranking.prototype.render = function() {
  const container = this.getDOMElement();

  let children = document.querySelectorAll('#numbers-ranking .list-group-item');

  for(let i = 0; i < children.length; i++){
    children[i].remove();
  }

  this.numbers.forEach(function(number) {
      const listElement = document.createElement('li');
      listElement.classList.add('list-group-item');
      listElement.innerHTML = number.nr+" - <small> "+number.counter+" times </small>";

      container.appendChild(listElement);
  });
};



