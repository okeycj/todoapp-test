import React, { useEffect, useState } from 'react';
import "../App.css";
// import Period from './Period';

function Home() {
    const [ form, setForm ] = useState([])
    const [ monday, setMonday ] = useState(false)
    const [ tuesday, setTuesday ] = useState(false)
    const [ wednesday, setWednesday ] = useState(false)
    const [ thursday, setThursday ] = useState(false)
    const [ friday, setFriday ] = useState(false)
    const [ saturday, setSaturday ] = useState(false)
    const [ sunday, setSunday ] = useState(false);
    const [ period, setPeriod ] = useState('');
    const [ duration, setDuration ] = useState('');
    const [ localstore, setLocalstore ] = useState({});
    const [ total_duration, setTotalduration ] = useState(0);

    // let localstore
    useEffect(() => {
        if (localStorage.getItem('todos') == null) {
            let todos = {'sunday': [], 'monday': [], 'tuesday': [], 'wednesday': [], 'thursday': [], 'friday': [], 'saturday': []}
            localStorage.setItem('todos', JSON.stringify(todos))
            setLocalstore(JSON.parse(localStorage.getItem('todos')))
            totalDuration()
        }
        setLocalstore(JSON.parse(localStorage.getItem('todos')))
        totalDuration()
    }, [])
    
    // localstore = JSON.parse(localStorage.getItem('todos'));

    const addForm = (day) => {
        const document = [...form, {index: Math.random(), day: day}]
        setForm(document)
    }
    
    const deleteForm = (f) => {
      const array = form.filter((fm) => fm.index !== f.index);
      setForm(array)
    }
    
    const handleMonday = () => {
      const value = !monday
      setMonday(value)
    }
    const handleTuesday = () => {
      const value = !tuesday
      setTuesday(value)
    }
    const handleWednesday = () => {
      const value = !wednesday
      setWednesday(value)
    }
    const handleThursday = () => {
      const value = !thursday
      setThursday(value)
    }
    const handleFriday = () => {
      const value = !friday
      setFriday(value)
    }
    const handleSaturday = () => {
      const value = !saturday
      setSaturday(value)
    }
    const handleSunday = () => {
      const value = !sunday
      setSunday(value)
    }
    const handlePeriod = (e) => {
      const value = e.target.value
      setPeriod(value)
    }
    const handleDuration = (e) => {
      const value = e.target.value
      setDuration(value)
    }
    const handleSubmit = (event, day) => {
        if (event.key === 'Enter') {
            let store = JSON.parse(localStorage.getItem('todos'))
            if (store.hasOwnProperty(day)) {
                let array = [...store[day], {index: Math.random(), period: period, duration: duration, notes: event.target.value}]
                store[day] = array;
                localStorage.setItem('todos', JSON.stringify(store))
                setLocalstore(JSON.parse(localStorage.getItem('todos')))
                totalDuration()
            }
            console.log(localstore)
        }
    }
    const deleteTODO = (day, todo) => {
        let store = JSON.parse(localStorage.getItem('todos'))
        if (store.hasOwnProperty(day)) {
            let array = store[day].filter((td) => td.index !== todo.index)
            store[day] = array;
            localStorage.setItem('todos', JSON.stringify(store))
            setLocalstore(JSON.parse(localStorage.getItem('todos')))
            totalDuration()
        }
        console.log(localstore)
        
    }
    const totalDuration = () => {
        let store = JSON.parse(localStorage.getItem('todos'))
        let total_duration = 0;
        for (const key in store) {
            if (store.hasOwnProperty(key)) {
                const s = store[key];
                for (let index = 0; index < s.length; index++) {
                    const d = s[index].duration;
                    total_duration = total_duration+Number(d.split(' ')[0])
                }
            }
        }
        // console.log('total_duration',total_duration)
        setTotalduration(total_duration)
    }
    return (
        <div className='homepage'>
            <div className='day'>
                <input type='checkbox' id='day' onChange={handleMonday} /> <label htmlFor='day'>Monday</label>
                {monday !== false && (
                    <div>
                    <p>Add a Period: <button onClick={() => addForm("monday")}>+</button></p>
                    {localstore.monday.length > 0 && (
                        localstore.monday.map((to_do, i) => {
                            return(
                                <div className='todo'>
                                    {i+1}. Period: 
                                    <select defaultValue={to_do.period} disabled onChange={(e) => handlePeriod(e)}>
                                        <option>Choose Period</option>
                                        <option>AM</option>
                                        <option>PM</option>
                                    </select>
                                    Duration:
                                    <select defaultValue={to_do.duration} disabled onChange={(e) => handleDuration(e)}>
                                        <option>Choose Duration</option>
                                        <option>30 minute</option>
                                        <option>60 minute</option>
                                    </select>
                                    Notes: <input type="text" disabled value={to_do.notes} /> <button onClick={() => deleteTODO('monday', to_do)}>-</button>
                                </div>
                            )
                        })
                    )}
                    {form.length > 0 && (
                        form.map((f,i) => {
                            console.log(form)
                            if (f.day === 'monday') {
                                return(<div className='todo'>
                                    {i + 1 + localstore.sunday.length}. Period: 
                                    <select onChange={(e) => handlePeriod(e)}>
                                        <option>Choose Period</option>
                                        <option>AM</option>
                                        <option>PM</option>
                                    </select>
                                    Duration:
                                    <select onChange={(e) => handleDuration(e)}>
                                        <option>Choose Duration</option>
                                        <option>30 minute</option>
                                        <option>60 minute</option>
                                    </select>
                                    Notes: <input type="text" onKeyPress={(e) => handleSubmit(e, 'monday')} /><button onClick={() => deleteForm(f)}>-</button>
                                </div>)
                                
                            }
                        })
                    )}
                </div>
                )}
            </div>
            <div className='day'>
                <input type='checkbox' id='day1' onChange={handleTuesday} /> <label htmlFor='day1'>Tuesday</label>
                {tuesday !== false && (
                    <div>
                    <p>Add a Period: <button onClick={() => addForm('tuesday')}>+</button></p>
                    {localstore.tuesday.length > 0 && (
                        localstore.tuesday.map((to_do,i) => {
                            return(
                                <div className='todo'>
                                    {i+1}. Period: 
                                    <select defaultValue={to_do.period} disabled onChange={(e) => handlePeriod(e)}>
                                        <option>Choose Period</option>
                                        <option>AM</option>
                                        <option>PM</option>
                                    </select>
                                    Duration:
                                    <select defaultValue={to_do.duration} disabled onChange={(e) => handleDuration(e)}>
                                        <option>Choose Duration</option>
                                        <option>30 minute</option>
                                        <option>60 minute</option>
                                    </select>
                                    Notes: <input type="text" disabled value={to_do.notes} /> <button onClick={() => deleteTODO('tuesday', to_do)}>-</button>
                                </div>
                            )
                        })
                    )}
                    {form.length > 0 && (
                        form.map((f,i) => {
                            console.log(form)
                            if (f.day === 'tuesday') {
                                return(<div className='todo'>
                                    {i + 1 + localstore.tuesday.length}. Period: 
                                    <select onChange={(e) => handlePeriod(e)}>
                                        <option>Choose Period</option>
                                        <option>AM</option>
                                        <option>PM</option>
                                    </select>
                                    Duration:
                                    <select onChange={(e) => handleDuration(e)}>
                                        <option>Choose Duration</option>
                                        <option>30 minute</option>
                                        <option>60 minute</option>
                                    </select>
                                    Notes: <input type="text" onKeyPress={(e) => handleSubmit(e, 'tuesday')} /> <button onClick={() => deleteForm(f)}>-</button>
                                </div>)
                            }
                        })
                    )}
                </div>
                )}
            </div>
            <div className='day'>
                <input type='checkbox' id='day2' onChange={handleWednesday} /> <label htmlFor='day2'>Wednesday</label>
                {wednesday !== false && (
                    <div>
                    <p>Add a Period: <button onClick={() => addForm('wednesday')}>+</button></p>
                    {localstore.wednesday.length > 0 && (
                        localstore.wednesday.map((to_do, i) => {
                            return(
                                <div className='todo'>
                                    {i +1}. Period: 
                                    <select defaultValue={to_do.period} disabled onChange={(e) => handlePeriod(e)}>
                                        <option>Choose Period</option>
                                        <option>AM</option>
                                        <option>PM</option>
                                    </select>
                                    Duration:
                                    <select defaultValue={to_do.duration} disabled onChange={(e) => handleDuration(e)}>
                                        <option>Choose Duration</option>
                                        <option>30 minute</option>
                                        <option>60 minute</option>
                                    </select>
                                    Notes: <input type="text" disabled value={to_do.notes} /> <button onClick={() => deleteTODO('wednesday', to_do)}>-</button>
                                </div>
                            )
                        })
                    )}
                    {form.length > 0 && (
                        form.map((f, i) => {
                            console.log(form)
                            if (f.day === 'wednesday') {
                                return(<div className='todo'>
                                    {i + 1 + localstore.wednesday.length}. Period: 
                                    <select onChange={(e) => handlePeriod(e)}>
                                        <option>Choose Period</option>
                                        <option>AM</option>
                                        <option>PM</option>
                                    </select>
                                    Duration:
                                    <select onChange={(e) => handleDuration(e)}>
                                        <option>Choose Duration</option>
                                        <option>30 minute</option>
                                        <option>60 minute</option>
                                    </select>
                                    Notes: <input type="text" onKeyPress={(e) => handleSubmit(e, 'wednesday')} /><button onClick={() => deleteForm(f)}>-</button>
                                </div>)
                            }
                        })
                    )}
                </div>
                )}
            </div>
            <div className='day'>
                <input type='checkbox' id='day3' onChange={handleThursday} /> <label htmlFor='day3'>Thursday</label>
                {thursday !== false && (
                    <div>
                    <p>Add a Period: <button onClick={() => addForm('thursday')}>+</button></p>
                    {localstore.thursday.length > 0 && (
                        localstore.thursday.map((to_do,i) => {
                            return(
                                <div className='todo'>
                                    {i+1}. Period: 
                                    <select defaultValue={to_do.period} disabled onChange={(e) => handlePeriod(e)}>
                                        <option>Choose Period</option>
                                        <option>AM</option>
                                        <option>PM</option>
                                    </select>
                                    Duration:
                                    <select defaultValue={to_do.duration} disabled onChange={(e) => handleDuration(e)}>
                                        <option>Choose Duration</option>
                                        <option>30 minute</option>
                                        <option>60 minute</option>
                                    </select>
                                    Notes: <input type="text" disabled value={to_do.notes} /> <button onClick={() => deleteTODO('thursday', to_do)}>-</button>
                                </div>
                            )
                        })
                    )}
                    {form.length > 0 && (
                        form.map((f,i) => {
                            console.log(form)
                            if (f.day === 'thursday') {
                                return(<div className='todo'>
                                    {i + 1 + localstore.thursday.length}. Period: 
                                    <select onChange={(e) => {handlePeriod(e)}}>
                                        <option>Choose Period</option>
                                        <option>AM</option>
                                        <option>PM</option>
                                    </select>
                                    Duration:
                                    <select onChange={(e) => {handleDuration(e)}}>
                                        <option>Choose Duration</option>
                                        <option>30 minute</option>
                                        <option>60 minute</option>
                                    </select>
                                    Notes: <input type="text" onKeyPress={(e) => handleSubmit(e, 'thursday')} /><button onClick={() => deleteForm(f)}>-</button>
                                </div>)
                                
                            }
                        })
                    )}
                </div>
                )}
            </div>
            <div className='day'>
                <input type='checkbox' id='day4' onChange={handleFriday} /> <label htmlFor='day4'>Friday</label>
                {friday !== false && (
                    <div>
                    <p>Add a Period: <button onClick={() => addForm('friday')}>+</button></p>
                    {localstore.friday.length > 0 && (
                        localstore.friday.map((to_do, i) => {
                            return(
                                <div className='todo'>
                                    {i+1}. Period: 
                                    <select defaultValue={to_do.period} disabled onChange={(e) => handlePeriod(e)}>
                                        <option>Choose Period</option>
                                        <option>AM</option>
                                        <option>PM</option>
                                    </select>
                                    Duration:
                                    <select defaultValue={to_do.duration} disabled onChange={(e) => handleDuration(e)}>
                                        <option>Choose Duration</option>
                                        <option>30 minute</option>
                                        <option>60 minute</option>
                                    </select>
                                    Notes: <input type="text" disabled value={to_do.notes} /> <button onClick={() => deleteTODO('friday', to_do)}>-</button>
                                </div>
                            )
                        })
                    )}
                    {form.length > 0 && (
                        form.map((f, i) => {
                            console.log(form)
                            if (f.day === 'friday') {
                                return(<div className='todo'>
                                    {i + 1 + localstore.friday.length}. Period: 
                                    <select onChange={(e) => handlePeriod(e)}>
                                        <option>Choose Period</option>
                                        <option>AM</option>
                                        <option>PM</option>
                                    </select>
                                    Duration:
                                    <select onChange={(e) => handleDuration(e)}>
                                        <option>Choose Duration</option>
                                        <option>30 minute</option>
                                        <option>60 minute</option>
                                    </select>
                                    Notes: <input type="text" onKeyPress={(e) => handleSubmit(e, 'friday')} /><button onClick={() => deleteForm(f)}>-</button>
                                </div>)
                            }
                        })
                    )}
                </div>
                )}
            </div>
            <div className='day'>
                <input type='checkbox' id='day5' onChange={handleSaturday} /> <label htmlFor='day5'>Saturday</label>
                {saturday !== false && (
                    <div>
                    <p>Add a Period: <button onClick={() => addForm('saturday')}>+</button></p>
                    {localstore.saturday.length > 0 && (
                        localstore.saturday.map((to_do, i) => {
                            return(
                                <div className='todo'>
                                    {i+1}. Period: 
                                    <select defaultValue={to_do.period} disabled onChange={(e) => handlePeriod(e)}>
                                        <option>Choose Period</option>
                                        <option>AM</option>
                                        <option>PM</option>
                                    </select>
                                    Duration:
                                    <select defaultValue={to_do.duration} disabled onChange={(e) => handleDuration(e)}>
                                        <option>Choose Duration</option>
                                        <option>30 minute</option>
                                        <option>60 minute</option>
                                    </select>
                                    Notes: <input type="text" disabled value={to_do.notes} /> <button onClick={() => deleteTODO('saturday', to_do)}>-</button>
                                </div>
                            )
                        })
                    )}
                    {form.length > 0 && (
                        form.map((f, i) => {
                            console.log(form)
                            if (f.day === 'saturday') {
                                return(<div className='todo'>
                                    {i + 1 + localstore.saturday.length}. Period: 
                                    <select onChange={(e) => handlePeriod(e)}>
                                        <option>Choose Period</option>
                                        <option>AM</option>
                                        <option>PM</option>
                                    </select>
                                    Duration:
                                    <select onChange={(e) => handleDuration(e)}>
                                        <option>Choose Duration</option>
                                        <option>30 minute</option>
                                        <option>60 minute</option>
                                    </select>
                                    Notes: <input type="text" onKeyPress={(e) => handleSubmit(e, 'saturday')} /><button onClick={() => deleteForm(f)}>-</button>
                                </div>)
                            }
                        })
                    )}
                </div>
                )}
            </div>
            <div className='day'>
                <input type='checkbox' id='day6' onChange={handleSunday} /> <label htmlFor='day6'>Sunday</label>
                {sunday !== false && (
                    <div>
                    <p>Add a Period: <button onClick={() => addForm('sunday')}>+</button></p>
                    {localstore.sunday.length > 0 && (
                        localstore.sunday.map((to_do, i) => {
                            return(
                                <div className='todo'>
                                    {i +1}. Period: 
                                    <select defaultValue={to_do.period} disabled onChange={(e) => handlePeriod(e)}>
                                        <option>Choose Period</option>
                                        <option>AM</option>
                                        <option>PM</option>
                                    </select>
                                    Duration:
                                    <select defaultValue={to_do.duration} disabled onChange={(e) => handleDuration(e)}>
                                        <option>Choose Duration</option>
                                        <option>30 minute</option>
                                        <option>60 minute</option>
                                    </select>
                                    Notes: <input type="text" disabled value={to_do.notes} /> <button onClick={() => deleteTODO('sunday', to_do)}>-</button>
                                </div>
                            )
                        })
                    )}
                    {form.length > 0 && (
                        form.map((f, i) => {
                            console.log(form)
                            if (f.day === 'sunday') {
                                return(<div className='todo'>
                                    {i + 1 + localstore.sunday.length}. Period: 
                                    <select onChange={(e) => handlePeriod(e)}>
                                        <option>Choose Period</option>
                                        <option>AM</option>
                                        <option>PM</option>
                                    </select>
                                    Duration:
                                    <select onChange={(e) => handleDuration(e)}>
                                        <option>Choose Duration</option>
                                        <option>30 minute</option>
                                        <option>60 minute</option>
                                    </select>
                                    Notes: <input type="text" onKeyPress={(e) => handleSubmit(e, 'sunday')} /><button onClick={() => deleteForm(f)}>-</button>
                                </div>)
                            }
                        })
                    )}
                </div>
                )}
            </div>
            <div>
                {total_duration >= 0 && (
                    `${total_duration/1440 >= 1 ? Math.floor(total_duration/1440) : 0}
                    day(s)
                    ${total_duration/60 >= 1 ? Math.floor(total_duration / 60) : 0} 
                    hour(s) and 
                    ${total_duration % 60 !== 0 ? total_duration % 60 : 0} 
                    minute(s)`
                )}
            </div>
        </div>
    )
}

export default Home;