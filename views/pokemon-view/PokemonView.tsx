"use client";
import { Container, Section } from "@/components/layout";
import Image from "next/image";
import { Pokemon } from "pokenode-ts";
import React, { FC } from "react";

export type T_PokemonView = {
  data: Pokemon;
};

const PokemonView: FC<T_PokemonView> = ({ data }) => {
  return (
    <Section className="bg-[url('/background_1.png')] bg-cover">
      <Container className="justify-center items-center">
        <div className="w-full flex justify-start items-center ">
          <div className="relative w-[300px] h-[450px]  px-5 py-3 rounded-lg shadow-2xl bg-white/50 backdrop-blur-xl overflow-hidden border-l-2 border-l-gray-600 border-b-2 border-b-gray-600 transition-all hover:scale-[1.03] hover:brightness-[1.03]">
            <div className="absolute w-full h-full top-0 left-0 opacity-5">
              <Image
                fill
                alt="noise"
                src={"/random_noise.png"}
                objectFit="cover"
                objectPosition="center"
              />
            </div>

            <p className="capitalize text-xl mb-2 relative font-bold">
              {data.name}{" "}
            </p>
            <div className="relative w-full aspect-square bg-gradient-to-br from-green-200 to-cyan-100 rounded-md flex justify-center items-center border-l-2 border-l-gray-600 border-b-2 border-b-gray-600">
              <Image
                width={200}
                height={200}
                src={data.sprites.front_default || "/pokemon_ball.png"}
                alt={data.name}
                priority
              />
            </div>
            <div className="relative w-[70%] h-[10px] bg-gray-600 mb-5 mt-[-5px] ml-[15%] rounded-lg"></div>
            <div>
              <div className="relative flex flex-wrap gap-1">
                <p className="text-md w-full font-bold">Stats:</p>
                {data.stats.map((stat) => (
                  <div key={stat.stat.name}>
                    <p className="text-sm w-half">
                      {stat.stat.name}:{stat.base_stat}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-start gap-1 items-start p-10">
            <h1 className="capitalize text-3xl mb-2 bg-black p-3 text-white rounded-lg">
              {data.name}{" "}
            </h1>
            <p>Height: {data.height}</p>
            <p>Weight: {data.weight}</p>

            <div className="flex gap-3 items-center">
              <p>Type: </p>
              {data.types.map((type) => (
                <p
                  key={type.type.name}
                  className="bg-black text-white px-2 py-1 rounded-md"
                >
                  {type.type.name}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default PokemonView;
