import { useEffect, useState } from 'react'
import validForm from '../utils/functions'
import defaultUserData from '../utils/variables'

const UserForm = ({ options, userData, setUserData, setPostStatus }) => {

  let isValid = validForm(userData)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (isValid === true) {
      const post = async () => {
        const res = await fetch('https://frontend-take-home.fetchrewards.com/form', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...userData })
        })

        if (!res.ok) { return res }

        const data = await { status: res.status, msg: res.json() }

        if (data) setPostStatus(data)
      }

      post()
    }
  }

  return (
    <form className='max-w-[40vw] grid grid-rows-6 gap-3 p-10' onSubmit={e => handleSubmit(e)}>
      {/* name */}
      <div className='flex flex-col'>
        <label className='' htmlFor='name'>Full Name</label>
        <input
          className={'shadow-md rounded-lg p-3'}
          id='name'
          type='text'
          tabIndex='1'
          onChange={e => setUserData({ ...userData, name: e.target.value })}
          required
        />
      </div>

            {/* email */}
        <div className='flex flex-col'>
          <label className='' htmlFor='email'>Email</label>
          <input
            className='p-3 rounded-lg shadow-md'
            id='email'
            type='email'
            tabIndex='2'
            onChange={e => setUserData({ ...userData, email: e.target.value })}
            required
          />
        </div>

        {/* password */}
        <div className='flex flex-col'>
          <label className='' htmlFor='password'>Password</label>
          <input
            className='p-3 rounded-lg shadow-md'
            type='password'
            id='password'
            tabIndex='3'
            onChange={e => setUserData({ ...userData, password: e.target.value })}
            required
          />
        </div>

        {/* occupation */}
        <div className='flex flex-col'>
          <label className='' htmlFor='occupation'>Occupation</label>
          <select
            className='p-3 font-sans font-normal rounded-lg shadow-md'
            id='occupation'
            type='text'
            tabIndex='4'
            onChange={e => setUserData({ ...userData, occupation: e.target.value })}
            value={userData.occupation !== null ? userData.occupation : ''}
            required
          >
            <option value=''>Select an occupation</option>
            {options.occupations.map((occupation, id) => {
              return (
                <option key={id} value={occupation}>{occupation}</option>
              )
            })}
          </select>
        </div>

        {/* state */}
        <div className='flex flex-col'>
          <label className='' htmlFor='state'>State</label>
          <select
            className='p-3 font-sans font-normal rounded-lg shadow-md'
            id='state'
            type='text'
            tabIndex='5'
            onChange={e => setUserData({ ...userData, state: e.target.value })}
            value={userData.state !== null ? userData.state : ''}
            required
          >
            <option value=''>Select a state</option>
            {options.states.map((singleState, id) => {
              return (
                <option key={id} value={singleState.abbreviation}>{singleState.name}</option>
              )
            })}
          </select>
        </div>
        <div className='flex flex-row justify-end'>
          <button
            disabled={!isValid}
            className={isValid
              ? 'p-2 font-normal text-white bg-indigo-800 rounded-md h-11'
              : 'p-2 font-normal text-slate-700 bg-indigo-300 rounded-md h-11 opacity-40'
            }
            type='submit'
          >
            Submit
          </button>
        </div>

      </form>
  )
}

export default UserForm;
