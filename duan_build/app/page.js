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