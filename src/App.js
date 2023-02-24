import { useEffect, useState } from 'react'
import { Nav, UserForm } from "./components";
import defaultUserData from './utils/variables';

const App = () => {
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState({...defaultUserData })
  const [options, setOptions] = useState(null)
  const [postStatus, setPostStatus] = useState(null)

  useEffect(() => {
    const getOptions = async () => {
      const res = await fetch('https://frontend-take-home.fetchrewards.com/form')
      const data = await res.json()

      setOptions(data)
    }

    getOptions()
  }, [])

  return (
    <main className='fixed transition-all max-w-screen'>
      <div className='w-screen h-screen text-lg font-semibold text-indigo-900 bg-shape bg-gradient-to-tr from-orange-100 to-purple-100'>
        <Nav />
      {
        options ? (
          (!postStatus || postStatus.status !== 201) ? (
            <UserForm
            loading={loading}
            setLoading={setLoading}
            options={options}
            userData={userData}
            setUserData={setUserData}
            setPostStatus={setPostStatus}
            />
            ) : (
              <h1 className='p-4 ml-4 text-2xl font-bold'>Your account has been created!</h1>
              )
          ) : (
            <h1>Loading</h1>
          )
        }
    </div>
    </main>
  );
}

export default App;

