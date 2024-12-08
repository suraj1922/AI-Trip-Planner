import React, { useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Input } from "@/components/ui/input"

function CreateTrip() {
  const [place, setPlace] = useState()
  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Tell us your travel preferences</h2>
      <p className='mt-3 text-gray-500 text-xl'>Just provide some basic inforation, and our trip planner will generare a customized itinearay based on your perferences.</p>

      <div className='mt-20 flex flex-col gap-10'>
        <div>
          <h2 className='my-3 font-medium text-xl'>What is destination of choice?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => { setPlace(v); console.log(v) }
            }}
          />
        </div>
      </div>

      <div>
        <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip</h2>
        <Input placeholder={'Ex.3'} type="number" />
      </div>
    </div>
  )
}

export default CreateTrip