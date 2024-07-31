import { useState,useEffect } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';
// import { axiosInstance } from '../../App';


const Caraousel = () => {
  // const [data,setData] = useState();
  // useEffect(() => {
  //     (async () => {
  //         const response = await axiosInstance.get('/product');
  //         if (response.status === 200) {
  //             setData(response.data.data.products);
  //         }
  //     })();
  // }, []);
  // console.log(data);
  const images = [
    'https://imgs.search.brave.com/1hJL_9v10RIIkFtSRTdM_5CpGtFBkXpJme6qv1Jc4co/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTQ3/MjMzNTQ3Ni9waG90/by9kaWdpdGFsbHkt/Z2VuZXJhdGVkLWlt/YWdlLW9mLWlzb21l/dHJpYy1kYXRhLWNo/YXJ0LmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1RTmtnZlZn/WUNYUTdsbzg0TWdt/Y0NtTVAwb1Fsdl9t/V252aWFPc1ktNEQw/PQ',
    'https://imgs.search.brave.com/l3BDxLLjFGt67IttFIb8wMj8j06oLpmZADINBUL_4Bg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9idXJz/dC5zaG9waWZ5Y2Ru/LmNvbS9waG90b3Mv/bGVuc2JhbGwteWVs/bG93LWFuZC1vcmFu/Z2UtbGlnaHRzLmpw/Zz93aWR0aD0xMDAw/JmZvcm1hdD1wanBn/JmV4aWY9MCZpcHRj/PTA',
    'https://imgs.search.brave.com/4T1tXMwOsde3rGFLxrzSkXTjG3_oUCqg7bpedgy7R4E/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9idXJz/dC5zaG9waWZ5Y2Ru/LmNvbS9waG90b3Mv/bWlsa3NoYWtlLW9u/LXBpbmsuanBnP3dp/ZHRoPTEwMDAmZm9y/bWF0PXBqcGcmZXhp/Zj0wJmlwdGM9MA',
    'https://media.gettyimages.com/id/155378722/photo/toronto-city-skyline-at-night-in-canada.jpg?s=612x612&w=0&k=20&c=TsLZgY9bRwp08Z7ae5u-AMIxZy6GT9DCucirVP5XWS8=',
  ];
  const [currIndex, setCurrIndex] = useState(0);
  const prevSlide = () => {
    const isFirstIndex = currIndex === 0;
    const newIndex = isFirstIndex ? images.length - 1 : currIndex - 1;
    setCurrIndex(newIndex);
  };
  const nextSlide = () => {
    const isLastIndex = currIndex === images.length - 1;
    const newIndex = isLastIndex ? 0 : currIndex + 1;
    setCurrIndex(newIndex);
  };
  const goToSlide = (slideIndex) => {
    setCurrIndex(slideIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 2000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [currIndex]);

  return (
    <div className='flex'>
      <div className="h-[60vh] md:max-w-[1400px] h-[550px] w-full m-auto py-1  px-1 sm:px-4 mb-10 relative group justify-center items-center">
        <img
          src={images[currIndex]}
          alt=""
          className="  h-[50vh] w-[95vw] sm:w-[100vw] md:w-full h-full rounded-2xl bg-center bg-cover duration-500 m-au"
        />
        {/* left arrow */}
        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer ">
          <BsChevronCompactLeft onClick={() => prevSlide()} size={30} />
        </div>
        {/* right arrow */}
        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <BsChevronCompactRight onClick={() => nextSlide()} size={30} />
        </div>
        <div className="flex top-4 justify-center py-2">
          {images.map((slide, index) => (
            <div key={index} className="text-2xl cursor-pointer">
              <RxDotFilled onClick={() => goToSlide(index)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Caraousel;
