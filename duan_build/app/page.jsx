"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { useEffect } from "react";
import useSWR from "swr";

export default function Home() {
  const fecher = (...args) =>fetch(...args).then((res) => res.json());
  const {data:phim ,error:phimerror} = useSWR(`https://backend-duan-9qb7.onrender.com/phim`,fecher);
  if (phimerror) {
    return <div>Error loading banner data</div>;
  }
  
  if (!phim) {
    return <div>Loading...</div>;
  }
  // const phim = [
  //   {
  //     "_id": "1",
  //     "tenphim": "Ai oái trong vườn xuân",
  //     "noidung": "Phim xoay quanh So-hee, người đã mất đi gia đình hạnh phúc của mình vì cái chết đột ngột của chồng, và trải qua những điều kỳ lạ, rùng rợn sau khi đến thăm Neulbom Garden, một ngôi biệt thự nông thôn bí ẩn do chồng cô để lại.",
  //     "thoiluong": 90,
  //     "daodien": "Koo Tae-jin",
  //     "dienvien": ["Jo Yoon-Hee", "Kim Joo-Ryeong", "Jung In-Gyeom", "Heo Dong-Won"],
  //     "trailler": "https://www.youtube.com/embed/52qrqrOw4PE",
  //     "ngayhieuluc": "2024-12-13T00:00:00.000+00:00",
  //     "img": "OIP.jpg",
  //     "trangthai": "0"
  //   }
  // ];
  return (
    <>
      {phim.map((movie) => (
        <div className="card" key={movie._id}>
          <div className="box">
            <Link
              href={`/filmdetail/${movie._id}`}
              className="text-decoration-none text-muted"
            >
              <div className="img-top">
                <img
                  src={`./${movie.img}`}
                  alt={movie.tenphim}
                />
              </div>
              <div className="card-body">
                <div className="day-time">
                  <p style={{ color: "#000" }}>{movie.thoiluong} Phút</p>
                  <p style={{ color: "#000" }}>
                    {new Date(movie.ngayhieuluc).toLocaleDateString("vi-VN")}
                  </p>
                </div>
                <div className="title-card">
                  <h1 className="text-uppercase">{movie.tenphim}</h1>
                </div>
              </div>
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}