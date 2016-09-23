var dynamicDiagram = {};
function _css(selector, css){
  var targets = document.querySelectorAll(selector);
  var cssKeys = Object.keys(css);
    for (var i = targets.length - 1; i >= 0; i--) {
      for (var j = cssKeys.length - 1; j >= 0; j--) {
        if(typeof(css[cssKeys[j]]) === 'number'){
          css[cssKeys[j]] = css[cssKeys[j]] + 'px';
        }
        targets[i].style[cssKeys[j]] = css[cssKeys[j]];
      }
    }
}
function _getBoxSize(id){
  var el = document.getElementById(id);
  var el1 = el.cloneNode(true);
  document.body.appendChild(el1);
  el1.style.display = 'block';
  var size = {
    height : el1.clientHeight,
    width : el1.clientWidth,
  }
  el1.remove();
  return size;
};
dynamicDiagram.createPath = function(ctx, points) {
  this.ctx = ctx;
  this.ctx.strokeStyle = '#ccc';
  this.ctx.lineJoin = 'round';

  this.ctx.lineWidth = 2;

    this.ctx.beginPath();
    this.ctx.moveTo(points[0].x, points[0].y);
    this.ctx.lineTo(points[1].x, points[1].y);
    this.ctx.closePath();
    this.ctx.stroke();
};
dynamicDiagram.createRectangle = function(position, ctx) {
    this.x = position.x;
    this.y = position.y;
    this.ctx = ctx;
    this.height = 50;
    this.width = 100;
    this.selected = false;

    this.render = function() {
      this.ctx.clearRect(this.x - 50, this.y - 25, this.width, this.height);
      this.ctx.beginPath();
      this.ctx.rect(this.x - 50, this.y - 25, this.width, this.height);
      this.ctx.closePath();
      this.ctx.fillStyle = '#ccc';
      if(this.active){
        this.ctx.fillStyle = '#666';
      }
      if(this.selected){
        this.ctx.strokeStyle = dynamicDiagram.color;
        this.ctx.lineWidth = 10;
        this.ctx.stroke();
      }

      this.ctx.fill();
    };
  };
  dynamicDiagram.createSquare = function(position, ctx) {
    this.x = position.x;
    this.y = position.y;
    this.ctx = ctx;
    this.height = 50;
    this.width = 50;
    this.selected = false;

    this.render = function() {
      this.ctx.clearRect(this.x - 25, this.y - 25, this.width, this.height);
      this.ctx.beginPath();
      this.ctx.rect(this.x - 25, this.y - 25, this.width, this.height);
      this.ctx.closePath();
      this.ctx.fillStyle = '#ccc';
      if(this.active){
        this.ctx.fillStyle = '#666';
      }
      if(this.selected){
        this.ctx.strokeStyle = dynamicDiagram.color;
        this.ctx.lineWidth = 10;
        this.ctx.stroke();
      }

      this.ctx.fill();
    };
  };

  dynamicDiagram.createTrapezoid  = function(position, ctx) {
    this.x = position.x;
    this.y = position.y;
    this.ctx = ctx;
    this.size = 50;

    this.render = function() {
      this.ctx.beginPath();
      this.ctx.fillStyle = '#ccc';
      this.ctx.moveTo(this.x - 35 , this.y  - this.size/2);
      this.ctx.lineTo(this.x + 35, this.y  - this.size/2);
      this.ctx.lineTo(this.x + this.size, this.y + this.size/2);
      this.ctx.lineTo(this.x - this.size, this.y + this.size/2);
      this.ctx.lineTo(this.x - 35 , this.y  - this.size/2);
      this.ctx.closePath();
      if(this.active){
        this.ctx.fillStyle = '#666';
      }
      if(this.selected){
        this.ctx.strokeStyle = dynamicDiagram.color;
        this.ctx.lineWidth = 10;
        this.ctx.stroke();
      }
      this.ctx.fill();
    };
  };
  dynamicDiagram.createRoundSquare = function(position, ctx) {
    this.x = position.x;
    this.y = position.y;
    this.ctx = ctx;
    this.height = 50;
    this.width = 100;
    this.selected = false;

    this.render = function() {
      //this.ctx.save(); + this.ctx.lineWidth
      this.ctx.lineJoin = "round";
      this.ctx.lineWidth = 30;
      this.ctx.clearRect(this.x - 50, this.y - 25, this.width, this.height);
      this.ctx.beginPath();
      this.ctx.strokeStyle = '#ccc';
      this.ctx.fillStyle = '#ccc';
      this.ctx.strokeRect(this.x - 50 + (this.ctx.lineWidth/2), this.y - 25 + (this.ctx.lineWidth/2), this.width - this.ctx.lineWidth, this.height - this.ctx.lineWidth);
      if(this.active){
        this.ctx.fillStyle = '#666';
      }
      if(this.selected){
        this.ctx.fillStyle = '#ccc';
        this.ctx.strokeStyle = dynamicDiagram.color;
        this.ctx.lineWidth = 10;
        this.ctx.rect(this.x - 50, this.y - 25, this.width, this.height);
      }
      this.ctx.closePath();
      this.ctx.stroke();
      this.ctx.fill();
      //this.ctx.restore();
    };
  };
  dynamicDiagram.createEllipse = function(position, ctx) {
    this.x = position.x;
    this.y = position.y;
    this.ctx = ctx;
    this.height = 50;
    this.width = 100;
    // fire fox ellipse shim
    function drawEllipse(ctx, centerX, centerY, width, height)
    {
      ctx.beginPath();
      ctx.moveTo(centerX, centerY - height / 2);

      ctx.bezierCurveTo(
          centerX + width / 2, centerY - height / 2,
          centerX + width / 2, centerY + height / 2,
          centerX, centerY + height / 2
      );
      ctx.bezierCurveTo(
          centerX - width / 2, centerY + height / 2,
          centerX - width / 2, centerY - height / 2,
          centerX, centerY - height / 2
      );
      ctx.closePath();
    }

    this.render = function(){
      this.ctx.beginPath();
      this.ctx.fillStyle = '#ccc';
      //this.ctx.ellipse(this.x, this.y, this.width/2, this.height/2, 0, 0, 2 * Math.PI);
      if(this.ctx.ellipse){
        this.ctx.ellipse(this.x, this.y, this.width/2, this.height/2, 0, 0, 2 * Math.PI);
      }else{
        drawEllipse(this.ctx, this.x, this.y, this.width, this.height);
      }
      this.ctx.closePath();
      if(this.selected){
        this.ctx.strokeStyle = dynamicDiagram.color;
        this.ctx.lineWidth = 10;
        this.ctx.stroke();
      }
      this.ctx.fill();

    };


  };



