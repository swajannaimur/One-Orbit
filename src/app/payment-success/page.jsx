import React from 'react'

const PaymentSuccess = ({ searchParams: {amount} } ) => {
  return (
    <main className="max-w-6xl mx-auto p-10 mt-24 text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
        <div className='mb-10'>
            <h1 className='text-4xl font-bold'>Thank You</h1>
            <h2 className='text-2xl'>You succcessfully paid </h2>
            <div className='bg-white p-2 rounded-md text-purple-500 mt-5 text-4xl font-bold'>
                ${amount}
            </div>
        </div>
      
    </main>
  )
}

export default PaymentSuccess;
