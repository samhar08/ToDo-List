class TodoList {
    constructor() {
        this.data = [
            {
                id: 1,
                title: "Alarm 8:00",
                isDone: false,
                isHidden: false
            }
        ],
        this.hideArr = JSON.parse(JSON.stringify(this.data)),
        this.state = false;
    }

    main() {
        this.add();
        this.drawList();
        document.querySelector('.checkbox').addEventListener('click', () => {
            this.checkbox();
            this.state = !this.state;
            console.log(true);
        })
    }

    checkbox() {
        if (this.state) {
            this.data.map(todo => {
                if (todo.isDone) {
                    todo.isHidden = false;
                }
                return todo;
            })
        } else {
            this.data.map(todo => {
                if (todo.isDone) {
                    todo.isHidden = true;
                }
                return todo;
            })
        }
        this.drawList(); 
    }

    add() {
        const input = document.querySelector(".add input");
        const button = document.querySelector(".add button");
        button.addEventListener('click', () => {
            const val = input.value.trim();
            if (val) {
                this.data.push({
                    id: this.data.length + 1,
                    title: val,
                    isDone: false,
                    isHidden: false
                });
                this.drawList();
            }
        });
    }

    drawList() {
        const list = document.querySelector(".list");
        list.innerHTML = ""
        this.data.forEach(todo => {
            if (!todo.isHidden) {
                const that = this;
                const row = document.createElement('div');
                row.classList.add('addRow');
                row.innerHTML = `
                    <div onClick="todolist.check(${todo.id})" class="checkbox"></div>
                    <li>
                        ${!todo.isDone ? todo.title : `<del>${todo.title}</del>`}
                    </li>
                `
                const removeButton = document.createElement('div');
                removeButton.classList.add('removeBtn');
                removeButton.innerText = 'X';
                removeButton.addEventListener('click', function(){
                    that.remove(todo.id);
                });
                row.append(removeButton);
                list.append(row);
            }
          
        });
        this.checkHide();
    }
    check(id) {
        this.data = this.data.filter(todo => {
            if (todo.id === id) {
                todo.isDone = !todo.isDone
            }
            return todo;
        });
        this.drawList();
    }
    checkHide() {
        const hideDone = document.querySelector(".hide-done");
        const checked = this.data.filter(todo => todo.isDone === true);
    }
    remove(removeId) {
        this.data = this.data.filter((row) => {
          return row.id !== removeId;
        });
        this.drawList();
    }
      
    }
const todolist = new TodoList();
todolist.main();