dynamicDiagram.createCircle = function(position, ctx) {
  this.x = position.x;
  this.y = position.y;
  this.ctx = ctx;
  this.size = 50;
  this.render = function() {
    this.ctx.beginPath();
    this.ctx.fillStyle = '#ccc';
    this.ctx.arc(this.x, this.y, this.size/2, 0, 2 * Math.PI);
    this.ctx.closePath();
    if(this.active){
      this.ctx.fillStyle = '#666';
    }
    if(this.selected){
      console.log(dynamicDiagram.color);
      this.ctx.strokeStyle = dynamicDiagram.color;
      this.ctx.lineWidth = 10;
      this.ctx.stroke();
    }
    this.ctx.fill();

  };
};


dynamicDiagram.createDiamond = function(position, ctx) {
  this.x = position.x;
  this.y = position.y;
  this.ctx = ctx;
  this.size = 100;

  this.render = function() {
    this.ctx.beginPath();
    this.ctx.fillStyle = '#ccc';
    this.ctx.moveTo(this.x, this.y  - this.size/2);
    this.ctx.lineTo(this.x + this.size/2, this.y);
    this.ctx.lineTo(this.x, this.y + this.size/2);
    this.ctx.lineTo(this.x - this.size/2, this.y);
    this.ctx.lineTo(this.x, this.y - this.size/2);
    this.ctx.closePath();
    if(this.active){
      this.ctx.fillStyle = '#666';
    }
    if(this.selected){
      this.ctx.strokeStyle = dynamicDiagram.color;
      this.ctx.lineWidth = 10;
      this.ctx.stroke();
    }
    this.ctx.fill();
  };
};

