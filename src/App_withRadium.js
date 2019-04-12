import React, { Component } from 'react';
import './App.css';
import Radium, { StyleRoot } from 'radium';
import Person from './Person/Person';

class App extends Component {
    state = {
        persons: [
            {id:'asda', name: 'Max', age: 27},
            {id:'dbft', name: 'Manu', age: 24},
            {id:'etet', name: 'Steph', age: 21}
        ],
        otherState: 'some other value',
        showPersons: false
    }

    nameChangedHandler = (event, id) => {
        const personIndex = this.state.persons.findIndex((p) => {
            return p.id === id;
        });

        const person = {
            ...this.state.persons[personIndex]
        };

        person.name = event.target.value;

        const persons = [...this.state.persons];
        persons[personIndex] = person;

        this.setState({
            persons:  persons
        });
    }

    deletePersonHandler = (personIndex) => {
        //const persons = this.state.persons.slice();
        const persons = [...this.state.persons];
        persons.splice(personIndex, 1);
        this.setState({persons: persons})
    }

    togglePersonsHandler = () => {
        this.setState({showPersons: !this.state.showPersons});
    }

    render() {
        const style = {
            backgroundColor: 'green',
            font: 'inherit',
            color: 'white',
            border: '1px solid blue',
            padding: '8px',
            cursor: 'pointer',
            ':hover': {
                backgroundColor: 'lightgreen',
                color: 'black'
            }
        };

        let persons = null;

        if(this.state.showPersons) {
            persons = (
                <div>
                    {this.state.persons.map( (person, index) => {
                        return <Person
                            click={() => this.deletePersonHandler(index)}
                            name={person.name}
                            age={person.age}
                            key={person.id}
                            changed={(event) => this.nameChangedHandler(event, person.id)}/>; //avoid to render all every time
                    })}
                </div>
            );
            style.backgroundColor = 'red';
            style[':hover'] = {
                backgroundColor: 'lightcoral',
                color: 'black'
            };
        }

        let classes = [];
        if(this.state.persons.length <= 2){
            classes.push('red');
        }
        if(this.state.persons.length <= 1){
            classes.push('bold');
        }

        return (
            <StyleRoot>
                <div className="App">
                    <h1>
                        Hello!
                    </h1>
                    <p className={classes.join(' ')}>This is really working!</p>
                    <button
                        style={style}
                        onClick={this.togglePersonsHandler}>Switch Name</button>

                    {persons}
                </div>
            </StyleRoot>
        );
    }
}

export default Radium(App);



//This is a component using React Hooks, we can also use class based component, more old and used
/*
const app = props => {

    const [ personsState, setPersonsState ] = useState({
        persons: [
            {name: 'Max', age: 27},
            {name: 'Manu', age: 24}
        ],
        otherState: 'some other value' //better remove it from here
    });

    //const [otherState, setOtherState] = useState('some other value');
    //one var and function per state object, so that after we can't lose one object by mistake

    const switchNameHandler = () => {
        //doesn't merge with the old state as in the class example, in this case otherState will be lost!
        setPersonsState({persons: [
                { name: 'Ugo', age: 27},
                { name: 'Manu', age: 24}
            ]});
    }

    return (
      <div className="App">
        <h1>
          Hello!
        </h1>
        <button onClick={switchNameHandler}>Switch Name</button>
        <Person name={personsState.persons[0].name} age={personsState.persons[0].age}/>
        <Person name={personsState.persons[1].name} age={personsState.persons[1].age}>Woah I don't have hobbies!</Person>
      </div>
    );
}

export default app;*/


