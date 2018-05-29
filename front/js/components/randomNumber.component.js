function RandomNumbers(selector,addToRanking) {
  Component.call(this, selector);
  this.numbers = [];
  this.addToRanking = addToRanking;
}
RandomNumbers.prototype = Object.create(Component.prototype);
RandomNumbers.constructor = RandomNumbers;

RandomNumbers.prototype.init = function() {
  const self = this;
  self.get();
  setInterval(function () {
    self.get()
  }, 1000);
};

RandomNumbers.prototype.render = function() {
  const container = this.getDOMElement();

  let nrs = this.numbers;
  this.addToRanking(nrs);

  let children = document.querySelectorAll('#random-numbers .list-group-item');

  for(let i = 0; i < children.length; i++){
    children[i].remove();
  }

  this.numbers.forEach(function(number) {
    const listElement = document.createElement('li');
    listElement.classList.add('list-group-item');
    listElement.innerHTML = number.nr;
    
    container.appendChild(listElement);
  });
};

RandomNumbers.prototype.get = function(){
  const self = this;
  axios.get('http://localhost:3000/random-numbers')
    .then(function(response) {
      self.numbers = response.data.data.map(function(number) {
        return {
          nr: number
        }
      });
      self.render();
    })
    .catch(function(error) {
      console.error(error);
    });
}