dynamicDiagram.getShapeAtXY = function(x, y){
  var selectedShapeIndex;

  for (var index in this.shapeList){
    var shape = this.shapeList[index];
    var startX , endX, startY , endY;
    if(shape.size > 0){
      startX = shape.x - shape.size /2;
      endX = shape.x + shape.size /2;
      startY = shape.y - shape.size /2;
      endY = shape.y + shape.size /2;
    }else{

      startX = shape.x - shape.width /2;
      endX = shape.x + shape.width /2;
      startY = shape.y - shape.height /2;
      endY = shape.y + shape.height /2;
    }
    if(x >= startX && x <= endX && y >= startY && y <= endY){
      selectedShapeIndex =  index;
    }
  }
  return selectedShapeIndex;
};

dynamicDiagram.createText = function(ctx, position, text) {
  this.x = position.x;
  this.y = position.y;
  this.ctx = ctx;
  this.text = text;
  this.render = function() {
    this.ctx.fillStyle = '#000';
    this.ctx.textAlign = 'center';
    this.ctx.font = '14px iranianSans';
    this.ctx.fillText(this.text, this.x, this.y);
  };

};

dynamicDiagram.reRender = function(){
    var self = this;
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.shapeList.forEach(function(item, index) {
      if(index >= 1){
        self.createPath(self.ctx , [
          {
            x: self.shapeList[index - 1].x,
            y: self.shapeList[index - 1].y
          },
          {
            x: item.x ,
            y: item.y
          }
        ]);
      }

    });
    this.shapeList.forEach(function(item, index) {
      item.render();
      item.text.render();
    });
  };



dynamicDiagram.init = function(options) {
  dynamicDiagram.clear();
  
  this.shapeList = [];
  this.shape = 'Rectangle';
  this.canvas = document.getElementById(options.id);
  this.ctx = canvas.getContext('2d');
  this.color = options.selectedColor;

  this.canvas.width = this.canvas.parentNode.offsetWidth;
  this.width = this.canvas.width;
  this.height = this.canvas.height;
  this.moveHandler = null;
  this.stopHandler = null;

  var self = this;

  var items = document.querySelectorAll(options.shapesClass);
  for (var i = 0; i < items.length; i++) {
    dynamicDiagram.attachEvent(items, items[i]);
  };
  //dynamicDiagram.createSqure(context, {x: 60, y:90});
  this.canvas.addEventListener('contextmenu', function(event) {
    event.preventDefault();
    event.cancelBubble = true;
    return false;
  });

  document.addEventListener('mousedown', function(event) {
    document.getElementsByClassName('m-contextMenu')[0].style.display = 'none';
    document.getElementById('popover').style.display = 'none';
    document.getElementById('editBox').style.display = 'none';
  });
  document.getElementById('popover').addEventListener('mousedown', function(event) {
    event.stopPropagation();
  });
  document.getElementById('editBox').addEventListener('mousedown', function(event) {
    event.stopPropagation();
  });
  document.getElementById('contextMenu').addEventListener('mousedown', function(event) {
    event.stopPropagation();
  });

  this.canvas.addEventListener('mousedown', function(event) {

    //console.log(event.buttons);
    var rect = canvas.getBoundingClientRect(),
        pos = {},
        index;
    // store postion of current click

    pos.x = event.clientX - rect.left;
    pos.y = event.clientY - rect.top;

    if(self.getShapeAtXY(pos.x, pos.y)){
      document.getElementById('popover').style.display = 'none';
      document.getElementById('editBox').style.display = 'none';
        index = self.getShapeAtXY(pos.x, pos.y);
      if(event.button === 0){
        self.reRender();
        self.drag(self, index, rect);
      }
      if(event.button === 2){
        setTimeout(function(){
          _css('.m-contextMenu', {
            display: 'block',
            left: event.clientX ,
            top: event.clientY
          });
          dynamicDiagram.deleteShape(index);
          dynamicDiagram.editShape(index);
        },50);
      }
    }else{
      if(event.button === 0){
        self.createSape(pos, event);
      }
    }
  });

};

dynamicDiagram.deleteShape = function(index) {
  console.log(index);
  var self = this;
  self.index = index;
  document.getElementById('edit').removeEventListener('click', self.clickedEdit, false);

  document.getElementById('delete').addEventListener('click', self.clickedDelete, false);


};
dynamicDiagram.editShape = function(index) {
  var self = this;
  self.index = index;
  document.getElementById('edit').removeEventListener('click', self.clickedDelete, false);
  document.getElementById('edit').addEventListener('click', self.clickedEdit, false);


};


