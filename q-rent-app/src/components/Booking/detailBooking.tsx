"use client";
import { useState } from "react";
import { BookingType } from "@/types/type";
import {
  IoMdCar,
  IoMdColorPalette,
  IoMdCalendar,
  IoMdSpeedometer,
} from "react-icons/io";
import { MdAirlineSeatReclineNormal, MdPlace } from "react-icons/md";
import { GiKeyCard } from "react-icons/gi";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { FaAddressCard } from "react-icons/fa";
import Link from "next/link";
import { formatToRupiah } from "@/db/helpers/formatter";
import ButtonStatus from "../buttonStatus/buttonStatus";
import useMidtrans from "@/actions/useMidtrans";



export default function DetailBooking({ data }: { data: BookingType }) {
  useMidtrans("https://app.sandbox.midtrans.com/snap/snap.js")

  const prices = formatToRupiah(data.totalPrice);
  
  const [imageSlide, setImageSlide] = useState<string>(data.car.carImage[0]);

  const handleSlideImage = (carImage: string) => {
    setImageSlide(carImage);
  };
  const handlePayment = (token: string) => {
    window?.snap.pay(token, {
      onSuccess: function(result){
        document.getElementById('result-json').innerHTML += JSON.stringify(result, null, 2);
      },
      onPending: function(result){
        document.getElementById('result-json').innerHTML += JSON.stringify(result, null, 2);
      },
      onError: function(result){
        document.getElementById('result-json').innerHTML += JSON.stringify(result, null, 2);
      }
    });
  }
  return (
    <div className="flex flex-col mt-[5rem]">
      <div className="flex flex-row mx-[5rem] mt-[3rem] mb-[5rem]">
        <div className="flex flex-col gap-4 mr-[1rem]">
          {data.car.carImage.map((el, i) => (
            <div key={i} onClick={() => handleSlideImage(el)}>
              <img
                className="w-[14.9rem] h-[10rem] border-2 border-blue-400 cursor-pointer rounded-lg shadow-md transition duration-300 transform hover:scale-110"
                src={el}
                alt=""
              />
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 mr-[3rem]">
          <div className="border border-blue-400 rounded-lg shadow-md p-4">
            <img
              className="w-[47rem] h-[30rem] rounded-lg shadow-md transition duration-300 transform"
              src={imageSlide}
              alt=""
            />
          </div>
        </div>

        <div className="border border-blue-400 rounded-lg p-8">
          <div className="flex flex-col gap-5 text-black">
            <div className="flex flex-col gap-2">
              <h3 className="font-secondary text-[2rem]">{data.car.brand}</h3>
              <h3 className="font-secondary text-[2rem]">{data.car.name}</h3>
              <h4 className="text-[1rem]">{prices}</h4>
              <div className="flex flex-row gap-2 items-center">
                <h4 className="font-semibold">
                  <span className="mr-2">
                    <IoMdColorPalette className="text-gray-600 inline" />
                  </span>
                  Warna: {data.car.color}
                </h4>
              </div>
              <h4 className="font-semibold">
                <span className="mr-2">
                  <MdPlace className="text-gray-600 inline" />
                </span>
                Region: {data.car.region}
              </h4>
            </div>
          </div>

          <div className="flex flex-col gap-2 border border-blue-400 rounded-lg p-8 text-black">
            <p className="font-semibold">
              <span className="mr-2">
                <IoMdCar className="text-gray-600 inline" />
              </span>
              Tipe: {data.car.type}
            </p>
            <p className="font-semibold">
              <span className="mr-2">
                <FaAddressCard className="text-gray-600 inline" />
              </span>
              Plat: {data.car.plat}
            </p>
            <p className="font-semibold">
              <span className="mr-2">
                <IoMdCalendar className="text-gray-600 inline" />
              </span>
              Year: {data.car.year}
            </p>
            <p className="font-semibold">
              <span className="mr-2">
                <GiKeyCard className="text-gray-600 inline" />
              </span>
              Transmission: {data.car.transmission}
            </p>
            <p className="font-semibold">
              <span className="mr-2">
                <BsFillFuelPumpFill className="text-gray-600 inline" />
              </span>
              Fuel: {data.car.BbmType}
            </p>
            <p className="font-semibold">
              <span className="mr-2">
                <MdAirlineSeatReclineNormal className="text-gray-600 inline" />
              </span>
              Seat: {data.car.seat} Seats
            </p>
            <p className="font-semibold">
              <span className="mr-2">
                <IoMdSpeedometer className="text-gray-600 inline" />
              </span>
              Km: {data.car.kilometer}
            </p>
            {data.user.role !== "customer" ? (
              <Link href={`/booking/${data.car._id}`}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
                  Payment
                </button>
              </Link>
            ) : (
              <ButtonStatus status={data.status} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
