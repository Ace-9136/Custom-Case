// ShippingAddress.tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Dispatch, SetStateAction } from 'react'
import { useState } from 'react'

const ShippingAddress = ({
  isOpen,
  setIsOpen,
  handleSubmit,
}: {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  handleSubmit: (address: any) => void
}) => {
  const [shippingAddress, setShippingAddress] = useState({
    name: '',
    street: '',
    city: '',
    postalCode: '',
    country: '',
    state: '',
    phoneNumber: ''
  })

  const handleClose = () => {
    setIsOpen(false)
    // Reset form fields
    setShippingAddress({
      name: '',
      street: '',
      city: '',
      postalCode: '',
      country: '',
      state: '',
      phoneNumber: ''
    })
  }

  const handleSave = () => {
    handleSubmit(shippingAddress)
    handleClose()
  }

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen} >
      <DialogContent className="fixed z-[9999999]  top-1/2 left-1/2 transform translate-x-[-50%] translate-y-[-50%] w-full sm:max-w-sm md:max-w-2xl md:p-10 bg-white rounded-md shadow-md p-4">
        <DialogHeader>
          <DialogTitle className="text-3xl text-center font-bold tracking-tight text-gray-900">
            Shipping Address
          </DialogTitle>
        </DialogHeader>

        <form className="grid grid-cols-1 gap-y-4" onSubmit={(e) => { e.preventDefault(); handleSave() }}>
          
          <div>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
              Name
            </label>
            <input
              className='shadow appearance-none border border-zinc-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='name'
              type='text'
              value={shippingAddress.name}
              onChange={(e) => setShippingAddress({ ...shippingAddress, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='street'>
              Street Address
            </label>
            <input
              className='shadow appearance-none border border-zinc-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='street'
              type='text'
              value={shippingAddress.street}
              onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })}
              required
            />
          </div>
          <div>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='city'>
              City
            </label>
            <input
              className='shadow appearance-none border border-zinc-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='city'
              type='text'
              value={shippingAddress.city}
              onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
              required
            />
          </div>
          <div>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='postalCode'>
              Postal Code
            </label>
            <input
              className='shadow appearance-none border border-zinc-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='postalCode'
              type='text'
              value={shippingAddress.postalCode}
              onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
              required
            />
          </div>
          <div>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='country'>
              Country
            </label>
            <input
              className='shadow appearance-none border border-zinc-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='country'
              type='text'
              value={shippingAddress.country}
              onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
              required
            />
          </div>
          <div>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='state'>
              State
            </label>
            <input
              className='shadow appearance-none border border-zinc-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='state'
              type='text'
              value={shippingAddress.state}
              onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
              required
            />
          </div>
          <div>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='phoneNumber'>
              Phone Number
            </label>
            <input
              className='shadow appearance-none border border-zinc-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='phoneNumber'
              type='text'
              value={shippingAddress.phoneNumber}
              onChange={(e) => setShippingAddress({ ...shippingAddress, phoneNumber: e.target.value })}
            />
          </div>
          <div className='flex justify-end'>
            <button type='button' className='mr-2 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md' onClick={handleClose}>
              Cancel
            </button>
            <button type='submit' className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md'>
              Save
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ShippingAddress