dynamicDiagram.clickedDelete = function(event){
  var self = dynamicDiagram;
  document.getElementById('contextMenu').style.display = 'none';
  event.stopPropagation();
  self.shapeList.splice(self.index, 1);
  self.reRender();
  document.getElementById('delete').removeEventListener('click', self.clickedDelete, false);
  return false;
};


dynamicDiagram.clickedEdit = function(event){
    var self = dynamicDiagram;
    document.getElementById('delete').removeEventListener('click', self.clickedDelete, false);
    document.getElementById('editText').removeEventListener('click', buttonClicked, false);
    var popup = {
      y: event.clientY,
      x: event.clientX
    };
    var box = document.getElementById('boxEditText');
    box.value = self.shapeList[self.index].text.text;


    _css("#editBox",{
      'position':'absolute',
      'top': self.canvas.offsetTop + self.shapeList[self.index].y - _getBoxSize('popover').height ,
      'left': self.shapeList[self.index].x + 10 - _getBoxSize('popover').width / 2 + self.canvas.parentNode.parentNode.offsetLeft,
      'right': 'auto',
      'display': 'block'
    });



    setTimeout(function() {
      box.focus();
    }, 10);

    var buttonClicked = function(event){
      event.stopPropagation();
      _css("#editBox", {'display': 'none'});
      var innerText = box.value;
      if(innerText.length > 0){
        self.shapeList[self.index].text.text = innerText;
        self.reRender();
      }
      document.getElementById('editText').removeEventListener('click', buttonClicked, false);
      return false;
    };

    document.getElementById('editText').addEventListener('click', buttonClicked, false);

    document.getElementById('contextMenu').style.display = 'none';
    document.getElementById('edit').removeEventListener('click', self.clickedEdit, false);
    return false;
  };

dynamicDiagram.createSape = function(pos, event) {
  dynamicDiagram.pos = {};
  dynamicDiagram.pos = pos;
  var box = document.getElementById('boxText');
  var popup = {
    x: event.clientX,
    y: event.clientY
  };

  setTimeout(function() {
    _css("#popover",{
      'position':'absolute',
      'top': popup.y - _getBoxSize('popover').height ,
      'left': popup.x - _getBoxSize('popover').width / 2,
      'right': 'auto',
      'display': 'block'
    });
  },5);
  setTimeout(function() {
    box.focus();
  }, 10);

  var clicked = function(event){
    event.stopPropagation();
    document.getElementById("popover").style = 'none';
    var innerText = box.value;
    if(innerText.length > 0){
      box.value = '';
      dynamicDiagram.shapeAdder(innerText, dynamicDiagram.pos);
      document.getElementById('addText').removeEventListener('click', clicked, false);
    }
    return false;
  };

  document.getElementById('addText').addEventListener('click', clicked, false);


};

dynamicDiagram.shapeAdder = function(innerText, pos) {
  var item = new this['create' + this.shape](pos, this.ctx);
      item.type = this.shape;
      item.active = false;
      this.shapeList.push(item);
      item.text = new this.createText(this.ctx, pos, innerText);
      this.reRender();
      return false;
};

dynamicDiagram.attachEvent = function(list, item) {
  item.addEventListener('click', function() {
    dynamicDiagram.shape = item.id;
    for (var i = 0; i < list.length; i++) {
      list[i].classList.remove('active');
    }
    item.classList.add('active');
  });
};

dynamicDiagram.drag = function(self, item, rect){
  document.body.style.cursor='move';
  self.shapeList[item].selected = true;
  self.reRender();

  self.moveHandler = function(event) {
    self.shapeList[item].x = event.clientX - rect.left;
    self.shapeList[item].y = event.clientY- rect.top;
    self.shapeList[item].text.x = event.clientX - rect.left;
    self.shapeList[item].text.y = event.clientY- rect.top;
    self.reRender();
  };

  self.canvas.addEventListener('mousemove', self.moveHandler, false);

  document.addEventListener('mouseup', function(event) {
    if(item >= 0  && self && self.shapeList && self.shapeList.length > 0){
      self.shapeList[item].selected = false;
    }
    self.canvas.removeEventListener('mousemove', self.moveHandler, false);
    self.reRender();
    document.body.style.cursor='default';
  }, false);
};

dynamicDiagram.clear = function() {
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  var button = document.getElementById('clear');
  button.addEventListener('click', function() {
    dynamicDiagram.shapeList = [];
    context.clearRect(0, 0, canvas.width, canvas.height);
  });
};
