import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Input } from "@/components/ui/input"
import { SelectTravelesList, SelectBudgetOptions } from '@/constant/option';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import axios from 'axios';
import { chatSession } from '@/service/AIModel';


function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const handleInputChange = (name, value) => {


    setFormData({
      ...formData,
      [name]: value,
    })
  }

  useEffect(() => {
    console.log(formData);
  }, [formData])


  const login = useGoogleLogin({
    ponSuccess: (codeResp) => console.log(codeResp),
    onError: (error) => console.log(error)
  })

  const OnGenerateTrip = async() => {
    const user = localStorage.getItem('user');

    if (!user) {
      setOpenDialog(true);
      return;
    }
    if (formData?.noOfDays > 5 && !formData?.location || formData?.budget || formData?.noPeople) {
      toast("Please fill all details")
      return;
    }
    const FINAL_PROMPT = AI_PROMPT
    .replace('{location}', formData?.location.label)
    .replace('{totalDays}', formData?.noOfDays)
    .replace('{traveler}', formData?.traveler)
    .replace('{budget', formData?.budget)
    .replace('{totalDays}', formData?.noOfDays)

    console.log(FINAL_PROMPT);
    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result?.response?.test());
  }

  const GetUserProfile = (tokenInfo) => {
    if (!tokenInfo?.access_token) {
      console.error("Access token is missing!");
      return;
    }

    axios
      .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`, {
        headers: {
          Authorization: `Bearer ${tokenInfo.access_token}`,
          Accept: 'application/json',
        },
      })
      .then((resp) => {
        console.log("User Profile:", resp.data);
        localStorage.setItem('user', JSON.stringify(resp.data));
        setOpenDialog(false);
        OnGenerateTrip();
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error.response?.data || error.message);
      });
  };

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Tell us your travel preferences🏕️☃️</h2>
      <p className='mt-3 text-gray-500 text-xl'>Just provide some basic inforation, and our trip planner will generare a customized itinearay based on your perferences.</p>

      <div className='mt-20 flex flex-col gap-10'>
        <div>
          <h2 className='my-3 font-medium text-xl'>What is destination of choice?</h2>
          {/* <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => { setPlace(v); handleInputChange('location', v);   }
            }}
          /> */}
        </div>
      </div>

      {/* <div>
        <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip</h2>
        <Input placeholder={'Ex.3'} type="number" 
        onChange={(e)=>handleInputChange('noOfDays',e.target.value)}
        />
      </div> */}

      <div>
        <h2 className='text-xl my-3 font-medium'>What is Your Budget?</h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
          {SelectBudgetOptions.map((item, index) => (
            <div key={index}
              onClick={() => handleInputChange('budget', item.title)}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
            ${formData?.budget == item.title && 'shadow-lg border-black'}
            `}>
              <h2 className='text-4xl'>{item.icons}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className='text-xl my-3 font-medium'>Who do you plan to travlling with on your next adventure</h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
          {SelectTravelesList.map((item, index) => (
            <div key={index}
              onClick={() => handleInputChange('noPeople', item.people)}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
              ${formData?.noPeople == item.people && 'shadow-lg border-black'}`}>
              <h2 className='text-4xl'>{item.icons}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className='my-10 justify-end flex'>
        <Button onClick={OnGenerateTrip}>Generate Trip</Button>
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="./logo.svg" alt="" />
              <h2 className='font-bold text-lg mt-7'>Sign In With Google</h2>
              <p>Sign in to the App with Google authentication securly </p>
              <Button
                onClick={login}
                className="w-full mt-5 flex gap-4 align-center">
                <FcGoogle className='h-7 w-7' />
                Sign In With Google</Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

    </div>


  )
}

export default CreateTrip