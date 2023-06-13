const Todo = require('../lib/todo');
const TodoList = require('../lib/todolist');

describe('TodoList', () => {
  let todo1;
  let todo2;
  let todo3;
  let list;
 
  beforeEach(() => {
    todo1 = new Todo('Buy milk');
    todo2 = new Todo('Clean room');
    todo3 = new Todo('Go to the gym');

    list = new TodoList("Today's Todos");
    list.add(todo1);
    list.add(todo2);
    list.add(todo3);
  });

  // 1 Size
  test('todolist has a size of 3', () => {
    expect(list.size()).toBe(3);
  });

  // your tests go here
  //2 toArray
  test('todoList toArray method returns an array of todos', () => {
    expect(Array.isArray(list.toArray())).toBe(true);

    expect(list.toArray().length).toBe(3);

    expect(list.toArray()[0] instanceof Todo).toBeTruthy();

    //this test combines all the above and MORE
    expect(list.toArray()).toEqual([todo1, todo2, todo3]);
  });

  //3 - first
  test('list.first should return the first todo on the list', () => {
    expect(list.first()).toBe(todo1);
  });

  //4 - last
  test('list.last should return the last todo on the list', () => {
    expect(list.last()).toBe(todo3);
  });

  //5 - shift
  test('shift should remove and return the first todo from the list', () => {
    expect(list.shift()).toBe(todo1);

    expect(list.toArray()).toEqual([todo2, todo3]);
  });

  //6 pop
  test('shift should remove and return the last todo from the list', () => {
    expect(list.pop()).toBe(todo3);
    expect(list.toArray()).toEqual([todo1, todo2]);
  });

  //7 isDone
  test('isDone() returns true if all todos on list are done, false otherwise.', () => {
    //all todo's undone ? return false
    expect(list.isDone()).not.toBeTruthy();
    
    //set all todos to done
    list.forEach(todo => todo.markDone());
    //return true
    expect(list.isDone()).toBeTruthy();
    //undo one todo
    list.markUndoneAt(0);
    //return false
    expect(list.isDone()).toBe(false);
  });

  //8 add
  test('add should add a new todo to the list', () => {
    list.add(new Todo('Build a lego'));

    expect(list.last().getTitle()).toBe('Build a lego');

    expect((() => list.add({}))).toThrow(TypeError);
  });

  //9 itemAt
  test('itemAt should return a todo from the specified list index', () => {
    expect(list.itemAt(0)).toEqual({title : 'Buy milk', done : false});
  });

  //10 markDoneAt
  test('markDone at should switch the `done` property of a todo at the specified index to `true', () => {
    list.markDoneAt(0);

    expect(list.itemAt(0).isDone()).toBe(true);

    expect((() => list.markDoneAt(10))).toThrow(ReferenceError);
  });

  //11 markUndoneAt
  test('markUndoneAt should switch the `done` property of a todo at the specified index to `false', () => {
    todo1.markDone();
    expect(list.itemAt(0).isDone()).toBeTruthy();

    list.markUndoneAt(0);
    expect(list.itemAt(0).isDone()).toBe(false);

    expect((() => list.markDoneAt(10))).toThrow(ReferenceError);
  });

  //12 markAllDone
  test('markAllDone should switch the `done` prop of all todos on list to true', () => {
    list.markAllDone();

    expect(list.itemAt(0).isDone()).toBe(true);
    expect(list.itemAt(1).isDone()).toBe(true);
    expect(list.itemAt(2).isDone()).toBe(true);
  });

  //13 removeAt
  test('removeAt removes a todo from the list at a given index', () => {

    expect(list.removeAt(1)).toBe(todo2);

    expect(() => list.removeAt(10)).toThrow(ReferenceError);
  });

  //14 toString 1
  test('toString returns string representation of the list', () => {
    let string = `---- Today's Todos ----
[ ] Buy milk
[ ] Clean room
[ ] Go to the gym`;

    expect(list.toString()).toBe(string);
  });

    //15 toString 2
    test('toString returns string representation of the list - with items done', () => {
      list.markDoneAt(1);

      let string = `---- Today's Todos ----
[ ] Buy milk
[X] Clean room
[ ] Go to the gym`;
  
      expect(list.toString()).toBe(string);
    });

    //16 toString 3
    test('toString returns string representation of the list - all items done', () => {
      list.markAllDone();

      let string = `---- Today's Todos ----
[X] Buy milk
[X] Clean room
[X] Go to the gym`;
  
      expect(list.toString()).toBe(string);
    });

    //17 forEach()
    test('verify that forEach iterates over the elements in list', () => {
      let titles = [];
      list.forEach(todo => titles.push(todo.getTitle()));

      expect(titles).toEqual(['Buy milk', 'Clean room', 'Go to the gym']);
    });

      //18 filter()
      test('filter returns new TodoList object with filtered todos', () => {
        todo1.markDone();
        let newList = new TodoList(list.title);
        newList.add(todo1);
      
        expect(newList.title).toBe(list.title);
      
        let doneItems = list.filter(todo => todo.isDone());
        expect(doneItems.toString()).toBe(newList.toString());
      });
});