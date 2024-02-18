import React from 'react'

function About() {
  return (
    <div className='pt-20 px-14 mx-auto h-screen dark:bg-black dark:text-white'>
      <h1 className='text-3xl font-semibold text-center'>About</h1>
      <p className='my-3 p-3 opacity-95 md:w-[950px] mx-auto'> Introducing Mern Auth, a user-friendly authentication app that
        simplifies sign-in and sign-up processes. Users can create accounts or
        log in using email and passwords, with robust encryption for security.
        Additionally, the app offers quick sign-up and the convenience of Google
        account integration for swift access. Enjoy a personalized experience
        with profile customization, all within a secure and intuitive interface.
        Password recovery and cross-platform compatibility further enhance user
        convenience. </p>
    </div>
  )
}

export default About